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

export function MobileNav() {
  const { user } = useApp();
  const navigate = useNavigate();

  return (
    <>
      {/* Mobile top bar */}
      <div className="lg:hidden sticky top-0 z-40 flex items-center justify-between px-4 py-3 bg-navy-900/80 backdrop-blur-xl border-b border-white/5">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2.5 group min-w-0"
          aria-label="Go to SkillTwin AI home"
        >
          <img
            src="/assets/skilltwin-logo.png"
            alt="SkillTwin AI Logo"
            className="w-9 h-9 object-contain shrink-0 group-hover:scale-105 transition-transform"
          />

          <div className="flex flex-col text-left leading-none min-w-0">
            <span className="font-bold text-white text-base tracking-tight">
              SkillTwin AI
            </span>

            <span className="mt-1 text-[8px] text-white/40 tracking-wide whitespace-nowrap">
              Your Skills. Your Twin. A Smarter Career.
            </span>
          </div>
        </button>

        <div className="flex items-center gap-3 shrink-0">
          <span className="px-2 py-0.5 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-medium">
            Demo
          </span>

          <button
            onClick={() => navigate('/profile')}
            className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-xs font-bold text-white"
            aria-label="Open profile"
          >
            {user?.name?.charAt(0) ?? 'A'}
          </button>
        </div>
      </div>

      {/* Mobile bottom nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-navy-900/90 backdrop-blur-xl border-t border-white/5 px-2 py-2 flex items-center justify-around">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 px-2 py-1.5 rounded-lg transition-colors ${
                isActive ? 'text-indigo-400' : 'text-white/40'
              }`
            }
          >
            <item.icon size={20} strokeWidth={2} />
            <span className="text-[10px] font-medium">
              {item.label}
            </span>
          </NavLink>
        ))}
      </nav>
    </>
  );
}

export function MobileTopBar() {
  return null;
}