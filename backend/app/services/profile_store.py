import json
from pathlib import Path
from typing import Any


DATA_DIR = Path(__file__).resolve().parents[2] / "data"
PROFILE_FILE = DATA_DIR / "profiles.json"


def ensure_database() -> None:
    DATA_DIR.mkdir(parents=True, exist_ok=True)

    if not PROFILE_FILE.exists():
        PROFILE_FILE.write_text(
            json.dumps(
                {
                    "next_sequence": 1,
                    "profiles": [],
                },
                indent=2,
            ),
            encoding="utf-8",
        )


def load_database() -> dict[str, Any]:
    ensure_database()

    try:
        return json.loads(
            PROFILE_FILE.read_text(encoding="utf-8")
        )
    except json.JSONDecodeError:
        database = {
            "next_sequence": 1,
            "profiles": [],
        }

        save_database(database)

        return database


def save_database(database: dict[str, Any]) -> None:
    ensure_database()

    PROFILE_FILE.write_text(
        json.dumps(
            database,
            indent=2,
            ensure_ascii=False,
        ),
        encoding="utf-8",
    )


def find_profile_by_resume_hash(
    resume_hash: str,
) -> dict[str, Any] | None:

    database = load_database()

    for profile in database["profiles"]:
        if profile.get("resume_hash") == resume_hash:
            return profile

    return None


def find_profile_by_name(
    name: str,
) -> dict[str, Any] | None:

    database = load_database()

    normalized_name = (
        name.strip()
        .lower()
    )

    for profile in database["profiles"]:

        stored_name = (
            profile.get("name", "")
            .strip()
            .lower()
        )

        if stored_name == normalized_name:
            return profile

    return None


def find_profile_by_skilltwin_id(
    skilltwin_id: str,
) -> dict[str, Any] | None:

    database = load_database()

    normalized_id = (
        skilltwin_id
        .strip()
        .upper()
    )

    for profile in database["profiles"]:

        stored_id = (
            profile.get("skilltwin_id", "")
            .strip()
            .upper()
        )

        if stored_id == normalized_id:
            return profile

    return None


def create_profile(
    profile: dict[str, Any],
) -> dict[str, Any]:

    database = load_database()

    database["profiles"].append(profile)

    database["next_sequence"] += 1

    save_database(database)

    return profile


def update_profile(
    profile: dict[str, Any],
) -> dict[str, Any] | None:

    database = load_database()

    for index, existing_profile in enumerate(
        database["profiles"]
    ):

        if existing_profile.get("id") == profile.get("id"):

            database["profiles"][index] = profile

            save_database(database)

            return profile

    return None
