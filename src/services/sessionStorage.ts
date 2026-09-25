const SKILLTWIN_SESSION_KEY = 'skilltwin_active_id';

export function saveSkillTwinSession(skillTwinId: string): void {
  localStorage.setItem(
    SKILLTWIN_SESSION_KEY,
    skillTwinId.trim().toUpperCase(),
  );
}

export function getSkillTwinSession(): string | null {
  const skillTwinId = localStorage.getItem(SKILLTWIN_SESSION_KEY);

  if (!skillTwinId) {
    return null;
  }

  return skillTwinId.trim().toUpperCase();
}

export function clearSkillTwinSession(): void {
  localStorage.removeItem(SKILLTWIN_SESSION_KEY);
}
