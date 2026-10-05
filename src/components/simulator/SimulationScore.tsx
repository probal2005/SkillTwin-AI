import { ScoreRing } from '@/components/common/ScoreRing';
import { ArrowDown } from 'lucide-react';

interface SimulationScoreProps {
  currentScore: number;
  simulatedScore: number;
  impact: number;
}

export function SimulationScore({ currentScore, simulatedScore, impact }: SimulationScoreProps) {
  const isPositive = impact > 0;
  const impactColor = isPositive ? 'text-match-strong' : 'text-white/40';

  return (
    <div className="glass-card p-6 lg:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] items-center gap-6 lg:gap-8">
        {/* Current */}
        <div className="flex flex-col items-center">
          <span className="text-xs font-semibold text-white/40 tracking-wider mb-3">CURRENT</span>
          <ScoreRing score={currentScore} size={140} label="" animate={false} />
          <span className="mt-2 text-sm text-white/50">Current Match</span>
        </div>

        {/* Arrow + delta */}
        <div className="flex flex-col items-center gap-2">
          <div className={`flex items-center gap-1.5 px-4 py-2 rounded-xl border ${isPositive ? 'bg-match-strong/10 border-match-strong/20' : 'bg-white/5 border-white/10'}`}>
            <ArrowDown size={18} className={`${impactColor} ${isPositive ? 'rotate-180' : ''}`} />
            <span className={`text-xl font-bold ${impactColor}`}>
              {isPositive ? `+${impact}` : impact} pts
            </span>
          </div>
          <span className="text-xs text-white/30">Simulated Impact</span>
        </div>

        {/* Simulated */}
        <div className="flex flex-col items-center">
          <span className="text-xs font-semibold text-white/40 tracking-wider mb-3">SIMULATED</span>
          <ScoreRing
            score={simulatedScore}
            size={140}
            label=""
            color={simulatedScore >= 70 ? '#22c55e' : simulatedScore >= 50 ? '#f59e0b' : '#f43f5e'}
          />
          <span className="mt-2 text-sm text-white/50">Simulated Match</span>
        </div>
      </div>
    </div>
  );
}
