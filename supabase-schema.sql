-- Users table
create table public.users (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  credits integer not null default 2,
  plan text not null default 'free' check (plan in ('free', 'basic', 'realtor', 'agency')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.users enable row level security;

create policy "Users can view their own data" on public.users
  for select using (auth.uid() = id);

create policy "Users can update their own data" on public.users
  for update using (auth.uid() = id);

-- Trigger to create user row on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, email, credits, plan)
  values (new.id, new.email, 2, 'free');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Generations table
create table public.generations (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.users(id) on delete cascade not null,
  input_image_url text not null,
  output_image_url text not null,
  mode text not null check (mode in ('enhance', 'redesign')),
  style text check (style in ('modern', 'scandinavian', 'loft', 'classic', 'japanese')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.generations enable row level security;

create policy "Users can view their own generations" on public.generations
  for select using (auth.uid() = user_id);

create policy "Users can insert their own generations" on public.generations
  for insert with check (auth.uid() = user_id);

-- Payments table
create table public.payments (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.users(id) on delete cascade not null,
  amount integer not null,
  plan text not null check (plan in ('basic', 'realtor', 'agency')),
  status text not null default 'pending' check (status in ('pending', 'succeeded', 'canceled')),
  yokassa_payment_id text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.payments enable row level security;

create policy "Users can view their own payments" on public.payments
  for select using (auth.uid() = user_id);

-- Storage bucket for images
insert into storage.buckets (id, name, public)
values ('images', 'images', true);

create policy "Anyone can view images" on storage.objects
  for select using (bucket_id = 'images');

create policy "Authenticated users can upload images" on storage.objects
  for insert with check (bucket_id = 'images' and auth.role() = 'authenticated');
