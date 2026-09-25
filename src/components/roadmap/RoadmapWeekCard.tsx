import { useState } from 'react';
import type { RoadmapWeek } from '@/types';
import { ChevronDown, Clock, BookOpen, ExternalLink, FolderGit2 } from 'lucide-react';

interface RoadmapWeekCardProps {
  week: RoadmapWeek;
  index: number;
}

export function RoadmapWeekCard({ week, index }: RoadmapWeekCardProps) {
  const [expanded, setExpanded] = useState(index === 0);

  return (
    <div
      className="glass-card overflow-hidden animate-fade-in-up"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-white/5 transition-colors"
        aria-expanded={expanded}
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 border border-indigo-500/20 flex items-center justify-center shrink-0">
            <span className="text-lg font-bold text-indigo-300">W{week.week}</span>
          </div>
          <div>
            <h3 className="font-semibold text-white">{week.title}</h3>
            <p className="text-xs text-white/40 mt-0.5">{week.focus}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-white/40">
            <Clock size={13} />
            {week.estimatedHours}h
          </div>
          <ChevronDown
            size={20}
            className={`text-white/40 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
          />
        </div>
      </button>

      {expanded && (
        <div className="px-5 pb-5 animate-fade-in">
          <div className="border-t border-white/5 pt-4 space-y-4">
            {week.project && (
              <div className="p-4 rounded-xl bg-indigo-500/5 border border-indigo-500/15">
                <div className="flex items-center gap-2 mb-1">
                  <FolderGit2 size={14} className="text-indigo-400" />
                  <span className="text-xs font-semibold text-indigo-400 tracking-wider">PROJECT</span>
                </div>
                <p className="text-sm font-medium text-white">{week.project}</p>
              </div>
            )}

            <div>
              <div className="flex items-center gap-2 mb-2">
                <BookOpen size={14} className="text-white/40" />
                <span className="text-xs font-semibold text-white/40 tracking-wider">TOPICS</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {week.topics.map((topic, i) => (
                  <span key={i} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm text-white/70">
                    {topic}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="text-xs font-semibold text-white/40 tracking-wider">SKILLS GAINED</span>
              <div className="flex flex-wrap gap-2 mt-2">
                {week.skillsGained.map((skill, i) => (
                  <span key={i} className="px-3 py-1 rounded-lg bg-match-strong/10 border border-match-strong/20 text-xs font-medium text-match-strong">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="text-xs font-semibold text-white/40 tracking-wider">RECOMMENDED RESOURCES</span>
              <div className="space-y-2 mt-2">
                {week.resources.map((res, i) => (
                  <a
                    key={i}
                    href={res.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5 hover:border-indigo-500/20 hover:bg-indigo-500/5 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xs px-2 py-0.5 rounded-md bg-white/5 text-white/50 font-medium">{res.type}</span>
                      <span className="text-sm text-white/70 group-hover:text-white transition-colors">{res.title}</span>
                    </div>
                    <ExternalLink size={14} className="text-white/20 group-hover:text-indigo-400 transition-colors" />
                  </a>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-white/30">
              <Clock size={13} />
              Estimated time: {week.estimatedHours} hours
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
