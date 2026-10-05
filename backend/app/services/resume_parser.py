from pathlib import Path

from docx import Document
from pypdf import PdfReader


SUPPORTED_EXTENSIONS = {".pdf", ".docx"}


class ResumeParseError(Exception):
    pass


def extract_text_from_pdf(file_path: Path) -> str:
    try:
        reader = PdfReader(str(file_path))

        pages: list[str] = []

        for page in reader.pages:
            text = page.extract_text() or ""

            if text.strip():
                pages.append(text)

        return "\n".join(pages).strip()

    except Exception as exc:
        raise ResumeParseError(
            f"Unable to read PDF: {exc}"
        ) from exc


def extract_text_from_docx(file_path: Path) -> str:
    try:
        document = Document(str(file_path))

        paragraphs = [
            paragraph.text.strip()
            for paragraph in document.paragraphs
            if paragraph.text.strip()
        ]

        return "\n".join(paragraphs).strip()

    except Exception as exc:
        raise ResumeParseError(
            f"Unable to read DOCX: {exc}"
        ) from exc


def extract_resume_text(
    file_path: Path,
    filename: str,
) -> str:
    extension = Path(filename).suffix.lower()

    if extension not in SUPPORTED_EXTENSIONS:
        raise ResumeParseError(
            "Unsupported resume format. "
            "Please upload a PDF or DOCX file."
        )

    if extension == ".pdf":
        text = extract_text_from_pdf(file_path)

    else:
        text = extract_text_from_docx(file_path)

    if not text.strip():
        raise ResumeParseError(
            "No readable text was found in the uploaded resume."
        )

    return text