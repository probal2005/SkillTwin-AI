import { useNavigate } from "react-router-dom";
import {
  Zap,
  ArrowRight,
  Sparkles,
  FileSearch,
  Brain,
  GitBranch,
  BarChart3,
  Map,
  Radar,
  Check,
  TrendingUp,
  MousePointerClick,
  Layers,
  Target,
  Lightbulb,
  ChevronDown,
} from "lucide-react";
import { useApp } from "@/hooks/useAppContext";
import { ScoreRing } from "@/components/common/ScoreRing";

export function Landing() {
  const navigate = useNavigate();
  const { loadDemo } = useApp();

  const handleLaunchDemo = () => {
    loadDemo();
    navigate("/dashboard");
  };

  const flowSteps = [
    { label: "Current Skills", icon: Brain, color: "text-indigo-400" },
    { label: "Industry Demand", icon: BarChart3, color: "text-cyan-400" },
    { label: "Skill Gap", icon: GitBranch, color: "text-match-partial" },
    { label: "What-If", icon: Sparkles, color: "text-match-strong" },
    { label: "Roadmap", icon: Map, color: "text-indigo-400" },
  ];

  const outputs = [
    {
      icon: Brain,
      title: "Digital Skill Twin",
      desc: "An AI-extracted inventory of your current skills, proficiency levels, and evidence.",
    },
    {
      icon: Target,
      title: "Job Match Score",
      desc: "A calculated alignment metric showing how your skills overlap with a target role.",
    },
    {
      icon: GitBranch,
      title: "Skill Gap Analysis",
      desc: "Clear breakdown of strong, partial, and missing skills vs. industry demand.",
    },
    {
      icon: TrendingUp,
      title: "Priority Skills",
      desc: "Ranked by demand × relevance × gap × score impact. Know what to learn first.",
    },
    {
      icon: Sparkles,
      title: "What-If Simulator",
      desc: "Toggle skills on and watch your match score recalculate instantly.",
    },
    {
      icon: Map,
      title: "30-Day Roadmap",
      desc: "A focused learning plan built from your highest-impact skills.",
    },
    {
      icon: Radar,
      title: "Industry Skill Radar",
      desc: "See what skills are in high demand and what is emerging on the horizon.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 py-4 bg-navy-950/60 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/assets/skilltwin-logo.png"
              alt="SkillTwin AI Logo"
              className="h-10 w-10 object-contain rounded-xl"
            />

            <div className="flex flex-col leading-none">
              <span className="font-bold text-white text-lg tracking-tight">
                SkillTwin AI
              </span>

              <span className="mt-1 text-[10px] text-white/40 tracking-wide">
                Your Skills. Your Twin. A Smarter Career.
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <a
              href="#how"
              className="text-sm text-white/50 hover:text-white transition-colors"
            >
              How It Works
            </a>

            <a
              href="#why"
              className="text-sm text-white/50 hover:text-white transition-colors"
            >
              Why SkillTwin
            </a>

            <a
              href="#preview"
              className="text-sm text-white/50 hover:text-white transition-colors"
            >
              Preview
            </a>

            <a
              href="#outputs"
              className="text-sm text-white/50 hover:text-white transition-colors"
            >
              Features
            </a>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleLaunchDemo}
              className="btn-primary text-sm py-2 px-4"
            >
              Launch Interactive Demo
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-4 sm:px-8 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px]" />
          <div className="absolute top-40 right-1/4 w-96 h-96 bg-cyan-500/8 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-medium mb-6">
                <Sparkles size={12} />
                Career Intelligence Platform
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight">
                From Current Skills
                <br />
                to <span className="gradient-text">Career Readiness</span>
              </h1>

              <p className="mt-6 text-xl text-white/50 font-medium">
                "What should I learn next — and what could it unlock?"
              </p>

              <p className="mt-4 text-base text-white/40 max-w-lg leading-relaxed">
                Build your digital Skill Twin, compare it with real industry
                demand, and simulate the impact of learning your next skill.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => navigate("/onboarding")}
                  className="btn-primary flex items-center justify-center gap-2"
                >
                  Build My Skill Twin
                  <ArrowRight size={16} />
                </button>

                <button
                  onClick={handleLaunchDemo}
                  className="btn-secondary flex items-center justify-center gap-2"
                >
                  <MousePointerClick size={16} />
                  Explore Demo
                </button>
              </div>
            </div>

            {/* Mini Skill Twin dashboard preview */}
            <div className="animate-fade-in-up animate-delay-200">
              <div className="glass-card p-6 max-w-md mx-auto">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold text-white/40 tracking-wider">
                    SKILL TWIN PREVIEW
                  </span>

                  <span className="px-2 py-0.5 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-medium">
                    DEMO
                  </span>
                </div>

                <div className="flex items-center gap-6 mb-5">
                  <ScoreRing score={57} size={120} animate={true} />

                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-match-strong">Strong Match</span>
                      <span className="font-bold text-match-strong">2</span>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <span className="text-match-partial">Partial Match</span>
                      <span className="font-bold text-match-partial">2</span>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <span className="text-match-missing">Missing</span>
                      <span className="font-bold text-match-missing">2</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-white/5">
                    <span className="text-sm text-white/70">SQL</span>

                    <span className="text-xs text-match-missing font-medium">
                      Missing · +11 pts
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-white/5">
                    <span className="text-sm text-white/70">Power BI</span>

                    <span className="text-xs text-match-missing font-medium">
                      Missing · +8 pts
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
                    <span className="text-sm text-white flex items-center gap-1.5">
                      <Sparkles size={12} className="text-indigo-400" />
                      If you learn SQL...
                    </span>

                    <span className="text-xs text-match-strong font-bold">
                      57% → 68%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Flow visual */}
          <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
            {flowSteps.map((step, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 sm:gap-4 animate-fade-in"
                style={{
                  animationDelay: `${idx * 100}ms`,
                }}
              >
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10">
                  <step.icon size={14} className={step.color} />

                  <span className="text-xs font-medium text-white/60">
                    {step.label}
                  </span>
                </div>

                {idx < flowSteps.length - 1 && (
                  <ChevronDown
                    size={14}
                    className="text-white/20 sm:rotate-[-90deg]"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how" className="py-20 px-4 sm:px-8 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-3">
            How It Works
          </h2>

          <p className="text-white/40 text-center mb-12 max-w-xl mx-auto">
            From resume to roadmap in five steps
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              {
                icon: FileSearch,
                label: "Resume",
                desc: "Upload your resume",
              },
              {
                icon: Brain,
                label: "AI Extraction",
                desc: "Skills extracted automatically",
              },
              {
                icon: Layers,
                label: "Skill Twin",
                desc: "Digital twin built",
              },
              {
                icon: BarChart3,
                label: "Industry Demand",
                desc: "Compared with real data",
              },
              {
                icon: Sparkles,
                label: "What-If",
                desc: "Simulate next moves",
              },
              {
                icon: Map,
                label: "Roadmap",
                desc: "30-day learning plan",
              },
            ].map((step, idx) => (
              <div
                key={idx}
                className="glass-card p-5 text-center glass-hover animate-fade-in-up"
                style={{
                  animationDelay: `${idx * 80}ms`,
                }}
              >
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mx-auto mb-3">
                  <step.icon size={20} className="text-indigo-400" />
                </div>

                <div className="text-xs text-white/30 mb-1">Step {idx + 1}</div>

                <h4 className="font-semibold text-white text-sm mb-1">
                  {step.label}
                </h4>

                <p className="text-xs text-white/40">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why SkillTwin */}
      <section id="why" className="py-20 px-4 sm:px-8 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-3">
            Why SkillTwin
          </h2>

          <p className="text-white/40 text-center mb-12">
            Don't just find your skill gap — simulate your next move.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="glass-card p-8">
              <div className="text-xs font-semibold text-white/30 tracking-wider mb-3">
                TRADITIONAL PLATFORMS
              </div>

              <p className="text-2xl text-white/50 font-medium leading-snug">
                "Here are your missing skills."
              </p>

              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-sm text-white/30">
                  <span className="w-1 h-1 rounded-full bg-white/20" />
                  Static skill lists
                </div>

                <div className="flex items-center gap-2 text-sm text-white/30">
                  <span className="w-1 h-1 rounded-full bg-white/20" />
                  No impact simulation
                </div>

                <div className="flex items-center gap-2 text-sm text-white/30">
                  <span className="w-1 h-1 rounded-full bg-white/20" />
                  Generic recommendations
                </div>
              </div>
            </div>

            <div className="glass-card p-8 border-indigo-500/20 bg-indigo-500/5">
              <div className="text-xs font-semibold text-indigo-400 tracking-wider mb-3">
                SKILLTWIN AI
              </div>

              <p className="text-2xl text-white font-medium leading-snug">
                "Here's what could happen if you learn them."
              </p>

              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-sm text-white/70">
                  <Check size={14} className="text-match-strong" />
                  Interactive what-if simulator
                </div>

                <div className="flex items-center gap-2 text-sm text-white/70">
                  <Check size={14} className="text-match-strong" />
                  Priority-ranked by real impact
                </div>

                <div className="flex items-center gap-2 text-sm text-white/70">
                  <Check size={14} className="text-match-strong" />
                  Personalized 30-day roadmap
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Preview / Simulator */}
      <section
        id="preview"
        className="py-20 px-4 sm:px-8 border-t border-white/5"
      >
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-3">
            The What-If Simulator
          </h2>

          <p className="text-white/40 text-center mb-12">
            Simulate your next move before investing your time.
          </p>

          <div className="glass-card p-8">
            <div className="grid md:grid-cols-3 gap-6 items-center">
              <div className="text-center">
                <ScoreRing score={57} size={130} animate={true} />

                <p className="mt-3 text-sm text-white/50">Current Match</p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Sparkles size={20} className="text-indigo-400" />

                  <span className="text-sm font-medium text-white/70">
                    Select SQL
                  </span>
                </div>

                <div className="text-4xl font-bold text-match-strong animate-pulse-glow">
                  +11
                </div>

                <p className="text-xs text-white/40 mt-1">points impact</p>
              </div>

              <div className="text-center">
                <ScoreRing
                  score={68}
                  size={130}
                  animate={true}
                  color="#22c55e"
                />

                <p className="mt-3 text-sm text-white/50">Simulated Match</p>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-xl bg-indigo-500/5 border border-indigo-500/15 text-center">
              <p className="text-sm text-white/60">
                <Lightbulb
                  size={14}
                  className="inline mr-1.5 text-indigo-400"
                />
                <span className="font-medium text-white">
                  Highest-impact next skill: SQL
                </span>{" "}
                — appears frequently across analyzed Data Analyst postings and
                closes a major identified skill gap.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Seven Outputs */}
      <section
        id="outputs"
        className="py-20 px-4 sm:px-8 border-t border-white/5"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-3">
            Seven Outputs
          </h2>

          <p className="text-white/40 text-center mb-12">
            Everything you need to plan your next career move
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {outputs.map((item, idx) => (
              <div
                key={idx}
                className="glass-card p-6 glass-hover animate-fade-in-up"
                style={{
                  animationDelay: `${idx * 60}ms`,
                }}
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500/15 to-cyan-500/15 border border-white/10 flex items-center justify-center mb-4">
                  <item.icon size={18} className="text-indigo-400" />
                </div>

                <h4 className="font-semibold text-white mb-1">{item.title}</h4>

                <p className="text-sm text-white/40 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-8 border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px]" />
          </div>

          <h2 className="text-4xl font-bold text-white mb-4 relative">
            Build Your Skill Twin
          </h2>

          <p className="text-white/50 mb-8 relative">
            See where you stand, simulate what's next, and get a roadmap to get
            there.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center relative">
            <button
              onClick={() => navigate("/onboarding")}
              className="btn-primary flex items-center justify-center gap-2"
            >
              Build My Skill Twin
              <ArrowRight size={16} />
            </button>

            <button
              onClick={handleLaunchDemo}
              className="btn-secondary flex items-center justify-center gap-2"
            >
              <MousePointerClick size={16} />
              Launch Interactive Demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src="/assets/skilltwin-logo.png"
              alt="SkillTwin AI Logo"
              className="h-10 w-10 object-contain rounded-xl"
            />

            <div className="flex flex-col leading-none">
              <span className="font-bold text-white text-lg tracking-tight">
                SkillTwin AI
              </span>

              <span className="mt-1 text-[10px] text-white/40 tracking-wide">
                Your Skills. Your Twin. A Smarter Career.
              </span>
            </div>
          </div>

          <p className="text-xs text-white/30">
            Prototype — uses prepared demo data. Scores are illustrative
            alignment metrics.
          </p>
        </div>
      </footer>
    </div>
  );
}
