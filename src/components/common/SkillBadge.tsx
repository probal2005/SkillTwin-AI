import type { MatchStatus } from '@/types';
import { Check, Minus, X } from 'lucide-react';

interface SkillBadgeProps {
  name: string;
  status?: MatchStatus;
  proficiency?: string;
  size?: 'sm' | 'md';
  showIcon?: boolean;
}

export function SkillBadge({
  name,
  status,
  proficiency,
  size = 'md',
  showIcon = true,
}: SkillBadgeProps) {
  const statusClass = status === 'strong' ? 'status-strong' : status === 'partial' ? 'status-partial' : status === 'missing' ? 'status-missing' : 'bg-white/5 text-white/60 border-white/10';

  const Icon = status === 'strong' ? Check : status === 'partial' ? Minus : status === 'missing' ? X : null;

  const sizeClass = size === 'sm' ? 'text-xs px-2.5 py-1' : 'text-sm px-3 py-1.5';

  return (
    <span className={`skill-chip ${statusClass} ${sizeClass}`}>
      {showIcon && Icon && <Icon size={size === 'sm' ? 10 : 14} strokeWidth={3} />}
      {name}
      {proficiency && <span className="text-white/40 font-normal">· {proficiency}</span>}
    </span>
  );
}
