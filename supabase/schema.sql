create extension if not exists pgcrypto;

create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique,
  display_name text,
  role text not null default 'guest' check (role in ('guest','owner','admin')),
  created_at timestamptz default now()
);

create table if not exists properties (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  category text,
  location text,
  description text,
  image text,
  rate numeric(10,2) not null default 0,
  cleaning_fee numeric(10,2) not null default 0,
  bedrooms integer default 1,
  bathrooms integer default 1,
  guests integer default 1,
  sqm integer default 0,
  sqft integer default 0,
  rating numeric(3,2) default 0,
  status text default 'Available',
  owner_login_id text,
  owner_password text,
  created_at timestamptz default now()
);

create table if not exists owner_properties (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references profiles(id) on delete cascade,
  property_id uuid not null references properties(id) on delete cascade,
  unique(owner_id, property_id)
);

create table if not exists bookings (
  id uuid primary key default gen_random_uuid(),
  property_slug text not null,
  first_name text,
  last_name text,
  email text,
  phone text,
  check_in date,
  check_out date,
  guests integer default 1,
  include_cleaning boolean default true,
  include_insurance boolean default false,
  total_amount numeric(10,2) default 0,
  status text default 'pending',
  created_at timestamptz default now()
);

alter table profiles enable row level security;
alter table properties enable row level security;
alter table owner_properties enable row level security;
alter table bookings enable row level security;

create policy "public read properties" on properties for select using (true);
create policy "users read own profile" on profiles for select using (auth.uid() = id);
create policy "users update own profile" on profiles for update using (auth.uid() = id);
create policy "users insert own bookings" on bookings for insert with check (true);
create policy "users read own owner properties" on owner_properties for select using (owner_id = auth.uid());

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
as $$
begin
  insert into public.profiles (id, email, display_name, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'display_name', ''),
    coalesce(new.raw_user_meta_data->>'role', 'guest')
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();
