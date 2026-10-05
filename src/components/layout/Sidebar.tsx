import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  User,
  GitCompareArrows,
  Sparkles,
  Map,
  Radar,
} from 'lucide-react';
import { useApp } from '@/hooks/useAppContext';

const navItems = [
  { to: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { to: '/skill-twin', label: 'Skill Twin', icon: User },
  { to: '/skill-gaps', label: 'Skill Gaps', icon: GitCompareArrows },
  { to: '/simulator', label: 'Simulator', icon: Sparkles },
  { to: '/roadmap', label: 'Roadmap', icon: Map },
  { to: '/industry', label: 'Industry', icon: Radar },
];

export function Sidebar() {
  const { user, isDemoMode } = useApp();
  const navigate = useNavigate();

  return (
    <aside className="hidden lg:flex flex-col w-64 shrink-0 border-r border-white/5 bg-navy-900/40 backdrop-blur-xl h-screen sticky top-0">
      {/* Brand */}
      <div className="px-5 py-5">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-3 w-full text-left group"
          aria-label="Go to SkillTwin AI home"
        >
          <img
            src="/assets/skilltwin-logo.png"
            alt="SkillTwin AI Logo"
            className="w-11 h-11 object-contain shrink-0 group-hover:scale-105 transition-transform"
          />

          <div className="min-w-0">
            <div className="font-bold text-white text-lg tracking-tight leading-none">
              SkillTwin AI
            </div>

            <div className="mt-1.5 text-[9px] leading-tight text-white/40 tracking-wide whitespace-nowrap">
              Your Skills. Your Twin. A Smarter Career.
            </div>
          </div>
        </button>
      </div>

      {/* Demo Mode */}
      {isDemoMode && (
        <div className="mx-4 mb-4 px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-medium flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          Demo Mode
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 px-3 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `nav-link ${isActive ? 'nav-link-active' : ''}`
            }
          >
            <item.icon size={18} strokeWidth={2} />
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-white/5">
        <button
          onClick={() => navigate('/profile')}
          className="flex items-center gap-3 w-full p-2 rounded-xl hover:bg-white/5 transition-colors"
        >
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-sm font-bold text-white">
            {user?.name?.charAt(0) ?? 'A'}
          </div>

          <div className="text-left min-w-0">
            <div className="text-sm font-medium text-white truncate">
              {user?.name ?? 'Alex Morgan'}
            </div>

            <div className="text-xs text-white/40 truncate">
              {user?.targetRole ?? 'Data Analyst'}
            </div>
          </div>
        </button>
      </div>
    </aside>
  );
}