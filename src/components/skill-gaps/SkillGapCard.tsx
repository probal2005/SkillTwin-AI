import type { SkillGap } from '@/types';
import { Check, Minus, X, TrendingUp } from 'lucide-react';

interface SkillGapCardProps {
  gap: SkillGap;
}

export function SkillGapCard({ gap }: SkillGapCardProps) {
  const config = {
    strong: {
      border: 'border-match-strong/20',
      bg: 'bg-match-strong/5',
      icon: Check,
      iconColor: 'text-match-strong',
      label: 'Strong Match',
    },
    partial: {
      border: 'border-match-partial/20',
      bg: 'bg-match-partial/5',
      icon: Minus,
      iconColor: 'text-match-partial',
      label: 'Partial Match',
    },
    missing: {
      border: 'border-match-missing/20',
      bg: 'bg-match-missing/5',
      icon: X,
      iconColor: 'text-match-missing',
      label: 'Missing',
    },
  }[gap.status];

  return (
    <div className={`p-4 rounded-xl ${config.bg} border ${config.border} glass-hover`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-lg ${config.bg} border ${config.border} flex items-center justify-center`}>
            <config.icon size={16} className={config.iconColor} strokeWidth={3} />
          </div>
          <span className="font-semibold text-white text-sm">{gap.skillName}</span>
        </div>
        <span className={`text-xs font-medium ${config.iconColor}`}>{config.label}</span>
      </div>

      <div className="flex items-center gap-2 mb-3">
        <TrendingUp size={12} className="text-white/30" />
        <span className="text-xs text-white/40">
          {gap.demand} industry demand · {gap.frequency}% of postings
        </span>
      </div>

      <p className="text-xs text-white/50 leading-relaxed">{gap.explanation}</p>

      <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-xs">
        <span className="text-white/30">Your level: <span className="text-white/60">{gap.userLevel}</span></span>
        <span className="text-white/30">Required: <span className="text-white/60">{gap.requiredLevel}</span></span>
      </div>
    </div>
  );
}
