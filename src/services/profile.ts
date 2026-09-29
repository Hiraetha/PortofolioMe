import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { Profile, ProfileInput } from '../types';
import { MOCK_PROFILE } from '../lib/mockData';

const LOCAL_STORAGE_KEY = 'portfolio_profile_data';

const getStoredLocalProfile = (): Profile => {
  try {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (data) return JSON.parse(data);
  } catch (e) {
    console.error('Failed to read local profile', e);
  }
  return MOCK_PROFILE;
};

const saveStoredLocalProfile = (profile: Profile) => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(profile));
  } catch (e) {
    console.error('Failed to save local profile', e);
  }
};

export const getProfile = async (): Promise<Profile> => {
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .limit(1)
        .maybeSingle();

      if (error) throw error;
      if (data) return data as Profile;
    } catch (err) {
      console.warn('Falling back to local profile:', err);
    }
  }

  return getStoredLocalProfile();
};

export const updateProfile = async (input: Partial<ProfileInput>): Promise<Profile> => {
  if (isSupabaseConfigured() && supabase) {
    const current = await getProfile();
    const { data, error } = await supabase
      .from('profiles')
      .upsert({ ...current, ...input, updated_at: new Date().toISOString() })
      .select()
      .single();

    if (error) throw error;
    return data as Profile;
  }

  const current = getStoredLocalProfile();
  const updated: Profile = {
    ...current,
    ...input,
    updated_at: new Date().toISOString(),
  };
  saveStoredLocalProfile(updated);
  return updated;
};
