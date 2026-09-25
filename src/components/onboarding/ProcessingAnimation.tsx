import { useEffect, useState } from 'react';
import { FileSearch, Brain, GitBranch, BarChart3, User, CheckCircle2 } from 'lucide-react';

const steps = [
  { icon: FileSearch, label: 'Reading your resume...' },
  { icon: Brain, label: 'Extracting skills...' },
  { icon: GitBranch, label: 'Normalizing skill names...' },
  { icon: BarChart3, label: 'Comparing industry demand...' },
  { icon: User, label: 'Building your Skill Twin...' },
];

interface ProcessingAnimationProps {
  onComplete: () => void;
}

export function ProcessingAnimation({ onComplete }: ProcessingAnimationProps) {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (currentStep < steps.length) {
      const timer = setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
      }, 900);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(onComplete, 500);
      return () => clearTimeout(timer);
    }
  }, [currentStep, onComplete]);

  return (
    <div className="py-8">
      <div className="space-y-4">
        {steps.map((step, idx) => {
          const isDone = idx < currentStep;
          const isActive = idx === currentStep;
          const isPending = idx > currentStep;

          return (
            <div
              key={idx}
              className={`flex items-center gap-4 transition-all duration-500 ${
                isPending ? 'opacity-30' : 'opacity-100'
              }`}
              style={{ transform: isActive ? 'translateX(0)' : isDone ? 'translateX(0)' : 'translateX(-8px)' }}
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                  isDone
                    ? 'bg-match-strong/10 border border-match-strong/20'
                    : isActive
                    ? 'bg-indigo-500/15 border border-indigo-500/30 animate-pulse-glow'
                    : 'bg-white/5 border border-white/10'
                }`}
              >
                {isDone ? (
                  <CheckCircle2 size={18} className="text-match-strong" />
                ) : (
                  <step.icon size={18} className={isActive ? 'text-indigo-400' : 'text-white/30'} />
                )}
              </div>
              <span
                className={`text-sm font-medium transition-colors duration-300 ${
                  isDone ? 'text-white/50' : isActive ? 'text-white' : 'text-white/30'
                }`}
              >
                {step.label}
              </span>
              {isActive && (
                <div className="flex gap-1 ml-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              )}
            </div>
          );
        })}
      </div>
      {currentStep >= steps.length && (
        <div className="mt-6 p-4 rounded-xl bg-match-strong/5 border border-match-strong/15 flex items-center gap-3 animate-fade-in">
          <CheckCircle2 size={20} className="text-match-strong" />
          <span className="text-sm font-medium text-white">Your Skill Twin is ready.</span>
        </div>
      )}
    </div>
  );
}
