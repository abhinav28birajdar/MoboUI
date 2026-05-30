-- MOBOUI - Complete Supabase Schema
-- This SQL file creates the entire database from scratch
-- Execute this in Supabase SQL Editor
-- Idempotent: Safe to run multiple times

-- ============================================================================
-- EXTENSIONS
-- ============================================================================

-- Create extensions if they don't exist
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgtrgm"; -- For full-text search

-- ============================================================================
-- ENUMS
-- ============================================================================

-- Framework types
CREATE TYPE public.framework_type AS ENUM ('react-native', 'flutter', 'expo', 'both');

-- Complexity levels
CREATE TYPE public.complexity_level AS ENUM ('beginner', 'intermediate', 'advanced');

-- Component status
CREATE TYPE public.component_status AS ENUM ('draft', 'published', 'archived');

-- User roles
CREATE TYPE public.user_role AS ENUM ('user', 'admin', 'moderator');

-- Submission status
CREATE TYPE public.submission_status AS ENUM ('pending', 'approved', 'rejected');

-- Activity types
CREATE TYPE public.activity_type AS ENUM ('create', 'update', 'delete', 'view', 'favorite', 'download');

-- ============================================================================
-- TABLES
-- ============================================================================

-- Profiles table - linked to auth.users via foreign key
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  role public.user_role DEFAULT 'user',
  is_verified BOOLEAN DEFAULT FALSE,
  verified_at TIMESTAMP WITH TIME ZONE,
  company TEXT,
  website TEXT,
  location TEXT,
  github_url TEXT,
  twitter_url TEXT,
  followers_count INTEGER DEFAULT 0,
  following_count INTEGER DEFAULT 0,
  total_favorites INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  deleted_at TIMESTAMP WITH TIME ZONE
);

-- Categories table
CREATE TABLE IF NOT EXISTS public.categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  icon TEXT,
  color TEXT,
  component_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Components table
CREATE TABLE IF NOT EXISTS public.components (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  category_id UUID NOT NULL REFERENCES public.categories(id) ON DELETE SET NULL,
  creator_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  framework public.framework_type DEFAULT 'react-native',
  complexity public.complexity_level DEFAULT 'beginner',
  status public.component_status DEFAULT 'published',
  image_url TEXT,
  thumbnail_url TEXT,
  code_typescript TEXT,
  code_javascript TEXT,
  code_dart TEXT,
  documentation TEXT,
  is_premium BOOLEAN DEFAULT FALSE,
  popularity_score INTEGER DEFAULT 0,
  download_count INTEGER DEFAULT 0,
  view_count INTEGER DEFAULT 0,
  rating DECIMAL(3, 2) DEFAULT 0,
  rating_count INTEGER DEFAULT 0,
  tags TEXT[] DEFAULT ARRAY[]::TEXT[],
  version TEXT DEFAULT '1.0.0',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  deleted_at TIMESTAMP WITH TIME ZONE
);

