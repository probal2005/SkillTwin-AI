import re
import tempfile
from pathlib import Path

from fastapi import (
    APIRouter,
    File,
    HTTPException,
    UploadFile,
)

from docx import Document
from pypdf import PdfReader

from backend.app.schemas.profile import (
    ProfileResponse,
)

from backend.app.services.profile_identity import (
    generate_resume_hash,
    generate_skilltwin_id,
)

from backend.app.services.profile_store import (
    create_profile,
    find_profile_by_name,
    find_profile_by_resume_hash,
    find_profile_by_skilltwin_id,
    find_profile_by_skilltwin_id,
    load_database,
    update_profile,
)


router = APIRouter(
    prefix="/profile",
    tags=["Profile"],
)


ALLOWED_EXTENSIONS = {
    "pdf",
    "docx",
}


# ============================================================
# PDF PARSER
# ============================================================

def parse_pdf(
    resume_bytes: bytes,
) -> str:

    with tempfile.NamedTemporaryFile(
        suffix=".pdf",
        delete=False,
    ) as temporary_file:

        temporary_file.write(
            resume_bytes
        )

        temporary_path = Path(
            temporary_file.name
        )

    try:

        reader = PdfReader(
            str(temporary_path)
        )

        pages = []

        for page in reader.pages:

            text = page.extract_text()

            if text:
                pages.append(text)

        return "\n".join(
            pages
        ).strip()

    finally:

        temporary_path.unlink(
            missing_ok=True
        )


# ============================================================
# DOCX PARSER
# ============================================================

def parse_docx(
    resume_bytes: bytes,
) -> str:

    with tempfile.NamedTemporaryFile(
        suffix=".docx",
        delete=False,
    ) as temporary_file:

        temporary_file.write(
            resume_bytes
        )

        temporary_path = Path(
            temporary_file.name
        )

    try:

        document = Document(
            str(temporary_path)
        )

        paragraphs = [
            paragraph.text.strip()
            for paragraph in document.paragraphs
            if paragraph.text.strip()
        ]

        return "\n".join(
            paragraphs
        ).strip()

    finally:

        temporary_path.unlink(
            missing_ok=True
        )


# ============================================================
# RESUME PARSER
# ============================================================

def parse_resume_bytes(
    filename: str,
    resume_bytes: bytes,
) -> str:

    extension = (
        filename
        .lower()
        .rsplit(".", 1)[-1]
    )

    if extension == "pdf":

        return parse_pdf(
            resume_bytes
        )

    if extension == "docx":

        return parse_docx(
            resume_bytes
        )

    raise ValueError(
        "Unsupported resume format."
    )


# ============================================================
# NAME EXTRACTION
# ============================================================

def extract_candidate_name(
    resume_text: str,
) -> str:

    lines = [
        line.strip()
        for line in resume_text.splitlines()
        if line.strip()
    ]

    if not lines:

        return "Resume Candidate"


    ignored_lines = {
        "resume",
        "curriculum vitae",
        "cv",
        "profile",
        "personal profile",
    }


    for line in lines[:10]:

        cleaned = line.strip()

        if cleaned.lower() in ignored_lines:
            continue

        if len(cleaned) > 80:
            continue

        if "@" in cleaned:
            continue

        if re.search(
            r"\d{5,}",
            cleaned,
        ):
            continue

        return cleaned


    return "Resume Candidate"


# ============================================================
# EDUCATION EXTRACTION
# ============================================================

def extract_basic_education(
    resume_text: str,
) -> str:

    education_keywords = [
        "education",
        "academic",
        "qualification",
        "degree",
        "bachelor",
        "master",
        "b.tech",
        "btech",
        "m.tech",
        "mtech",
        "b.sc",
        "bsc",
        "m.sc",
        "msc",
    ]


    lines = [
        line.strip()
        for line in resume_text.splitlines()
        if line.strip()
    ]


    for line in lines:

        lowered = line.lower()

        if any(
            keyword in lowered
            for keyword in education_keywords
        ):

            return line


    return ""


# ============================================================
# SKILL EXTRACTION
# ============================================================

