import tempfile
from pathlib import Path

from fastapi import APIRouter, File, HTTPException, UploadFile

from backend.app.schemas.resume import (
    ResumeAnalysisResponse,
    ResumeProfile,
)
from backend.app.services.resume_parser import (
    ResumeParseError,
    extract_resume_text,
)
from backend.app.services.skill_extractor import extract_skills


router = APIRouter(
    prefix="/resume",
    tags=["Resume"],
)


@router.post(
    "/analyze",
    response_model=ResumeAnalysisResponse,
)
async def analyze_resume(
    file: UploadFile = File(...),
) -> ResumeAnalysisResponse:

    filename = file.filename or "resume"

    extension = Path(filename).suffix.lower()

    if extension not in {".pdf", ".docx"}:
        raise HTTPException(
            status_code=400,
            detail="Only PDF and DOCX resumes are supported.",
        )

    contents = await file.read()

    if not contents:
        raise HTTPException(
            status_code=400,
            detail="Uploaded resume is empty.",
        )

    try:
        with tempfile.NamedTemporaryFile(
            suffix=extension,
            delete=False,
        ) as temp_file:

            temp_file.write(contents)
            temp_path = Path(temp_file.name)

        try:
            text = extract_resume_text(
                temp_path,
                filename,
            )
        finally:
            temp_path.unlink(
                missing_ok=True,
            )

    except ResumeParseError as exc:
        raise HTTPException(
            status_code=422,
            detail=str(exc),
        ) from exc

    skills = extract_skills(text)

    profile = ResumeProfile(
        id="resume-user",
        name="Resume Candidate",
        education="Not detected yet",
        experience=[],
        projects=[],
        certifications=[],
        targetRole="",
        skills=skills,
    )

    return ResumeAnalysisResponse(
        fileName=filename,
        fileType=extension.replace(".", ""),
        textLength=len(text),
        profile=profile,
    )