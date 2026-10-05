from pydantic import BaseModel, Field


class ProfileSkill(BaseModel):
    id: str
    name: str
    category: str
    proficiency: str
    evidence: str | None = None


class Profile(BaseModel):
    id: str
    skilltwin_id: str
    name: str
    education: str = ""
    experience: list[str] = Field(default_factory=list)
    projects: list[str] = Field(default_factory=list)
    certifications: list[str] = Field(default_factory=list)
    target_role: str = ""
    skills: list[ProfileSkill] = Field(default_factory=list)
    resume_hash: str


class ProfileResponse(BaseModel):
    profile: Profile
    existing: bool