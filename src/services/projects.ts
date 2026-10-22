import { Project } from '../types';
import { PORTFOLIO_PROJECTS } from '../data/portfolioData';
import { enrichProjectsWithGitHubCommits } from './github';

/**
 * Returns published projects, enriched with live GitHub commits
 */
export const getPublishedProjects = async (enrichWithLiveGitHub = true): Promise<Project[]> => {
  const baseProjects = PORTFOLIO_PROJECTS.filter((p) => p.published);
  
  if (enrichWithLiveGitHub) {
    try {
      return await enrichProjectsWithGitHubCommits(baseProjects);
    } catch {
      return baseProjects;
    }
  }

  return baseProjects;
};

export const getProjectBySlug = async (slug: string): Promise<Project | null> => {
  const found = PORTFOLIO_PROJECTS.find((p) => p.slug === slug);
  if (!found) return null;

  try {
    const enriched = await enrichProjectsWithGitHubCommits([found]);
    return enriched[0] || found;
  } catch {
    return found;
  }
};
