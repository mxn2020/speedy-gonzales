-- Create profiles table
CREATE TABLE public.profiles (
  id uuid REFERENCES auth.users NOT NULL,
  updated_at timestamp with time zone,
  username text UNIQUE,
  full_name text,
  avatar_url text,
  website text,
  PRIMARY KEY (id)
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Allow select on profiles to everyone" ON public.profiles
  FOR SELECT
  USING (true);

CREATE POLICY "Allow insert/update on profiles to authenticated users" ON public.profiles
  FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.uid() = id);
