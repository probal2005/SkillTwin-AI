import { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/hooks/useAppContext';
import { getRoleByName } from '@/data/roles';
import { calculateMatchScore, calculateSkillGap } from '@/services/scoring';
import { simulateSkills, getAvailableSkillsForSimulation } from '@/services/simulation';
import { PageHeader } from '@/components/common/PageHeader';
import { SimulationScore } from '@/components/simulator/SimulationScore';
import { SimulationToggle } from '@/components/simulator/SimulationToggle';
import { ImpactChart } from '@/components/simulator/ImpactChart';
import { EmptyState } from '@/components/common/EmptyState';
import { showToast } from '@/components/common/Toast';
import { Sparkles, User, RotateCcw, Lightbulb, Map, Plus } from 'lucide-react';

export function Simulator() {
  const { user, addSkillsToTwin } = useApp();
  const navigate = useNavigate();
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const roleId = user ? (getRoleByName(user.targetRole)?.id ?? 'data-analyst') : 'data-analyst';

  const availableSkills = useMemo(
    () => (user ? getAvailableSkillsForSimulation(user, roleId) : []),
    [user, roleId],
  );

  const simulation = useMemo(
    () => (user ? simulateSkills(user, roleId, selectedSkills) : null),
    [user, roleId, selectedSkills],
  );

  const handleToggle = useCallback((skillId: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skillId)
        ? prev.filter((s) => s !== skillId)
        : [...prev, skillId],
    );
  }, []);

  const handleReset = () => {
    setSelectedSkills([]);
    showToast('Simulation reset', 'info');
  };

  const handleAddToLearningPlan = () => {
    if (selectedSkills.length === 0) {
      showToast('Select at least one skill to add', 'error');
      return;
    }
    addSkillsToTwin(selectedSkills);
    showToast(`${selectedSkills.length} skill${selectedSkills.length > 1 ? 's' : ''} added to your learning plan`, 'success');
    setSelectedSkills([]);
  };

  if (!user || !simulation) {
    return (
      <EmptyState
        icon={<User size={28} />}
        title="No Skill Twin Yet"
        description="Build your Skill Twin to use the What-If Simulator."
        action={<button onClick={() => navigate('/onboarding')} className="btn-primary">Build My Skill Twin</button>}
      />
    );
  }

  const currentScore = calculateMatchScore(user, roleId).score;
  const highestImpact = availableSkills[0];

  const chartData = availableSkills.map((s) => ({
    name: s.skillName,
    impact: s.impact,
  }));

  return (
    <div>
      <PageHeader
        title="What if I learn it?"
        subtitle="Simulate your next move before investing your time."
        icon={<Sparkles size={20} className="text-indigo-400" />}
        actions={
          <button onClick={handleReset} className="btn-secondary text-sm py-2 px-4 flex items-center gap-2">
            <RotateCcw size={14} />
            Reset Simulation
          </button>
        }
      />

      {/* Score comparison */}
      <div className="mb-6">
        <SimulationScore
          currentScore={currentScore}
          simulatedScore={simulation.simulatedScore}
          impact={simulation.impact}
        />
      </div>

      {/* Highest impact highlight */}
      {highestImpact && (
        <div className="glass-card p-5 mb-6 border-indigo-500/15 bg-indigo-500/5 flex flex-col sm:flex-row items-center justify-between gap-4 animate-fade-in-up">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-match-strong/10 border border-match-strong/20 flex items-center justify-center">
              <Lightbulb size={22} className="text-match-strong" />
            </div>
            <div>
              <p className="text-xs text-white/40">Highest-impact next skill</p>
              <h3 className="text-lg font-bold text-white">{highestImpact.skillName} <span className="text-match-strong">+{highestImpact.impact} pts</span></h3>
              <p className="text-sm text-white/40 mt-0.5">{highestImpact.skillName} appears frequently across analyzed {user.targetRole} postings and closes a major identified skill gap.</p>
            </div>
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Skill toggles */}
        <div className="glass-card p-6 animate-fade-in-up">
          <h3 className="font-semibold text-white mb-1">Skill Combination Simulator</h3>
          <p className="text-xs text-white/40 mb-5">Toggle skills to simulate their combined impact on your match score.</p>
          <div className="space-y-3">
            {availableSkills.map((skill) => (
              <SimulationToggle
                key={skill.skillId}
                skillName={skill.skillName}
                impact={skill.impact}
                selected={selectedSkills.includes(skill.skillId)}
                onToggle={() => handleToggle(skill.skillId)}
                status={skill.status}
              />
            ))}
          </div>

          {/* Selected skills summary */}
          {selectedSkills.length > 0 && (
            <div className="mt-5 p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20 animate-fade-in">
              <p className="text-xs text-white/40 mb-2">SELECTED SKILLS</p>
              <div className="flex flex-wrap gap-2">
                {selectedSkills.map((id) => {
                  const skill = availableSkills.find((s) => s.skillId === id);
                  return (
                    <span key={id} className="px-3 py-1 rounded-lg bg-indigo-500/15 border border-indigo-500/25 text-sm text-indigo-300 font-medium">
                      {skill?.skillName ?? id} +{skill?.impact}
                    </span>
                  );
                })}
              </div>
              <div className="mt-3 pt-3 border-t border-indigo-500/15 flex items-center justify-between">
                <span className="text-sm text-white/50">Total impact: <span className="text-match-strong font-bold">+{simulation.impact} pts</span></span>
                <span className="text-sm text-white/50">Simulated: <span className="text-white font-bold">{simulation.simulatedScore}%</span></span>
              </div>
            </div>
          )}

          <div className="mt-5 flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleAddToLearningPlan}
              disabled={selectedSkills.length === 0}
              className="btn-primary flex-1 flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Plus size={16} />
              Add Selected Skills to My Learning Plan
            </button>
            <button
              onClick={() => navigate('/roadmap')}
              className="btn-secondary flex items-center justify-center gap-2"
            >
              <Map size={16} />
              Build My 30-Day Roadmap
            </button>
          </div>
        </div>

        {/* Impact chart */}
        <div className="animate-fade-in-up animate-delay-100">
          <ImpactChart data={chartData} />

          {/* Explanation */}
          <div className="glass-card p-5 mt-6">
            <h4 className="text-sm font-semibold text-white mb-2">How This Works</h4>
            <p className="text-xs text-white/40 leading-relaxed">
              Simulation uses a deterministic weighted skill-overlap model. Each skill's impact is calculated
              from its role weight and current match status. Toggling a skill temporarily adds it at full
              proficiency and recalculates your alignment score instantly — no LLM is called.
            </p>
            <p className="mt-3 text-xs text-white/30">
              Numbers are illustrative demo values based on the prototype's prepared dataset.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
