import { useNavigate } from 'react-router-dom';
import { useApp } from '@/hooks/useAppContext';
import { getSkillById } from '@/data/skills';
import { PageHeader } from '@/components/common/PageHeader';
import { EmptyState } from '@/components/common/EmptyState';
import { User, Code2, Wrench, Brain, Briefcase, FolderGit2, GraduationCap, Award } from 'lucide-react';
import { getProficiencyDots } from '@/utils/formatting';

function ProficiencyDots({ level }: { level: string }) {
  const filled = getProficiencyDots(level);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={`w-1.5 h-1.5 rounded-full ${i <= filled ? 'bg-indigo-400' : 'bg-white/10'}`} />
      ))}
    </div>
  );
}

function SkillRow({ skillId }: { skillId: string }) {
  const skill = getSkillById(skillId);
  if (!skill) return null;
  return (
    <div className="p-4 rounded-xl bg-white/5 border border-white/5 glass-hover">
      <div className="flex items-center justify-between mb-2">
        <span className="font-medium text-white">{skill.name}</span>
        <ProficiencyDots level={skill.proficiency} />
      </div>
      <div className="grid grid-cols-3 gap-2 text-xs">
        <div>
          <span className="text-white/30">Proficiency</span>
          <p className="text-white/60">{skill.proficiency}</p>
        </div>
        <div>
          <span className="text-white/30">Industry Relevance</span>
          <p className="text-white/60">{skill.relevance}%</p>
        </div>
        <div>
          <span className="text-white/30">Demand</span>
          <p className="text-white/60">{skill.demand}</p>
        </div>
      </div>
      {skill.evidence && (
        <p className="mt-2 text-xs text-white/40 italic">"{skill.evidence}"</p>
      )}
    </div>
  );
}

export function SkillTwin() {
  const { user, skillTwin } = useApp();
  const navigate = useNavigate();

  if (!user || !skillTwin) {
    return (
      <EmptyState
        icon={<User size={28} />}
        title="No Skill Twin Yet"
        description="Complete onboarding to build your digital Skill Twin."
        action={<button onClick={() => navigate('/onboarding')} className="btn-primary">Build My Skill Twin</button>}
      />
    );
  }

  const sections = [
    { label: 'Languages', icon: Code2, skills: skillTwin.languages },
    { label: 'Tools', icon: Wrench, skills: skillTwin.tools },
    { label: 'Domain Knowledge', icon: Brain, skills: skillTwin.domain },
  ];

  return (
    <div>
      <PageHeader
        title="Your Digital Skill Twin"
        subtitle="A complete inventory of your extracted skills, proficiency, and industry relevance."
        icon={<User size={20} className="text-indigo-400" />}
      />

      {/* Profile Summary */}
      <div className="glass-card p-6 mb-6 animate-fade-in-up">
        <h3 className="text-sm font-semibold text-white/40 tracking-wider mb-4">PROFILE SUMMARY</h3>
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-xl font-bold text-white">
            {user.name.charAt(0)}
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white">{user.name}</h4>
            <p className="text-sm text-white/40">{user.education}</p>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="flex items-start gap-2">
            <Briefcase size={14} className="text-white/30 mt-0.5" />
            <div>
              <span className="text-xs text-white/30">Experience</span>
              {user.experience.map((exp, i) => <p key={i} className="text-sm text-white/60">{exp}</p>)}
            </div>
          </div>
          <div className="flex items-start gap-2">
            <FolderGit2 size={14} className="text-white/30 mt-0.5" />
            <div>
              <span className="text-xs text-white/30">Projects</span>
              {user.projects.map((proj, i) => <p key={i} className="text-sm text-white/60">{proj}</p>)}
            </div>
          </div>
        </div>
      </div>

      {/* Skill Inventory */}
      {sections.map((section, sIdx) => (
        <div key={section.label} className="glass-card p-6 mb-6 animate-fade-in-up" style={{ animationDelay: `${sIdx * 100}ms` }}>
          <div className="flex items-center gap-2 mb-4">
            <section.icon size={16} className="text-indigo-400" />
            <h3 className="text-sm font-semibold text-white/40 tracking-wider">{section.label.toUpperCase()}</h3>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {section.skills.map((skill) => (
              <SkillRow key={skill.id} skillId={skill.id} />
            ))}
          </div>
        </div>
      ))}

      {/* Education & Certifications */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="glass-card p-6 animate-fade-in-up">
          <div className="flex items-center gap-2 mb-4">
            <GraduationCap size={16} className="text-indigo-400" />
            <h3 className="text-sm font-semibold text-white/40 tracking-wider">EDUCATION</h3>
          </div>
          <p className="text-sm text-white/70">{user.education}</p>
        </div>
        <div className="glass-card p-6 animate-fade-in-up">
          <div className="flex items-center gap-2 mb-4">
            <Award size={16} className="text-indigo-400" />
            <h3 className="text-sm font-semibold text-white/40 tracking-wider">CERTIFICATIONS</h3>
          </div>
          {user.certifications.length > 0 ? (
            user.certifications.map((cert, i) => <p key={i} className="text-sm text-white/70">{cert}</p>)
          ) : (
            <p className="text-sm text-white/30">No certifications added yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
