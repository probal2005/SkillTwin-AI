import type {
  MatchScore,
  MatchStatus,
  PrioritySkill,
  SkillGap,
  Skill,
  UserProfile,
} from '@/types';
import { getRoleSkills, getRoleByName } from '@/data/roles';
import { getSkillById } from '@/data/skills';

const proficiencyRank: Record<string, number> = {
  None: 0,
  Beginner: 1,
  Basic: 2,
  Intermediate: 3,
  Advanced: 4,
  Expert: 5,
};

export function getMatchStatus(
  userLevel: string,
  requiredLevel: string,
): MatchStatus {
  const user = proficiencyRank[userLevel] ?? 0;
  const required = proficiencyRank[requiredLevel] ?? 0;

  if (user >= required) return 'strong';
  if (user > 0 && user < required) return 'partial';
  return 'missing';
}

export function calculateSkillGap(
  user: UserProfile,
  roleId: string,
): SkillGap[] {
  const roleSkills = getRoleSkills(roleId);
  const userSkillMap = new Map(user.skills.map((s) => [s.id, s]));

  return roleSkills.map((rs) => {
    const skill = getSkillById(rs.skillId);
    if (!skill) throw new Error(`Skill ${rs.skillId} not found`);

    const userSkill = userSkillMap.get(rs.skillId);
    const userLevel = userSkill?.proficiency ?? 'None';
    const status = getMatchStatus(userLevel, rs.requiredLevel);

    let explanation: string;
    if (status === 'strong') {
      explanation = `Your ${skill.name} proficiency meets or exceeds the analyzed ${getRoleByName(roleId)?.name ?? ''} requirement.`;
    } else if (status === 'partial') {
      explanation = `You have some ${skill.name} experience, but the analyzed dataset expects ${rs.requiredLevel} level.`;
    } else {
      explanation = `Appears frequently across analyzed ${getRoleByName(roleId)?.name ?? ''} postings.`;
    }

    return {
      skillId: rs.skillId,
      skillName: skill.name,
      category: skill.category,
      status,
      userLevel,
      requiredLevel: rs.requiredLevel,
      demand: skill.demand,
      frequency: rs.frequency,
      weight: rs.weight,
      explanation,
    };
  });
}

export function calculateMatchScore(
  user: UserProfile,
  roleId: string,
): MatchScore {
  const gaps = calculateSkillGap(user, roleId);

  let totalWeight = 0;
  let weightedScore = 0;
  let strongCount = 0;
  let partialCount = 0;
  let missingCount = 0;

  for (const gap of gaps) {
    totalWeight += gap.weight;
    if (gap.status === 'strong') {
      weightedScore += gap.weight * 1;
      strongCount++;
    } else if (gap.status === 'partial') {
      weightedScore += gap.weight * 0.5;
      partialCount++;
    } else {
      missingCount++;
    }
  }

  const score = totalWeight > 0 ? Math.round((weightedScore / totalWeight) * 100) : 0;

  return {
    score,
    strongCount,
    partialCount,
    missingCount,
    totalSkills: gaps.length,
  };
}

export function calculatePriority(
  user: UserProfile,
  roleId: string,
): PrioritySkill[] {
  const gaps = calculateSkillGap(user, roleId);
  const matchScore = calculateMatchScore(user, roleId);

  const candidates = gaps
    .filter((g) => g.status !== 'strong')
    .map((gap) => {
      const skill = getSkillById(gap.skillId);
      if (!skill) throw new Error(`Skill ${gap.skillId} not found`);

      const demand = gap.frequency / 100;
      const relevance = skill.relevance / 100;
      const gapFactor = gap.status === 'missing' ? 1.0 : 0.5;
      const scoreImpact = calculateImpact(gap, matchScore.score, gaps);
      const priority = demand * relevance * gapFactor * scoreImpact;

      let reason: string;
      if (gap.status === 'missing') {
        reason = `${gap.skillName} appears frequently across analyzed ${getRoleByName(roleId)?.name ?? ''} postings and closes a major identified skill gap.`;
      } else {
        reason = `Improving your ${gap.skillName} from ${gap.userLevel} to ${gap.requiredLevel} would meaningfully raise your alignment score.`;
      }

      return {
        skillId: gap.skillId,
        skillName: gap.skillName,
        demand: gap.frequency,
        relevance: skill.relevance,
        gap: gapFactor,
        scoreImpact,
        priority,
        rank: 0,
        reason,
      };
    });

  candidates.sort((a, b) => b.priority - a.priority);
  candidates.forEach((c, i) => (c.rank = i + 1));

  return candidates;
}

function calculateImpact(
  gap: SkillGap,
  currentScore: number,
  allGaps: SkillGap[],
): number {
  const totalWeight = allGaps.reduce((sum, g) => sum + g.weight, 0);
  if (totalWeight === 0) return 0;

  const currentContribution = gap.status === 'partial' ? gap.weight * 0.5 : 0;
  const fullContribution = gap.weight * 1.0;
  const scoreGain = ((fullContribution - currentContribution) / totalWeight) * 100;

  return Math.round(scoreGain);
}

export function getImpactForSkill(
  skillId: string,
  user: UserProfile,
  roleId: string,
): number {
  const gaps = calculateSkillGap(user, roleId);
  const matchScore = calculateMatchScore(user, roleId);
  const gap = gaps.find((g) => g.skillId === skillId);
  if (!gap) return 0;
  return calculateImpact(gap, matchScore.score, gaps);
}
