import { useEffect, useState, useRef } from 'react';

interface ScoreRingProps {
  score: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  sublabel?: string;
  animate?: boolean;
  color?: string;
}

export function ScoreRing({
  score,
  size = 180,
  strokeWidth = 12,
  label = 'Job Match Score',
  sublabel,
  animate = true,
  color,
}: ScoreRingProps) {
  const [displayScore, setDisplayScore] = useState(animate ? 0 : score);
  const prevScoreRef = useRef(score);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!animate) {
      setDisplayScore(score);
      return;
    }
    const start = prevScoreRef.current;
    const end = score;
    const duration = 800;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayScore(Math.round(start + (end - start) * eased));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        prevScoreRef.current = end;
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [score, animate]);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (displayScore / 100) * circumference;

  const ringColor = color ?? (score >= 70 ? '#22c55e' : score >= 50 ? '#f59e0b' : '#f43f5e');
  const gradientId = `score-gradient-${ringColor.replace('#', '')}`;

  return (
    <div className="flex flex-col items-center" role="img" aria-label={`${label}: ${score}%`}>
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={ringColor} stopOpacity="0.6" />
              <stop offset="100%" stopColor={ringColor} stopOpacity="1" />
            </linearGradient>
          </defs>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth={strokeWidth}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: 'stroke-dashoffset 0.1s linear' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-bold text-white tabular-nums">{displayScore}%</span>
        </div>
      </div>
      {label && <span className="mt-3 text-sm font-medium text-white/60">{label}</span>}
      {sublabel && <span className="mt-1 text-xs text-white/40 text-center max-w-[200px]">{sublabel}</span>}
    </div>
  );
}
