import { useNavigate } from 'react-router-dom';
import { useApp } from '@/hooks/useAppContext';
import { getRoleByName } from '@/data/roles';
import { calculateSkillGap, calculatePriority } from '@/services/scoring';
import { PageHeader } from '@/components/common/PageHeader';
import { SkillGapCard } from '@/components/skill-gaps/SkillGapCard';
import { PriorityCard } from '@/components/skill-gaps/PriorityCard';
import { EmptyState } from '@/components/common/EmptyState';
import { GitCompareArrows, User, Sparkles, ArrowRight } from 'lucide-react';

export function SkillGaps() {
  const { user } = useApp();
  const navigate = useNavigate();

  if (!user) {
    return (
      <EmptyState
        icon={<User size={28} />}
        title="No Skill Twin Yet"
        description="Build your Skill Twin to analyze your skill gaps."
        action={<button onClick={() => navigate('/onboarding')} className="btn-primary">Build My Skill Twin</button>}
      />
    );
  }

  const role = getRoleByName(user.targetRole);
  const roleId = role?.id ?? 'data-analyst';
  const gaps = calculateSkillGap(user, roleId);
  const priority = calculatePriority(user, roleId);

  const strongGaps = gaps.filter((g) => g.status === 'strong');
  const partialGaps = gaps.filter((g) => g.status === 'partial');
  const missingGaps = gaps.filter((g) => g.status === 'missing');

  return (
    <div>
      <PageHeader
        title="Skill Gap Analysis"
        subtitle={`Your skills vs. analyzed ${user.targetRole} industry demand.`}
        icon={<GitCompareArrows size={20} className="text-indigo-400" />}
      />

      {/* Three columns */}
      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        <div className="animate-fade-in-up">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-3 h-3 rounded-full bg-match-strong" />
            <h3 className="font-semibold text-white">Strong Match</h3>
            <span className="text-xs text-white/30">({strongGaps.length})</span>
          </div>
          <div className="space-y-3">
            {strongGaps.length > 0 ? (
              strongGaps.map((g) => <SkillGapCard key={g.skillId} gap={g} />)
            ) : (
              <p className="text-sm text-white/30 p-4 rounded-xl bg-white/5">No strong matches yet.</p>
            )}
          </div>
        </div>

        <div className="animate-fade-in-up animate-delay-100">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-3 h-3 rounded-full bg-match-partial" />
            <h3 className="font-semibold text-white">Partial Match</h3>
            <span className="text-xs text-white/30">({partialGaps.length})</span>
          </div>
          <div className="space-y-3">
            {partialGaps.length > 0 ? (
              partialGaps.map((g) => <SkillGapCard key={g.skillId} gap={g} />)
            ) : (
              <p className="text-sm text-white/30 p-4 rounded-xl bg-white/5">No partial matches.</p>
            )}
          </div>
        </div>

        <div className="animate-fade-in-up animate-delay-200">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-3 h-3 rounded-full bg-match-missing" />
            <h3 className="font-semibold text-white">Missing</h3>
            <span className="text-xs text-white/30">({missingGaps.length})</span>
          </div>
          <div className="space-y-3">
            {missingGaps.length > 0 ? (
              missingGaps.map((g) => <SkillGapCard key={g.skillId} gap={g} />)
            ) : (
              <p className="text-sm text-white/30 p-4 rounded-xl bg-white/5">No missing skills — great!</p>
            )}
          </div>
        </div>
      </div>

      {/* Priority Skills */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-white">What Should I Learn First?</h3>
            <p className="text-sm text-white/40 mt-1">Priority = demand × relevance × gap × score impact</p>
          </div>
          <button
            onClick={() => navigate('/simulator')}
            className="text-sm text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
          >
            Try Simulator <ArrowRight size={14} />
          </button>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {priority.map((skill) => (
            <PriorityCard key={skill.skillId} skill={skill} />
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="glass-card p-6 border-indigo-500/15 bg-indigo-500/5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-500/15 border border-indigo-500/20 flex items-center justify-center">
            <Sparkles size={22} className="text-indigo-400" />
          </div>
          <div>
            <h3 className="font-semibold text-white">Simulate Your Next Move</h3>
            <p className="text-sm text-white/40">Toggle skills and watch your match score change instantly.</p>
          </div>
        </div>
        <button onClick={() => navigate('/simulator')} className="btn-primary flex items-center gap-2 whitespace-nowrap">
          Open Simulator <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
