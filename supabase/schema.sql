-- Run this in your Supabase project: SQL Editor → New Query → paste & run

create extension if not exists "pgcrypto";

-- ── ORDERS ──────────────────────────────────────────────────────────────
create table if not exists orders (
  id               uuid primary key default gen_random_uuid(),
  created_at       timestamptz not null default now(),
  customer_name    text not null,
  customer_phone   text not null,
  customer_email   text,
  delivery_address text not null,
  status           text not null default 'pending'
                     check (status in ('pending','paid','dispatched','delivered','cancelled')),
  total            integer not null,      -- in KES (whole shillings)
  mpesa_ref        text,
  notes            text
);

-- ── ORDER ITEMS ──────────────────────────────────────────────────────────
create table if not exists order_items (
  id           uuid primary key default gen_random_uuid(),
  order_id     uuid not null references orders(id) on delete cascade,
  product_id   integer not null,
  product_name text not null,
  price        integer not null,
  quantity     integer not null check (quantity > 0)
);

-- ── NEWSLETTER SUBSCRIBERS ───────────────────────────────────────────────
create table if not exists newsletter_subscribers (
  id         uuid primary key default gen_random_uuid(),
  email      text not null unique,
  created_at timestamptz not null default now()
);

-- ── ROW LEVEL SECURITY ───────────────────────────────────────────────────
-- Orders and items: only the service role can read (admin dashboard will use service key)
-- Newsletter: anyone can insert (subscribe), only service role can read

alter table orders enable row level security;
alter table order_items enable row level security;
alter table newsletter_subscribers enable row level security;

-- Allow the anon key to INSERT orders (checkout from the site)
create policy "allow insert orders" on orders
  for insert to anon with check (true);

-- Allow the anon key to INSERT order_items
create policy "allow insert order_items" on order_items
  for insert to anon with check (true);

-- Allow the anon key to INSERT newsletter subscribers
create policy "allow insert newsletter" on newsletter_subscribers
  for insert to anon with check (true);
