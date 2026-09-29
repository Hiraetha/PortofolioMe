export type TechCategory = 'Frontend' | 'Backend' | 'Mobile' | 'Tools / Other';

export interface Profile {
  id: string;
  name: string;
  role: string | null;
  bio: string | null;
  short_bio: string | null;
  email: string | null;
  github_url: string | null;
  linkedin_url: string | null;
  instagram_url: string | null;
  avatar_url: string | null;
  location_label: string | null;
  availability_status: string | null;
  hero_title: string | null;
  hero_description: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  long_description?: string | null;
  cover_image?: string | null;
  github_url?: string | null;
  demo_url?: string | null;
  technologies: string[];
  category?: string | null;
  featured: boolean;
  published: boolean;
  github_repo_name?: string | null;
  last_commit_message?: string | null;
  last_commit_at?: string | null;
  last_commit_url?: string | null;
  last_commit_author?: string | null;
  last_commit_sha?: string | null;
  created_at: string;
  updated_at?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description?: string | null;
  issuer?: string | null;
  date?: string | null;
  image_url?: string | null;
  certificate_url?: string | null;
  featured: boolean;
  created_at: string;
  updated_at?: string;
}

export interface Technology {
  id: string;
  name: string;
  category: TechCategory | string;
  icon?: string | null;
  description?: string | null;
  created_at?: string;
}

export interface TimelineItem {
  id: string;
  title: string;
  description?: string | null;
  type?: 'Learning' | 'Project' | 'Competition' | 'Achievement' | 'Experience' | string;
  date?: string | null;
  created_at?: string;
}

export interface ProjectInput {
  title: string;
  slug: string;
  description: string;
  long_description?: string;
  cover_image?: string;
  github_url?: string;
  demo_url?: string;
  technologies: string[];
  category?: string;
  featured: boolean;
  published: boolean;
  github_repo_name?: string;
}

export interface AchievementInput {
  title: string;
  description?: string;
  issuer?: string;
  date?: string;
  image_url?: string;
  certificate_url?: string;
  featured: boolean;
}

export interface ProfileInput {
  name: string;
  role?: string;
  bio?: string;
  short_bio?: string;
  email?: string;
  github_url?: string;
  linkedin_url?: string;
  instagram_url?: string;
  avatar_url?: string;
  location_label?: string;
  availability_status?: string;
  hero_title?: string;
  hero_description?: string;
}
