import { Achievement } from '../types';
import { PORTFOLIO_ACHIEVEMENTS } from '../data/portfolioData';

export const getAchievements = async (): Promise<Achievement[]> => {
  return PORTFOLIO_ACHIEVEMENTS;
};
