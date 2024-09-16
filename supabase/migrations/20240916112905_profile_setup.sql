-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE OR REPLACE FUNCTION public.user_has_role(user_id UUID, role TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_roles.user_id = user_id
    AND user_roles.role = role
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

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
  ON public.user_settings FOR ALL
  USING (auth.uid() = user_id);

CREATE POLICY "Super admins can view and manage user roles"
  ON public.user_roles
  TO authenticated
  FOR ALL
  USING (public.user_has_role(auth.uid()::UUID, 'super_admin'));


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

CREATE TABLE public.activity_log (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  user_email TEXT,
  action TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Set up RLS
ALTER TABLE public.activity_log ENABLE ROW LEVEL SECURITY;

-- Allow super admins to view and manage the activity log
CREATE POLICY "Super admins can manage activity log" ON public.activity_log
  FOR ALL
  USING (public.user_has_role(auth.uid(), 'super_admin'));

-- Function to log activities
CREATE OR REPLACE FUNCTION public.log_activity(user_id UUID, action TEXT)
RETURNS VOID AS $$
DECLARE
  user_email TEXT;
BEGIN
  -- Get the user's email
  SELECT email INTO user_email
  FROM auth.users
  WHERE id = user_id;

  -- Insert the activity log
  INSERT INTO public.activity_log (user_id, user_email, action)
  VALUES (user_id, user_email, action);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Example usage: SELECT log_activity(auth.uid(), 'Logged in');

-- Function to check if a user is a super admin
CREATE OR REPLACE FUNCTION public.is_super_admin(user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN public.user_has_role(user_id, 'super_admin');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Policy to allow super admins to view all profiles
CREATE POLICY "Super admins can view all profiles"
  ON public.profiles FOR SELECT
  USING (public.is_super_admin(auth.uid()));

-- Policy to allow super admins to update all profiles
CREATE POLICY "Super admins can update all profiles"
  ON public.profiles FOR UPDATE
  USING (public.is_super_admin(auth.uid()));

-- Policy to allow super admins to manage all user settings
CREATE POLICY "Super admins can manage all user settings"
  ON public.user_settings FOR ALL
  USING (public.is_super_admin(auth.uid()));

-- Grant super admins access to manage users
ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Super admins can manage users"
  ON auth.users
  FOR ALL
  USING (public.is_super_admin(auth.uid()));

-- Grant necessary permissions to authenticated users (including super admins)
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO authenticated;


CREATE OR REPLACE FUNCTION public.get_user_roles(user_id UUID)
RETURNS TABLE (role TEXT) AS $$
BEGIN
  RETURN QUERY
  SELECT ur.role
  FROM public.user_roles ur
  WHERE ur.user_id = $1;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;