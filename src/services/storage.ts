import { supabase, isSupabaseConfigured } from '../lib/supabase';

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

export interface UploadResult {
  url: string;
  path: string;
}

export const uploadImage = async (
  file: File,
  folder: 'projects' | 'achievements' | 'profile'
): Promise<UploadResult> => {
  // 1. Client-side validation
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error('Invalid file format. Please upload JPG, PNG, WebP, or SVG.');
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new Error('File size exceeds the 5MB limit.');
  }

  const sanitizedFileName = file.name.toLowerCase().replace(/[^a-z0-9.-]/g, '_');
  const path = `${folder}/${Date.now()}-${sanitizedFileName}`;

  // 2. Upload to Supabase Storage if configured
  if (isSupabaseConfigured() && supabase) {
    const { error } = await supabase.storage
      .from('portfolio-images')
      .upload(path, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      throw new Error(`Upload error: ${error.message}`);
    }

    const { data: publicUrlData } = supabase.storage
      .from('portfolio-images')
      .getPublicUrl(path);

    return {
      url: publicUrlData.publicUrl,
      path,
    };
  }

  // Fallback for local demo preview (converts file to local object URL or DataURL)
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve({
        url: reader.result as string,
        path: `local-${path}`,
      });
    };
    reader.onerror = () => reject(new Error('Failed to read local image file'));
    reader.readAsDataURL(file);
  });
};