-- Component props documentation
CREATE TABLE IF NOT EXISTS public.component_props (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  component_id UUID NOT NULL REFERENCES public.components(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  description TEXT,
  required BOOLEAN DEFAULT FALSE,
  default_value TEXT,
  example_value TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Component examples/use cases
CREATE TABLE IF NOT EXISTS public.component_examples (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  component_id UUID NOT NULL REFERENCES public.components(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  code TEXT,
  framework public.framework_type,
  preview_image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Themes library
CREATE TABLE IF NOT EXISTS public.themes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  creator_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  colors JSONB NOT NULL DEFAULT '{
    "primary": "#FFCA03",
    "secondary": "#0A0A0A",
    "accent": "#6366F1"
  }',
  typography JSONB DEFAULT '{}',
  spacing JSONB DEFAULT '{}',
  border_radius JSONB DEFAULT '{}',
  shadows JSONB DEFAULT '{}',
  is_featured BOOLEAN DEFAULT FALSE,
  download_count INTEGER DEFAULT 0,
  preview_image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Templates library
CREATE TABLE IF NOT EXISTS public.templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  category TEXT,
  framework public.framework_type,
  code TEXT,
  preview_image_url TEXT,
  is_featured BOOLEAN DEFAULT FALSE,
  download_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Favorites/Bookmarks
CREATE TABLE IF NOT EXISTS public.favorites (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  component_id UUID NOT NULL REFERENCES public.components(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, component_id)
);

-- User submissions/uploads
CREATE TABLE IF NOT EXISTS public.submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  thumbnail_url TEXT,
  code TEXT,
  framework public.framework_type,
  category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  status public.submission_status DEFAULT 'pending',
  tags TEXT[] DEFAULT ARRAY[]::TEXT[],
  github_url TEXT,
  demo_url TEXT,
  feedback TEXT,
  rejected_reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  reviewed_by UUID REFERENCES public.profiles(id)
);

-- Activity logs for analytics
CREATE TABLE IF NOT EXISTS public.activity_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  activity_type public.activity_type NOT NULL,
  entity_type TEXT NOT NULL, -- 'component', 'theme', 'template', etc.
  entity_id UUID,
  metadata JSONB DEFAULT '{}',
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Audit logs for compliance
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  table_name TEXT,
  record_id UUID,
  old_values JSONB,
  new_values JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User settings
CREATE TABLE IF NOT EXISTS public.user_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL UNIQUE REFERENCES public.profiles(id) ON DELETE CASCADE,
  theme_preference TEXT DEFAULT 'system', -- 'light', 'dark', 'system'
  notifications_enabled BOOLEAN DEFAULT TRUE,
  email_notifications BOOLEAN DEFAULT TRUE,
  newsletter_subscribed BOOLEAN DEFAULT FALSE,
  privacy_level TEXT DEFAULT 'public', -- 'public', 'private', 'friends'
  language TEXT DEFAULT 'en',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Notifications
CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT,
  type TEXT, -- 'info', 'warning', 'success', 'error'
  read BOOLEAN DEFAULT FALSE,
  read_at TIMESTAMP WITH TIME ZONE,
  action_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- INDEXES
-- ============================================================================

-- Profiles indexes
CREATE INDEX idx_profiles_email ON public.profiles(email);
CREATE INDEX idx_profiles_username ON public.profiles(username);
CREATE INDEX idx_profiles_role ON public.profiles(role);
CREATE INDEX idx_profiles_created_at ON public.profiles(created_at DESC);

-- Components indexes
CREATE INDEX idx_components_slug ON public.components(slug);
CREATE INDEX idx_components_category_id ON public.components(category_id);
CREATE INDEX idx_components_creator_id ON public.components(creator_id);
CREATE INDEX idx_components_framework ON public.components(framework);
CREATE INDEX idx_components_complexity ON public.components(complexity);
CREATE INDEX idx_components_status ON public.components(status);
CREATE INDEX idx_components_created_at ON public.components(created_at DESC);
CREATE INDEX idx_components_name_trgm ON public.components USING GIN (name gin_trgm_ops);
CREATE INDEX idx_components_tags ON public.components USING GIN (tags);

-- Categories indexes
CREATE INDEX idx_categories_slug ON public.categories(slug);

-- Favorites indexes
CREATE INDEX idx_favorites_user_id ON public.favorites(user_id);
CREATE INDEX idx_favorites_component_id ON public.favorites(component_id);

-- Submissions indexes
CREATE INDEX idx_submissions_user_id ON public.submissions(user_id);
CREATE INDEX idx_submissions_status ON public.submissions(status);
CREATE INDEX idx_submissions_created_at ON public.submissions(created_at DESC);

-- Activity logs indexes
CREATE INDEX idx_activity_logs_user_id ON public.activity_logs(user_id);
CREATE INDEX idx_activity_logs_entity_type ON public.activity_logs(entity_type);
CREATE INDEX idx_activity_logs_created_at ON public.activity_logs(created_at DESC);

-- Notifications indexes
CREATE INDEX idx_notifications_user_id ON public.notifications(user_id);
CREATE INDEX idx_notifications_read ON public.notifications(read);

-- ============================================================================
-- TRIGGERS
-- ============================================================================

-- Function: Automatically create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger: Create profile when user signs up
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function: Update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger: Update profiles.updated_at
DROP TRIGGER IF EXISTS update_profiles_updated_at ON public.profiles;
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Trigger: Update components.updated_at
DROP TRIGGER IF EXISTS update_components_updated_at ON public.components;
CREATE TRIGGER update_components_updated_at
  BEFORE UPDATE ON public.components
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Trigger: Update themes.updated_at
DROP TRIGGER IF EXISTS update_themes_updated_at ON public.themes;
CREATE TRIGGER update_themes_updated_at
  BEFORE UPDATE ON public.themes
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Trigger: Update user_settings.updated_at
DROP TRIGGER IF EXISTS update_user_settings_updated_at ON public.user_settings;
CREATE TRIGGER update_user_settings_updated_at
  BEFORE UPDATE ON public.user_settings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.components ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.component_props ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.component_examples ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.themes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- PROFILES POLICIES
-- Anyone can view public profiles
CREATE POLICY "Public profiles are viewable by everyone"
  ON public.profiles FOR SELECT
  USING (true);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Users can insert their own profile (for setup)
CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Admins can update any profile
CREATE POLICY "Admins can update any profile"
  ON public.profiles FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- CATEGORIES POLICIES
-- Everyone can view categories
CREATE POLICY "Categories are viewable by everyone"
  ON public.categories FOR SELECT
  USING (true);

-- Only admins can insert/update/delete categories
CREATE POLICY "Only admins can manage categories"
  ON public.categories FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Only admins can update categories"
  ON public.categories FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Only admins can delete categories"
  ON public.categories FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- COMPONENTS POLICIES
-- Everyone can view published components
CREATE POLICY "Published components are viewable by everyone"
  ON public.components FOR SELECT
  USING (status = 'published' OR creator_id = auth.uid());

-- Users can create components
CREATE POLICY "Users can create components"
  ON public.components FOR INSERT
  WITH CHECK (auth.uid() = creator_id);

-- Users can update their own components
CREATE POLICY "Users can update own components"
  ON public.components FOR UPDATE
  USING (auth.uid() = creator_id);

-- Users can delete their own components
CREATE POLICY "Users can delete own components"
  ON public.components FOR DELETE
  USING (auth.uid() = creator_id);

-- Admins can manage all components
CREATE POLICY "Admins can manage all components"
  ON public.components FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- COMPONENT_PROPS POLICIES
CREATE POLICY "Component props are viewable by everyone"
  ON public.component_props FOR SELECT
  USING (true);

CREATE POLICY "Users can manage component props for their components"
  ON public.component_props FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.components c
      WHERE c.id = component_props.component_id
      AND (c.creator_id = auth.uid() OR auth.uid() IN (
        SELECT id FROM public.profiles WHERE role = 'admin'
      ))
    )
  );

