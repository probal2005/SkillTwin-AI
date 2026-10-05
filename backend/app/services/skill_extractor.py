import re

from backend.app.schemas.resume import ExtractedSkill


SKILL_CATALOG = [
    {
        "id": "python",
        "name": "Python",
        "category": "Language",
        "aliases": ["python"],
    },
    {
        "id": "javascript",
        "name": "JavaScript",
        "category": "Language",
        "aliases": ["javascript", "js"],
    },
    {
        "id": "typescript",
        "name": "TypeScript",
        "category": "Language",
        "aliases": ["typescript", "ts"],
    },
    {
        "id": "java",
        "name": "Java",
        "category": "Language",
        "aliases": ["java"],
    },
    {
        "id": "c",
        "name": "C",
        "category": "Language",
        "aliases": ["c programming"],
    },
    {
        "id": "cpp",
        "name": "C++",
        "category": "Language",
        "aliases": ["c++", "cpp"],
    },
    {
        "id": "sql",
        "name": "SQL",
        "category": "Tool",
        "aliases": ["sql"],
    },
    {
        "id": "excel",
        "name": "Excel",
        "category": "Tool",
        "aliases": ["microsoft excel", "ms excel", "excel"],
    },
    {
        "id": "git",
        "name": "Git",
        "category": "Tool",
        "aliases": ["git", "github"],
    },
    {
        "id": "react",
        "name": "React",
        "category": "Framework",
        "aliases": ["react", "react.js", "reactjs"],
    },
    {
        "id": "nextjs",
        "name": "Next.js",
        "category": "Framework",
        "aliases": ["next.js", "nextjs"],
    },
    {
        "id": "nodejs",
        "name": "Node.js",
        "category": "Framework",
        "aliases": ["node.js", "nodejs", "node"],
    },
    {
        "id": "fastapi",
        "name": "FastAPI",
        "category": "Framework",
        "aliases": ["fastapi"],
    },
    {
        "id": "django",
        "name": "Django",
        "category": "Framework",
        "aliases": ["django"],
    },
    {
        "id": "machine_learning",
        "name": "Machine Learning",
        "category": "Domain",
        "aliases": ["machine learning", "ml"],
    },
    {
        "id": "deep_learning",
        "name": "Deep Learning",
        "category": "Domain",
        "aliases": ["deep learning", "dl"],
    },
    {
        "id": "data_analysis",
        "name": "Data Analysis",
        "category": "Domain",
        "aliases": ["data analysis", "data analytics"],
    },
    {
        "id": "statistics",
        "name": "Statistics",
        "category": "Domain",
        "aliases": ["statistics", "statistical analysis"],
    },
    {
        "id": "powerbi",
        "name": "Power BI",
        "category": "Tool",
        "aliases": ["power bi", "powerbi"],
    },
    {
        "id": "tableau",
        "name": "Tableau",
        "category": "Tool",
        "aliases": ["tableau"],
    },
    {
        "id": "docker",
        "name": "Docker",
        "category": "Tool",
        "aliases": ["docker"],
    },
]


def _contains_skill(text: str, alias: str) -> bool:
    pattern = r"(?<!\w)" + re.escape(alias.lower()) + r"(?!\w)"
    return re.search(pattern, text.lower()) is not None


def _estimate_proficiency(text: str, skill_name: str) -> str:
    lower = text.lower()

    advanced_words = [
        "advanced",
        "expert",
        "proficient",
        "professional",
        "extensive",
        "years of experience",
    ]

    beginner_words = [
        "beginner",
        "basic",
        "familiar",
        "introductory",
        "learning",
    ]

    skill_position = lower.find(skill_name.lower())

    if skill_position == -1:
        return "Beginner"

    start = max(0, skill_position - 120)
    end = min(len(lower), skill_position + 180)

    context = lower[start:end]

    if any(word in context for word in advanced_words):
        return "Advanced"

    if any(word in context for word in beginner_words):
        return "Beginner"

    return "Intermediate"


def extract_skills(text: str) -> list[ExtractedSkill]:
    skills: list[ExtractedSkill] = []

    for skill in SKILL_CATALOG:
        matched_alias = next(
            (
                alias
                for alias in skill["aliases"]
                if _contains_skill(text, alias)
            ),
            None,
        )

        if not matched_alias:
            continue

        proficiency = _estimate_proficiency(
            text,
            matched_alias,
        )

        skills.append(
            ExtractedSkill(
                id=skill["id"],
                name=skill["name"],
                category=skill["category"],
                proficiency=proficiency,
                evidence=f"Detected from resume text: {matched_alias}",
            )
        )

    return skills