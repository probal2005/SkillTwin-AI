import hashlib
import re


def normalize_name(name: str) -> str:
    """
    Convert a person's name into a clean format.

    Example:
    Probal Dhali -> PROBAL DHALI
    """
    return " ".join(name.strip().upper().split())


def generate_name_code(name: str) -> str:
    """
    Generate a short code from the person's name.

    Probal Dhali -> PDAI
    """

    words = re.findall(r"[A-Z]+", normalize_name(name))

    if not words:
        return "USER"

    first = words[0][0]

    last = words[-1] if len(words) > 1 else words[0]

    last_part = "".join(
        character for character in last
        if character.isalpha()
    )[:2]

    return f"{first}{last_part}AI"


def generate_skilltwin_id(
    sequence_number: int,
    name: str,
) -> str:
    """
    Generate human-readable SkillTwin ID.

    Example:

    Probal Dhali
    sequence = 1

    ST0001PDAI
    """

    name_code = generate_name_code(name)

    return f"ST{sequence_number:04d}{name_code}"


def generate_resume_hash(resume_bytes: bytes) -> str:
    """
    Generate SHA-256 fingerprint of the uploaded resume.
    """

    return hashlib.sha256(resume_bytes).hexdigest()