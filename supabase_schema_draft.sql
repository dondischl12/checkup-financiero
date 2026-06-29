-- Katalyst Checkup Financiero - Supabase draft schema
-- MVP can run local-only first. Use this later for account-backed progress, resources, admin aggregation, and voluntary support requests.

create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role text not null default 'user' check (role in ('user','admin')),
  created_at timestamptz not null default now()
);

create table if not exists public.checkup_snapshots (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  currency text not null default 'MXN',
  score integer not null check (score between 0 and 100),
  level_label text not null,
  answers jsonb not null,
  derived_metrics jsonb not null,
  recommendations jsonb not null,
  consent_saved boolean not null default false
);

create table if not exists public.learning_modules (
  id text primary key,
  title text not null,
  description text,
  category text,
  estimated_minutes integer,
  order_index integer,
  is_active boolean not null default true,
  content jsonb not null default '{}'::jsonb
);

create table if not exists public.user_module_progress (
  user_id uuid references auth.users(id) on delete cascade,
  module_id text references public.learning_modules(id) on delete cascade,
  progress_percent integer not null default 0 check (progress_percent between 0 and 100),
  completed_at timestamptz,
  updated_at timestamptz not null default now(),
  primary key (user_id, module_id)
);

create table if not exists public.katalyst_events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  event_date timestamptz not null,
  format text,
  location text,
  registration_url text,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.support_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  full_name text not null,
  email text not null,
  phone text,
  reason text not null,
  urgency text not null check (urgency in ('info','this_week','soon')),
  message text,
  status text not null default 'new' check (status in ('new','reviewing','assigned','closed'))
);

alter table public.profiles enable row level security;
alter table public.checkup_snapshots enable row level security;
alter table public.user_module_progress enable row level security;
alter table public.support_requests enable row level security;

create policy "profiles users read own" on public.profiles for select using (auth.uid() = id);
create policy "profiles users update own" on public.profiles for update using (auth.uid() = id);
create policy "snapshots users own" on public.checkup_snapshots for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "progress users own" on public.user_module_progress for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "support insert anyone authenticated" on public.support_requests for insert with check (auth.uid() = user_id or user_id is null);

-- Admin access should be enforced by service role / RPC / edge functions or admin-only policies after final auth design.