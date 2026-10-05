import { useNavigate } from 'react-router-dom';
import { useApp } from '@/hooks/useAppContext';
import { getRoleByName } from '@/data/roles';
import { calculateMatchScore, calculateSkillGap, calculatePriority } from '@/services/scoring';
import { MatchScoreCard } from '@/components/dashboard/MatchScoreCard';
import { SkillTwinCard } from '@/components/dashboard/SkillTwinCard';
import { SkillGapCard } from '@/components/skill-gaps/SkillGapCard';
import { PriorityCard } from '@/components/skill-gaps/PriorityCard';
import { EmptyState } from '@/components/common/EmptyState';
import { Sparkles, ArrowRight, User, GitCompareArrows } from 'lucide-react';

export function Dashboard() {
  const { user, skillTwin } = useApp();
  const navigate = useNavigate();

  if (!user || !skillTwin) {
    return (
      <EmptyState
        icon={<User size={28} />}
        title="No Skill Twin Yet"
        description="Build your Skill Twin to see your career readiness dashboard."
        action={
          <button onClick={() => navigate('/onboarding')} className="btn-primary">
            Build My Skill Twin
          </button>
        }
      />
    );
  }

  const role = getRoleByName(user.targetRole);
  const roleId = role?.id ?? 'data-analyst';
  const score = calculateMatchScore(user, roleId);
  const gaps = calculateSkillGap(user, roleId);
  const priority = calculatePriority(user, roleId);

  const strongGaps = gaps.filter((g) => g.status === 'strong');
  const partialGaps = gaps.filter((g) => g.status === 'partial');
  const missingGaps = gaps.filter((g) => g.status === 'missing');

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="animate-fade-in-up">
        <h1 className="text-3xl font-bold text-white">{greeting}, {user.name.split(' ')[0]}</h1>
        <p className="text-white/40 mt-1">Here's where your career readiness stands.</p>
        <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
          <span className="text-xs text-white/40">Target Role:</span>
          <span className="text-sm font-semibold text-indigo-300">{user.targetRole}</span>
        </div>
      </div>

      {/* Score + Skill Twin */}
      <div className="grid lg:grid-cols-2 gap-6">
        <MatchScoreCard score={score} roleName={user.targetRole} />
        <SkillTwinCard twin={skillTwin} />
      </div>

      {/* Skill Gap Summary */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div>
          <h3 className="text-sm font-semibold text-match-strong mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-match-strong" />
            Strong Match ({strongGaps.length})
          </h3>
          <div className="space-y-3">
            {strongGaps.map((g) => (
              <SkillGapCard key={g.skillId} gap={g} />
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-match-partial mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-match-partial" />
            Partial Match ({partialGaps.length})
          </h3>
          <div className="space-y-3">
            {partialGaps.map((g) => (
              <SkillGapCard key={g.skillId} gap={g} />
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-match-missing mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-match-missing" />
            Missing ({missingGaps.length})
          </h3>
          <div className="space-y-3">
            {missingGaps.map((g) => (
              <SkillGapCard key={g.skillId} gap={g} />
            ))}
          </div>
        </div>
      </div>

      {/* Priority Skills */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-white">What Should I Learn First?</h3>
            <p className="text-sm text-white/40 mt-1">Ranked by demand × relevance × gap × score impact</p>
          </div>
          <button
            onClick={() => navigate('/skill-gaps')}
            className="text-sm text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
          >
            View All <ArrowRight size={14} />
          </button>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {priority.slice(0, 3).map((skill) => (
            <PriorityCard key={skill.skillId} skill={skill} />
          ))}
        </div>
      </div>

      {/* CTA to Simulator */}
      <div className="glass-card p-6 border-indigo-500/15 bg-indigo-500/5 flex flex-col sm:flex-row items-center justify-between gap-4 animate-fade-in-up">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-500/15 border border-indigo-500/20 flex items-center justify-center">
            <Sparkles size={22} className="text-indigo-400" />
          </div>
          <div>
            <h3 className="font-semibold text-white">Try the What-If Simulator</h3>
            <p className="text-sm text-white/40">See what happens if you learn your next skill.</p>
          </div>
        </div>
        <button onClick={() => navigate('/simulator')} className="btn-primary flex items-center gap-2 whitespace-nowrap">
          Simulate Now
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
