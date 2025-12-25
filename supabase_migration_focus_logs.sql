-- Create focus_logs table
create table public.focus_logs (
  id uuid not null default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  task_id uuid references public.tasks(id) on delete set null,
  duration integer not null, -- duration in minutes
  started_at timestamptz default now(),
  completed_at timestamptz default now(),
  
  primary key (id)
);

-- Enable RLS
alter table public.focus_logs enable row level security;

-- Create policies
create policy "Users can view their own focus logs"
on public.focus_logs for select
using (auth.uid() = user_id);

create policy "Users can insert their own focus logs"
on public.focus_logs for insert
with check (auth.uid() = user_id);
