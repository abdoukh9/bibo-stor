-- BIBO STOR: initial Supabase schema
-- Run this file in Supabase Dashboard -> SQL Editor only after creating the project.
-- This prepares the data model; it does NOT connect the live storefront by itself.

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role text not null default 'customer' check (role in ('customer', 'admin')),
  created_at timestamptz not null default now()
);

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name jsonb not null default '{}'::jsonb,
  is_active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references public.categories(id) on delete set null,
  sku text unique,
  slug text not null unique,
  name jsonb not null default '{}'::jsonb,
  description jsonb not null default '{}'::jsonb,
  price_mad numeric(10,2) not null check (price_mad >= 0),
  compare_at_price_mad numeric(10,2) check (compare_at_price_mad is null or compare_at_price_mad >= price_mad),
  image_paths text[] not null default '{}',
  sizes text[] not null default '{}',
  attributes jsonb not null default '{}'::jsonb,
  stock_quantity integer not null default 0 check (stock_quantity >= 0),
  is_active boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.shipping_rates (
  id uuid primary key default gen_random_uuid(),
  city text,
  region text,
  fee_mad numeric(10,2) not null check (fee_mad >= 0),
  free_shipping_from_mad numeric(10,2) check (free_shipping_from_mad is null or free_shipping_from_mad >= 0),
  is_active boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  customer_name text not null,
  customer_phone text not null,
  customer_email text,
  city text not null,
  address text not null,
  subtotal_mad numeric(10,2) not null check (subtotal_mad >= 0),
  shipping_mad numeric(10,2) not null default 0 check (shipping_mad >= 0),
  total_mad numeric(10,2) not null check (total_mad = subtotal_mad + shipping_mad),
  status text not null default 'pending'
    check (status in ('pending','confirmed','processing','shipped','delivered','cancelled','returned')),
  payment_method text not null default 'cash_on_delivery'
    check (payment_method in ('cash_on_delivery','online')),
  payment_status text not null default 'unpaid'
    check (payment_status in ('unpaid','pending','paid','failed','refunded')),
  shipping_provider text,
  tracking_number text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid references public.products(id) on delete set null,
  product_name jsonb not null,
  sku text,
  unit_price_mad numeric(10,2) not null check (unit_price_mad >= 0),
  quantity integer not null check (quantity > 0),
  line_total_mad numeric(10,2) not null check (line_total_mad = unit_price_mad * quantity),
  created_at timestamptz not null default now()
);

create index if not exists products_category_active_idx
  on public.products(category_id, is_active);
create index if not exists orders_user_created_idx
  on public.orders(user_id, created_at desc);
create index if not exists order_items_order_idx
  on public.order_items(order_id);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists products_set_updated_at on public.products;
create trigger products_set_updated_at
before update on public.products
for each row execute function public.set_updated_at();

drop trigger if exists orders_set_updated_at on public.orders;
create trigger orders_set_updated_at
before update on public.orders
for each row execute function public.set_updated_at();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'name')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

-- Admin checks use the protected profiles.role column, never user-editable metadata.
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

grant usage on schema public to anon, authenticated;
grant select on public.categories, public.products, public.shipping_rates to anon, authenticated;
grant select on public.profiles, public.orders, public.order_items to authenticated;
grant insert, update, delete on public.profiles, public.categories, public.products,
  public.shipping_rates, public.orders, public.order_items to authenticated;
grant all on public.profiles, public.categories, public.products,
  public.shipping_rates, public.orders, public.order_items to service_role;
grant execute on function public.is_admin() to authenticated;

alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.shipping_rates enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;

drop policy if exists "profile owner or admin can read" on public.profiles;
create policy "profile owner or admin can read"
on public.profiles for select to authenticated
using (id = auth.uid() or public.is_admin());

drop policy if exists "admins manage profiles" on public.profiles;
create policy "admins manage profiles"
on public.profiles for all to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "public read active categories" on public.categories;
create policy "public read active categories"
on public.categories for select to anon, authenticated
using (is_active = true);

drop policy if exists "admins manage categories" on public.categories;
create policy "admins manage categories"
on public.categories for all to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "public read active products" on public.products;
create policy "public read active products"
on public.products for select to anon, authenticated
using (is_active = true);

drop policy if exists "admins manage products" on public.products;
create policy "admins manage products"
on public.products for all to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "public read active shipping rates" on public.shipping_rates;
create policy "public read active shipping rates"
on public.shipping_rates for select to anon, authenticated
using (is_active = true);

drop policy if exists "admins manage shipping rates" on public.shipping_rates;
create policy "admins manage shipping rates"
on public.shipping_rates for all to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "customers read their own orders" on public.orders;
create policy "customers read their own orders"
on public.orders for select to authenticated
using (user_id = auth.uid() or public.is_admin());

drop policy if exists "admins manage orders" on public.orders;
create policy "admins manage orders"
on public.orders for all to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "customers read their own order items" on public.order_items;
create policy "customers read their own order items"
on public.order_items for select to authenticated
using (
  exists (
    select 1 from public.orders o
    where o.id = order_id and (o.user_id = auth.uid() or public.is_admin())
  )
);

drop policy if exists "admins manage order items" on public.order_items;
create policy "admins manage order items"
on public.order_items for all to authenticated
using (public.is_admin())
with check (public.is_admin());

-- Seed the store's four categories. Product records remain empty until real stock is supplied.
insert into public.categories (slug, name, sort_order)
values
  ('men', '{"ar":"رجال","fr":"Homme","en":"Men","es":"Hombre"}'::jsonb, 1),
  ('women', '{"ar":"نساء","fr":"Femme","en":"Women","es":"Mujer"}'::jsonb, 2),
  ('shoes', '{"ar":"أحذية","fr":"Chaussures","en":"Shoes","es":"Calzado"}'::jsonb, 3),
  ('accessories', '{"ar":"إكسسوارات","fr":"Accessoires","en":"Accessories","es":"Accesorios"}'::jsonb, 4)
on conflict (slug) do nothing;

-- SECURITY NOTES:
-- 1) Do not add an INSERT policy for orders/order_items on the public client.
--    Create a server-side Edge Function to validate stock and totals before checkout.
-- 2) Promote the owner's profile to admin manually in the SQL Editor after sign-up:
--    update public.profiles set role = 'admin'
--    where id = (select id from auth.users where email = 'YOUR_OWNER_EMAIL');
-- 3) Never put a Supabase service_role/secret key in index.html or app.js.
-- 4) Configure the product-images Storage bucket and its policies separately.
