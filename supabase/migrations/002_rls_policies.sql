-- Migration 002: Row Level Security (RLS) Policies
-- Public read access for published content, authenticated admin full access

-- 1. Enable RLS
alter table profiles enable row level security;
alter table projects enable row level security;
alter table achievements enable row level security;
alter table technologies enable row level security;
alter table timeline_items enable row level security;

-- 2. Profiles Policies
create policy "Public can view profiles"
  on profiles for select
  using (true);

create policy "Authenticated users can insert profile"
  on profiles for insert
  to authenticated
  with check (auth.uid() = id);

create policy "Authenticated users can update profile"
  on profiles for update
  to authenticated
  using (auth.uid() = id);

create policy "Authenticated users can delete profile"
  on profiles for delete
  to authenticated
  using (auth.uid() = id);

-- 3. Projects Policies
create policy "Public can view published projects"
  on projects for select
  using (published = true);

create policy "Authenticated users can view all projects"
  on projects for select
  to authenticated
  using (true);

create policy "Authenticated users can insert projects"
  on projects for insert
  to authenticated
  with check (true);

create policy "Authenticated users can update projects"
  on projects for update
  to authenticated
  using (true)
  with check (true);

create policy "Authenticated users can delete projects"
  on projects for delete
  to authenticated
  using (true);

-- 4. Achievements Policies
create policy "Public can view achievements"
  on achievements for select
  using (true);

create policy "Authenticated users can insert achievements"
  on achievements for insert
  to authenticated
  with check (true);

create policy "Authenticated users can update achievements"
  on achievements for update
  to authenticated
  using (true)
  with check (true);

create policy "Authenticated users can delete achievements"
  on achievements for delete
  to authenticated
  using (true);

-- 5. Technologies Policies
create policy "Public can view technologies"
  on technologies for select
  using (true);

create policy "Authenticated users can manage technologies"
  on technologies for all
  to authenticated
  using (true)
  with check (true);

-- 6. Timeline Items Policies
create policy "Public can view timeline items"
  on timeline_items for select
  using (true);

create policy "Authenticated users can manage timeline items"
  on timeline_items for all
  to authenticated
  using (true)
  with check (true);
