import type { Roadmap } from '@/types';

export const roadmaps: Roadmap[] = [
  {
    roleId: 'data-analyst',
    title: 'Your 30-Day Roadmap',
    weeks: [
      {
        week: 1,
        title: 'SQL Fundamentals',
        focus: 'Core querying skills that appear in nearly every Data Analyst posting',
        topics: ['SELECT', 'WHERE', 'JOIN', 'GROUP BY'],
        estimatedHours: 12,
        skillsGained: ['SQL'],
        resources: [
          { title: 'SQLBolt Interactive Course', type: 'Course', url: 'https://sqlbolt.com' },
          { title: 'Mode SQL Tutorial', type: 'Tutorial', url: 'https://mode.com/sql-tutorial' },
          { title: 'LeetCode Database Problems', type: 'Practice', url: 'https://leetcode.com/studyplan/top-sql-50/' },
        ],
      },
      {
        week: 2,
        title: 'Advanced SQL',
        focus: 'Techniques that separate junior analysts from mid-level candidates',
        topics: ['Subqueries', 'Window Functions', 'CTEs', 'Query Optimization'],
        estimatedHours: 14,
        skillsGained: ['SQL'],
        resources: [
          { title: 'PostgreSQL Window Functions Docs', type: 'Docs', url: 'https://www.postgresql.org/docs/current/tutorial-window.html' },
          { title: 'SQLZoo Advanced Exercises', type: 'Practice', url: 'https://sqlzoo.net' },
        ],
      },
      {
        week: 3,
        title: 'Power BI',
        focus: 'Build dashboards that communicate insights to stakeholders',
        topics: ['Data Import', 'Data Cleaning', 'DAX Basics', 'Dashboard Design'],
        estimatedHours: 16,
        skillsGained: ['Power BI'],
        resources: [
          { title: 'Microsoft Learn — Power BI', type: 'Course', url: 'https://learn.microsoft.com/power-bi' },
          { title: 'SQLBI DAX Guide', type: 'Reference', url: 'https://www.sqlbi.com' },
        ],
      },
      {
        week: 4,
        title: 'Real-World Analytics Project',
        focus: 'Apply everything in a portfolio-ready project',
        topics: ['End-to-end pipeline', 'Dashboard', 'Documentation', 'Presentation'],
        estimatedHours: 18,
        skillsGained: ['SQL', 'Power BI', 'Data Analysis'],
        project: 'Build a Sales Analytics Dashboard',
        resources: [
          { title: 'Kaggle Datasets', type: 'Dataset', url: 'https://www.kaggle.com/datasets' },
          { title: 'GitHub Portfolio Guide', type: 'Guide', url: 'https://docs.github.com' },
        ],
      },
    ],
  },
  {
    roleId: 'data-scientist',
    title: 'Your 30-Day Roadmap',
    weeks: [
      {
        week: 1,
        title: 'Python for Data Science',
        focus: 'Pandas, NumPy, and data manipulation',
        topics: ['Pandas', 'NumPy', 'Data Cleaning', 'EDA'],
        estimatedHours: 14,
        skillsGained: ['Python', 'Pandas'],
        resources: [
          { title: 'Kaggle Python Course', type: 'Course', url: 'https://www.kaggle.com/learn/python' },
        ],
      },
      {
        week: 2,
        title: 'Statistics & Probability',
        focus: 'Foundational math for modeling',
        topics: ['Distributions', 'Hypothesis Testing', 'Regression', 'Bayesian Basics'],
        estimatedHours: 12,
        skillsGained: ['Statistics'],
        resources: [
          { title: 'Khan Academy Statistics', type: 'Course', url: 'https://www.khanacademy.org/math/statistics-probability' },
        ],
      },
      {
        week: 3,
        title: 'Machine Learning Fundamentals',
        focus: 'Core ML algorithms and evaluation',
        topics: ['Linear/Logistic Regression', 'Decision Trees', 'Cross-Validation', 'Metrics'],
        estimatedHours: 16,
        skillsGained: ['Machine Learning'],
        resources: [
          { title: 'Scikit-learn Tutorials', type: 'Tutorial', url: 'https://scikit-learn.org/stable/tutorial' },
        ],
      },
      {
        week: 4,
        title: 'ML Project Portfolio',
        focus: 'End-to-end model pipeline',
        topics: ['Feature Engineering', 'Model Tuning', 'Deployment Basics', 'Write-up'],
        estimatedHours: 18,
        skillsGained: ['Machine Learning', 'Python'],
        project: 'Build a Churn Prediction Model',
        resources: [
          { title: 'Kaggle Competitions', type: 'Practice', url: 'https://www.kaggle.com/competitions' },
        ],
      },
    ],
  },
];

export function getRoadmap(roleId: string): Roadmap | undefined {
  return roadmaps.find((r) => r.roleId === roleId);
}
