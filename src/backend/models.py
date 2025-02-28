from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class Project(BaseModel):
    id: str
    name: str
    country: str
    status: str
    progress: int

class AgentStatus(BaseModel):
    id: str
    name: str
    status: str
    lastActive: str

class Transfer(BaseModel):
    id: str
    technology: str
    country: str
    date: str
    status: str

class Ministry(BaseModel):
    id: str
    name: str
    url: str

class Analysis(BaseModel):
    id: str
    country: str
    findings: List[str]
    recommendations: List[str]
    timestamp: str
    repo_url: Optional[str] = None

class CountryAnalysisRequest(BaseModel):
    country: str
    ministries: List[str] 