from typing import Optional, Dict, Any
from fastapi import HTTPException

class BaseAPIException(HTTPException):
    def __init__(
        self,
        status_code: int,
        detail: str,
        error_code: str,
        extra: Optional[Dict[str, Any]] = None
    ):
        super().__init__(
            status_code=status_code,
            detail={
                "message": detail,
                "error_code": error_code,
                "extra": extra or {}
            }
        )

class ScrapingException(BaseAPIException):
    def __init__(self, detail: str, extra: Optional[Dict[str, Any]] = None):
        super().__init__(
            status_code=500,
            detail=detail,
            error_code="SCRAPING_ERROR",
            extra=extra
        )

class MinistryNotFoundException(BaseAPIException):
    def __init__(self, country: str, ministry: str):
        super().__init__(
            status_code=404,
            detail=f"Ministry {ministry} not found for country {country}",
            error_code="MINISTRY_NOT_FOUND",
            extra={"country": country, "ministry": ministry}
        )

class AnalysisException(BaseAPIException):
    def __init__(self, detail: str, extra: Optional[Dict[str, Any]] = None):
        super().__init__(
            status_code=500,
            detail=detail,
            error_code="ANALYSIS_ERROR",
            extra=extra
        )

class GitHubException(BaseAPIException):
    def __init__(self, detail: str, extra: Optional[Dict[str, Any]] = None):
        super().__init__(
            status_code=500,
            detail=detail,
            error_code="GITHUB_ERROR",
            extra=extra
        )

class ValidationException(BaseAPIException):
    def __init__(self, detail: str, extra: Optional[Dict[str, Any]] = None):
        super().__init__(
            status_code=400,
            detail=detail,
            error_code="VALIDATION_ERROR",
            extra=extra
        ) 