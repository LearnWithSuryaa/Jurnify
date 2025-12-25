-- Create journals table
create table public.journals (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  title text not null,
  content text not null,
  mood text,
  created_at timestamptz default now()
);

-- Enable RLS
alter table public.journals enable row level security;

-- Create policies
create policy "Users can view their own journals"
  on public.journals for select
  using (auth.uid() = user_id);

create policy "Users can insert their own journals"
  on public.journals for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own journals"
  on public.journals for update
  using (auth.uid() = user_id);

create policy "Users can delete their own journals"
  on public.journals for delete
  using (auth.uid() = user_id);

-- Optional: Create index for filtering by user and sorting by date
create index journals_user_created_idx on public.journals (user_id, created_at desc);
