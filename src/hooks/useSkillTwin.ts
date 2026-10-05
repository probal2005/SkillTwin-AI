import { useState, useCallback, useEffect } from 'react';
import type { UserProfile, SkillTwin } from '@/types';
import { demoUser } from '@/data/users';
import { getRoleByName } from '@/data/roles';
import { buildSkillTwin } from '@/services/skillEngine';

export function useSkillTwin() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [skillTwin, setSkillTwin] = useState<SkillTwin | null>(null);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const loadDemo = useCallback(() => {
    setUser(demoUser);
    setSkillTwin(buildSkillTwin(demoUser));
    setIsDemoMode(true);
  }, []);

  const loadFromResume = useCallback((extractedUser: UserProfile) => {
    setUser(extractedUser);
    setSkillTwin(buildSkillTwin(extractedUser));
    setIsDemoMode(false);
  }, []);

  const setTargetRole = useCallback((roleName: string) => {
    setUser((prev) => {
      if (!prev) return prev;
      return { ...prev, targetRole: roleName };
    });
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
        .map((id) => {
          const role = getRoleByName(prev.targetRole);
          const roleSkill = role
            ? getRoleByName(prev.targetRole)
            : null;
          return { id, name: id, category: 'Tool' as const, proficiency: 'Intermediate' as const, aliases: [], demand: 'High' as const, relevance: 80 };
        });
      const updated = { ...prev, skills: [...prev.skills, ...newSkills] };
      setSkillTwin(buildSkillTwin(updated));
      return updated;
    });
  }, []);

  useEffect(() => {
    if (isDemoMode && !user) {
      loadDemo();
    }
  }, [isDemoMode, user, loadDemo]);

  return {
    user,
    skillTwin,
    isDemoMode,
    isLoading,
    loadDemo,
    loadFromResume,
    setTargetRole,
    updateProfile,
    addSkillsToTwin,
    setIsLoading,
  };
}
