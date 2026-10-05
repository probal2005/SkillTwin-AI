import { useNavigate } from "react-router-dom";
import { Bell } from "lucide-react";
import { useApp } from "@/hooks/useAppContext";

export function TopBar() {
  const { user, isDemoMode } = useApp();
  const navigate = useNavigate();

  return (
    <header className="hidden lg:flex items-center justify-between px-8 py-4 border-b border-white/5 bg-navy-900/30 backdrop-blur-xl sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <h2 className="text-sm text-white/40">
          {user
            ? `Target Role: ${user.targetRole || "Not selected"}`
            : "Select a target role"}
        </h2>
      </div>

      <div className="flex items-center gap-4">
        {isDemoMode && (
          <span className="px-2.5 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-medium flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            Demo Mode
          </span>
        )}

        <button
          className="relative text-white/40 hover:text-white transition-colors"
          aria-label="Notifications"
        >
          <Bell size={18} />

          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-match-missing" />
        </button>

        <button
          onClick={() => navigate("/profile")}
          className="flex items-center gap-2.5 hover:bg-white/5 rounded-xl px-2 py-1.5 transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-xs font-bold text-white">
            {user?.name?.charAt(0) ?? "A"}
          </div>

          <span className="text-sm font-medium text-white">
            {user?.name ?? "Alex Morgan"}
          </span>
        </button>
      </div>
    </header>
  );
}

export function Logo() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/")}
      className="flex items-center gap-2 group"
      aria-label="Go to SkillTwin AI home"
    >
      <img
        src="/assets/skilltwin-logo.png"
        alt="SkillTwin AI"
        className="h-10 w-auto object-contain group-hover:scale-105 transition-transform"
      />
    </button>
  );
}