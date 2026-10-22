import { Profile, ProfileInput } from '../types';
import { PORTFOLIO_PROFILE } from '../data/portfolioData';

const LOCAL_STORAGE_KEY = 'portfolio_profile_data';

const getStoredLocalProfile = (): Profile => {
  try {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (data) return JSON.parse(data);
  } catch (e) {
    console.debug('Failed to read local profile', e);
  }
  return PORTFOLIO_PROFILE;
};

const saveStoredLocalProfile = (profile: Profile) => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(profile));
  } catch (e) {
    console.error('Failed to save local profile', e);
  }
};

export const getProfile = async (): Promise<Profile> => {
  return getStoredLocalProfile();
};

export const updateProfile = async (input: Partial<ProfileInput>): Promise<Profile> => {
  const current = getStoredLocalProfile();
  const updated: Profile = {
    ...current,
    ...input,
    updated_at: new Date().toISOString(),
  };
  saveStoredLocalProfile(updated);
  return updated;
};