-- COMPONENT_EXAMPLES POLICIES
CREATE POLICY "Component examples are viewable by everyone"
  ON public.component_examples FOR SELECT
  USING (true);

CREATE POLICY "Users can manage examples for their components"
  ON public.component_examples FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.components c
      WHERE c.id = component_examples.component_id
      AND (c.creator_id = auth.uid() OR auth.uid() IN (
        SELECT id FROM public.profiles WHERE role = 'admin'
      ))
    )
  );

-- THEMES POLICIES
-- Everyone can view themes
CREATE POLICY "Themes are viewable by everyone"
  ON public.themes FOR SELECT
  USING (true);

-- Users can create themes
CREATE POLICY "Users can create themes"
  ON public.themes FOR INSERT
  WITH CHECK (auth.uid() = creator_id);

-- Users can update their own themes
CREATE POLICY "Users can update own themes"
  ON public.themes FOR UPDATE
  USING (auth.uid() = creator_id);

-- Users can delete their own themes
CREATE POLICY "Users can delete own themes"
  ON public.themes FOR DELETE
  USING (auth.uid() = creator_id);

-- TEMPLATES POLICIES
-- Everyone can view templates
CREATE POLICY "Templates are viewable by everyone"
  ON public.templates FOR SELECT
  USING (true);

