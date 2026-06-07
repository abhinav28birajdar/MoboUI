-- MOBOUI - Complete Supabase Master Schema
-- This SQL file creates the entire database from scratch.
-- Execute this in the Supabase SQL Editor.
-- Idempotent: Safe to run multiple times.

-- ============================================================================
-- EXTENSIONS
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "pg_trgm"; -- For full-text search

-- ============================================================================
-- ENUMS
-- ============================================================================

-- Framework types
DO $$ BEGIN
  CREATE TYPE public.framework_type AS ENUM ('react-native', 'flutter', 'expo', 'both');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Complexity levels
DO $$ BEGIN
  CREATE TYPE public.complexity_level AS ENUM ('beginner', 'intermediate', 'advanced');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Component status
DO $$ BEGIN
  CREATE TYPE public.component_status AS ENUM ('draft', 'published', 'archived');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- User roles
DO $$ BEGIN
  CREATE TYPE public.user_role AS ENUM ('user', 'admin', 'moderator');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Submission status
DO $$ BEGIN
  CREATE TYPE public.submission_status AS ENUM ('pending', 'approved', 'rejected');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Activity types
DO $$ BEGIN
  CREATE TYPE public.activity_type AS ENUM ('create', 'update', 'delete', 'view', 'favorite', 'download');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

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
  category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
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

-- User projects/uploads
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  author_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  long_description TEXT,
  thumbnail_url TEXT,
  screenshots TEXT[] DEFAULT ARRAY[]::TEXT[],
  demo_url TEXT,
  github_url TEXT,
  app_store_url TEXT,
  play_store_url TEXT,
  tags TEXT[] DEFAULT ARRAY[]::TEXT[],
  frameworks TEXT[] DEFAULT ARRAY[]::TEXT[],
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'featured')),
  view_count INTEGER DEFAULT 0,
  like_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
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

CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);
CREATE INDEX IF NOT EXISTS idx_profiles_username ON public.profiles(username);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_created_at ON public.profiles(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_components_slug ON public.components(slug);
CREATE INDEX IF NOT EXISTS idx_components_category_id ON public.components(category_id);
CREATE INDEX IF NOT EXISTS idx_components_creator_id ON public.components(creator_id);
CREATE INDEX IF NOT EXISTS idx_components_framework ON public.components(framework);
CREATE INDEX IF NOT EXISTS idx_components_complexity ON public.components(complexity);
CREATE INDEX IF NOT EXISTS idx_components_status ON public.components(status);
CREATE INDEX IF NOT EXISTS idx_components_created_at ON public.components(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_components_name_trgm ON public.components USING GIN (name gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_components_tags ON public.components USING GIN (tags);

CREATE INDEX IF NOT EXISTS idx_categories_slug ON public.categories(slug);

CREATE INDEX IF NOT EXISTS idx_favorites_user_id ON public.favorites(user_id);
CREATE INDEX IF NOT EXISTS idx_favorites_component_id ON public.favorites(component_id);

CREATE INDEX IF NOT EXISTS idx_projects_author_id ON public.projects(author_id);
CREATE INDEX IF NOT EXISTS idx_projects_status ON public.projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON public.projects(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_activity_logs_user_id ON public.activity_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_activity_logs_entity_type ON public.activity_logs(entity_type);
CREATE INDEX IF NOT EXISTS idx_activity_logs_created_at ON public.activity_logs(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON public.notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_read ON public.notifications(read);

-- ============================================================================
-- TRIGGERS & FUNCTIONS
-- ============================================================================

-- Function: Automatically create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', 'New User'),
    'user'
  );
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

-- Triggers for updated_at
DROP TRIGGER IF EXISTS update_profiles_updated_at ON public.profiles;
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_components_updated_at ON public.components;
CREATE TRIGGER update_components_updated_at
  BEFORE UPDATE ON public.components
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_themes_updated_at ON public.themes;
CREATE TRIGGER update_themes_updated_at
  BEFORE UPDATE ON public.themes
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_user_settings_updated_at ON public.user_settings;
CREATE TRIGGER update_user_settings_updated_at
  BEFORE UPDATE ON public.user_settings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_projects_updated_at ON public.projects;
CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON public.projects
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
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- PROFILES POLICIES
CREATE POLICY "Public profiles are viewable by everyone"
  ON public.profiles FOR SELECT USING (true);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- CATEGORIES POLICIES
CREATE POLICY "Categories are viewable by everyone"
  ON public.categories FOR SELECT USING (true);

CREATE POLICY "Only admins can manage categories"
  ON public.categories FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- COMPONENTS POLICIES
CREATE POLICY "Published components are viewable by everyone"
  ON public.components FOR SELECT USING (status = 'published' OR creator_id = auth.uid());

CREATE POLICY "Users can create components"
  ON public.components FOR INSERT WITH CHECK (auth.uid() = creator_id);

CREATE POLICY "Users can update own components"
  ON public.components FOR UPDATE USING (auth.uid() = creator_id);

CREATE POLICY "Users can delete own components"
  ON public.components FOR DELETE USING (auth.uid() = creator_id);

CREATE POLICY "Admins can manage all components"
  ON public.components FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- COMPONENT_PROPS POLICIES
CREATE POLICY "Component props are viewable by everyone"
  ON public.component_props FOR SELECT USING (true);

CREATE POLICY "Users can manage component props for their components"
  ON public.component_props FOR ALL USING (
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
  ON public.component_examples FOR SELECT USING (true);

CREATE POLICY "Users can manage examples for their components"
  ON public.component_examples FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.components c
      WHERE c.id = component_examples.component_id
      AND (c.creator_id = auth.uid() OR auth.uid() IN (
        SELECT id FROM public.profiles WHERE role = 'admin'
      ))
    )
  );

-- THEMES POLICIES
CREATE POLICY "Themes are viewable by everyone"
  ON public.themes FOR SELECT USING (true);

CREATE POLICY "Users can create themes"
  ON public.themes FOR INSERT WITH CHECK (auth.uid() = creator_id);

CREATE POLICY "Users can update own themes"
  ON public.themes FOR UPDATE USING (auth.uid() = creator_id);

CREATE POLICY "Users can delete own themes"
  ON public.themes FOR DELETE USING (auth.uid() = creator_id);

-- TEMPLATES POLICIES
CREATE POLICY "Templates are viewable by everyone"
  ON public.templates FOR SELECT USING (true);

CREATE POLICY "Only admins can manage templates"
  ON public.templates FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- FAVORITES POLICIES
CREATE POLICY "Users can view own favorites"
  ON public.favorites FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create favorites"
  ON public.favorites FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own favorites"
  ON public.favorites FOR DELETE USING (auth.uid() = user_id);

-- PROJECTS POLICIES
CREATE POLICY "Approved or featured projects are viewable by everyone"
  ON public.projects FOR SELECT USING (status = 'approved' OR status = 'featured' OR author_id = auth.uid());

CREATE POLICY "Users can manage own projects"
  ON public.projects FOR ALL USING (auth.uid() = author_id) WITH CHECK (auth.uid() = author_id);

-- USER_SETTINGS POLICIES
CREATE POLICY "Users can view own settings"
  ON public.user_settings FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own settings"
  ON public.user_settings FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can create own settings"
  ON public.user_settings FOR INSERT WITH CHECK (auth.uid() = user_id);

-- NOTIFICATIONS POLICIES
CREATE POLICY "Users can view own notifications"
  ON public.notifications FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own notifications"
  ON public.notifications FOR UPDATE USING (auth.uid() = user_id);

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
-- FUNCTIONS & PROCEDURES
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

$$ LANGUAGE plpgsql;

-- ============================================================================
-- BLOG POSTS, MARKETPLACE ITEMS & REVIEWS TABLES
-- ============================================================================

-- Blog posts table
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  author_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL, -- Markdown/MDX content
  cover_image_url TEXT,
  tags TEXT[] DEFAULT ARRAY[]::TEXT[],
  category TEXT,
  is_published BOOLEAN DEFAULT FALSE,
  is_featured BOOLEAN DEFAULT FALSE,
  view_count INTEGER DEFAULT 0,
  read_time_minutes INTEGER DEFAULT 5,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Marketplace items table
CREATE TABLE IF NOT EXISTS public.marketplace_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  component_id UUID REFERENCES public.components(id) ON DELETE CASCADE,
  seller_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE, -- Null means official MoboUI product
  title TEXT NOT NULL,
  description TEXT,
  price_cents INTEGER DEFAULT 0, -- 0 = free
  currency TEXT DEFAULT 'USD',
  downloads INTEGER DEFAULT 0,
  rating_average DECIMAL(3, 2) DEFAULT 0,
  rating_count INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Marketplace reviews table
CREATE TABLE IF NOT EXISTS public.marketplace_reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  item_id UUID NOT NULL REFERENCES public.marketplace_items(id) ON DELETE CASCADE,
  reviewer_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  review TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(item_id, reviewer_id)
);

-- ============================================================================
-- INDEXES FOR NEW TABLES
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON public.blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_is_published ON public.blog_posts(is_published);
CREATE INDEX IF NOT EXISTS idx_blog_posts_created_at ON public.blog_posts(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_marketplace_items_component_id ON public.marketplace_items(component_id);
CREATE INDEX IF NOT EXISTS idx_marketplace_items_seller_id ON public.marketplace_items(seller_id);
CREATE INDEX IF NOT EXISTS idx_marketplace_items_is_active ON public.marketplace_items(is_active);

CREATE INDEX IF NOT EXISTS idx_marketplace_reviews_item_id ON public.marketplace_reviews(item_id);

-- ============================================================================
-- TRIGGERS & RLS FOR NEW TABLES
-- ============================================================================

-- RLS Enablement
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.marketplace_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.marketplace_reviews ENABLE ROW LEVEL SECURITY;

-- Blog Posts Policies
CREATE POLICY "Published blog posts are viewable by everyone"
  ON public.blog_posts FOR SELECT USING (is_published = TRUE);

CREATE POLICY "Admins can manage all blog posts"
  ON public.blog_posts FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Marketplace Items Policies
CREATE POLICY "Active marketplace items are viewable by everyone"
  ON public.marketplace_items FOR SELECT USING (is_active = TRUE);

CREATE POLICY "Sellers can manage own marketplace items"
  ON public.marketplace_items FOR ALL USING (auth.uid() = seller_id);

CREATE POLICY "Admins can manage all marketplace items"
  ON public.marketplace_items FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Marketplace Reviews Policies
CREATE POLICY "Marketplace reviews are viewable by everyone"
  ON public.marketplace_reviews FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create reviews"
  ON public.marketplace_reviews FOR INSERT WITH CHECK (auth.uid() = reviewer_id);

CREATE POLICY "Reviewers can update own reviews"
  ON public.marketplace_reviews FOR UPDATE USING (auth.uid() = reviewer_id);

CREATE POLICY "Reviewers can delete own reviews"
  ON public.marketplace_reviews FOR DELETE USING (auth.uid() = reviewer_id);

-- Triggers for updated_at
DROP TRIGGER IF EXISTS update_blog_posts_updated_at ON public.blog_posts;
CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON public.blog_posts
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_marketplace_items_updated_at ON public.marketplace_items;
CREATE TRIGGER update_marketplace_items_updated_at
  BEFORE UPDATE ON public.marketplace_items
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Function to update marketplace rating on new review
CREATE OR REPLACE FUNCTION public.update_marketplace_item_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.marketplace_items
  SET 
    rating_average = (
      SELECT COALESCE(AVG(rating), 0) 
      FROM public.marketplace_reviews 
      WHERE item_id = NEW.item_id
    ),
    rating_count = (
      SELECT COUNT(*) 
      FROM public.marketplace_reviews 
      WHERE item_id = NEW.item_id
    )
  WHERE id = NEW.item_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_marketplace_review_added
  AFTER INSERT OR UPDATE OR DELETE ON public.marketplace_reviews
  FOR EACH ROW EXECUTE FUNCTION public.update_marketplace_item_rating();

-- ============================================================================
-- SEED DATA FOR BLOGS & MARKETPLACE
-- ============================================================================

INSERT INTO public.blog_posts (title, slug, excerpt, content, cover_image_url, tags, category, is_published, is_featured, read_time_minutes)
VALUES 
  ('Modern Mobile Theming: Beyond Light and Dark Mode', 'modern-mobile-theming', 'Discover how to implement advanced design token systems that scale across Flutter and React Native.', 'Advanced design token systems are critical for scaling visual consistency across platforms. This guide details how to implement multi-theme tokens, leverage dynamic properties, and generate direct theme models from Figma tokens into Dart and TS styles.', 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&h=400&fit=crop', ARRAY['Design Systems', 'Flutter', 'React Native'], 'Design Systems', TRUE, TRUE, 8),
  ('Optimizing Flutter Animations for 120Hz Displays', 'optimizing-flutter-animations', 'Learn the secrets of the RepaintBoundary and how to achieve buttery smooth 120 FPS in complex UIs.', 'Flutter rendering pipelines are extremely powerful, but 120Hz displays demand careful optimization. We cover using RepaintBoundary to cache layer graphics, reducing rebuild cycles with builders, and identifying frame drops using DevTools.', 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=600&h=400&fit=crop', ARRAY['Performance', 'Flutter', 'Animations'], 'Performance', TRUE, FALSE, 12),
  ('Mastering Reanimated 3: Layout Animations and Beyond', 'react-native-reanimated-3', 'Explore the new possibilities of declarative layout animations in the latest Reanimated release.', 'React Native Reanimated 3 brings layout animations to a new level. In this post, we discuss shared transitions, layout entry/exit parameters, worklets optimization, and implementing custom gesture handlers for card-swipe behaviors.', 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=600&h=400&fit=crop', ARRAY['React Native', 'Reanimated', 'Animations'], 'React Native', TRUE, FALSE, 10)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.marketplace_items (title, description, price_cents, currency, downloads, rating_average, rating_count, is_active, image_url)
VALUES
  ('Premium Fintech Dashboard Pack', 'A collection of 15+ ready-to-use banking, transactions, and analytics cards built for Flutter and React Native.', 2900, 'USD', 248, 4.8, 19, TRUE, 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=600&h=400&fit=crop'),
  ('Neo-Brutalist Auth Screen Suite', 'Make your apps stand out with high-contrast, beautiful neo-brutalist layouts for login, onboarding, and OTP inputs.', 0, 'USD', 1420, 4.5, 34, TRUE, 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&h=400&fit=crop'),
  ('3D Fitness Tracker Visualizer', 'Beautiful workout tracker layout with custom animated 3D visualizers, circular rings, and detailed graph metrics.', 1900, 'USD', 89, 4.9, 12, TRUE, 'https://images.unsplash.com/photo-1510017803434-a899398421b3?q=80&w=600&h=400&fit=crop'),
  ('Swipe-to-Action Grid Kit', 'High-performance flat list wrapper supporting smooth swipe gesture commands, multi-selection, and quick archiving.', 900, 'USD', 312, 4.7, 21, TRUE, 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=600&h=400&fit=crop')
ON CONFLICT (title) DO NOTHING;

