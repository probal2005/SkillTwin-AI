import type { UserProfile } from '@/types';

const API_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:8001/api';

interface BackendSkill {
  id: string;
  name: string;
  category: string;
  proficiency: string;
  evidence?: string | null;
}

interface BackendProfile {
  id: string;
  skilltwin_id: string;
  name: string;
  education: string;
  experience: string[];
  projects: string[];
  certifications: string[];
  target_role: string;
  skills: BackendSkill[];
  resume_hash: string;
}

interface ProfileResponse {
  profile: BackendProfile;
  existing: boolean;
}

function mapProfileToUser(profile: BackendProfile): UserProfile {
  return {
    id: profile.id,
    skillTwinId: profile.skilltwin_id,
    name: profile.name,
    education: profile.education,
    experience: profile.experience,
    projects: profile.projects,
    certifications: profile.certifications,
    targetRole: profile.target_role,
    skills: profile.skills.map((skill) => ({
      id: skill.id,
      name: skill.name,
      category:
        skill.category as UserProfile['skills'][number]['category'],
      proficiency:
        skill.proficiency as UserProfile['skills'][number]['proficiency'],
      aliases: [],
      demand: 'Medium',
      relevance: 0.5,
      evidence: skill.evidence ?? undefined,
    })),
  };
}

export async function uploadResumeForProfile(
  file: File,
): Promise<{
  user: UserProfile;
  skillTwinId: string;
  existing: boolean;
}> {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_URL}/profile/resume`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    let message = 'Failed to process resume.';

    try {
      const error = await response.json();

      if (typeof error?.detail === 'string') {
        message = error.detail;
      }
    } catch {
      // Keep default message.
    }

    throw new Error(message);
  }

  const data: ProfileResponse = await response.json();

  return {
    user: mapProfileToUser(data.profile),
    skillTwinId: data.profile.skilltwin_id,
    existing: data.existing,
  };
}

export async function getProfileBySkillTwinId(
  skillTwinId: string,
): Promise<{
  user: UserProfile;
  skillTwinId: string;
}> {
  const cleanId = skillTwinId.trim().toUpperCase();

  const response = await fetch(
    `${API_URL}/profile/${encodeURIComponent(cleanId)}`,
  );

  if (!response.ok) {
    let message = 'Unable to find this SkillTwin ID.';

    try {
      const error = await response.json();

      if (typeof error?.detail === 'string') {
        message = error.detail;
      }
    } catch {
      // Keep default message.
    }

    throw new Error(message);
  }

  const data: ProfileResponse = await response.json();

  return {
    user: mapProfileToUser(data.profile),
    skillTwinId: data.profile.skilltwin_id,
  };
}
