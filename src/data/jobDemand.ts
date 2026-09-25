import type { IndustryDemand } from '@/types';

export const jobDemand: IndustryDemand[] = [
  // Data Analyst
  { roleId: 'data-analyst', skillName: 'SQL', frequency: 92 },
  { roleId: 'data-analyst', skillName: 'Excel', frequency: 85 },
  { roleId: 'data-analyst', skillName: 'Python', frequency: 78 },
  { roleId: 'data-analyst', skillName: 'Power BI', frequency: 72 },
  { roleId: 'data-analyst', skillName: 'Statistics', frequency: 65 },
  { roleId: 'data-analyst', skillName: 'Tableau', frequency: 55 },
  { roleId: 'data-analyst', skillName: 'Data Analysis', frequency: 88 },
  { roleId: 'data-analyst', skillName: 'Data Visualization', frequency: 60 },
  { roleId: 'data-analyst', skillName: 'Communication', frequency: 70 },

  // Data Scientist
  { roleId: 'data-scientist', skillName: 'Python', frequency: 95 },
  { roleId: 'data-scientist', skillName: 'Machine Learning', frequency: 90 },
  { roleId: 'data-scientist', skillName: 'Statistics', frequency: 85 },
  { roleId: 'data-scientist', skillName: 'SQL', frequency: 80 },
  { roleId: 'data-scientist', skillName: 'Pandas', frequency: 75 },
  { roleId: 'data-scientist', skillName: 'R', frequency: 60 },

  // Software Engineer
  { roleId: 'software-engineer', skillName: 'Git', frequency: 95 },
  { roleId: 'software-engineer', skillName: 'Python', frequency: 70 },
  { roleId: 'software-engineer', skillName: 'Cloud', frequency: 75 },
  { roleId: 'software-engineer', skillName: 'SQL', frequency: 65 },

  // Frontend Developer
  { roleId: 'frontend-developer', skillName: 'Git', frequency: 90 },
  { roleId: 'frontend-developer', skillName: 'Communication', frequency: 70 },

  // Backend Developer
  { roleId: 'backend-developer', skillName: 'SQL', frequency: 85 },
  { roleId: 'backend-developer', skillName: 'Python', frequency: 75 },
  { roleId: 'backend-developer', skillName: 'Git', frequency: 90 },
  { roleId: 'backend-developer', skillName: 'Cloud', frequency: 70 },

  // ML Engineer
  { roleId: 'ml-engineer', skillName: 'Python', frequency: 95 },
  { roleId: 'ml-engineer', skillName: 'Machine Learning', frequency: 92 },
  { roleId: 'ml-engineer', skillName: 'Cloud', frequency: 80 },
  { roleId: 'ml-engineer', skillName: 'SQL', frequency: 65 },

  // Cloud Engineer
  { roleId: 'cloud-engineer', skillName: 'Cloud', frequency: 98 },
  { roleId: 'cloud-engineer', skillName: 'Python', frequency: 60 },
  { roleId: 'cloud-engineer', skillName: 'Git', frequency: 85 },
];

export function getJobDemand(roleId: string): IndustryDemand[] {
  return jobDemand.filter((d) => d.roleId === roleId).sort((a, b) => b.frequency - a.frequency);
}
