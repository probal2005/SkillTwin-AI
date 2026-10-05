import type {
  Roadmap,
  SimulationState,
  SkillTwin,
  UserProfile,
} from '@/types';

import { getRoadmap } from '@/data/roadmaps';
import { buildSkillTwin } from './skillEngine';
import {
  calculateMatchScore,
  calculatePriority,
  calculateSkillGap,
} from './scoring';
import { simulateSkills } from './simulation';

const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:8001/api';

interface ExtractedSkillResponse {
  id: string;
  name: string;
  category: string;
  proficiency: string;
  evidence?: string | null;
}

interface ResumeProfileResponse {
  id: string;
  name: string;
  education: string;
  experience: string[];
  projects: string[];
  certifications: string[];
  targetRole: string;
  skills: ExtractedSkillResponse[];
}

interface ResumeAnalysisResponse {
  fileName: string;
  fileType: string;
  textLength: number;
  profile: ResumeProfileResponse;
}

const VALID_CATEGORIES = [
  'Language',
  'Tool',
  'Domain',
  'Framework',
  'Platform',
  'Soft Skill',
] as const;

const VALID_PROFICIENCIES = [
  'None',
  'Beginner',
  'Basic',
  'Intermediate',
  'Advanced',
  'Expert',
] as const;

const VALID_DEMAND_LEVELS = [
  'Low',
  'Medium',
  'High',
  'Very High',
] as const;

function normalizeCategory(category: string): UserProfile['skills'][number]['category'] {
  if (
    VALID_CATEGORIES.includes(
      category as (typeof VALID_CATEGORIES)[number],
    )
  ) {
    return category as UserProfile['skills'][number]['category'];
  }

  return 'Tool';
}

function normalizeProficiency(
  proficiency: string,
): UserProfile['skills'][number]['proficiency'] {
  if (
    VALID_PROFICIENCIES.includes(
      proficiency as (typeof VALID_PROFICIENCIES)[number],
    )
  ) {
    return proficiency as UserProfile['skills'][number]['proficiency'];
  }

  return 'Intermediate';
}

function normalizeSkillId(name: string, id: string): string {
  if (id?.trim()) {
    return id.trim();
  }

  return name
    .toLowerCase()
    .replace(/\.js/g, 'js')
    .replace(/\.ts/g, 'ts')
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
}

function convertResumeProfile(
  profile: ResumeProfileResponse,
): UserProfile {
  return {
    id: profile.id || `resume-${Date.now()}`,
    name: profile.name || 'Resume Candidate',
    education: profile.education || 'Not detected',
    experience: profile.experience || [],
    projects: profile.projects || [],
    certifications: profile.certifications || [],
    targetRole: profile.targetRole || '',
    skills: (profile.skills || []).map((skill) => ({
      id: normalizeSkillId(skill.name, skill.id),
      name: skill.name,
      category: normalizeCategory(skill.category),
      proficiency: normalizeProficiency(skill.proficiency),
      aliases: [],
      demand: 'High',
      relevance: 80,
      ...(skill.evidence
        ? {
            evidence: skill.evidence,
          }
        : {}),
    })),
  };
}

/**
 * Upload and analyze a real resume through FastAPI.
 *
 * POST /api/resume/analyze
 */
export async function extractSkills(file: File): Promise<UserProfile> {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_BASE_URL}/resume/analyze`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    let message = `Resume analysis failed (${response.status})`;

    try {
      const errorData = await response.json();

      if (typeof errorData?.detail === 'string') {
        message = errorData.detail;
      }
    } catch {
      // Keep default error message.
    }

    throw new Error(message);
  }

  const data: ResumeAnalysisResponse = await response.json();

  return convertResumeProfile(data.profile);
}

/**
 * Upload helper retained for compatibility.
 */
export async function uploadResume(
  file: File,
): Promise<{ fileName: string; fileSize: number }> {
  return {
    fileName: file.name,
    fileSize: file.size,
  };
}

/**
 * GET /api/skill-twin/:userId
 *
 * Currently calculated locally.
 * Later this can be moved completely to FastAPI.
 */
export async function getSkillTwin(
  userId: string,
  user?: UserProfile,
): Promise<SkillTwin> {
  if (user) {
    return buildSkillTwin({
      ...user,
      id: userId,
    });
  }

  throw new Error('User profile is required to build a Skill Twin.');
}

/**
 * GET /api/role-demand/:roleId
 *
 * Currently calculated locally.
 */
export async function getRoleDemand(
  user: UserProfile,
  roleId: string,
) {
  const gaps = calculateSkillGap(user, roleId);
  const score = calculateMatchScore(user, roleId);
  const priority = calculatePriority(user, roleId);

  return {
    gaps,
    score,
    priority,
  };
}

/**
 * POST /api/analyze-skill-gap
 *
 * Currently calculated locally.
 */
export async function analyzeSkillGap(
  user: UserProfile,
  roleId: string,
) {
  return {
    gaps: calculateSkillGap(user, roleId),
    score: calculateMatchScore(user, roleId),
    priority: calculatePriority(user, roleId),
  };
}

/**
 * POST /api/simulate
 *
 * Currently calculated locally.
 */
export async function calculateSimulation(
  user: UserProfile,
  roleId: string,
  selectedSkillIds: string[],
): Promise<SimulationState> {
  return simulateSkills(user, roleId, selectedSkillIds);
}

/**
 * GET /api/roadmap/:roleId
 *
 * Currently uses the local roadmap dataset.
 */
export async function generateRoadmap(
  roleId: string,
): Promise<Roadmap | undefined> {
  return getRoadmap(roleId);
}