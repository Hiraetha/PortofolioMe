import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { Project, ProjectInput } from '../types';
import { MOCK_PROJECTS } from '../lib/mockData';

// Local storage key for offline interactive testing
const LOCAL_STORAGE_KEY = 'portfolio_projects_data';

const getStoredLocalProjects = (): Project[] => {
  try {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (data) return JSON.parse(data);
  } catch (e) {
    console.error('Failed to read local projects', e);
  }
  return MOCK_PROJECTS;
};

const saveStoredLocalProjects = (projects: Project[]) => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(projects));
  } catch (e) {
    console.error('Failed to save local projects', e);
  }
};

export const getPublishedProjects = async (): Promise<Project[]> => {
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('published', true)
        .order('featured', { ascending: false })
        .order('created_at', { ascending: false });

      if (error) throw error;
      if (data && data.length > 0) return data as Project[];
    } catch (err) {
      console.warn('Falling back to local projects due to Supabase error:', err);
    }
  }

  return getStoredLocalProjects().filter(p => p.published);
};

export const getProjectBySlug = async (slug: string): Promise<Project | null> => {
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('slug', slug)
        .single();

      if (error) throw error;
      if (data) return data as Project;
    } catch (err) {
      console.warn(`Falling back for project slug "${slug}":`, err);
    }
  }

  const found = getStoredLocalProjects().find(p => p.slug === slug);
  return found || null;
};

export const getAllProjectsAdmin = async (): Promise<Project[]> => {
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      if (data) return data as Project[];
    } catch (err) {
      console.warn('Falling back to local projects for admin:', err);
    }
  }

  return getStoredLocalProjects();
};

export const createProject = async (input: ProjectInput): Promise<Project> => {
  if (isSupabaseConfigured() && supabase) {
    const { data, error } = await supabase
      .from('projects')
      .insert([input])
      .select()
      .single();

    if (error) throw error;
    return data as Project;
  }

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
  if (isSupabaseConfigured() && supabase) {
    const { data, error } = await supabase
      .from('projects')
      .update({ ...input, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as Project;
  }

  const list = getStoredLocalProjects();
  const index = list.findIndex(p => p.id === id);
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
  if (isSupabaseConfigured() && supabase) {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return;
  }

  const list = getStoredLocalProjects().filter(p => p.id !== id);
  saveStoredLocalProjects(list);
};

/**
 * Subscribes to Realtime updates on the 'projects' table.
 * Triggered automatically when GitHub Webhook updates a project's latest commit!
 */
export const subscribeToProjects = (onUpdate: (project: Project) => void) => {
  if (!isSupabaseConfigured() || !supabase) {
    return () => {};
  }

  const client = supabase;
  const channel = client
    .channel('realtime:projects')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'projects',
      },
      (payload) => {
        if (payload.new && typeof payload.new === 'object' && 'id' in payload.new) {
          onUpdate(payload.new as Project);
        }
      }
    )
    .subscribe();

  return () => {
    client.removeChannel(channel);
  };
};
