-- Katalyst Checkup Financiero - Supabase draft schema (v2)
-- MVP runs local-only first; this is the .sql to apply later when Supabase is connected.
--
-- Design: there are NO end-user accounts. Everyone completes the checkup as a guest —
-- answers stay local (localStorage) unless the browser submits an anonymous, non-identifying
-- snapshot for aggregate analytics. The only real login is for Katalyst staff, who can read
-- aggregated analytics (never an individual snapshot's raw answers).

create extension if not exists pgcrypto;

-- Katalyst staff / admin accounts — the only people who ever log in.
create table if not exists public.katalyst_staff (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  role text not null default 'staff' check (role in ('staff', 'admin')),
  created_at timestamptz not null default now()
);

-- Anonymous analytics row. No name, no email, no user_id, no raw free-text answers —
-- just the score, its level, and the numeric derived metrics, so Katalyst can understand
-- community-level financial health without ever seeing an individual's responses.
create table if not exists public.checkup_snapshots (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  created_month date generated always as (date_trunc('month', created_at)::date) stored,
  -- Random UUID generated in the browser purely to de-duplicate retries from the same
  -- session; it is never linked to a name, email, or account, so it cannot identify anyone.
  client_ref uuid,
  currency text not null default 'MXN',
  score integer not null check (score between 0 and 100),
  level_label text not null,
  derived_metrics jsonb not null,
  score_breakdown jsonb not null
);

create index if not exists checkup_snapshots_created_month_idx on public.checkup_snapshots (created_month);

-- Public content — not user data.
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

-- Explicit, voluntary "contact me" requests from the checkup ("Quiero que me contacten").
-- Kept separate from checkup_snapshots on purpose: this is the one place a name/email is
-- ever stored, and only because the person opted in to being contacted by Katalyst.
create table if not exists public.support_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  full_name text not null,
  email text not null,
  phone text,
  reason text not null,
  urgency text not null check (urgency in ('info', 'this_week', 'soon')),
  message text,
  status text not null default 'new' check (status in ('new', 'reviewing', 'assigned', 'closed'))
);

alter table public.katalyst_staff enable row level security;
alter table public.checkup_snapshots enable row level security;
alter table public.support_requests enable row level security;

-- Staff can see their own staff row (needed to check their own role); nobody else can.
create policy "staff read own row" on public.katalyst_staff
  for select using (auth.uid() = id);

-- Anyone (including anonymous/guest sessions) can submit a snapshot. Nobody — not even the
-- submitter — can read, update, or delete snapshots afterwards; only staff can, via the
-- policy below. This is what makes the analytics one-way and non-identifying.
create policy "anyone can insert an anonymous snapshot" on public.checkup_snapshots
  for insert with check (true);

create policy "staff can read snapshots" on public.checkup_snapshots
  for select using (exists (select 1 from public.katalyst_staff where id = auth.uid()));

-- Support requests: insert is open (it's how the voluntary contact form works), but only
-- staff can read/manage the resulting inbox.
create policy "anyone can submit a support request" on public.support_requests
  for insert with check (true);

create policy "staff can read support requests" on public.support_requests
  for select using (exists (select 1 from public.katalyst_staff where id = auth.uid()));

create policy "staff can update support requests" on public.support_requests
  for update using (exists (select 1 from public.katalyst_staff where id = auth.uid()));

-- Aggregate-only view for the admin panel. It inherits checkup_snapshots' RLS (views run
-- with the querying user's permissions unless marked security_definer, which this is not),
-- so only staff can query it — and even they only ever see aggregates, never a raw row.
create or replace view public.checkup_snapshots_agg as
select
  created_month,
  count(*) as snapshot_count,
  round(avg(score), 1) as avg_score,
  round(avg((derived_metrics->>'savingsRate')::numeric), 3) as avg_savings_rate,
  round(avg((derived_metrics->>'debtToIncome')::numeric), 3) as avg_debt_to_income,
  round(avg((derived_metrics->>'emergencyMonths')::numeric), 1) as avg_emergency_months
from public.checkup_snapshots
group by created_month
order by created_month desc;
