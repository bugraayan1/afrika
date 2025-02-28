import time
from typing import Dict, Tuple
import asyncio
from fastapi import HTTPException

class RateLimiter:
    def __init__(self, calls: int, period: float):
        self.calls = calls
        self.period = period
        self.tokens: Dict[str, list] = {}

    async def acquire(self, key: str) -> bool:
        now = time.time()
        
        # İlk çağrı için token listesi oluştur
        if key not in self.tokens:
            self.tokens[key] = []

        # Süresi dolmuş tokenleri temizle
        self.tokens[key] = [t for t in self.tokens[key] if t > now - self.period]

        # Rate limit kontrolü
        if len(self.tokens[key]) >= self.calls:
            wait_time = self.tokens[key][0] - (now - self.period)
            raise HTTPException(
                status_code=429,
                detail={
                    "message": "Too many requests",
                    "wait_seconds": round(wait_time, 1)
                }
            )

        # Yeni token ekle
        self.tokens[key].append(now)
        return True 