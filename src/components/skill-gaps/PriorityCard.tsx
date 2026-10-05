import type { PrioritySkill } from '@/types';
import { Flame, ArrowUpRight } from 'lucide-react';

interface PriorityCardProps {
  skill: PrioritySkill;
}

export function PriorityCard({ skill }: PriorityCardProps) {
  const impactColor =
    skill.scoreImpact >= 10 ? 'text-match-strong' : skill.scoreImpact >= 7 ? 'text-cyan-400' : 'text-match-partial';

  const impactBg =
    skill.scoreImpact >= 10 ? 'bg-match-strong/10 border-match-strong/20' : skill.scoreImpact >= 7 ? 'bg-cyan-400/10 border-cyan-400/20' : 'bg-match-partial/10 border-match-partial/20';

  return (
    <div className="glass-card p-5 glass-hover animate-fade-in-up" style={{ animationDelay: `${skill.rank * 80}ms` }}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold">
            #{skill.rank}
          </div>
          <div>
            <h4 className="font-semibold text-white">{skill.skillName}</h4>
            <span className="text-xs text-white/40">{skill.demand}% demand · {skill.relevance}% relevance</span>
          </div>
        </div>
        <div className={`px-3 py-1.5 rounded-lg border ${impactBg} flex items-center gap-1`}>
          <ArrowUpRight size={14} className={impactColor} />
          <span className={`text-sm font-bold ${impactColor}`}>+{skill.scoreImpact}</span>
        </div>
      </div>

      <div className="mb-3">
        <div className="flex items-center justify-between text-xs mb-1.5">
          <span className="text-white/40">Priority Score</span>
          <span className="text-white/60 font-medium">{(skill.priority * 100).toFixed(1)}</span>
        </div>
        <div className="h-2 rounded-full bg-white/5 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400 transition-all duration-700"
            style={{ width: `${Math.min(skill.priority * 100, 100)}%` }}
          />
        </div>
      </div>

      <p className="text-xs text-white/50 leading-relaxed">{skill.reason}</p>

      <div className="mt-3 flex items-center gap-1.5">
        <Flame size={12} className="text-match-partial" />
        <span className="text-xs text-white/40">
          {skill.scoreImpact >= 10 ? 'Highest potential impact' : skill.scoreImpact >= 7 ? 'Strong potential impact' : 'Moderate potential impact'}
        </span>
      </div>
    </div>
  );
}
