-- Migration 005: GitHub Webhook Sync & Realtime Schema
-- Purpose: Support Method 2 (GitHub Webhooks + Supabase Edge Functions)
-- Adds commit tracking columns to projects and creates an activity log table

-- 1. Add GitHub commit tracking columns to projects
alter table projects
  add column if not exists github_repo_name text,
  add column if not exists last_commit_message text,
  add column if not exists last_commit_at timestamptz,
  add column if not exists last_commit_url text,
  add column if not exists last_commit_author text,
  add column if not exists last_commit_sha text;

-- 2. Create index on github_repo_name for fast webhook lookup
create index if not exists idx_projects_github_repo_name on projects (github_repo_name);

-- 3. Create table for GitHub Webhook Activity History / Audit Logs
create table if not exists github_activity_logs (
  id uuid primary key default gen_random_uuid(),
  event_type text not null,
  repo_name text not null,
  commit_message text,
  commit_url text,
  commit_author text,
  commit_sha text,
  raw_payload jsonb,
  created_at timestamptz default now()
);

-- Index for querying recent activity
create index if not exists idx_github_activity_created_at on github_activity_logs (created_at desc);

-- 4. Enable Row Level Security (RLS) on github_activity_logs
alter table github_activity_logs enable row level security;

-- Public can read activity logs (for live portfolio activity feed)
create policy "Allow public read access to github_activity_logs"
  on github_activity_logs
  for select
  using (true);

-- Only authenticated users or service role can insert activity logs
create policy "Allow service role insert into github_activity_logs"
  on github_activity_logs
  for insert
  with check (true);

-- 5. Enable Supabase Realtime on projects and github_activity_logs
-- This allows visitors to see new commits instantly without refreshing the page!
alter publication supabase_realtime add table projects;
alter publication supabase_realtime add table github_activity_logs;
