-- Add views column to cards table
alter table cards 
add column if not exists views integer default 0;

-- Create a function to increment views
create or replace function increment_views(card_id uuid)
returns void
language plpgsql
security definer
as $$
begin
  update cards
  set views = views + 1
  where id = card_id;
end;
$$;
