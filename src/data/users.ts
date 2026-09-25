import type { Skill, UserProfile } from '@/types';
import { skillsCatalog } from './skills';

function getSkill(id: string): Skill {
  const s = skillsCatalog.find((sk) => sk.id === id);
  if (!s) throw new Error(`Skill ${id} not found`);
  return s;
}

export const demoUser: UserProfile = {
  id: 'user-alex',
  name: 'Probal Dhali',
  education: '3rd Year CSE (AI ML) student',
  experience: ['1 Data Analytics Internship'],
  projects: ['2 academic projects'],
  certifications: [],
  targetRole: 'Data Analyst',
  skills: [
    { ...getSkill('python'), proficiency: 'Basic', evidence: 'Used in academic projects' },
    { ...getSkill('sql'), proficiency: 'Beginner', evidence: 'Introductory coursework' },
    { ...getSkill('excel'), proficiency: 'Intermediate', evidence: 'Used extensively during internship' },
    { ...getSkill('git'), proficiency: 'Intermediate', evidence: 'Version control for academic projects' },
    { ...getSkill('statistics'), proficiency: 'Basic', evidence: 'University statistics course' },
    { ...getSkill('data_analysis'), proficiency: 'Basic', evidence: 'Internship + academic projects' },
  ],
};
