import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { Technology } from '../types';
import { MOCK_TECHNOLOGIES } from '../lib/mockData';

export const getTechnologies = async (): Promise<Technology[]> => {
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase
        .from('technologies')
        .select('*')
        .order('name');

      if (error) throw error;
      if (data && data.length > 0) return data as Technology[];
    } catch (err) {
      console.warn('Falling back to local technologies:', err);
    }
  }

  return MOCK_TECHNOLOGIES;
};
