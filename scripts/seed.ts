import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

// Manually load env variables from .env.local or .env
const envPath = fs.existsSync('.env.local') ? '.env.local' : (fs.existsSync('.env') ? '.env' : null);
if (envPath) {
  console.log(`Loading environment variables from: ${envPath}`);
  const envContent = fs.readFileSync(envPath, 'utf-8');
  envContent.split('\n').forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx > 0) {
      const key = trimmed.slice(0, eqIdx).trim();
      let val = trimmed.slice(eqIdx + 1).trim();
      // Remove surrounding quotes if they exist
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      process.env[key] = val;
    }
  });
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.warn('Supabase URL or Key env variables are missing in .env / .env.local. Skipping seeder execution (graceful exit).');
  process.exit(0);
}

// Instantiate Supabase client bypassing RLS policies using service role key
const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  console.log('--- MOBOUI Database Seeding Initializing ---');

  // 1. Seed 20 Categories
  const categories = [
    { name: 'Buttons', slug: 'buttons', description: 'Interactive button controls, triggers, and state loaders.', icon: '🔘', color: '#FFCA03' },
    { name: 'Cards', slug: 'cards', description: 'Glassmorphic card containers, grids, and modular layouts.', icon: '🎴', color: '#3B82F6' },
    { name: 'Forms', slug: 'forms', description: 'Inputs, select options, checklists, and otp verification blocks.', icon: '📋', color: '#10B981' },
    { name: 'Navigation', slug: 'navigation', description: 'Bottom tab items, side bars, drawers, and floating panels.', icon: '🧭', color: '#8B5CF6' },
    { name: 'Modals', slug: 'modals', description: 'Bottom sheets, alert boxes, and notification alerts.', icon: '📢', color: '#EC4899' },
    { name: 'Lists', slug: 'lists', description: 'Swipeable lists, group catalogs, and lazy collection lists.', icon: '📝', color: '#EF4444' },
    { name: 'Typography', slug: 'typography', description: 'Style headings, paragraph blocks, and code labels.', icon: '✍️', color: '#F59E0B' },
    { name: 'Media', slug: 'media', description: 'Image grids, carousels, custom video players.', icon: '🖼️', color: '#14B8A6' },
    { name: 'Feedback', slug: 'feedback', description: 'Progress lines, animated spinners, empty states.', icon: '🔔', color: '#6366F1' },
    { name: 'Layout', slug: 'layout', description: 'Responsive rows, aspect controls, grid patterns.', icon: '📐', color: '#F97316' },
    { name: 'Charts', slug: 'charts', description: 'Interactive line graphs, bar indicators, and stats dials.', icon: '📊', color: '#06B6D4' },
    { name: 'Authentication', slug: 'authentication', description: 'Sign up login pages, social inputs, otp validation.', icon: '🔑', color: '#84CC16' },
    { name: 'Onboarding', slug: 'onboarding', description: 'User guide slides, interactive tutorial indicators.', icon: '🚀', color: '#A855F7' },
    { name: 'Settings', slug: 'settings', description: 'Theme toggles, alert checklists, and exporter widgets.', icon: '⚙️', color: '#64748B' },
    { name: 'Profile', slug: 'profile', description: 'Avatar widgets, bio headers, and danger zone checklists.', icon: '👤', color: '#E2E8F0' },
    { name: 'Social', slug: 'social', description: 'Chat threads, timeline cards, comments groups.', icon: '💬', color: '#0EA5E9' },
    { name: 'Ecommerce', slug: 'ecommerce', description: 'Product shopping grids, price tags, checkout pages.', icon: '🛒', color: '#F43F5E' },
    { name: 'Notifications', slug: 'notifications', description: 'Banner warnings, toast updates, message dots.', icon: '📣', color: '#D946EF' },
    { name: 'Search', slug: 'search', description: 'Debounce search fields, autocomplete suggestions.', icon: '🔍', color: '#E11D48' },
    { name: 'Animations', slug: 'animations', description: 'Liquid loaders, reanimated micro-transitions.', icon: '✨', color: '#FFCA03' }
  ];

  console.log('Seeding categories...');
  const { data: seededCats, error: catError } = await supabase
    .from('categories')
    .upsert(categories, { onConflict: 'slug' })
    .select();

  if (catError) {
    console.error('Error seeding categories:', catError);
    return;
  }
  console.log(`Successfully seeded ${seededCats?.length} categories.`);

  // Mapping to map slugs to category IDs for components relation
  const categoryMap: Record<string, string> = {};
  seededCats?.forEach((c) => {
    categoryMap[c.slug] = c.id;
  });

  // 2. Seed 12 Components
  const components = [
    {
      name: 'Primary Button',
      slug: 'primary-button',
      description: 'Sleek custom button component with gold theme accent, hover scale gestures, and inline loading spinner indicators.',
      category_id: categoryMap['buttons'],
      framework: 'react-native',
      complexity: 'beginner',
      status: 'published',
      is_premium: false,
      tags: ['Button', 'Pressable', 'Haptics'],
      code_typescript: `import React from 'react';
import { Pressable, Text, StyleSheet, ActivityIndicator } from 'react-native';

export const PrimaryButton = ({ title, onPress, loading }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.btn, pressed && styles.pressed]}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator color="#000" />
      ) : (
        <Text style={styles.text}>{title}</Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  btn: {
    backgroundColor: '#FFCA03',
    height: 50,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  text: {
    color: '#000',
    fontSize: 14,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
});`,
    },
    {
      name: 'Glass Card',
      slug: 'glass-card',
      description: 'A premium glassmorphic layout container with background blur refractions and elegant thin border layouts.',
      category_id: categoryMap['cards'],
      framework: 'react-native',
      complexity: 'intermediate',
      status: 'published',
      is_premium: true,
      tags: ['Glassmorphism', 'Blur', 'Layout'],
      code_typescript: `import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';

export const GlassCard = ({ children }) => {
  return (
    <BlurView intensity={24} style={styles.blur}>
      <View style={styles.container}>{children}</View>
    </BlurView>
  );
};

const styles = StyleSheet.create({
  blur: {
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  container: {
    padding: 24,
    backgroundColor: 'rgba(17, 17, 19, 0.65)',
  },
});`,
    },
    {
      name: 'Bottom Sheet',
      slug: 'bottom-sheet',
      description: 'Swipeable bottom sheet modal powered by React Native Reanimated and Gesture Handler.',
      category_id: categoryMap['modals'],
      framework: 'react-native',
      complexity: 'advanced',
      status: 'published',
      is_premium: true,
      tags: ['BottomSheet', 'Reanimated', 'Gesture'],
      code_typescript: `// Powered by React Native Reanimated
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { useSharedValue } from 'react-native-reanimated';

export const BottomSheet = () => {
  const translationY = useSharedValue(0);
  return (
    <Animated.View style={styles.sheet}>
      <View style={styles.handle} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  sheet: {
    backgroundColor: '#111113',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 24,
    height: 400,
  },
  handle: {
    width: 40,
    height: 5,
    backgroundColor: '#27272A',
    borderRadius: 3,
    alignSelf: 'center',
    marginBottom: 12,
  },
});`,
    },
    {
      name: 'Animated Toggle',
      slug: 'animated-toggle',
      description: 'Elegant custom check switch component with fluid sliding indicator animations.',
      category_id: categoryMap['forms'],
      framework: 'react-native',
      complexity: 'intermediate',
      status: 'published',
      is_premium: false,
      tags: ['Switch', 'Form', 'Reanimated'],
      code_typescript: `// Animated Switch Component`,
    },
    {
      name: 'Linear Progress',
      slug: 'linear-progress',
      description: 'Custom linear loader tracker displaying progress status metrics.',
      category_id: categoryMap['feedback'],
      framework: 'flutter',
      complexity: 'beginner',
      status: 'published',
      is_premium: false,
      tags: ['Loader', 'Indicator', 'Bar'],
      code_typescript: `// Flutter custom progress bar`,
    },
    {
      name: 'Otp Verification',
      slug: 'otp-verification',
      description: 'Interactive sign-in verification input with autoshift index keys.',
      category_id: categoryMap['authentication'],
      framework: 'flutter',
      complexity: 'intermediate',
      status: 'published',
      is_premium: true,
      tags: ['Otp', 'Input', 'Verify'],
      code_typescript: `// OTP inputs layout`,
    },
    {
      name: 'Onboarding Carousel',
      slug: 'onboarding-carousel',
      description: 'Interactive slide container with dot progress indexes.',
      category_id: categoryMap['onboarding'],
      framework: 'react-native',
      complexity: 'intermediate',
      status: 'published',
      is_premium: false,
      tags: ['Carousel', 'Slider', 'Onboarding'],
      code_typescript: `// Onboarding Slider`,
    },
    {
      name: 'Swipeable List Item',
      slug: 'swipeable-list',
      description: 'Clean list element with swipe gesture action releases.',
      category_id: categoryMap['lists'],
      framework: 'expo',
      complexity: 'advanced',
      status: 'published',
      is_premium: true,
      tags: ['Swipeable', 'Gestures', 'List'],
      code_typescript: `// Swipe list item`,
    },
    {
      name: 'Avatar Group',
      slug: 'avatar-group',
      description: 'Stacked user icon layouts with count tags.',
      category_id: categoryMap['profile'],
      framework: 'expo',
      complexity: 'beginner',
      status: 'published',
      is_premium: false,
      tags: ['Avatar', 'Group', 'Social'],
      code_typescript: `// Expo Avatar Group`,
    },
    {
      name: 'Finance Stats Line Chart',
      slug: 'line-chart',
      description: 'Fluid graphs displaying financial analytics.',
      category_id: categoryMap['charts'],
      framework: 'flutter',
      complexity: 'advanced',
      status: 'published',
      is_premium: true,
      tags: ['Chart', 'Finance', 'Vector'],
      code_typescript: `// Flutter line chart`,
    },
    {
      name: 'Glassmorphic Navigation Bar',
      slug: 'navigation-bar',
      description: 'Premium refactored bottom tab layout with selection indicators.',
      category_id: categoryMap['navigation'],
      framework: 'react-native',
      complexity: 'intermediate',
      status: 'published',
      is_premium: true,
      tags: ['Navigation', 'Glassmorphism', 'Tabs'],
      code_typescript: `// Navigation Bar`,
    },
    {
      name: 'Sleek Code Label',
      slug: 'code-label',
      description: 'Monospace typographic tag showing parameter variables.',
      category_id: categoryMap['typography'],
      framework: 'react-native',
      complexity: 'beginner',
      status: 'published',
      is_premium: false,
      tags: ['Typography', 'Monospace', 'Label'],
      code_typescript: `// Typography label`,
    }
  ];

  console.log('Seeding components...');
  const { data: seededComps, error: compError } = await supabase
    .from('components')
    .upsert(components, { onConflict: 'slug' })
    .select();

  if (compError) {
    console.error('Error seeding components:', compError);
    return;
  }
  console.log(`Successfully seeded ${seededComps?.length} components.`);

  // 3. Seed 3 Blog Posts
  const blogPosts = [
    {
      title: 'Mastering React Native Reanimated: A Practical Guide',
      slug: 'mastering-react-native-reanimated',
      excerpt: 'Explore best practices to build 120 FPS fluid mobile layouts using worklets, gestures, and GPU hardware acceleration.',
      content: `## Achieving 120 FPS Animations on Mobile Screens

Creating smooth mobile layouts requires offloading logic to native rendering threads.

### 1. Worklets and the UI Thread
Worklets are small JavaScript functions compiled and executed on the GPU/UI thread directly. By marking worklets:

\`\`\`javascript
function myWorklet() {
  'worklet';
  // UI thread logic here
}
\`\`\`

You prevent JavaScript main-thread locking, allowing animations to run fluidly even during heavy database operations.

### 2. Gesture Handling
Combining Reanimated with React Native Gesture Handler ensures immediate drag, swipe, and pinch responses.`,
      cover_image_url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&fit=crop',
      tags: ['Animations', 'React Native', 'Reanimated'],
      category: 'Animations',
      is_published: true,
      is_featured: true,
      read_time_minutes: 8,
      published_at: new Date().toISOString()
    },
    {
      title: 'Building Premium Glassmorphic Layouts in Flutter',
      slug: 'building-glassmorphic-layouts-flutter',
      excerpt: 'How to implement backdrop filter refraction designs without causing rendering latency on iOS and Android devices.',
      content: `## The Art of Backdrop Filters in Flutter

Glassmorphism relies on blur refractions, highlight borders, and slight opacity overlays.

### Performance Caching
Because backdrop blurs recalculate pixel coordinates in every build cycle, they traditionally degrade rendering frame-rates.

### Solutions
- Apply \`RepaintBoundary\` to cache layout elements.
- Keep overlay opacities above \`0.05\` to reduce pixel-blend calculations.`,
      cover_image_url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=600&fit=crop',
      tags: ['Flutter', 'Design Systems', 'Glassmorphism'],
      category: 'Design Systems',
      is_published: true,
      is_featured: false,
      read_time_minutes: 6,
      published_at: new Date().toISOString()
    },
    {
      title: 'Designing High-Fidelity Micro-interactions for Mobile Apps',
      slug: 'designing-high-fidelity-micro-interactions',
      excerpt: 'How subtle haptic releases, sliding switches, and pop animations increase user engagement and retention metrics.',
      content: `## Micro-interactions: Small Details, Big Impact

Micro-interactions are single-purpose animation sequences (like a checkmark popping, heart dials expanding, or loading loops shifting).

### Principles of Micro-interactions
1. **Trigger**: User gestures (like tap, long-press).
2. **Rules**: Action feedback cycles (what happens when clicked).
3. **Feedback**: Visual, haptic, or auditory alerts.`,
      cover_image_url: 'https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=600&fit=crop',
      tags: ['Design Systems', 'Performance', 'UX'],
      category: 'Design Systems',
      is_published: true,
      is_featured: false,
      read_time_minutes: 5,
      published_at: new Date().toISOString()
    }
  ];

  console.log('Seeding blog posts...');
  const { data: seededBlogs, error: blogError } = await supabase
    .from('blog_posts')
    .upsert(blogPosts, { onConflict: 'slug' })
    .select();

  if (blogError) {
    console.error('Error seeding blog posts:', blogError);
    return;
  }
  console.log(`Successfully seeded ${seededBlogs?.length} blog posts.`);

  console.log('--- MOBOUI Database Seeding Completed Successfully ---');
}

main().catch((err) => {
  console.error('Unhandled seeder rejection:', err);
});
