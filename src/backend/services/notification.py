import aiohttp
from typing import Dict, Any
import logging
from ..config import settings
import time

logger = logging.getLogger(__name__)

class NotificationService:
    def __init__(self):
        self.slack_webhook = settings.SLACK_WEBHOOK_URL
        self.email_api = settings.EMAIL_API_URL

    async def send_slack_notification(self, message: str, severity: str = "info"):
        try:
            color = {
                "info": "#36a64f",
                "warning": "#ff9f1a",
                "error": "#ff0000"
            }.get(severity, "#000000")

            payload = {
                "attachments": [{
                    "color": color,
                    "text": message,
                    "ts": int(time.time())
                }]
            }

            async with aiohttp.ClientSession() as session:
                async with session.post(self.slack_webhook, json=payload) as response:
                    if response.status != 200:
                        logger.error(f"Failed to send Slack notification: {await response.text()}")

        except Exception as e:
            logger.error(f"Error sending Slack notification: {str(e)}")

    async def send_email_alert(self, subject: str, body: str, recipients: list):
        try:
            payload = {
                "subject": subject,
                "body": body,
                "recipients": recipients
            }

            async with aiohttp.ClientSession() as session:
                async with session.post(self.email_api, json=payload) as response:
                    if response.status != 200:
                        logger.error(f"Failed to send email alert: {await response.text()}")

        except Exception as e:
            logger.error(f"Error sending email alert: {str(e)}") 