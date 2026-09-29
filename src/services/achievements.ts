import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { Achievement, AchievementInput } from '../types';
import { MOCK_ACHIEVEMENTS } from '../lib/mockData';

const LOCAL_STORAGE_KEY = 'portfolio_achievements_v4';

const getStoredLocalAchievements = (): Achievement[] => {
  try {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (data) return JSON.parse(data);
  } catch (e) {
    console.error('Failed to read local achievements', e);
  }
  return MOCK_ACHIEVEMENTS;
};

const saveStoredLocalAchievements = (achievements: Achievement[]) => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(achievements));
  } catch (e) {
    console.error('Failed to save local achievements', e);
  }
};

export const getAchievements = async (): Promise<Achievement[]> => {
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase
        .from('achievements')
        .select('*')
        .order('featured', { ascending: false })
        .order('date', { ascending: false });

      if (error) throw error;
      if (data && data.length > 0) return data as Achievement[];
    } catch (err) {
      console.warn('Falling back to local achievements:', err);
    }
  }

  return getStoredLocalAchievements();
};

export const createAchievement = async (input: AchievementInput): Promise<Achievement> => {
  if (isSupabaseConfigured() && supabase) {
    const { data, error } = await supabase
      .from('achievements')
      .insert([input])
      .select()
      .single();

    if (error) throw error;
    return data as Achievement;
  }

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
  if (isSupabaseConfigured() && supabase) {
    const { data, error } = await supabase
      .from('achievements')
      .update({ ...input, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as Achievement;
  }

  const list = getStoredLocalAchievements();
  const index = list.findIndex(a => a.id === id);
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
  if (isSupabaseConfigured() && supabase) {
    const { error } = await supabase
      .from('achievements')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return;
  }

  const list = getStoredLocalAchievements().filter(a => a.id !== id);
  saveStoredLocalAchievements(list);
};
