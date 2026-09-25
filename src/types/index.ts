export type ProficiencyLevel = 'None' | 'Beginner' | 'Basic' | 'Intermediate' | 'Advanced' | 'Expert';

export type SkillCategory = 'Language' | 'Tool' | 'Domain' | 'Framework' | 'Platform' | 'Soft Skill';

export type MatchStatus = 'strong' | 'partial' | 'missing';

export type DemandLevel = 'Low' | 'Medium' | 'High' | 'Very High';

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  proficiency: ProficiencyLevel;
  aliases: string[];
  demand: DemandLevel;
  relevance: number; // 0-100
  evidence?: string;
}

export interface UserProfile {
  id: string;
  skillTwinId?: string;
  name: string;
  education: string;
  experience: string[];
  projects: string[];
  certifications: string[];
  targetRole: string;
  skills: Skill[];
}

export interface SkillTwin {
  userId: string;
  languages: Skill[];
  tools: Skill[];
  domain: Skill[];
  experience: string[];
  projects: string[];
  education: string;
  certifications: string[];
  createdAt: string;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface RoleSkill {
  roleId: string;
  skillId: string;
  frequency: number; // 0-100 percentage of postings requiring this skill
  weight: number; // relative importance weight
  requiredLevel: ProficiencyLevel;
}

export interface SkillGap {
  skillId: string;
  skillName: string;
  category: SkillCategory;
  status: MatchStatus;
  userLevel: ProficiencyLevel;
  requiredLevel: ProficiencyLevel;
  demand: DemandLevel;
  frequency: number;
  weight: number;
  explanation: string;
}

export interface MatchScore {
  score: number; // 0-100
  strongCount: number;
  partialCount: number;
  missingCount: number;
  totalSkills: number;
}

export interface PrioritySkill {
  skillId: string;
  skillName: string;
  demand: number;
  relevance: number;
  gap: number;
  scoreImpact: number;
  priority: number;
  rank: number;
  reason: string;
}

export interface SimulationState {
  selectedSkills: string[];
  currentScore: number;
  simulatedScore: number;
  impact: number;
  skillImpacts: { skillId: string; skillName: string; impact: number }[];
}

export interface RoadmapWeek {
  week: number;
  title: string;
  focus: string;
  topics: string[];
  estimatedHours: number;
  skillsGained: string[];
  resources: { title: string; type: string; url: string }[];
  project?: string;
}

export interface Roadmap {
  roleId: string;
  title: string;
  weeks: RoadmapWeek[];
}

export interface IndustryTrend {
  category: string;
  skills: { name: string; level: number; trend: 'rising' | 'stable' | 'emerging' }[];
}

export interface IndustryDemand {
  roleId: string;
  skillName: string;
  frequency: number; // percentage
}
