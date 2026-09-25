import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import type { UserProfile, SkillTwin } from '@/types';
import { demoUser } from '@/data/users';
import { buildSkillTwin } from '@/services/skillEngine';
import {
  getSkillTwinSession,
  saveSkillTwinSession,
  clearSkillTwinSession,
} from '@/services/sessionStorage';
import { getProfileBySkillTwinId } from '@/services/profileApi';

interface AppContextValue {
  user: UserProfile | null;
  skillTwin: SkillTwin | null;
  isDemoMode: boolean;
  hasOnboarded: boolean;
  loadDemo: () => void;
  loadFromResume: (user: UserProfile) => void;
  setTargetRole: (roleName: string) => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  addSkillsToTwin: (skillIds: string[]) => void;
  setHasOnboarded: (v: boolean) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [skillTwin, setSkillTwin] = useState<SkillTwin | null>(null);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [hasOnboarded, setHasOnboarded] = useState(false);
  const [isRestoringSession, setIsRestoringSession] = useState(true);

  const loadDemo = useCallback(() => {
    clearSkillTwinSession();
    setUser(demoUser);
    setSkillTwin(buildSkillTwin(demoUser));
    setIsDemoMode(true);
    setHasOnboarded(true);
  }, []);

  const loadFromResume = useCallback((extractedUser: UserProfile) => {
    if (extractedUser.skillTwinId) {
      saveSkillTwinSession(extractedUser.skillTwinId);
    }

    setUser(extractedUser);
    setSkillTwin(buildSkillTwin(extractedUser));
    setIsDemoMode(false);
    setHasOnboarded(true);
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function restoreSession() {
      const skillTwinId = getSkillTwinSession();

      if (!skillTwinId) {
        if (!cancelled) {
          setIsRestoringSession(false);
        }
        return;
      }

      try {
        const result = await getProfileBySkillTwinId(skillTwinId);

        if (!cancelled) {
          setUser(result.user);
          setSkillTwin(buildSkillTwin(result.user));
          setIsDemoMode(false);
          setHasOnboarded(true);
        }
      } catch {
        clearSkillTwinSession();
      } finally {
        if (!cancelled) {
          setIsRestoringSession(false);
        }
      }
    }

    restoreSession();

    return () => {
      cancelled = true;
    };
  }, []);

  const setTargetRole = useCallback((roleName: string) => {
    setUser((prev) => (prev ? { ...prev, targetRole: roleName } : prev));
  }, []);

  const updateProfile = useCallback((updates: Partial<UserProfile>) => {
    setUser((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, ...updates };
      setSkillTwin(buildSkillTwin(updated));
      return updated;
    });
  }, []);

  const addSkillsToTwin = useCallback((skillIds: string[]) => {
    setUser((prev) => {
      if (!prev) return prev;
      const existing = new Set(prev.skills.map((s) => s.id));
      const newSkills = skillIds
        .filter((id) => !existing.has(id))
        .map((id) => ({
          id,
          name: id.charAt(0).toUpperCase() + id.slice(1),
          category: 'Tool' as const,
          proficiency: 'Intermediate' as const,
          aliases: [],
          demand: 'High' as const,
          relevance: 80,
        }));
      const updated = { ...prev, skills: [...prev.skills, ...newSkills] };
      setSkillTwin(buildSkillTwin(updated));
      return updated;
    });
  }, []);

  if (isRestoringSession) {
    return null;
  }

  return (
    <AppContext.Provider
      value={{
        user,
        skillTwin,
        isDemoMode,
        hasOnboarded,
        loadDemo,
        loadFromResume,
        setTargetRole,
        updateProfile,
        addSkillsToTwin,
        setHasOnboarded,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
