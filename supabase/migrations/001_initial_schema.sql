-- Migration 001: Initial Schema for Developer Portfolio
-- Tables: profiles, projects, achievements, technologies, timeline_items

-- Enable UUID extension
create extension if not exists "pgcrypto";

-- Function: updated_at trigger
create or replace function set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Table: profiles
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null,
  role text,
  bio text,
  short_bio text,
  email text,
  github_url text,
  linkedin_url text,
  instagram_url text,
  avatar_url text,
  location_label text,
  availability_status text,
  hero_title text,
  hero_description text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Table: projects
create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  description text not null,
  long_description text,
  cover_image text,
  github_url text,
  demo_url text,
  technologies text[] default '{}',
  category text,
  featured boolean default false,
  published boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Table: achievements
create table if not exists achievements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  issuer text,
  date date,
  image_url text,
  certificate_url text,
  featured boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Table: technologies
create table if not exists technologies (
  id uuid primary key default gen_random_uuid(),
  name text unique not null,
  category text,
  icon text,
  description text,
  created_at timestamptz default now()
);

-- Table: timeline_items
create table if not exists timeline_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  type text,
  date date,
  created_at timestamptz default now()
);

-- Indexes
create index if not exists projects_published_idx on projects(published);
create index if not exists projects_featured_idx on projects(featured);
create index if not exists projects_created_at_idx on projects(created_at desc);
create index if not exists achievements_featured_idx on achievements(featured);
create index if not exists achievements_date_idx on achievements(date desc);

-- Triggers for updated_at
drop trigger if exists set_profiles_updated_at on profiles;
create trigger set_profiles_updated_at
  before update on profiles
  for each row
  execute function set_updated_at();

drop trigger if exists set_projects_updated_at on projects;
create trigger set_projects_updated_at
  before update on projects
  for each row
  execute function set_updated_at();

drop trigger if exists set_achievements_updated_at on achievements;
create trigger set_achievements_updated_at
  before update on achievements
  for each row
  execute function set_updated_at();
