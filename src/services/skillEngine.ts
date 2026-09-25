import type { SkillTwin, UserProfile } from '@/types';

export function buildSkillTwin(user: UserProfile): SkillTwin {
  const languages = user.skills.filter((s) => s.category === 'Language');
  const tools = user.skills.filter((s) => s.category === 'Tool');
  const domain = user.skills.filter(
    (s) => s.category === 'Domain' || s.category === 'Framework' || s.category === 'Platform' || s.category === 'Soft Skill',
  );

  return {
    userId: user.id,
    languages,
    tools,
    domain,
    experience: user.experience,
    projects: user.projects,
    education: user.education,
    certifications: user.certifications,
    createdAt: new Date().toISOString(),
  };
}

export function generateRoadmapFromPriority(
  roleId: string,
  prioritySkillIds: string[],
): { skillId: string; week: number }[] {
  return prioritySkillIds.slice(0, 4).map((skillId, idx) => ({
    skillId,
    week: idx + 1,
  }));
}
