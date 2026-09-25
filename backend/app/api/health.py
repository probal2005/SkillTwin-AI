from fastapi import APIRouter

from backend.app.config import settings
from backend.app.schemas.health import HealthResponse


router = APIRouter(tags=["Health"])


@router.get("/health", response_model=HealthResponse)
async def health_check() -> HealthResponse:
    return HealthResponse(
        status="ok",
        service=settings.app_name,
        version=settings.app_version,
    )
