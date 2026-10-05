import { useNavigate } from 'react-router-dom';
import type { SkillTwin } from '@/types';
import { ArrowRight, Code2, Wrench, Brain, Briefcase } from 'lucide-react';
import { getProficiencyDots } from '@/utils/formatting';

interface SkillTwinCardProps {
  twin: SkillTwin;
}

function ProficiencyDots({ level }: { level: string }) {
  const filled = getProficiencyDots(level);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className={`w-1.5 h-1.5 rounded-full ${i <= filled ? 'bg-indigo-400' : 'bg-white/10'}`}
        />
      ))}
    </div>
  );
}

export function SkillTwinCard({ twin }: SkillTwinCardProps) {
  const navigate = useNavigate();

  const sections = [
    { label: 'LANGUAGES', icon: Code2, skills: twin.languages },
    { label: 'TOOLS', icon: Wrench, skills: twin.tools },
    { label: 'DOMAIN', icon: Brain, skills: twin.domain },
  ];

  return (
    <div className="glass-card p-6 animate-fade-in-up animate-delay-100">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-lg font-semibold text-white">Your Digital Skill Twin</h3>
          <p className="text-xs text-white/40 mt-1">AI-extracted skill inventory</p>
        </div>
        <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
          <span className="text-indigo-400 font-bold text-sm">Twin</span>
        </div>
      </div>

      <div className="space-y-4">
        {sections.map((section) => (
          <div key={section.label}>
            <div className="flex items-center gap-2 mb-2">
              <section.icon size={14} className="text-white/40" />
              <span className="text-xs font-semibold text-white/40 tracking-wider">{section.label}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {section.skills.map((skill) => (
                <div
                  key={skill.id}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/5"
                >
                  <span className="text-sm font-medium text-white">{skill.name}</span>
                  <span className="text-xs text-white/40">{skill.proficiency}</span>
                  <ProficiencyDots level={skill.proficiency} />
                </div>
              ))}
            </div>
          </div>
        ))}

        <div>
          <div className="flex items-center gap-2 mb-2">
            <Briefcase size={14} className="text-white/40" />
            <span className="text-xs font-semibold text-white/40 tracking-wider">EXPERIENCE</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {twin.experience.map((exp, i) => (
              <span key={i} className="px-3 py-2 rounded-lg bg-white/5 border border-white/5 text-sm text-white/80">
                {exp}
              </span>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={() => navigate('/skill-twin')}
        className="mt-5 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-sm font-medium text-white/70 hover:text-white transition-all"
      >
        View Full Skill Twin
        <ArrowRight size={14} />
      </button>
    </div>
  );
}
