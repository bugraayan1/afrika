from prometheus_client import Gauge, Counter
import psutil
import os

# Özel sistem metrikleri
disk_usage = Gauge(
    'disk_usage_bytes',
    'Disk usage in bytes',
    ['path', 'type']  # type: used, free, total
)

network_io = Counter(
    'network_io_bytes',
    'Network I/O in bytes',
    ['interface', 'direction']  # direction: in, out
)

open_files = Gauge(
    'open_files_total',
    'Number of open files by the process'
)

thread_count = Gauge(
    'thread_count_total',
    'Number of threads in the process'
)

class CustomMetricsExporter:
    @staticmethod
    def collect_disk_metrics():
        for path in ['/', '/data']:  # İzlenecek diskler
            try:
                usage = psutil.disk_usage(path)
                disk_usage.labels(path=path, type='used').set(usage.used)
                disk_usage.labels(path=path, type='free').set(usage.free)
                disk_usage.labels(path=path, type='total').set(usage.total)
            except Exception as e:
                logger.error(f"Disk metric collection error: {str(e)}")

    @staticmethod
    def collect_network_metrics():
        try:
            net_io = psutil.net_io_counters()
            network_io.labels(interface='all', direction='in').inc(net_io.bytes_recv)
            network_io.labels(interface='all', direction='out').inc(net_io.bytes_sent)
        except Exception as e:
            logger.error(f"Network metric collection error: {str(e)}")

    @staticmethod
    def collect_process_metrics():
        try:
            process = psutil.Process()
            open_files.set(len(process.open_files()))
            thread_count.set(process.num_threads())
        except Exception as e:
            logger.error(f"Process metric collection error: {str(e)}")

    @classmethod
    async def start_collection(cls):
        while True:
            cls.collect_disk_metrics()
            cls.collect_network_metrics()
            cls.collect_process_metrics()
            await asyncio.sleep(60)  # Her dakika güncelle 