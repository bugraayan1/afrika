from fastapi import FastAPI, HTTPException, Request, Depends, Response
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional
from datetime import datetime
import uvicorn
from fastapi.responses import JSONResponse
import logging
import time
from prometheus_client import make_asgi_app
import psutil
import asyncio

from models import (
    Project, 
    AgentStatus, 
    Transfer, 
    Ministry, 
    Analysis,
    CountryAnalysisRequest
)
from services.scraper import WebScraperService
from services.analyzer import ProblemAnalyzerService
from services.github import GitHubService
from .exceptions import BaseAPIException
from .utils.retry import async_retry
from .utils.rate_limit import RateLimiter
from .utils.metrics import MetricsCollector, RequestMetrics
from .services.notification import NotificationService
from .monitoring.retention import MetricRetention
from .monitoring.exporters.custom_metrics import CustomMetricsExporter

logger = logging.getLogger(__name__)

app = FastAPI(title="Afrika Teknoloji Transfer API")

# Prometheus metrics
metrics_app = make_asgi_app()
app.mount("/metrics", metrics_app)

# Rate limiter
rate_limiter = RateLimiter(calls=100, period=60)  # 60 saniyede 100 istek

# Notification service
notification_service = NotificationService()

# Metric retention
retention_manager = MetricRetention(retention_days=30)

@app.exception_handler(BaseAPIException)
async def api_exception_handler(request: Request, exc: BaseAPIException):
    logger.error(f"API Error: {exc.detail}")
    return JSONResponse(
        status_code=exc.status_code,
        content=exc.detail
    )

@app.exception_handler(Exception)
async def general_exception_handler(request: Request, exc: Exception):
    logger.error(f"Unexpected error: {str(exc)}", exc_info=True)
    return JSONResponse(
        status_code=500,
        content={
            "message": "An unexpected error occurred",
            "error_code": "INTERNAL_SERVER_ERROR",
            "extra": {"error": str(exc)}
        }
    )

# CORS ayarları
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Servis örnekleri
scraper_service = WebScraperService()
analyzer_service = ProblemAnalyzerService()
github_service = GitHubService()

@app.middleware("http")
async def metrics_middleware(request: Request, call_next):
    metrics = RequestMetrics()
    
    try:
        # Rate limit kontrolü
        await rate_limiter.acquire(request.client.host)
        
        # Sistem metriklerini güncelle
        MetricsCollector.update_system_metrics()
        
        # İsteği işle
        response = await call_next(request)
        
        # Response size'ı hesapla
        response_body = b""
        async for chunk in response.body_iterator:
            response_body += chunk
        metrics.set_response_size(len(response_body))
        
        # Metrikleri kaydet
        MetricsCollector.track_request(
            method=request.method,
            endpoint=request.url.path,
            status=response.status_code,
            duration=metrics.get_duration(),
            response_size=metrics.response_size
        )
        
        # Yeni response oluştur
        return Response(
            content=response_body,
            status_code=response.status_code,
            headers=dict(response.headers),
            media_type=response.media_type
        )
        
    except Exception as e:
        # Hata metriklerini kaydet
        MetricsCollector.track_error(
            error_type=type(e).__name__,
            service="api",
            severity="error" if isinstance(e, BaseAPIException) else "critical"
        )
        
        # Kritik hatalarda bildirim gönder
        if isinstance(e, (ScrapingException, AnalysisException)):
            await notification_service.send_slack_notification(
                message=f"Critical error: {str(e)}",
                severity="error"
            )
        
        raise

# Periyodik sistem metrik güncellemesi
@app.on_event("startup")
async def start_metric_collection():
    async def collect_metrics():
        while True:
            MetricsCollector.update_system_metrics()
            await asyncio.sleep(60)  # Her dakika güncelle
    
    asyncio.create_task(collect_metrics())

@app.get("/api/projects", response_model=List[Project])
@async_retry(retries=3, delay=1, exceptions=(ScrapingException,))
async def get_projects():
    with MetricsCollector.track_scraping_task():
        try:
            return await scraper_service.get_active_projects()
        except Exception as e:
            logger.error("Error fetching projects", exc_info=True)
            raise

@app.get("/api/agents/status", response_model=List[AgentStatus])
async def get_agents_status():
    try:
        return [
            {
                "id": "1",
                "name": "Web Scraper Agent",
                "status": "online",
                "lastActive": datetime.now().isoformat()
            },
            {
                "id": "2",
                "name": "Problem Analyzer Agent",
                "status": "working",
                "lastActive": datetime.now().isoformat()
            }
        ]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/transfers/recent", response_model=List[Transfer])
async def get_recent_transfers():
    try:
        return await github_service.get_recent_transfers()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/countries/{country}/ministries", response_model=List[Ministry])
async def get_country_ministries(country: str):
    try:
        return await scraper_service.get_ministries(country)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/analyze-country", response_model=Analysis)
async def analyze_country(request: CountryAnalysisRequest):
    try:
        # Web sitelerinden veri topla
        ministry_data = await scraper_service.scrape_ministry_websites(
            request.country, 
            request.ministries
        )
        
        # Problemleri analiz et
        problems = await analyzer_service.analyze_problems(ministry_data)
        
        # Çözüm önerileri oluştur
        solutions = await analyzer_service.generate_solutions(problems)
        
        # GitHub'da repo oluştur
        repo_url = await github_service.create_solution_repo(
            request.country,
            problems,
            solutions
        )
        
        return {
            "id": str(datetime.now().timestamp()),
            "country": request.country,
            "findings": problems,
            "recommendations": solutions,
            "timestamp": datetime.now().isoformat(),
            "repo_url": repo_url
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.on_event("startup")
async def start_monitoring():
    # Metrik toplama
    asyncio.create_task(start_metric_collection())
    
    # Özel metrikler
    asyncio.create_task(CustomMetricsExporter.start_collection())
    
    # Retention yönetimi
    asyncio.create_task(retention_manager.start_retention_tasks())

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True) 