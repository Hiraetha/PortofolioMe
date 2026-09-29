-- Migration 003: Storage Bucket & Policies
-- Bucket: portfolio-images

-- Insert bucket if it doesn't already exist
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'portfolio-images',
  'portfolio-images',
  true,
  5242880, -- 5MB limit
  array['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml']
)
on conflict (id) do update set
  public = true,
  file_size_limit = 5242880,
  allowed_mime_types = array['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'];

-- Storage Policies
-- 1. Public view policy
drop policy if exists "Public Access for Portfolio Images" on storage.objects;
create policy "Public Access for Portfolio Images"
  on storage.objects for select
  using (bucket_id = 'portfolio-images');

-- 2. Authenticated user upload policy
drop policy if exists "Authenticated Upload Portfolio Images" on storage.objects;
create policy "Authenticated Upload Portfolio Images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'portfolio-images');

-- 3. Authenticated user update policy
drop policy if exists "Authenticated Update Portfolio Images" on storage.objects;
create policy "Authenticated Update Portfolio Images"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'portfolio-images');

-- 4. Authenticated user delete policy
drop policy if exists "Authenticated Delete Portfolio Images" on storage.objects;
create policy "Authenticated Delete Portfolio Images"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'portfolio-images');