def extract_skill_data(
    resume_text: str,
) -> list[dict]:

    try:

        from backend.app.services.skill_extractor import (
            extract_skills,
        )

        extracted = extract_skills(
            resume_text
        )

    except Exception:

        return []


    result = []


    for skill in extracted:

        if hasattr(
            skill,
            "model_dump",
        ):

            item = skill.model_dump()

        elif hasattr(
            skill,
            "dict",
        ):

            item = skill.dict()

        elif isinstance(
            skill,
            dict,
        ):

            item = skill

        else:

            continue


        result.append(
            {
                "id": item.get(
                    "id",
                    "skill",
                ),

                "name": item.get(
                    "name",
                    "Unknown Skill",
                ),

                "category": item.get(
                    "category",
                    "Tool",
                ),

                "proficiency": item.get(
                    "proficiency",
                    "Intermediate",
                ),

                "evidence": item.get(
                    "evidence",
                ),
            }
        )


    return result


# ============================================================
# CREATE OR LOAD PROFILE
# ============================================================

@router.post(
    "/resume",
    response_model=ProfileResponse,
)
async def create_or_load_profile(
    file: UploadFile = File(...),
):

    # --------------------------------------------------------
    # 1. Validate filename
    # --------------------------------------------------------

    if not file.filename:

        raise HTTPException(
            status_code=400,
            detail="Resume filename is missing.",
        )


    filename = file.filename


    extension = (
        filename
        .lower()
        .rsplit(".", 1)[-1]
    )


    if extension not in ALLOWED_EXTENSIONS:

        raise HTTPException(
            status_code=400,
            detail=(
                "Only PDF and DOCX resumes "
                "are supported."
            ),
        )


    # --------------------------------------------------------
    # 2. Read resume
    # --------------------------------------------------------

    resume_bytes = await file.read()


    if not resume_bytes:

        raise HTTPException(
            status_code=400,
            detail="Uploaded resume is empty.",
        )


    # --------------------------------------------------------
    # 3. Generate SHA-256 fingerprint
    # --------------------------------------------------------

    resume_hash = generate_resume_hash(
        resume_bytes
    )


    # --------------------------------------------------------
    # 4. Check exact same resume
    # --------------------------------------------------------

    existing_profile = (
        find_profile_by_resume_hash(
            resume_hash
        )
    )


    if existing_profile:

        return ProfileResponse(
            profile=existing_profile,
            existing=True,
        )


    # --------------------------------------------------------
    # 5. Parse resume
    # --------------------------------------------------------

    try:

        resume_text = parse_resume_bytes(
            filename,
            resume_bytes,
        )

    except Exception as error:

        raise HTTPException(
            status_code=400,
            detail=(
                "Could not read the resume: "
                f"{error}"
            ),
        )


    if not resume_text.strip():

        raise HTTPException(
            status_code=400,
            detail=(
                "No readable text was found "
                "inside the resume."
            ),
        )


    # --------------------------------------------------------
    # 6. Extract profile information
    # --------------------------------------------------------

    name = extract_candidate_name(
        resume_text
    )


    education = extract_basic_education(
        resume_text
    )


    skills = extract_skill_data(
        resume_text
    )


    # --------------------------------------------------------
    # 7. Check existing person
    # --------------------------------------------------------

    existing_by_name = (
        find_profile_by_name(
            name
        )
    )


    if existing_by_name:

        existing_by_name[
            "resume_hash"
        ] = resume_hash


        if education:

            existing_by_name[
                "education"
            ] = education


        if skills:

            existing_by_name[
                "skills"
            ] = skills


        updated = update_profile(
            existing_by_name
        )


        return ProfileResponse(
            profile=(
                updated
                or existing_by_name
            ),
            existing=True,
        )


    # --------------------------------------------------------
    # 8. Create new profile
    # --------------------------------------------------------

    database = load_database()


    sequence_number = database[
        "next_sequence"
    ]


    skilltwin_id = generate_skilltwin_id(
        sequence_number,
        name,
    )


    profile = {

        "id":
            f"profile-{sequence_number}",

        "skilltwin_id":
            skilltwin_id,

        "name":
            name,

        "education":
            education,

        "experience":
            [],

        "projects":
            [],

        "certifications":
            [],

        "target_role":
            "",

        "skills":
            skills,

        "resume_hash":
            resume_hash,
    }


    created = create_profile(
        profile
    )


    return ProfileResponse(
        profile=created,
        existing=False,
    )

@router.get("/{skilltwin_id}", response_model=ProfileResponse)
async def get_profile_by_skilltwin_id(
    skilltwin_id: str,
):
    profile = find_profile_by_skilltwin_id(skilltwin_id)

    if not profile:
        raise HTTPException(
            status_code=404,
            detail="SkillTwin ID not found. Please check the ID and try again.",
        )

    return ProfileResponse(
        profile=profile,
        existing=True,
    )
