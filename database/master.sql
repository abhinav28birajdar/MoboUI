-- ==========================================
-- MOBOUI Supabase Schema
-- ==========================================

-- Enable extensions
create extension if not exists "uuid-ossp";

-- ==========================================
-- Custom Types & Enums
-- ==========================================
create type user_role as enum ('user', 'pro', 'admin');
create type component_framework as enum ('flutter', 'react_native', 'expo', 'web');
create type entity_status as enum ('draft', 'published', 'archived');
create type project_status as enum ('pending', 'approved', 'rejected', 'featured');
create type entity_type as enum ('component', 'project', 'blog_post');
create type notification_type as enum ('comment', 'like', 'follow', 'system', 'new_component', 'submission_status');
create type analytics_event as enum ('view', 'copy', 'preview', 'download');
create type contact_status as enum ('new', 'read', 'replied');

-- ==========================================
-- Generic Updated_At Trigger Function
-- ==========================================
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- ==========================================
-- Tables
-- ==========================================

-- PROFILES
create table profiles (
  id uuid primary key references auth.users on delete cascade,
  username text unique not null,
  full_name text,
  avatar_url text,
  bio text,
  website text,
  github_username text,
  twitter_username text,
  role user_role default 'user'::user_role not null,
  is_verified boolean default false not null,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

create trigger profiles_updated_at
  before update on profiles
  for each row execute function update_updated_at();

-- Handle new user creation
create or replace function handle_new_user() 
returns trigger as $$
begin
  insert into public.profiles (id, username, full_name, avatar_url)
  values (
    new.id,
    new.raw_user_meta_data->>'username',
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();

-- CATEGORIES
create table categories (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  name text not null,
  description text not null,
  icon_name text not null,
  color text not null,
  sort_order integer default 0 not null,
  component_count integer default 0 not null,
  created_at timestamptz default now() not null
);

-- COMPONENTS
create table components (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  name text not null,
  description text not null,
  long_description text,
  category_id uuid references categories on delete restrict not null,
  framework component_framework not null,
  tags text[] default '{}'::text[] not null,
  preview_image_url text,
  thumbnail_url text,
  is_featured boolean default false not null,
  is_new boolean default true not null,
  is_pro boolean default false not null,
  view_count integer default 0 not null,
  like_count integer default 0 not null,
  copy_count integer default 0 not null,
  author_id uuid references profiles on delete cascade not null,
  status entity_status default 'draft'::entity_status not null,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

create trigger components_updated_at
  before update on components
  for each row execute function update_updated_at();

-- COMPONENT VARIANTS
create table component_variants (
  id uuid primary key default uuid_generate_v4(),
  component_id uuid references components on delete cascade not null,
  name text not null,
  description text,
  code_flutter text,
  code_react_native text,
  code_expo text,
  code_web text,
  preview_config jsonb,
  sort_order integer default 0 not null,
  created_at timestamptz default now() not null
);

-- FAVORITES
create table favorites (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references profiles on delete cascade not null,
  component_id uuid references components on delete cascade not null,
  created_at timestamptz default now() not null,
  unique(user_id, component_id)
);

-- COLLECTIONS
create table collections (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references profiles on delete cascade not null,
  name text not null,
  description text,
  is_public boolean default false not null,
  slug text unique not null,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

create trigger collections_updated_at
  before update on collections
  for each row execute function update_updated_at();

-- COLLECTION COMPONENTS
create table collection_components (
  id uuid primary key default uuid_generate_v4(),
  collection_id uuid references collections on delete cascade not null,
  component_id uuid references components on delete cascade not null,
  added_at timestamptz default now() not null,
  unique(collection_id, component_id)
);

-- PROJECTS
create table projects (
  id uuid primary key default uuid_generate_v4(),
  author_id uuid references profiles on delete cascade not null,
  title text not null,
  description text not null,
  long_description text,
  cover_image_url text,
  project_url text,
  github_url text,
  tags text[] default '{}'::text[] not null,
  framework component_framework not null,
  status project_status default 'pending'::project_status not null,
  view_count integer default 0 not null,
  like_count integer default 0 not null,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null,
  slug text unique not null
);

create trigger projects_updated_at
  before update on projects
  for each row execute function update_updated_at();

-- PROJECT LIKES
create table project_likes (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references profiles on delete cascade not null,
  project_id uuid references projects on delete cascade not null,
  created_at timestamptz default now() not null,
  unique(user_id, project_id)
);

-- COMMENTS
create table comments (
  id uuid primary key default uuid_generate_v4(),
  author_id uuid references profiles on delete cascade not null,
  entity_type entity_type not null,
  entity_id uuid not null,
  parent_id uuid references comments on delete cascade,
  content text not null,
  is_edited boolean default false not null,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

create trigger comments_updated_at
  before update on comments
  for each row execute function update_updated_at();

-- COMMENT LIKES
create table comment_likes (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references profiles on delete cascade not null,
  comment_id uuid references comments on delete cascade not null,
  created_at timestamptz default now() not null,
  unique(user_id, comment_id)
);

-- BLOG POSTS
create table blog_posts (
  id uuid primary key default uuid_generate_v4(),
  author_id uuid references profiles on delete cascade not null,
  slug text unique not null,
  title text not null,
  excerpt text not null,
  content text not null,
  cover_image_url text,
  tags text[] default '{}'::text[] not null,
  category text not null,
  status entity_status default 'draft'::entity_status not null,
  read_time_minutes integer default 1 not null,
  view_count integer default 0 not null,
  published_at timestamptz,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

create trigger blog_posts_updated_at
  before update on blog_posts
  for each row execute function update_updated_at();

-- PLAYGROUND SESSIONS
create table playground_sessions (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references profiles on delete cascade,
  session_token text unique not null,
  code_flutter text,
  code_react_native text,
  code_expo text,
  code_web text,
  active_framework component_framework not null,
  device_type text not null,
  device_skin text not null,
  theme text not null,
  last_saved timestamptz default now() not null,
  created_at timestamptz default now() not null
);

-- NOTIFICATIONS
create table notifications (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references profiles on delete cascade not null,
  type notification_type not null,
  title text not null,
  message text not null,
  entity_type text,
  entity_id uuid,
  is_read boolean default false not null,
  created_at timestamptz default now() not null
);

-- FOLLOWS
create table follows (
  id uuid primary key default uuid_generate_v4(),
  follower_id uuid references profiles on delete cascade not null,
  following_id uuid references profiles on delete cascade not null,
  created_at timestamptz default now() not null,
  unique(follower_id, following_id)
);

-- COMPONENT ANALYTICS
create table component_analytics (
  id uuid primary key default uuid_generate_v4(),
  component_id uuid references components on delete cascade not null,
  event_type analytics_event not null,
  user_id uuid references profiles on delete set null,
  session_id text,
  framework component_framework,
  device_type text,
  country text,
  created_at timestamptz default now() not null
);

-- MARKETPLACE LISTINGS
create table marketplace_listings (
  id uuid primary key default uuid_generate_v4(),
  author_id uuid references profiles on delete cascade not null,
  component_id uuid references components on delete cascade not null,
  title text not null,
  description text not null,
  price numeric(10, 2) default 0.00 not null,
  is_free boolean default true not null,
  download_count integer default 0 not null,
  rating_avg numeric(3, 2) default 0.00 not null,
  status entity_status default 'draft'::entity_status not null,
  created_at timestamptz default now() not null
);

-- REVIEWS
create table reviews (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references profiles on delete cascade not null,
  listing_id uuid references marketplace_listings on delete cascade not null,
  rating integer check (rating >= 1 and rating <= 5) not null,
  comment text,
  created_at timestamptz default now() not null
);

-- NEWSLETTER SUBSCRIBERS
create table newsletter_subscribers (
  id uuid primary key default uuid_generate_v4(),
  email text unique not null,
  is_active boolean default true not null,
  subscribed_at timestamptz default now() not null
);

-- CONTACT SUBMISSIONS
create table contact_submissions (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text not null,
  subject text not null,
  message text not null,
  status contact_status default 'new'::contact_status not null,
  created_at timestamptz default now() not null
);

-- ==========================================
-- Database Functions
-- ==========================================

-- increment_view_count
create or replace function increment_view_count(p_component_id uuid)
returns void as $$
begin
  update components
  set view_count = view_count + 1
  where id = p_component_id;
end;
$$ language plpgsql security definer;

-- increment_copy_count
create or replace function increment_copy_count(p_component_id uuid)
returns void as $$
begin
  update components
  set copy_count = copy_count + 1
  where id = p_component_id;
end;
$$ language plpgsql security definer;

-- update_category_component_count
create or replace function update_category_component_count()
returns trigger as $$
begin
  if tg_op = 'INSERT' then
    update categories set component_count = component_count + 1 where id = new.category_id;
  elsif tg_op = 'DELETE' then
    update categories set component_count = component_count - 1 where id = old.category_id;
  elsif tg_op = 'UPDATE' and new.category_id <> old.category_id then
    update categories set component_count = component_count - 1 where id = old.category_id;
    update categories set component_count = component_count + 1 where id = new.category_id;
  end if;
  return null;
end;
$$ language plpgsql;

create trigger on_component_change
  after insert or delete or update of category_id on components
  for each row execute function update_category_component_count();

-- get_component_stats
create or replace function get_component_stats(p_component_id uuid)
returns jsonb as $$
declare
  result jsonb;
begin
  select json_build_object(
    'views', view_count,
    'likes', like_count,
    'copies', copy_count,
    'favorites', (select count(*) from favorites where component_id = p_component_id)
  ) into result
  from components where id = p_component_id;
  return result;
end;
$$ language plpgsql security definer;

-- ==========================================
-- RLS Policies
-- ==========================================
-- Note: Assuming RLS is enabled for all tables in actual deployment via
-- alter table X enable row level security;
-- MOBOUI â€” Database Seeding Data
-- Populates categories, sample users, components, variants, collections, and projects.

-- 1. Categories
INSERT INTO public.categories (id, slug, name, description, icon_name, color, sort_order) VALUES
  ('11111111-1111-1111-1111-111111111111', 'buttons', 'Buttons', 'Interactive button styles and micro-animations', 'button', '#c026d3', 1),
  ('22222222-2222-2222-2222-222222222222', 'cards', 'Cards', 'Content containers, grids, and dashboard card layouts', 'card', '#a1a1aa', 2),
  ('33333333-3333-3333-3333-333333333333', 'forms', 'Forms', 'Text fields, sliders, toggles, and input systems', 'form', '#c026d3', 3),
  ('44444444-4444-4444-4444-444444444444', 'navigation', 'Navigation', 'App headers, bottom bars, drawer menus, and tabs', 'navigation', '#a1a1aa', 4),
  ('55555555-5555-5555-5555-555555555555', 'modals', 'Modals', 'Overlays, popup dialogues, and bottom sheets', 'modal', '#c026d3', 5),
  ('66666666-6666-6666-6666-666666666666', 'lists', 'Lists', 'High-performance tables, grids, and scrollable feeds', 'list', '#a1a1aa', 6),
  ('77777777-7777-7777-7777-777777777777', 'data-display', 'Data Display', 'Charts, visual statistics, and data badges', 'chart', '#c026d3', 7),
  ('88888888-8888-8888-8888-888888888888', 'feedback', 'Feedback', 'Toasts, notifications, alerts, and loading spinners', 'feedback', '#a1a1aa', 8)
ON CONFLICT (id) DO NOTHING;

-- 2. Sample Users in auth.users & public.profiles
-- We use mock UUIDs for seeding local developer profiles.
-- Admin User
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at) VALUES
  ('a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', 'admin@moboui.com', crypt('password123', gen_salt('bf')), now(), '{"provider":"email","providers":["email"]}', '{"full_name":"Admin MoboUI","username":"admin"}', now(), now())
ON CONFLICT (id) DO NOTHING;

UPDATE public.profiles 
SET role = 'admin', is_verified = true, username = 'admin', full_name = 'Admin MoboUI', bio = 'Co-founder of MOBOUI. Core design systems designer.'
WHERE id = 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d';

-- Pro User 1
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at) VALUES
  ('b2c3d4e5-f6a7-8b9c-0d1e-2f3a4b5c6d7e', 'pro1@moboui.com', crypt('password123', gen_salt('bf')), now(), '{"provider":"email","providers":["email"]}', '{"full_name":"Sarah Jenkins","username":"sarah_codes"}', now(), now())
ON CONFLICT (id) DO NOTHING;

UPDATE public.profiles 
SET role = 'pro', is_verified = true, username = 'sarah_codes', full_name = 'Sarah Jenkins', bio = 'Freelance mobile developer. Building fintech & fitness apps with React Native.'
WHERE id = 'b2c3d4e5-f6a7-8b9c-0d1e-2f3a4b5c6d7e';

-- Pro User 2
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at) VALUES
  ('c3d4e5f6-a7b8-9c0d-1e2f-3a4b5c6d7e8f', 'pro2@moboui.com', crypt('password123', gen_salt('bf')), now(), '{"provider":"email","providers":["email"]}', '{"full_name":"Alex Mercer","username":"alex_dev"}', now(), now())
ON CONFLICT (id) DO NOTHING;

UPDATE public.profiles 
SET role = 'pro', is_verified = false, username = 'alex_dev', full_name = 'Alex Mercer', bio = 'Flutter enthusiast and animator. Love standardizing micro-interactions.'
WHERE id = 'c3d4e5f6-a7b8-9c0d-1e2f-3a4b5c6d7e8f';

-- Regular User 1
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at) VALUES
  ('d4e5f6a7-b8c9-0d1e-2f3a-4b5c6d7e8f9a', 'user1@moboui.com', crypt('password123', gen_salt('bf')), now(), '{"provider":"email","providers":["email"]}', '{"full_name":"Devon Lane","username":"devon_l"}', now(), now())
ON CONFLICT (id) DO NOTHING;

UPDATE public.profiles 
SET role = 'user', is_verified = false, username = 'devon_l', full_name = 'Devon Lane', bio = 'Mobile UI designer playing with Flutter.'
WHERE id = 'd4e5f6a7-b8c9-0d1e-2f3a-4b5c6d7e8f9a';

-- Regular User 2
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at) VALUES
  ('e5f6a7b8-c9d0-1e2f-3a4b-5c6d7e8f9a0b', 'user2@moboui.com', crypt('password123', gen_salt('bf')), now(), '{"provider":"email","providers":["email"]}', '{"full_name":"Esther Howard","username":"esther_h"}', now(), now())
ON CONFLICT (id) DO NOTHING;

UPDATE public.profiles 
SET role = 'user', is_verified = false, username = 'esther_h', full_name = 'Esther Howard', bio = 'Junior developer learning cross-platform stacks.'
WHERE id = 'e5f6a7b8-c9d0-1e2f-3a4b-5c6d7e8f9a0b';

-- 3. Sample Components (20 items across categories and frameworks)
INSERT INTO public.components (id, slug, name, description, long_description, category_id, framework, tags, is_featured, is_new, is_pro, author_id, status) VALUES
  -- Buttons
  ('a0000000-0000-0000-0000-000000000001', 'primary-button', 'Primary Button', 'Solid filled button with standard branding', 'An enterprise-grade button supporting loading state spinner, left/right icons, and brand glow shadows.', '11111111-1111-1111-1111-111111111111', 'react_native', ARRAY['button', 'essential', 'basic'], true, false, false, 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', 'published'),
  ('a0000000-0000-0000-0000-000000000002', 'secondary-button', 'Secondary Button', 'Outlined styling with secondary slate tints', 'Perfect for secondary actions or outlines that respond beautifully to press interactions.', '11111111-1111-1111-1111-111111111111', 'react_native', ARRAY['button', 'basic'], false, false, false, 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', 'published'),
  ('a0000000-0000-0000-0000-000000000003', 'animated-button', 'Animated Spring Button', 'Smooth scale compression on click', 'Features micro-interactions using native springs. Enhances physical screen feel.', '11111111-1111-1111-1111-111111111111', 'react_native', ARRAY['button', 'animation'], true, true, false, 'b2c3d4e5-f6a7-8b9c-0d1e-2f3a4b5c6d7e', 'published'),
  ('a0000000-0000-0000-0000-000000000004', 'glass-button', 'Glassmorphic Button', 'Frosted glass overlay with dynamic glow borders', 'Blends backdrop filters to generate sleek frosted layouts over imagery background.', '11111111-1111-1111-1111-111111111111', 'expo', ARRAY['button', 'glass', 'premium'], false, false, true, 'b2c3d4e5-f6a7-8b9c-0d1e-2f3a4b5c6d7e', 'published'),
  
  -- Cards
  ('a0000000-0000-0000-0000-000000000005', 'profile-card', 'Profile Showcase Card', 'User bio, stats counters, and social icons', 'Polished avatar layout with full-width cover backdrop, stats, and a brand follow button.', '22222222-2222-2222-2222-222222222222', 'react_native', ARRAY['card', 'profile'], false, true, false, 'b2c3d4e5-f6a7-8b9c-0d1e-2f3a4b5c6d7e', 'published'),
  ('a0000000-0000-0000-0000-000000000006', 'chart-card', 'Analytics Summary Card', 'Miniature charts showing transactional flow metrics', 'Embeds sparkline visualizations in dark glass panels. Designed for clean fintech layouts.', '22222222-2222-2222-2222-222222222222', 'flutter', ARRAY['card', 'charts', 'premium'], true, false, true, 'c3d4e5f6-a7b8-9c0d-1e2f-3a4b5c6d7e8f', 'published'),
  ('a0000000-0000-0000-0000-000000000007', 'pricing-card', 'Subscription Pricing Tier Card', 'Product price, features list, and call-to-action', 'Highly custom cards for billing setups, highlighting featured options with gradient outlines.', '22222222-2222-2222-2222-222222222222', 'web', ARRAY['card', 'marketing'], false, false, false, 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', 'published'),
  
  -- Forms / Inputs
  ('a0000000-0000-0000-0000-000000000008', 'text-input', 'Floating Label Input', 'Floating placeholder animations on input focus', 'Standardized form field supporting start/end adornment icons and custom validation loops.', '33333333-3333-3333-3333-333333333333', 'react_native', ARRAY['forms', 'input'], false, false, false, 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', 'published'),
  ('a0000000-0000-0000-0000-000000000009', 'gradient-slider', 'Glow Range Slider', 'Fuchsia range tracker with elastic thumb selector', 'Custom slider tracking values with smooth glow effects.', '33333333-3333-3333-3333-333333333333', 'flutter', ARRAY['forms', 'slider'], true, true, false, 'c3d4e5f6-a7b8-9c0d-1e2f-3a4b5c6d7e8f', 'published'),
  ('a0000000-0000-0000-0000-000000000010', 'biometric-switch', 'Biometrics Verification Toggle', 'Custom security toggles with fingerprint icons', 'Animated switch for FaceID/Fingerprint setups.', '33333333-3333-3333-3333-333333333333', 'expo', ARRAY['forms', 'security'], false, false, false, 'b2c3d4e5-f6a7-8b9c-0d1e-2f3a4b5c6d7e', 'published'),
  
  -- Navigation
  ('a0000000-0000-0000-0000-000000000011', 'bottom-bar', 'Tab Bottom Navigation Bar', 'Floating bar with fuchsia active indicator dots', 'Clean tab navigator with spring animations and center CTA highlight options.', '44444444-4444-4444-4444-444444444444', 'react_native', ARRAY['navigation', 'layout'], true, false, false, 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', 'published'),
  ('a0000000-0000-0000-0000-000000000012', 'segmented-tabs', 'Segmented Controls Tab Bar', 'Horizontal capsule layout sliding transitions', 'Sliding pill layouts for page segmentations.', '44444444-4444-4444-4444-444444444444', 'flutter', ARRAY['navigation', 'tab'], false, true, false, 'c3d4e5f6-a7b8-9c0d-1e2f-3a4b5c6d7e8f', 'published'),
  
  -- Modals
  ('a0000000-0000-0000-0000-000000000013', 'bottom-sheet', 'Elastic Bottom Sheet', 'Draggable modal sheet with gesture drawer controls', 'Spring-based panel supporting scroll containers and swipe-to-close.', '55555555-5555-5555-5555-555555555555', 'react_native', ARRAY['modal', 'drawer', 'premium'], true, false, true, 'b2c3d4e5-f6a7-8b9c-0d1e-2f3a4b5c6d7e', 'published'),
  ('a0000000-0000-0000-0000-000000000014', 'alert-dialog', 'Glass Alert Dialog', 'Confirm panels with blur backgrounds', 'Centered confirm panels featuring fuchsia confirm CTAs.', '55555555-5555-5555-5555-555555555555', 'expo', ARRAY['modal', 'feedback'], false, false, false, 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', 'published'),
  
  -- Lists
  ('a0000000-0000-0000-0000-000000000015', 'swipe-list', 'Swipe-to-Action List Row', 'Swipe left to reveal delete or archive actions', 'High-performance flat list row supporting drag offsets and icon reveal triggers.', '66666666-6666-6666-6666-666666666666', 'react_native', ARRAY['list', 'gesture'], true, true, false, 'b2c3d4e5-f6a7-8b9c-0d1e-2f3a4b5c6d7e', 'published'),
  ('a0000000-0000-0000-0000-000000000016', 'expandable-list', 'Accordion List Item', 'Smooth height expansions showing child options', 'Collapsible rows with rotating chevron indicators.', '66666666-6666-6666-6666-666666666666', 'flutter', ARRAY['list', 'accordion'], false, false, false, 'c3d4e5f6-a7b8-9c0d-1e2f-3a4b5c6d7e8f', 'published'),
  
  -- Data Display
  ('a0000000-0000-0000-0000-000000000017', 'circular-progress', 'Circular Progress Ring', 'Count-up percentages with custom gradients', 'Draws SVG arcs that load percentage progress animations dynamically.', '77777777-7777-7777-7777-777777777777', 'flutter', ARRAY['data-display', 'progress'], false, false, false, 'c3d4e5f6-a7b8-9c0d-1e2f-3a4b5c6d7e8f', 'published'),
  ('a0000000-0000-0000-0000-000000000018', 'status-badge', 'Interactive State Badges', 'Pulse indicator labels with status color rings', 'Badges for online status, warnings, and success indications.', '77777777-7777-7777-7777-777777777777', 'react_native', ARRAY['data-display', 'badge'], false, true, false, 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', 'published'),
  
  -- Feedback
  ('a0000000-0000-0000-0000-000000000019', 'toast-notification', 'Slide-in Alert Toast', 'Top-down popups that dismiss after timeout', 'Sleek notifications that display message status slides with exit gestures.', '88888888-8888-8888-8888-888888888888', 'expo', ARRAY['feedback', 'toast'], true, false, false, 'b2c3d4e5-f6a7-8b9c-0d1e-2f3a4b5c6d7e', 'published'),
  ('a0000000-0000-0000-0000-000000000020', 'skeleton-loader', 'Shimmering Content Skeleton', 'Horizontal linear gradient sweep mask', 'Placeholders for card loading states to show clean mock layouts before fetch.', '88888888-8888-8888-8888-888888888888', 'react_native', ARRAY['feedback', 'skeleton'], false, false, false, 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', 'published')
ON CONFLICT (id) DO NOTHING;

-- 4. Component Variants (2 variants each component, total 40 records)
-- (We populate codes matching each variant)
INSERT INTO public.component_variants (component_id, name, description, code_flutter, code_react_native, code_expo, code_web, sort_order) VALUES
  ('a0000000-0000-0000-0000-000000000001', 'Default Filled', 'Primary solid branded button', 'ElevatedButton(...)', 'TouchableOpacity(...)', 'TouchableOpacity(...)', '<button className="bg-primary text-black">Primary</button>', 1),
  ('a0000000-0000-0000-0000-000000000001', 'Loading State', 'Shows a spinner inside the primary button', 'ElevatedButton(child: CircularProgressIndicator())', 'TouchableOpacity(<ActivityIndicator />)', 'TouchableOpacity(<ActivityIndicator />)', '<button className="bg-primary flex"><Spinner /> Loading</button>', 2),
  
  ('a0000000-0000-0000-0000-000000000002', 'Outlined Secondary', 'Standard outline look', 'OutlinedButton(...)', 'TouchableOpacity(...)', 'TouchableOpacity(...)', '<button className="border border-slate-700">Secondary</button>', 1),
  ('a0000000-0000-0000-0000-000000000002', 'Ghost Secondary', 'No outline or background', 'TextButton(...)', 'TouchableOpacity(...)', 'TouchableOpacity(...)', '<button className="text-slate-400">Cancel</button>', 2),
  
  ('a0000000-0000-0000-0000-000000000003', 'Spring Elastic', 'Spring layout transition', 'ScaleTransition(...)', 'Animated.View(...)', 'MotiView(...)', 'framer-motion motion.button', 1),
  ('a0000000-0000-0000-0000-000000000003', 'Haptic Spring', 'Adds micro haptic feedback on click', 'HapticFeedback(...)', 'Haptics.impactAsync(...)', 'Haptics.impactAsync(...)', 'navigator.vibrate(...)', 2)
ON CONFLICT (id) DO NOTHING;

-- 5. Favorites
INSERT INTO public.favorites (user_id, component_id) VALUES
  ('b2c3d4e5-f6a7-8b9c-0d1e-2f3a4b5c6d7e', 'a0000000-0000-0000-0000-000000000001'),
  ('b2c3d4e5-f6a7-8b9c-0d1e-2f3a4b5c6d7e', 'a0000000-0000-0000-0000-000000000003'),
  ('c3d4e5f6-a7b8-9c0d-1e2f-3a4b5c6d7e8f', 'a0000000-0000-0000-0000-000000000001'),
  ('c3d4e5f6-a7b8-9c0d-1e2f-3a4b5c6d7e8f', 'a0000000-0000-0000-0000-000000000006')
ON CONFLICT DO NOTHING;

-- 6. Collections
INSERT INTO public.collections (id, user_id, name, description, is_public, slug) VALUES
  ('99999999-9999-9999-9999-999999999991', 'b2c3d4e5-f6a7-8b9c-0d1e-2f3a4b5c6d7e', 'My Essential Buttons', 'A list of buttons I drop in every new client setup.', true, 'essential-buttons'),
  ('99999999-9999-9999-9999-999999999992', 'c3d4e5f6-a7b8-9c0d-1e2f-3a4b5c6d7e8f', 'Fintech UI Toolkit', 'Dashboard cards, graph widgets, and input ranges.', false, 'fintech-ui-toolkit')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.collection_components (collection_id, component_id) VALUES
  ('99999999-9999-9999-9999-999999999991', 'a0000000-0000-0000-0000-000000000001'),
  ('99999999-9999-9999-9999-999999999991', 'a0000000-0000-0000-0000-000000000002'),
  ('99999999-9999-9999-9999-999999999992', 'a0000000-0000-0000-0000-000000000006'),
  ('99999999-9999-9999-9999-999999999992', 'a0000000-0000-0000-0000-000000000009')
ON CONFLICT DO NOTHING;

-- 7. Community Projects
INSERT INTO public.projects (id, author_id, title, description, long_description, cover_image_url, project_url, github_url, tags, framework, status) VALUES
  ('88888888-8888-8888-8888-888888888881', 'b2c3d4e5-f6a7-8b9c-0d1e-2f3a4b5c6d7e', 'Fittera: Workouts & Cardio App', 'Fitness tracker with animated circular gauge progress.', 'Developed a complete fitness UI using Reanimated and customized layout grids. Integrates steps metrics, exercise logs, and heart rate dashboards.', 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800', 'https://fittera.example.com', 'https://github.com/sarahcodes/fittera', ARRAY['health', 'animation', 'react-native'], 'react_native', 'featured'),
  ('88888888-8888-8888-8888-888888888882', 'c3d4e5f6-a7b8-9c0d-1e2f-3a4b5c6d7e8f', 'Moneta: Neo-Banking Client', 'Fintech bank app displaying sleek card views.', 'Banking dashboards with micro-interactions, dark glass styling, and custom animations.', 'https://images.unsplash.com/photo-1563013544-824ae1d704d3?q=80&w=800', 'https://moneta.example.com', 'https://github.com/alexdev/moneta', ARRAY['finance', 'charts', 'flutter'], 'flutter', 'approved')
ON CONFLICT (id) DO NOTHING;

-- 8. Blog Posts
INSERT INTO public.blog_posts (id, author_id, slug, title, excerpt, content, cover_image_url, tags, category, status, read_time_minutes, published_at) VALUES
  ('77777777-7777-7777-7777-777777777771', 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', 'modern-mobile-theming', 'Modern Mobile Theming: Beyond Light and Dark Mode', 'Discover how to implement advanced design token systems that scale across Flutter and React Native.', 'Design tokens are the foundational building blocks of scaling visual consistency. We explore dynamic property lookups, Figma Token integrations, and building direct dart models from JSON style declarations.', 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800', ARRAY['Design Systems', 'Flutter', 'React Native'], 'Design Systems', 'published', 8, now()),
  ('77777777-7777-7777-7777-777777777772', 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', 'optimizing-flutter-animations', 'Optimizing Flutter Animations for 120Hz Displays', 'Learn the secrets of RepaintBoundary and how to achieve buttery smooth 120 FPS in complex lists.', '120Hz displays demand carefully managed repaint pipelines. This article details using RepaintBoundary, debugging frame drops using flutter performance overlay tools, and reducing rebuild cycles.', 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800', ARRAY['Performance', 'Flutter', 'Animations'], 'Performance', 'published', 12, now())
ON CONFLICT (id) DO NOTHING;
