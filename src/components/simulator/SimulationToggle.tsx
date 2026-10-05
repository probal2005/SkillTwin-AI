interface SimulationToggleProps {
  skillName: string;
  impact: number;
  selected: boolean;
  onToggle: () => void;
  status: string;
}

export function SimulationToggle({ skillName, impact, selected, onToggle, status }: SimulationToggleProps) {
  return (
    <button
      onClick={onToggle}
      role="switch"
      aria-checked={selected}
      aria-label={`Toggle ${skillName} for simulation`}
      className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all duration-300 ${
        selected
          ? 'bg-indigo-500/15 border-indigo-500/30 shadow-lg shadow-indigo-500/10'
          : 'bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/8'
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-200 ${
            selected ? 'bg-indigo-500 border-indigo-500' : 'border-white/20'
          }`}
        >
          {selected && (
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M2 5L4 7L8 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </div>
        <div className="text-left">
          <span className="text-sm font-medium text-white">{skillName}</span>
          <span className="text-xs text-white/40 ml-2">{status === 'missing' ? 'Missing' : 'Partial'}</span>
        </div>
      </div>
      <span className={`text-sm font-bold ${selected ? 'text-indigo-300' : 'text-white/60'}`}>
        +{impact}
      </span>
    </button>
  );
}
