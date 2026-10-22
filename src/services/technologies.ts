import { Technology } from '../types';
import { PORTFOLIO_TECHNOLOGIES } from '../data/portfolioData';

export const getTechnologies = async (): Promise<Technology[]> => {
  return PORTFOLIO_TECHNOLOGIES;
};
