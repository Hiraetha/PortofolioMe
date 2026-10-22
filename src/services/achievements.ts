import { Achievement, AchievementInput } from '../types';
import { PORTFOLIO_ACHIEVEMENTS } from '../data/portfolioData';

const LOCAL_STORAGE_KEY = 'portfolio_achievements_v4';

const getStoredLocalAchievements = (): Achievement[] => {
  try {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.debug('Failed to read local achievements', e);
  }
  return PORTFOLIO_ACHIEVEMENTS;
};

const saveStoredLocalAchievements = (achievements: Achievement[]) => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(achievements));
  } catch (e) {
    console.error('Failed to save local achievements', e);
  }
};

export const getAchievements = async (): Promise<Achievement[]> => {
  return getStoredLocalAchievements();
};

export const createAchievement = async (input: AchievementInput): Promise<Achievement> => {
  const newAch: Achievement = {
    ...input,
    id: `ach-${Date.now()}`,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  const list = [newAch, ...getStoredLocalAchievements()];
  saveStoredLocalAchievements(list);
  return newAch;
};

export const updateAchievement = async (id: string, input: Partial<AchievementInput>): Promise<Achievement> => {
  const list = getStoredLocalAchievements();
  const index = list.findIndex((a) => a.id === id);
  if (index === -1) throw new Error('Achievement not found');

  const updated: Achievement = {
    ...list[index],
    ...input,
    updated_at: new Date().toISOString(),
  };
  list[index] = updated;
  saveStoredLocalAchievements(list);
  return updated;
};

export const deleteAchievement = async (id: string): Promise<void> => {
  const list = getStoredLocalAchievements().filter((a) => a.id !== id);
  saveStoredLocalAchievements(list);
};
