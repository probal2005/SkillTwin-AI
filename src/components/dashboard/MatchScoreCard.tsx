import { ScoreRing } from '@/components/common/ScoreRing';
import { Tooltip } from '@/components/common/Tooltip';
import { Info } from 'lucide-react';
import type { MatchScore } from '@/types';

interface MatchScoreCardProps {
  score: MatchScore;
  roleName: string;
}

export function MatchScoreCard({ score, roleName }: MatchScoreCardProps) {
  return (
    <div className="glass-card p-6 lg:p-8 animate-fade-in-up">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-white">Job Match Score</h3>
          <p className="text-sm text-white/40 mt-1 max-w-xs">
            Calculated alignment with the analyzed {roleName} skill dataset
          </p>
        </div>
        <Tooltip content="This is a calculated alignment metric based on the analyzed job-posting dataset. It is not an employment probability.">
          <Info size={16} className="text-white/40 cursor-help hover:text-white/60 transition-colors" />
        </Tooltip>
      </div>

      <div className="flex flex-col lg:flex-row items-center gap-8">
        <ScoreRing score={score.score} size={180} />

        <div className="flex-1 w-full space-y-3">
          <div className="flex items-center justify-between p-3 rounded-xl bg-match-strong/5 border border-match-strong/10">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-match-strong" />
              <span className="text-sm font-medium text-white/70">Strong Match</span>
            </div>
            <span className="text-2xl font-bold text-match-strong tabular-nums">{score.strongCount}</span>
          </div>
          <div className="flex items-center justify-between p-3 rounded-xl bg-match-partial/5 border border-match-partial/10">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-match-partial" />
              <span className="text-sm font-medium text-white/70">Partial Match</span>
            </div>
            <span className="text-2xl font-bold text-match-partial tabular-nums">{score.partialCount}</span>
          </div>
          <div className="flex items-center justify-between p-3 rounded-xl bg-match-missing/5 border border-match-missing/10">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-match-missing" />
              <span className="text-sm font-medium text-white/70">Missing</span>
            </div>
            <span className="text-2xl font-bold text-match-missing tabular-nums">{score.missingCount}</span>
          </div>
        </div>
      </div>

      <p className="mt-6 text-xs text-white/30 text-center lg:text-left">
        Illustrative alignment score based on the prototype's prepared demo dataset.
      </p>
    </div>
  );
}
