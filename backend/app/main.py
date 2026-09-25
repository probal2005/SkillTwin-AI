from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.app.api.health import router as health_router
from backend.app.api.resume import router as resume_router
from backend.app.api.profile import router as profile_router
from backend.app.config import settings

app = FastAPI(
    title=settings.app_name,
    version=settings.app_version,
    description="Backend API for SkillTwin AI career intelligence platform.",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        settings.frontend_url,
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health_router, prefix=settings.api_prefix)
app.include_router(resume_router, prefix=settings.api_prefix)
app.include_router(profile_router, prefix=settings.api_prefix)

@app.get("/")
async def root():
    return {
        "name": settings.app_name,
        "version": settings.app_version,
        "status": "running",
    }