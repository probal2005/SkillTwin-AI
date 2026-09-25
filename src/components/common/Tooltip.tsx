import { useState, type ReactNode } from 'react';
import { Info } from 'lucide-react';

interface TooltipProps {
  content: string;
  children?: ReactNode;
}

export function Tooltip({ content, children }: TooltipProps) {
  const [show, setShow] = useState(false);

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onFocus={() => setShow(true)}
      onBlur={() => setShow(false)}
    >
      {children ?? <Info size={14} className="text-white/40 cursor-help hover:text-white/60 transition-colors" />}
      {show && (
        <span
          role="tooltip"
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 w-64 p-3 rounded-xl bg-navy-700 border border-white/10 text-xs text-white/70 shadow-xl animate-fade-in"
        >
          {content}
          <span className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-navy-700 border-r border-b border-white/10 rotate-45 -mt-1" />
        </span>
      )}
    </span>
  );
}
