-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE,
  updated_at TIMESTAMP WITH TIME ZONE,
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  website TEXT,
  PRIMARY KEY (id)
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create user_settings table
CREATE TABLE public.user_settings (
  user_id UUID REFERENCES auth.users ON DELETE CASCADE,
  setting_name TEXT,
  setting_value JSONB,
  PRIMARY KEY (user_id, setting_name)
);
ALTER TABLE public.user_settings ENABLE ROW LEVEL SECURITY;

-- Create user_roles table
CREATE TABLE public.user_roles (
  user_id UUID REFERENCES auth.users ON DELETE CASCADE,
  role TEXT,
  PRIMARY KEY (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create trigger for updating profiles
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Set up RLS policies
CREATE POLICY "Users can view own profile" 
  ON public.profiles FOR SELECT 
  USING ( auth.uid() = id );

CREATE POLICY "Users can update own profile" 
  ON public.profiles FOR UPDATE 
  USING ( auth.uid() = id );

CREATE POLICY "Users can manage their own settings"
  ON public.user_settings
  USING (auth.uid() = user_id);

CREATE POLICY "Only admins can manage user roles"
  ON public.user_roles
  TO authenticated
  USING (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin'));

-- Create view for user details
CREATE OR REPLACE VIEW public.user_details AS
SELECT 
  u.id,
  u.email,
  p.username,
  p.full_name,
  p.avatar_url,
  p.website,
  array_agg(ur.role) as roles
FROM 
  auth.users u
  LEFT JOIN public.profiles p ON u.id = p.id
  LEFT JOIN public.user_roles ur ON u.id = ur.user_id
GROUP BY 
  u.id, p.id;

-- Grant permissions
GRANT ALL ON public.profiles TO authenticated;
GRANT ALL ON public.user_settings TO authenticated;
GRANT ALL ON public.user_roles TO authenticated;
GRANT SELECT ON public.user_details TO authenticated;