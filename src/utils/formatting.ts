export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  const mb = bytes / (1024 * 1024);
  return `${mb.toFixed(1)} MB`;
}

export function formatNumber(n: number): string {
  return n.toLocaleString('en-US');
}

export function getDemandColor(demand: string): string {
  switch (demand) {
    case 'Very High':
      return 'text-cyan-400';
    case 'High':
      return 'text-indigo-400';
    case 'Medium':
      return 'text-match-partial';
    case 'Low':
      return 'text-white/40';
    default:
      return 'text-white/60';
  }
}

export function getProficiencyColor(level: string): string {
  switch (level) {
    case 'Expert':
    case 'Advanced':
      return 'text-match-strong';
    case 'Intermediate':
      return 'text-cyan-400';
    case 'Basic':
    case 'Beginner':
      return 'text-match-partial';
    default:
      return 'text-white/30';
  }
}

export function getProficiencyDots(level: string): number {
  switch (level) {
    case 'Expert': return 5;
    case 'Advanced': return 4;
    case 'Intermediate': return 3;
    case 'Basic': return 2;
    case 'Beginner': return 1;
    default: return 0;
  }
}
