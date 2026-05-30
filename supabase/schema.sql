-- MoboUI Frontend-Aligned Schema
-- This schema mirrors the current app model used in src/lib/store/frontend-app-store.ts
-- It can be used later if you decide to sync local state to Supabase.

create extension if not exists "pgcrypto";

-- Profiles: optional identity table for future sync
create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  email text unique,
  display_name text not null default 'New User',
  avatar_url text,
  role text not null default 'member' check (role in ('member', 'admin')),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

-- Components: source for library entries
create table if not exists public.components (
  id text primary key,
  slug text unique not null,
  name text not null,
  category text not null,
  description text not null,
  tags text[] not null default '{}',
  framework text not null check (framework in ('react-native', 'flutter', 'both')),
  complexity text not null default 'intermediate' check (complexity in ('beginner', 'intermediate', 'advanced')),
  is_premium boolean not null default false,
  popularity integer not null default 0,
  image_url text,
  code_typescript text,
  code_javascript text,
  code_dart text,
  props jsonb not null default '[]'::jsonb,
  examples jsonb not null default '[]'::jsonb,
  dependencies text[] not null default '{}',
  installation text,
  usage text,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

-- Favorites: maps a user to saved component slugs
create table if not exists public.favorites (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  component_slug text not null references public.components(slug) on delete cascade,
  created_at timestamptz not null default timezone('utc', now()),
  unique (profile_id, component_slug)
);

-- Submissions: mirrors local submission object { title, author, description, imageUrl, createdAt }
create table if not exists public.submissions (
  id text primary key,
  title text not null,
  author text not null,
  description text not null,
  image_url text not null,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  profile_id uuid references public.profiles(id) on delete set null,
  reviewed_by uuid references public.profiles(id) on delete set null,
  reviewed_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

-- Helpful indexes
create index if not exists idx_components_category on public.components(category);
create index if not exists idx_components_framework on public.components(framework);
create index if not exists idx_components_tags on public.components using gin(tags);
create index if not exists idx_components_popularity on public.components(popularity desc);
create index if not exists idx_submissions_status on public.submissions(status);
create index if not exists idx_submissions_created_at on public.submissions(created_at desc);
create index if not exists idx_favorites_profile on public.favorites(profile_id);

create extension if not exists pg_trgm;
create index if not exists idx_components_name_trgm on public.components using gin (name gin_trgm_ops);
create index if not exists idx_components_description_trgm on public.components using gin (description gin_trgm_ops);

-- updated_at trigger shared by multiple tables
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

drop trigger if exists trg_profiles_updated_at on public.profiles;
create trigger trg_profiles_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

drop trigger if exists trg_components_updated_at on public.components;
create trigger trg_components_updated_at
before update on public.components
for each row execute function public.set_updated_at();

drop trigger if exists trg_submissions_updated_at on public.submissions;
create trigger trg_submissions_updated_at
before update on public.submissions
for each row execute function public.set_updated_at();

-- Row level security
alter table public.profiles enable row level security;
alter table public.components enable row level security;
alter table public.favorites enable row level security;
alter table public.submissions enable row level security;

-- Public can read components
create policy if not exists "components_select_public"
on public.components
for select
using (true);

-- Authenticated users can insert/update their own profile
create policy if not exists "profiles_select_self"
on public.profiles
for select
using (auth.uid() = id);

create policy if not exists "profiles_upsert_self"
on public.profiles
for all
using (auth.uid() = id)
with check (auth.uid() = id);

-- Favorites scoped to owner
create policy if not exists "favorites_select_owner"
on public.favorites
for select
using (auth.uid() = profile_id);

create policy if not exists "favorites_insert_owner"
on public.favorites
for insert
with check (auth.uid() = profile_id);

create policy if not exists "favorites_delete_owner"
on public.favorites
for delete
using (auth.uid() = profile_id);

-- Submissions: public can read approved, owners can read/write their own
create policy if not exists "submissions_select_public_approved"
on public.submissions
for select
using (status = 'approved' or auth.uid() = profile_id);

create policy if not exists "submissions_insert_owner"
on public.submissions
for insert
with check (auth.uid() = profile_id or profile_id is null);

create policy if not exists "submissions_update_owner_or_admin"
on public.submissions
for update
using (
  auth.uid() = profile_id
  or exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  )
)
with check (
  auth.uid() = profile_id
  or exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  )
);

-- Seed examples compatible with frontend model
insert into public.components (
  id, slug, name, category, description, tags, framework, complexity, is_premium, image_url,
  code_typescript, code_dart
)
values
(
  'glassmorphic-login',
  'glassmorphic-login',
  'Glassmorphic Login',
  'auth',
  'Modern authentication card with blur effects and animated states.',
  '{auth,glass,login}',
  'both',
  'intermediate',
  true,
  'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80',
  'export default function LoginCard() { return null; }',
  'class LoginCard extends StatelessWidget { @override Widget build(BuildContext context) { return const SizedBox(); } }'
),
(
  'analytics-dashboard-card',
  'analytics-dashboard-card',
  'Analytics Dashboard Card',
  'analytics',
  'Compact KPI card set with trend badges and responsive layout.',
  '{analytics,kpi,dashboard}',
  'both',
  'beginner',
  false,
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80',
  'export default function KpiCards() { return null; }',
  'class KpiCards extends StatelessWidget { @override Widget build(BuildContext context) { return const SizedBox(); } }'
)
on conflict (id) do nothing;
