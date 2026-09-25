import { useNavigate } from 'react-router-dom';
import { useApp } from '@/hooks/useAppContext';
import { getRoleByName } from '@/data/roles';
import { getJobDemand } from '@/data/jobDemand';
import { industryTrends } from '@/data/industryTrends';
import { RadarChartComponent } from '@/components/industry/RadarChartComponent';
import { PageHeader } from '@/components/common/PageHeader';
import { EmptyState } from '@/components/common/EmptyState';
import { Radar, User, TrendingUp, Zap } from 'lucide-react';

export function Industry() {
  const { user } = useApp();
  const navigate = useNavigate();

  if (!user) {
    return (
      <EmptyState
        icon={<User size={28} />}
        title="No Skill Twin Yet"
        description="Build your Skill Twin to see industry demand analysis."
        action={<button onClick={() => navigate('/onboarding')} className="btn-primary">Build My Skill Twin</button>}
      />
    );
  }

  const role = getRoleByName(user.targetRole);
  const roleId = role?.id ?? 'data-analyst';
  const demand = getJobDemand(roleId);

  return (
    <div>
      <PageHeader
        title="Industry Skill Radar"
        subtitle="Understand what skills are in demand and what is emerging."
        icon={<Radar size={20} className="text-indigo-400" />}
      />

      {/* Radar Chart */}
      <div className="glass-card p-6 mb-6 animate-fade-in-up">
        <h3 className="font-semibold text-white mb-1">Skill Demand Radar</h3>
        <p className="text-xs text-white/40 mb-4">High demand, emerging, and core analyst skills compared</p>
        <RadarChartComponent data={industryTrends} />
      </div>

      {/* Role demand overview */}
      <div className="glass-card p-6 mb-6 animate-fade-in-up animate-delay-100">
        <div className="flex items-center gap-2 mb-5">
          <TrendingUp size={18} className="text-indigo-400" />
          <h3 className="font-semibold text-white">Role Demand Overview</h3>
          <span className="text-xs text-white/40">— {user.targetRole}</span>
        </div>
        <div className="space-y-4">
          {demand.map((item) => (
            <div key={item.skillName} className="flex items-center gap-4">
              <span className="text-sm text-white/70 w-24 sm:w-32 shrink-0">{item.skillName}</span>
              <div className="flex-1 h-3 rounded-full bg-white/5 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400 transition-all duration-700 animate-fade-in"
                  style={{ width: `${item.frequency}%` }}
                />
              </div>
              <span className="text-sm text-white/50 w-12 text-right tabular-nums">{item.frequency}%</span>
            </div>
          ))}
        </div>
        <p className="mt-5 text-xs text-white/30">
          Based on the prototype's prepared demo dataset. Frequencies are illustrative.
        </p>
      </div>

      {/* Trend categories */}
      <div className="grid md:grid-cols-2 gap-6">
        {industryTrends.map((trend, idx) => (
          <div key={trend.category} className="glass-card p-6 animate-fade-in-up" style={{ animationDelay: `${idx * 100}ms` }}>
            <div className="flex items-center gap-2 mb-4">
              {trend.category === 'Emerging' ? (
                <Zap size={16} className="text-cyan-400" />
              ) : (
                <TrendingUp size={16} className="text-indigo-400" />
              )}
              <h3 className="font-semibold text-white">{trend.category}</h3>
            </div>
            <div className="space-y-3">
              {trend.skills.map((skill) => (
                <div key={skill.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-white/70">{skill.name}</span>
                    {skill.trend === 'emerging' && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-medium">NEW</span>
                    )}
                    {skill.trend === 'rising' && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-match-strong/10 border border-match-strong/20 text-match-strong font-medium">↑</span>
                    )}
                  </div>
                  <span className="text-sm text-white/40 tabular-nums">{skill.level}%</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
