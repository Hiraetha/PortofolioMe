import { Project, ProjectInput } from '../types';
import { PORTFOLIO_PROJECTS } from '../data/portfolioData';
import { enrichProjectsWithGitHubCommits } from './github';

// Local storage key for interactive client-side editing/testing
const LOCAL_STORAGE_KEY = 'portfolio_projects_data';

const getStoredLocalProjects = (): Project[] => {
  try {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.debug('Failed to read local projects', e);
  }
  return PORTFOLIO_PROJECTS;
};

const saveStoredLocalProjects = (projects: Project[]) => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(projects));
  } catch (e) {
    console.error('Failed to save local projects', e);
  }
};

/**
 * Returns published projects, optionally enriched with live GitHub commits
 */
export const getPublishedProjects = async (enrichWithLiveGitHub = true): Promise<Project[]> => {
  const baseProjects = getStoredLocalProjects().filter((p) => p.published);
  
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
  const found = getStoredLocalProjects().find((p) => p.slug === slug);
  if (!found) return null;

  try {
    const enriched = await enrichProjectsWithGitHubCommits([found]);
    return enriched[0] || found;
  } catch {
    return found;
  }
};

export const getAllProjectsAdmin = async (): Promise<Project[]> => {
  return getStoredLocalProjects();
};

export const createProject = async (input: ProjectInput): Promise<Project> => {
  const newProj: Project = {
    ...input,
    id: `proj-${Date.now()}`,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  const list = [newProj, ...getStoredLocalProjects()];
  saveStoredLocalProjects(list);
  return newProj;
};

export const updateProject = async (id: string, input: Partial<ProjectInput>): Promise<Project> => {
  const list = getStoredLocalProjects();
  const index = list.findIndex((p) => p.id === id);
  if (index === -1) throw new Error('Project not found');

  const updated: Project = {
    ...list[index],
    ...input,
    updated_at: new Date().toISOString(),
  };
  list[index] = updated;
  saveStoredLocalProjects(list);
  return updated;
};

export const deleteProject = async (id: string): Promise<void> => {
  const list = getStoredLocalProjects().filter((p) => p.id !== id);
  saveStoredLocalProjects(list);
};