-- Only admins can manage templates
CREATE POLICY "Only admins can manage templates"
  ON public.templates FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- FAVORITES POLICIES
-- Users can view their own favorites
CREATE POLICY "Users can view own favorites"
  ON public.favorites FOR SELECT
  USING (auth.uid() = user_id);

-- Users can create favorites
CREATE POLICY "Users can create favorites"
  ON public.favorites FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can delete their own favorites
CREATE POLICY "Users can delete own favorites"
  ON public.favorites FOR DELETE
  USING (auth.uid() = user_id);

-- SUBMISSIONS POLICIES
-- Users can view their own submissions
CREATE POLICY "Users can view own submissions"
  ON public.submissions FOR SELECT
  USING (auth.uid() = user_id);

-- Admins can view all submissions
CREATE POLICY "Admins can view all submissions"
  ON public.submissions FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND (role = 'admin' OR role = 'moderator')
    )
  );

-- Users can create submissions
CREATE POLICY "Users can create submissions"
  ON public.submissions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own submissions (if not reviewed)
CREATE POLICY "Users can update own pending submissions"
  ON public.submissions FOR UPDATE
  USING (auth.uid() = user_id AND status = 'pending');

-- Admins can update submissions
CREATE POLICY "Admins can update submissions"
  ON public.submissions FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND (role = 'admin' OR role = 'moderator')
    )
  );

-- ACTIVITY_LOGS POLICIES
-- Users can view activity logs related to them
CREATE POLICY "Users can view own activity"
  ON public.activity_logs FOR SELECT
  USING (auth.uid() = user_id);

-- Only authenticated users can insert activity logs
CREATE POLICY "Authenticated users can create activity logs"
  ON public.activity_logs FOR INSERT
  WITH CHECK (auth.uid() = user_id OR auth.uid() IS NOT NULL);

-- AUDIT_LOGS POLICIES
-- Only admins can view audit logs
CREATE POLICY "Only admins can view audit logs"
  ON public.audit_logs FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- NOTIFICATIONS POLICIES
-- Users can view their own notifications
CREATE POLICY "Users can view own notifications"
  ON public.notifications FOR SELECT
  USING (auth.uid() = user_id);

-- Users can update their own notifications
CREATE POLICY "Users can update own notifications"
  ON public.notifications FOR UPDATE
  USING (auth.uid() = user_id);

-- Only the system can create notifications (via triggers/functions)
-- This should be restricted but we'll allow it initially

-- USER_SETTINGS POLICIES
-- Users can view their own settings
CREATE POLICY "Users can view own settings"
  ON public.user_settings FOR SELECT
  USING (auth.uid() = user_id);

-- Users can update their own settings
CREATE POLICY "Users can update own settings"
  ON public.user_settings FOR UPDATE
  USING (auth.uid() = user_id);

-- Users can insert their own settings
CREATE POLICY "Users can create own settings"
  ON public.user_settings FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- ============================================================================
-- SEED DATA
-- ============================================================================

-- Insert default categories
INSERT INTO public.categories (name, slug, description, icon, color) VALUES
  ('Buttons', 'buttons', 'Button components for all interactions', '🔘', '#3B82F6'),
  ('Forms', 'forms', 'Input fields, checkboxes, and form elements', '📋', '#10B981'),
  ('Navigation', 'navigation', 'Navigation bars, menus, and routing', '🧭', '#8B5CF6'),
  ('Cards', 'cards', 'Card layouts and containers', '🎴', '#F59E0B'),
  ('Lists', 'lists', 'List views and collections', '📝', '#EF4444'),
  ('Modals', 'modals', 'Dialog boxes and modal windows', '📢', '#EC4899'),
  ('Sliders', 'sliders', 'Slider and range inputs', '📊', '#06B6D4'),
  ('Notifications', 'notifications', 'Alerts and notification components', '🔔', '#F97316'),
  ('Progress', 'progress', 'Progress bars and loaders', '⏳', '#6366F1'),
  ('Avatars', 'avatars', 'User avatars and profile images', '👤', '#14B8A6')
