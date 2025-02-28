from datetime import timedelta
from prometheus_client import CollectorRegistry, write_to_textfile
import time
import os
import asyncio

class MetricRetention:
    def __init__(self, retention_days: int = 30):
        self.retention_days = retention_days
        self.backup_dir = "metrics_backup"
        os.makedirs(self.backup_dir, exist_ok=True)

    def backup_metrics(self, registry: CollectorRegistry):
        """Metrikleri günlük dosyalara yedekle"""
        timestamp = time.strftime("%Y%m%d")
        backup_file = os.path.join(self.backup_dir, f"metrics_{timestamp}.txt")
        write_to_textfile(backup_file, registry)

    def cleanup_old_backups(self):
        """Eski yedekleri temizle"""
        cutoff = time.time() - (self.retention_days * 86400)
        for filename in os.listdir(self.backup_dir):
            filepath = os.path.join(self.backup_dir, filename)
            if os.path.getctime(filepath) < cutoff:
                os.remove(filepath)

    async def start_retention_tasks(self):
        """Retention görevlerini başlat"""
        while True:
            self.cleanup_old_backups()
            await asyncio.sleep(86400)  # Her gün çalıştır 