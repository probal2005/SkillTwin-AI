import { useNavigate } from 'react-router-dom';
import { useApp } from '@/hooks/useAppContext';
import { getRoleByName } from '@/data/roles';
import { getRoadmap } from '@/data/roadmaps';
import { RoadmapWeekCard } from '@/components/roadmap/RoadmapWeekCard';
import { PageHeader } from '@/components/common/PageHeader';
import { EmptyState } from '@/components/common/EmptyState';
import { Map, User, Sparkles, ArrowRight } from 'lucide-react';

export function Roadmap() {
  const { user } = useApp();
  const navigate = useNavigate();

  if (!user) {
    return (
      <EmptyState
        icon={<User size={28} />}
        title="No Skill Twin Yet"
        description="Build your Skill Twin to generate a learning roadmap."
        action={<button onClick={() => navigate('/onboarding')} className="btn-primary">Build My Skill Twin</button>}
      />
    );
  }

  const role = getRoleByName(user.targetRole);
  const roleId = role?.id ?? 'data-analyst';
  const roadmap = getRoadmap(roleId);

  if (!roadmap) {
    return (
      <EmptyState
        icon={<Map size={28} />}
        title="No Roadmap Available"
        description={`No roadmap template for ${user.targetRole} yet. Try the Data Analyst demo role.`}
        action={<button onClick={() => navigate('/profile')} className="btn-secondary">Change Role</button>}
      />
    );
  }

  const totalHours = roadmap.weeks.reduce((sum, w) => sum + w.estimatedHours, 0);
  const allSkills = [...new Set(roadmap.weeks.flatMap((w) => w.skillsGained))];

  return (
    <div>
      <PageHeader
        title="Your 30-Day Roadmap"
        subtitle="Turn your highest-impact skills into an actionable learning plan."
        icon={<Map size={20} className="text-indigo-400" />}
        actions={
          <button onClick={() => navigate('/simulator')} className="btn-secondary text-sm py-2 px-4 flex items-center gap-2">
            <Sparkles size={14} />
            Back to Simulator
          </button>
        }
      />

      {/* Summary stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="glass-card p-4 text-center animate-fade-in-up">
          <p className="text-2xl font-bold text-white">4</p>
          <p className="text-xs text-white/40 mt-1">Weeks</p>
        </div>
        <div className="glass-card p-4 text-center animate-fade-in-up animate-delay-100">
          <p className="text-2xl font-bold text-white">{totalHours}h</p>
          <p className="text-xs text-white/40 mt-1">Total Time</p>
        </div>
        <div className="glass-card p-4 text-center animate-fade-in-up animate-delay-200">
          <p className="text-2xl font-bold text-white">{allSkills.length}</p>
          <p className="text-xs text-white/40 mt-1">Skills Gained</p>
        </div>
        <div className="glass-card p-4 text-center animate-fade-in-up animate-delay-300">
          <p className="text-2xl font-bold text-white">1</p>
          <p className="text-xs text-white/40 mt-1">Portfolio Project</p>
        </div>
      </div>

      {/* Roadmap weeks */}
      <div className="space-y-4">
        {roadmap.weeks.map((week, idx) => (
          <RoadmapWeekCard key={week.week} week={week} index={idx} />
        ))}
      </div>

      {/* CTA */}
      <div className="glass-card p-6 mt-8 border-indigo-500/15 bg-indigo-500/5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-semibold text-white">Ready to start learning?</h3>
          <p className="text-sm text-white/40">Check what skills are trending in your industry.</p>
        </div>
        <button onClick={() => navigate('/industry')} className="btn-primary flex items-center gap-2 whitespace-nowrap">
          View Industry Radar <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