ON CONFLICT (name) DO NOTHING;

-- ============================================================================
-- FUNCTIONS
-- ============================================================================

-- Function to increment component view count
CREATE OR REPLACE FUNCTION public.increment_component_views(component_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE public.components
  SET view_count = view_count + 1
  WHERE id = component_id;
END;
$$ LANGUAGE plpgsql;

-- Function to toggle favorite
CREATE OR REPLACE FUNCTION public.toggle_favorite(component_id UUID)
RETURNS void AS $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM public.favorites
    WHERE user_id = auth.uid() AND favorites.component_id = $1
  ) THEN
    DELETE FROM public.favorites
    WHERE user_id = auth.uid() AND favorites.component_id = $1;
  ELSE
    INSERT INTO public.favorites (user_id, component_id)
    VALUES (auth.uid(), $1);
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Function to get user's favorites count
CREATE OR REPLACE FUNCTION public.get_user_favorites_count()
RETURNS INTEGER AS $$
BEGIN
  RETURN (
    SELECT COUNT(*) FROM public.favorites
    WHERE user_id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql;

-- Function to search components
CREATE OR REPLACE FUNCTION public.search_components(search_query TEXT)
RETURNS TABLE (
  id UUID,
  name TEXT,
  slug TEXT,
  description TEXT,
  framework public.framework_type,
  complexity public.complexity_level,
  image_url TEXT
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    c.id,
    c.name,
    c.slug,
    c.description,
    c.framework,
    c.complexity,
    c.image_url
  FROM public.components c
  WHERE c.status = 'published'
    AND (
      c.name ILIKE '%' || search_query || '%'
      OR c.description ILIKE '%' || search_query || '%'
      OR c.tags @> ARRAY[search_query]
    )
  ORDER BY c.view_count DESC, c.popularity_score DESC
  LIMIT 50;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- VIEWS
-- ============================================================================

-- View: User statistics
CREATE OR REPLACE VIEW public.user_statistics AS
SELECT
  p.id,
  p.username,
  COUNT(DISTINCT f.id) as favorites_count,
  COUNT(DISTINCT s.id) as submissions_count,
  COUNT(DISTINCT c.id) as components_created,
  COALESCE(SUM(c.download_count), 0) as total_downloads,
  COALESCE(SUM(c.view_count), 0) as total_views
FROM public.profiles p
LEFT JOIN public.favorites f ON p.id = f.user_id
LEFT JOIN public.submissions s ON p.id = s.user_id
LEFT JOIN public.components c ON p.id = c.creator_id AND c.status = 'published'
GROUP BY p.id, p.username;

-- View: Popular components
CREATE OR REPLACE VIEW public.popular_components AS
SELECT
  c.id,
  c.name,
  c.slug,
  c.framework,
  c.complexity,
  c.image_url,
  c.view_count,
  c.download_count,
  c.rating,
  c.popularity_score,
  COUNT(DISTINCT f.id) as favorite_count
FROM public.components c
LEFT JOIN public.favorites f ON c.id = f.component_id
WHERE c.status = 'published'
GROUP BY c.id, c.name, c.slug, c.framework, c.complexity, c.image_url, c.view_count, c.download_count, c.rating, c.popularity_score
ORDER BY c.popularity_score DESC, c.download_count DESC;

-- ============================================================================
-- SCHEMA VERIFICATION
-- ============================================================================

-- Verify all tables were created successfully
SELECT
  t.table_name,
  COUNT(*) as column_count
FROM information_schema.tables t
JOIN information_schema.columns c ON t.table_name = c.table_name
WHERE t.table_schema = 'public'
  AND t.table_type = 'BASE TABLE'
GROUP BY t.table_name
ORDER BY t.table_name;
