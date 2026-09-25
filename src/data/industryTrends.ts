import type { IndustryTrend } from '@/types';

export const industryTrends: IndustryTrend[] = [
  {
    category: 'High Demand',
    skills: [
      { name: 'Python', level: 95, trend: 'stable' },
      { name: 'SQL', level: 92, trend: 'stable' },
      { name: 'Cloud', level: 85, trend: 'rising' },
      { name: 'Machine Learning', level: 80, trend: 'rising' },
    ],
  },
  {
    category: 'Emerging',
    skills: [
      { name: 'GenAI', level: 65, trend: 'emerging' },
      { name: 'RAG', level: 55, trend: 'emerging' },
      { name: 'AI Agents', level: 50, trend: 'emerging' },
      { name: 'MLOps', level: 60, trend: 'rising' },
    ],
  },
  {
    category: 'Core Analyst',
    skills: [
      { name: 'Excel', level: 85, trend: 'stable' },
      { name: 'Power BI', level: 72, trend: 'rising' },
      { name: 'Tableau', level: 55, trend: 'stable' },
      { name: 'Statistics', level: 65, trend: 'stable' },
    ],
  },
];
