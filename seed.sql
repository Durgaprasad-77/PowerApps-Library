-- Enable RLS
ALTER TABLE IF EXISTS public.roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.user_roles ENABLE ROW LEVEL SECURITY;

-- roles table
CREATE TABLE IF NOT EXISTS public.roles (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL UNIQUE,
  description text,
  created_at timestamptz DEFAULT now()
);

-- user_roles table
CREATE TABLE IF NOT EXISTS public.user_roles (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role_id uuid REFERENCES public.roles(id) ON DELETE CASCADE NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, role_id)
);

-- Policies
CREATE POLICY "Allow read access for all users" ON public.roles FOR SELECT USING (true);

CREATE POLICY "Allow write access for admins" ON public.roles FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.user_roles ur
    INNER JOIN public.roles r ON ur.role_id = r.id
    WHERE ur.user_id = auth.uid() AND r.name = 'admin'
  )
);

CREATE POLICY "Read own roles" ON public.user_roles FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admin manage roles" ON public.user_roles FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.user_roles ur
    INNER JOIN public.roles r ON ur.role_id = r.id
    WHERE ur.user_id = auth.uid() AND r.name = 'admin'
  )
);

-- Initial Roles
INSERT INTO public.roles (name, description)
VALUES 
  ('admin', 'Administrator with full access'),
  ('user', 'Standard user')
ON CONFLICT (name) DO NOTHING;
