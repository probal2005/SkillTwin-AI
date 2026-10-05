import type { Role, RoleSkill } from '@/types';

export const roles: Role[] = [
  { id: 'data-analyst', name: 'Data Analyst', description: 'Analyze data to drive business decisions', icon: 'bar-chart' },
  { id: 'data-scientist', name: 'Data Scientist', description: 'Build models and run experiments on data', icon: 'brain' },
  { id: 'software-engineer', name: 'Software Engineer', description: 'Design and build software systems', icon: 'code' },
  { id: 'frontend-developer', name: 'Frontend Developer', description: 'Build user-facing web applications', icon: 'monitor' },
  { id: 'backend-developer', name: 'Backend Developer', description: 'Build server-side APIs and services', icon: 'server' },
  { id: 'ml-engineer', name: 'ML Engineer', description: 'Deploy machine learning systems to production', icon: 'cpu' },
  { id: 'cloud-engineer', name: 'Cloud Engineer', description: 'Design and manage cloud infrastructure', icon: 'cloud' },
];

export const roleSkills: RoleSkill[] = [
  // Data Analyst
  { roleId: 'data-analyst', skillId: 'sql', frequency: 92, weight: 25, requiredLevel: 'Intermediate' },
  { roleId: 'data-analyst', skillId: 'excel', frequency: 85, weight: 20, requiredLevel: 'Advanced' },
  { roleId: 'data-analyst', skillId: 'python', frequency: 78, weight: 18, requiredLevel: 'Intermediate' },
  { roleId: 'data-analyst', skillId: 'powerbi', frequency: 72, weight: 15, requiredLevel: 'Intermediate' },
  { roleId: 'data-analyst', skillId: 'statistics', frequency: 65, weight: 12, requiredLevel: 'Intermediate' },
  { roleId: 'data-analyst', skillId: 'tableau', frequency: 55, weight: 10, requiredLevel: 'Intermediate' },
  { roleId: 'data-analyst', skillId: 'data_analysis', frequency: 88, weight: 22, requiredLevel: 'Intermediate' },
  { roleId: 'data-analyst', skillId: 'data_viz', frequency: 60, weight: 10, requiredLevel: 'Intermediate' },
  { roleId: 'data-analyst', skillId: 'communication', frequency: 70, weight: 8, requiredLevel: 'Intermediate' },

  // Data Scientist
  { roleId: 'data-scientist', skillId: 'python', frequency: 95, weight: 25, requiredLevel: 'Advanced' },
  { roleId: 'data-scientist', skillId: 'sql', frequency: 80, weight: 15, requiredLevel: 'Intermediate' },
  { roleId: 'data-scientist', skillId: 'machine_learning', frequency: 90, weight: 25, requiredLevel: 'Advanced' },
  { roleId: 'data-scientist', skillId: 'statistics', frequency: 85, weight: 20, requiredLevel: 'Advanced' },
  { roleId: 'data-scientist', skillId: 'r', frequency: 60, weight: 10, requiredLevel: 'Intermediate' },
  { roleId: 'data-scientist', skillId: 'pandas', frequency: 75, weight: 12, requiredLevel: 'Advanced' },

  // Software Engineer
  { roleId: 'software-engineer', skillId: 'python', frequency: 70, weight: 15, requiredLevel: 'Intermediate' },
  { roleId: 'software-engineer', skillId: 'git', frequency: 95, weight: 15, requiredLevel: 'Intermediate' },
  { roleId: 'software-engineer', skillId: 'sql', frequency: 65, weight: 12, requiredLevel: 'Intermediate' },
  { roleId: 'software-engineer', skillId: 'cloud', frequency: 75, weight: 18, requiredLevel: 'Intermediate' },

  // Frontend Developer
  { roleId: 'frontend-developer', skillId: 'git', frequency: 90, weight: 15, requiredLevel: 'Intermediate' },
  { roleId: 'frontend-developer', skillId: 'communication', frequency: 70, weight: 10, requiredLevel: 'Intermediate' },

  // Backend Developer
  { roleId: 'backend-developer', skillId: 'sql', frequency: 85, weight: 20, requiredLevel: 'Advanced' },
  { roleId: 'backend-developer', skillId: 'python', frequency: 75, weight: 18, requiredLevel: 'Intermediate' },
  { roleId: 'backend-developer', skillId: 'git', frequency: 90, weight: 12, requiredLevel: 'Intermediate' },
  { roleId: 'backend-developer', skillId: 'cloud', frequency: 70, weight: 15, requiredLevel: 'Intermediate' },

  // ML Engineer
  { roleId: 'ml-engineer', skillId: 'python', frequency: 95, weight: 25, requiredLevel: 'Advanced' },
  { roleId: 'ml-engineer', skillId: 'machine_learning', frequency: 92, weight: 25, requiredLevel: 'Advanced' },
  { roleId: 'ml-engineer', skillId: 'cloud', frequency: 80, weight: 18, requiredLevel: 'Intermediate' },
  { roleId: 'ml-engineer', skillId: 'sql', frequency: 65, weight: 10, requiredLevel: 'Intermediate' },

  // Cloud Engineer
  { roleId: 'cloud-engineer', skillId: 'cloud', frequency: 98, weight: 30, requiredLevel: 'Advanced' },
  { roleId: 'cloud-engineer', skillId: 'python', frequency: 60, weight: 12, requiredLevel: 'Intermediate' },
  { roleId: 'cloud-engineer', skillId: 'git', frequency: 85, weight: 12, requiredLevel: 'Intermediate' },
];

export function getRoleByName(name: string): Role | undefined {
  return roles.find((r) => r.name.toLowerCase() === name.toLowerCase());
}

export function getRoleById(id: string): Role | undefined {
  return roles.find((r) => r.id === id);
}

export function getRoleSkills(roleId: string): RoleSkill[] {
  return roleSkills.filter((rs) => rs.roleId === roleId);
}
