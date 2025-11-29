-- Create a table for the rotator groups
create table rotators (
  id uuid default gen_random_uuid() primary key,
  slug text not null unique,
  title text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create a table for the individual URLs within a rotator
create table rotator_urls (
  id uuid default gen_random_uuid() primary key,
  rotator_id uuid references rotators(id) on delete cascade not null,
  url text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up access policies for rotators
alter table rotators enable row level security;

create policy "Public Access Rotators"
  on rotators for select
  using ( true );

create policy "Anyone can create rotators"
  on rotators for insert
  with check ( true );

-- Set up access policies for rotator_urls
alter table rotator_urls enable row level security;

create policy "Public Access Rotator URLs"
  on rotator_urls for select
  using ( true );

create policy "Anyone can create rotator urls"
  on rotator_urls for insert
  with check ( true );
