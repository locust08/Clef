create extension if not exists pgcrypto;

create table if not exists public.user_favourites (
  id uuid primary key default gen_random_uuid(),
  user_id text not null,
  product_id text not null,
  created_at timestamptz not null default now(),
  constraint user_favourites_user_product_unique unique (user_id, product_id)
);

create index if not exists user_favourites_user_id_idx
  on public.user_favourites (user_id);

create index if not exists user_favourites_product_id_idx
  on public.user_favourites (product_id);
