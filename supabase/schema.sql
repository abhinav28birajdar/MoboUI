-- MobileUIKit Supabase Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Create components table
create table public.components (
    id uuid primary key default uuid_generate_v4(),
    slug text unique not null,
    name text not null,
    description text,
    framework text not null check (framework in ('react-native', 'flutter', 'both')),
    category text not null,
    tags text[] default '{}',
    code_rn text,
    code_flutter text,
    props jsonb default '[]',
    usage text,
    preview_url text,
    popularity integer default 0,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Create themes table
create table public.themes (
    id uuid primary key default uuid_generate_v4(),
    name text not null,
    description text,
    config jsonb not null,
    author_id uuid references auth.users(id),
    is_public boolean default true,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Create collections table (for community)
create table public.collections (
    id uuid primary key default uuid_generate_v4(),
    name text not null,
    description text,
    owner_id uuid references auth.users(id) not null,
    is_public boolean default true,
    component_ids uuid[] default '{}',
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Set up Row Level Security (RLS)
alter table public.components enable row level security;
alter table public.themes enable row level security;
alter table public.collections enable row level security;

-- Policies for components (Read only for everyone)
create policy "Components are viewable by everyone" on public.components
    for select using (true);

-- Policies for themes
create policy "Public themes are viewable by everyone" on public.themes
    for select using (is_public = true);

create policy "Users can create their own themes" on public.themes
    for insert with check (auth.uid() = author_id);

-- 5. Helper function for full text search
create extension if not exists pg_trgm;
create index idx_components_name_trgm on public.components using gin (name gin_trgm_ops);
create index idx_components_tags on public.components using gin (tags);

-- 6. Trigger for updated_at
create or replace function update_updated_at_column()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language plpgsql;

create trigger update_components_updated_at 
    before update on public.components 
    for each row execute function update_updated_at_column();
