import aiohttp
from bs4 import BeautifulSoup
from typing import List, Dict
import logging
from ..exceptions import ScrapingException, MinistryNotFoundException
from aiohttp import ClientError

logger = logging.getLogger(__name__)

class WebScraperService:
    def __init__(self):
        self.ministry_urls = {
            "NG": {  # Nijerya
                "education": "https://education.gov.ng",
                "health": "https://health.gov.ng",
                "technology": "https://nitda.gov.ng"
            },
            "KE": {  # Kenya
                "education": "https://education.go.ke",
                "health": "https://health.go.ke",
                "technology": "https://ict.go.ke"
            }
        }

    async def get_ministries(self, country: str) -> List[Dict]:
        try:
            country_ministries = self.ministry_urls.get(country)
            if not country_ministries:
                raise MinistryNotFoundException(
                    country=country,
                    ministry="all"
                )

            return [
                {
                    "id": ministry_id,
                    "name": f"{ministry_id.title()} Ministry",
                    "url": url
                }
                for ministry_id, url in country_ministries.items()
            ]
        except MinistryNotFoundException:
            raise
        except Exception as e:
            logger.error(f"Error getting ministries for {country}: {str(e)}")
            raise ScrapingException(
                detail=f"Failed to get ministries for {country}",
                extra={"error": str(e)}
            )

    async def scrape_ministry_websites(self, country: str, ministry_ids: List[str]) -> List[Dict]:
        results = []
        errors = []

        async with aiohttp.ClientSession() as session:
            for ministry_id in ministry_ids:
                try:
                    url = self.ministry_urls.get(country, {}).get(ministry_id)
                    if not url:
                        raise MinistryNotFoundException(country, ministry_id)

                    async with session.get(url, timeout=30) as response:
                        if response.status != 200:
                            raise ScrapingException(
                                detail=f"Failed to fetch {url}",
                                extra={
                                    "status": response.status,
                                    "ministry": ministry_id
                                }
                            )

                        html = await response.text()
                        soup = BeautifulSoup(html, 'html.parser')
                        
                        news_items = soup.find_all(['article', 'div'], 
                            class_=['news', 'announcement', 'post'])
                        
                        if not news_items:
                            logger.warning(f"No news items found for {ministry_id} in {country}")

                        results.extend([
                            {
                                "ministry": ministry_id,
                                "title": item.find('h2').text.strip() if item.find('h2') else "",
                                "content": item.text.strip(),
                                "url": url
                            }
                            for item in news_items
                        ])

                except MinistryNotFoundException:
                    raise
                except ClientError as e:
                    errors.append({
                        "ministry": ministry_id,
                        "error": "Connection error",
                        "details": str(e)
                    })
                except Exception as e:
                    errors.append({
                        "ministry": ministry_id,
                        "error": "Scraping error",
                        "details": str(e)
                    })

        if errors:
            logger.error(f"Errors during scraping: {errors}")
            if len(errors) == len(ministry_ids):
                raise ScrapingException(
                    detail="Failed to scrape all ministries",
                    extra={"errors": errors}
                )

        return {
            "results": results,
            "errors": errors,
            "success_count": len(results),
            "error_count": len(errors)
        }

    async def get_active_projects(self) -> List[Dict]:
        # Mock veri - gerçek implementasyonda veritabanından gelecek
        return [
            {
                "id": "1",
                "name": "E-Learning Platform",
                "country": "Nigeria",
                "status": "active",
                "progress": 75
            },
            {
                "id": "2",
                "name": "Healthcare Management System",
                "country": "Kenya",
                "status": "active",
                "progress": 45
            }
        ] 