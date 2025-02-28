from prometheus_client import Counter, Histogram, Gauge, Summary
import psutil
import time
import gc
from typing import Dict, Any

# HTTP Metrikleri
http_requests_total = Counter(
    'http_requests_total',
    'Total HTTP requests',
    ['method', 'endpoint', 'status']
)

http_request_duration_seconds = Histogram(
    'http_request_duration_seconds',
    'HTTP request duration in seconds',
    ['method', 'endpoint'],
    buckets=[0.1, 0.5, 1.0, 2.0, 5.0, 10.0]
)

http_response_size_bytes = Summary(
    'http_response_size_bytes',
    'HTTP response size in bytes',
    ['endpoint']
)

# Sistem Metrikleri
memory_usage_bytes = Gauge(
    'memory_usage_bytes',
    'Memory usage in bytes',
    ['type']  # rss, vms, shared, etc.
)

cpu_usage_percent = Gauge(
    'cpu_usage_percent',
    'CPU usage percentage',
    ['cpu']  # system, user, idle
)

gc_collection_count = Counter(
    'gc_collection_count',
    'Number of garbage collections',
    ['generation']
)

# Scraping Metrikleri
active_scraping_tasks = Gauge(
    'active_scraping_tasks',
    'Number of currently running scraping tasks'
)

scraping_duration_seconds = Histogram(
    'scraping_duration_seconds',
    'Scraping task duration in seconds',
    ['country', 'ministry'],
    buckets=[1.0, 5.0, 10.0, 30.0, 60.0, 120.0]
)

scraping_success_total = Counter(
    'scraping_success_total',
    'Total successful scraping operations',
    ['country', 'ministry']
)

# Hata Metrikleri
error_counter = Counter(
    'errors_total',
    'Total number of errors',
    ['type', 'service', 'severity']
)

class MetricsCollector:
    @staticmethod
    def track_request(method: str, endpoint: str, status: int, duration: float, response_size: int):
        http_requests_total.labels(method=method, endpoint=endpoint, status=status).inc()
        http_request_duration_seconds.labels(method=method, endpoint=endpoint).observe(duration)
        http_response_size_bytes.labels(endpoint=endpoint).observe(response_size)

    @staticmethod
    def track_error(error_type: str, service: str, severity: str = "error"):
        error_counter.labels(
            type=error_type,
            service=service,
            severity=severity
        ).inc()

    @staticmethod
    def track_scraping_task():
        return active_scraping_tasks.track_inprogress()

    @staticmethod
    def track_scraping_result(country: str, ministry: str, duration: float, success: bool = True):
        scraping_duration_seconds.labels(
            country=country,
            ministry=ministry
        ).observe(duration)
        
        if success:
            scraping_success_total.labels(
                country=country,
                ministry=ministry
            ).inc()

    @staticmethod
    def update_system_metrics():
        # Memory kullanımı
        memory = psutil.Process().memory_info()
        memory_usage_bytes.labels(type='rss').set(memory.rss)
        memory_usage_bytes.labels(type='vms').set(memory.vms)
        
        # CPU kullanımı
        cpu = psutil.cpu_times_percent()
        cpu_usage_percent.labels(cpu='system').set(cpu.system)
        cpu_usage_percent.labels(cpu='user').set(cpu.user)
        cpu_usage_percent.labels(cpu='idle').set(cpu.idle)
        
        # Garbage collection istatistikleri
        for i, count in enumerate(gc.get_count()):
            gc_collection_count.labels(generation=f'gen{i}').inc(count)

class RequestMetrics:
    def __init__(self):
        self.start_time = time.time()
        self.response_size = 0

    def set_response_size(self, size: int):
        self.response_size = size

    def get_duration(self) -> float:
        return time.time() - self.start_time 