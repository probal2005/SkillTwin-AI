import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/hooks/useAppContext';
import { roles } from '@/data/roles';
import { PageHeader } from '@/components/common/PageHeader';
import { showToast } from '@/components/common/Toast';
import { User, Save, RefreshCw, Plus, X } from 'lucide-react';

export function Profile() {
  const { user, updateProfile, loadDemo } = useApp();
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name ?? '');
  const [education, setEducation] = useState(user?.education ?? '');
  const [targetRole, setTargetRole] = useState(user?.targetRole ?? 'Data Analyst');
  const [experience, setExperience] = useState(user?.experience ?? []);
  const [projects, setProjects] = useState(user?.projects ?? []);
  const [certifications, setCertifications] = useState(user?.certifications ?? []);
  const [newExp, setNewExp] = useState('');
  const [newProj, setNewProj] = useState('');
  const [newCert, setNewCert] = useState('');

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <User size={32} className="text-white/30 mb-4" />
        <h3 className="text-lg font-semibold text-white mb-2">No Profile Loaded</h3>
        <p className="text-sm text-white/40 mb-6">Load the demo profile to start.</p>
        <button onClick={() => { loadDemo(); navigate('/dashboard'); }} className="btn-primary">
          Launch Demo
        </button>
      </div>
    );
  }

  const handleSave = () => {
    updateProfile({
      name,
      education,
      targetRole,
      experience,
      projects,
      certifications,
    });
    showToast('Profile saved successfully', 'success');
  };

  const handleRebuild = () => {
    updateProfile({
      name,
      education,
      targetRole,
      experience,
      projects,
      certifications,
    });
    showToast('Skill Twin rebuilt', 'success');
    navigate('/skill-twin');
  };

  const addExperience = () => {
    if (newExp.trim()) {
      setExperience([...experience, newExp.trim()]);
      setNewExp('');
    }
  };

  const addProject = () => {
    if (newProj.trim()) {
      setProjects([...projects, newProj.trim()]);
      setNewProj('');
    }
  };

  const addCert = () => {
    if (newCert.trim()) {
      setCertifications([...certifications, newCert.trim()]);
      setNewCert('');
    }
  };

  return (
    <div>
      <PageHeader
        title="Profile"
        subtitle="Edit your profile and rebuild your Skill Twin."
        icon={<User size={20} className="text-indigo-400" />}
        actions={
          <div className="flex gap-2">
            <button onClick={handleSave} className="btn-secondary text-sm py-2 px-4 flex items-center gap-2">
              <Save size={14} />
              Save Changes
            </button>
            <button onClick={handleRebuild} className="btn-primary text-sm py-2 px-4 flex items-center gap-2">
              <RefreshCw size={14} />
              Rebuild Skill Twin
            </button>
          </div>
        }
      />

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Basic info */}
        <div className="glass-card p-6 animate-fade-in-up">
          <h3 className="text-sm font-semibold text-white/40 tracking-wider mb-4">BASIC INFO</h3>
          <div className="space-y-4">
            <div>
              <label className="text-xs text-white/40 mb-1.5 block">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-field"
              />
            </div>
            <div>
              <label className="text-xs text-white/40 mb-1.5 block">Education</label>
              <input
                type="text"
                value={education}
                onChange={(e) => setEducation(e.target.value)}
                className="input-field"
              />
            </div>
            <div>
              <label className="text-xs text-white/40 mb-1.5 block">Target Role</label>
              <select
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                className="input-field"
              >
                {roles.map((r) => (
                  <option key={r.id} value={r.name} className="bg-navy-800">{r.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Experience */}
        <div className="glass-card p-6 animate-fade-in-up animate-delay-100">
          <h3 className="text-sm font-semibold text-white/40 tracking-wider mb-4">EXPERIENCE</h3>
          <div className="space-y-2 mb-3">
            {experience.map((exp, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5">
                <span className="text-sm text-white/70">{exp}</span>
                <button onClick={() => setExperience(experience.filter((_, idx) => idx !== i))} className="text-white/30 hover:text-match-missing transition-colors">
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={newExp}
              onChange={(e) => setNewExp(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addExperience()}
              placeholder="Add experience..."
              className="input-field flex-1"
            />
            <button onClick={addExperience} className="btn-secondary px-3 py-3">
              <Plus size={16} />
            </button>
          </div>
        </div>

        {/* Projects */}
        <div className="glass-card p-6 animate-fade-in-up animate-delay-200">
          <h3 className="text-sm font-semibold text-white/40 tracking-wider mb-4">PROJECTS</h3>
          <div className="space-y-2 mb-3">
            {projects.map((proj, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5">
                <span className="text-sm text-white/70">{proj}</span>
                <button onClick={() => setProjects(projects.filter((_, idx) => idx !== i))} className="text-white/30 hover:text-match-missing transition-colors">
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={newProj}
              onChange={(e) => setNewProj(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addProject()}
              placeholder="Add project..."
              className="input-field flex-1"
            />
            <button onClick={addProject} className="btn-secondary px-3 py-3">
              <Plus size={16} />
            </button>
          </div>
        </div>

        {/* Certifications */}
        <div className="glass-card p-6 animate-fade-in-up animate-delay-300">
          <h3 className="text-sm font-semibold text-white/40 tracking-wider mb-4">CERTIFICATIONS</h3>
          <div className="space-y-2 mb-3">
            {certifications.length > 0 ? (
              certifications.map((cert, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5">
                  <span className="text-sm text-white/70">{cert}</span>
                  <button onClick={() => setCertifications(certifications.filter((_, idx) => idx !== i))} className="text-white/30 hover:text-match-missing transition-colors">
                    <X size={14} />
                  </button>
                </div>
              ))
            ) : (
              <p className="text-sm text-white/30 py-2">No certifications yet.</p>
            )}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={newCert}
              onChange={(e) => setNewCert(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addCert()}
              placeholder="Add certification..."
              className="input-field flex-1"
            />
            <button onClick={addCert} className="btn-secondary px-3 py-3">
              <Plus size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Current skills */}
      <div className="glass-card p-6 mt-6 animate-fade-in-up">
        <h3 className="text-sm font-semibold text-white/40 tracking-wider mb-4">CURRENT SKILLS</h3>
        <div className="flex flex-wrap gap-2">
          {user.skills.map((skill) => (
            <span key={skill.id} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm text-white/70">
              {skill.name} <span className="text-white/30">· {skill.proficiency}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
