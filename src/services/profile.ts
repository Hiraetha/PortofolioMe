import { Profile } from '../types';
import { PORTFOLIO_PROFILE } from '../data/portfolioData';

export const getProfile = async (): Promise<Profile> => {
  return PORTFOLIO_PROFILE;
};
