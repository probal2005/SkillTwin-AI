from pydantic import BaseModel, Field


class ExtractedSkill(BaseModel):
    id: str
    name: str
    category: str
    proficiency: str
    evidence: str | None = None


class ResumeProfile(BaseModel):
    id: str
    name: str
    education: str
    experience: list[str] = Field(default_factory=list)
    projects: list[str] = Field(default_factory=list)
    certifications: list[str] = Field(default_factory=list)
    targetRole: str = ""
    skills: list[ExtractedSkill] = Field(default_factory=list)


class ResumeAnalysisResponse(BaseModel):
    fileName: str
    fileType: str
    textLength: int
    profile: ResumeProfile