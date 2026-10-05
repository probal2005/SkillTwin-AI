import { useState } from 'react';
import { Search, Check } from 'lucide-react';
import { roles } from '@/data/roles';
import type { Role } from '@/types';

interface RoleSelectorProps {
  onSelect: (role: Role) => void;
  selected: Role | null;
}

export function RoleSelector({ onSelect, selected }: RoleSelectorProps) {
  const [search, setSearch] = useState('');

  const filtered = roles.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div>
      <div className="relative mb-4">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
        <input
          type="text"
          placeholder="Search target roles..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input-field pl-10"
          aria-label="Search roles"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {filtered.map((role) => {
          const isSelected = selected?.id === role.id;
          return (
            <button
              key={role.id}
              onClick={() => onSelect(role)}
              className={`p-4 rounded-xl border text-left transition-all duration-200 ${
                isSelected
                  ? 'bg-indigo-500/15 border-indigo-500/30 shadow-lg shadow-indigo-500/10'
                  : 'bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/8'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-semibold text-white text-sm">{role.name}</span>
                  <p className="text-xs text-white/40 mt-0.5">{role.description}</p>
                </div>
                {isSelected && (
                  <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center shrink-0">
                    <Check size={14} className="text-white" strokeWidth={3} />
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
