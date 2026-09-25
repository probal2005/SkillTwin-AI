import type { SimulationState, UserProfile } from '@/types';
import { calculateMatchScore, calculateSkillGap, getImpactForSkill } from './scoring';

export function simulateSkills(
  user: UserProfile,
  roleId: string,
  selectedSkillIds: string[],
): SimulationState {
  const currentScore = calculateMatchScore(user, roleId).score;

  const gaps = calculateSkillGap(user, roleId);
  const totalWeight = gaps.reduce((sum, g) => sum + g.weight, 0);

  let simulatedWeighted = 0;
  for (const gap of gaps) {
    if (gap.status === 'strong') {
      simulatedWeighted += gap.weight * 1.0;
    } else if (gap.status === 'partial') {
      simulatedWeighted += gap.weight * 0.5;
    }
  }

  for (const skillId of selectedSkillIds) {
    const gap = gaps.find((g) => g.skillId === skillId);
    if (!gap) continue;
    if (gap.status === 'strong') continue;
    const currentContribution = gap.status === 'partial' ? gap.weight * 0.5 : 0;
    simulatedWeighted += gap.weight * 1.0 - currentContribution;
  }

  const simulatedScore = totalWeight > 0 ? Math.round((simulatedWeighted / totalWeight) * 100) : 0;
  const impact = simulatedScore - currentScore;

  const skillImpacts = selectedSkillIds.map((skillId) => ({
    skillId,
    skillName: gaps.find((g) => g.skillId === skillId)?.skillName ?? skillId,
    impact: getImpactForSkill(skillId, user, roleId),
  }));

  return {
    selectedSkills: selectedSkillIds,
    currentScore,
    simulatedScore,
    impact,
    skillImpacts,
  };
}

export function getAvailableSkillsForSimulation(
  user: UserProfile,
  roleId: string,
): { skillId: string; skillName: string; impact: number; status: string }[] {
  const gaps = calculateSkillGap(user, roleId);
  return gaps
    .filter((g) => g.status !== 'strong')
    .map((g) => ({
      skillId: g.skillId,
      skillName: g.skillName,
      impact: getImpactForSkill(g.skillId, user, roleId),
      status: g.status,
    }))
    .sort((a, b) => b.impact - a.impact);
}
