-- Create a table for tracking rotator clicks
create table rotator_clicks (
  id uuid default gen_random_uuid() primary key,
  rotator_id uuid not null references rotators(id) on delete cascade,
  url_id uuid not null references rotator_urls(id) on delete cascade,
  country text,
  device_type text,
  referrer text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create indexes for performance
create index idx_rotator_clicks_rotator on rotator_clicks(rotator_id);
create index idx_rotator_clicks_url on rotator_clicks(url_id);

-- Set up access policies
alter table rotator_clicks enable row level security;

create policy "Public Access Rotator Clicks"
  on rotator_clicks for select
  using ( true );

create policy "Anyone can insert rotator clicks"
  on rotator_clicks for insert
  with check ( true );
