import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';
import { createClient } from '@/lib/supabase/server';

const mockProjects = [
  {
    id: 'lumina-fitness',
    author_id: 'mock-user-1',
    author: { full_name: 'Alex River', avatar_url: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=200&h=200&fit=crop' },
    title: 'Lumina Fitness',
    description: 'A comprehensive workout tracking app with real-time heart rate monitoring and 3D exercise visualizations.',
    long_description: 'Lumina Fitness provides immersive fitness analytics by leveraging high-performance visual modules. Users can track workouts in 3D, sync telemetry devices, and export progress summaries.',
    thumbnail_url: 'https://images.unsplash.com/photo-1510017803434-a899398421b3?q=80&w=600&h=800&fit=crop',
    screenshots: [
      'https://images.unsplash.com/photo-1510017803434-a899398421b3?q=80&w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=600&fit=crop'
    ],
    demo_url: 'https://luminafitness.example.com',
    github_url: 'https://github.com/example/lumina-fitness',
    tags: ['Reanimated', 'Tailwind', '3D Graphics'],
    frameworks: ['React Native', 'Expo'],
    status: 'featured',
    view_count: 3240,
    like_count: 1240,
    created_at: '2026-05-10T12:00:00Z',
    challenge: "Lumina needed to render complex 3D skeletal wireframes of exercise motions inside a lightweight mobile view without causing stuttering or latency, particularly on mid-range Android devices. Synchronizing these animations with active heart-rate telemetry from Bluetooth monitors presented a severe frame-rendering bottleneck.",
    solution: "By utilizing React Native Reanimated 3 layout transitions combined with customized WebGL worklets, the rendering logic was entirely offloaded from the JavaScript thread to the GPU. MoboUI's responsive progress dials and grid parameters served as the foundational structure for the dashboard design system."
  },
  {
    id: 'zenith-banking',
    author_id: 'mock-user-2',
    author: { full_name: 'Sarah Chen', avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&h=200&fit=crop' },
    title: 'Zenith Banking',
    description: 'Modern neo-banking application featuring a glassmorphic interface and interactive financial analytics.',
    long_description: 'Zenith Banking offers a premium fintech experience with real-time charts, transaction breakdown trackers, and glassmorphic dashboards designed to speed up user workflows.',
    thumbnail_url: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=600&h=800&fit=crop',
    screenshots: [
      'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=600&fit=crop'
    ],
    demo_url: 'https://zenithbanking.example.com',
    github_url: 'https://github.com/example/zenith-banking',
    tags: ['Riverpod', 'Charts', 'Glassmorphism'],
    frameworks: ['Flutter'],
    status: 'approved',
    view_count: 2450,
    like_count: 892,
    created_at: '2026-05-18T14:30:00Z',
    challenge: "Providing live-updating transaction charts that remain responsive while sorting through years of transactional logs. The visual design called for complex glassmorphic effects (backdrop-filters) which traditionally degrade rendering frame-rates significantly on iOS devices.",
    solution: "The system implemented Flutter Riverpod for granular state updates. MoboUI layout grids were optimized with custom RepaintBoundaries to cache the background glass refraction shapes. Transactions are rendered inside a lazy-loading custom virtual list, keeping CPU usage below 5%."
  },
  {
    id: 'voyage-travel',
    author_id: 'mock-user-3',
    author: { full_name: 'Marco Polo', avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&fit=crop' },
    title: 'Voyage Travel',
    description: 'Immersive travel discovery platform with AR navigation and offline-first itinerary management.',
    long_description: 'Voyage Travel assists digital nomads in mapping itineraries, searching local destinations offline, and navigating path paths utilizing built-in AR components.',
    thumbnail_url: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=600&h=800&fit=crop',
    screenshots: [
      'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=600&fit=crop'
    ],
    demo_url: 'https://voyage.example.com',
    github_url: 'https://github.com/example/voyage-travel',
    tags: ['Mapbox', 'SQLite', 'Dark Mode'],
    frameworks: ['React Native'],
    status: 'approved',
    view_count: 1560,
    like_count: 567,
    created_at: '2026-05-25T09:15:00Z',
    challenge: "Travelers frequently experience offline scenarios. Synchronizing Mapbox cache tiles with localized SQLite databases while keeping navigation markers aligned required a resilient background queuing pipeline.",
    solution: "The team built an offline-first itinerary system using SQLite. Using MoboUI's sleek card templates and tabs, the interface smoothly transitions between maps and list modes. Local markers are re-rendered vectorially, ensuring zero lag."
  },
  {
    id: 'nourish-ui',
    author_id: 'mock-user-4',
    author: { full_name: 'Emma Green', avatar_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&fit=crop' },
    title: 'Nourish UI',
    description: 'AI-powered meal planning and grocery delivery app with smooth shared element transitions.',
    long_description: 'Nourish UI coordinates organic grocery shopping workflows with nutrition logs and menu schedulers in a responsive, highly animated layout.',
    thumbnail_url: 'https://images.unsplash.com/photo-1547517023-7ca0c162f816?q=80&w=600&h=800&fit=crop',
    screenshots: [
      'https://images.unsplash.com/photo-1547517023-7ca0c162f816?q=80&w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=600&fit=crop'
    ],
    demo_url: 'https://nourish.example.com',
    tags: ['Animations', 'Supabase', 'Nutrition'],
    frameworks: ['Flutter'],
    status: 'featured',
    view_count: 4890,
    like_count: 2105,
    created_at: '2026-06-01T16:40:00Z',
    challenge: "Rendering dozens of recipe cards with dynamic image overlays, active nutrient counts, and interactive checklist items caused heavy build cycles. Animating these recipe card items into full-screen descriptions during layout shifts resulted in frame drops.",
    solution: "The app integrated Supabase Realtime to update active cart item quantities. Shared element hero transition packages were fine-tuned with MoboUI cards, resulting in fluid native-feeling page shifts on both iOS and Android platforms."
  }
];

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const normalizedId = decodeURIComponent(id).toLowerCase();

    const hasDb = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const db = hasDb ? await createClient() : supabase;

    if (hasDb && db && typeof db.from === 'function') {
      try {
        const { data: project, error } = await db
          .from('projects')
          .select('*, author:profiles(full_name, avatar_url)')
          .eq('id', normalizedId)
          .maybeSingle();

        if (error) throw error;

        if (project) {
          // Increment views
          await db
            .from('projects')
            .update({ view_count: (project.view_count || 0) + 1 })
            .eq('id', project.id);

          return NextResponse.json(project);
        }
      } catch (dbError) {
        console.warn('Database details query failed for project, falling back to mock data:', dbError);
      }
    }

    // Fallback Mock Logic
    const project = mockProjects.find(
      p => p.id === normalizedId || p.title.toLowerCase().replace(/\s+/g, '-') === normalizedId
    );

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error('Error fetching project detail:', error);
    return NextResponse.json({ error: 'Failed to fetch project details' }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const normalizedId = decodeURIComponent(id).toLowerCase();

    const hasDb = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const db = hasDb ? await createClient() : supabase;

    if (hasDb && db && typeof db.from === 'function') {
      try {
        const { data: project, error } = await db
          .from('projects')
          .select('like_count')
          .eq('id', normalizedId)
          .maybeSingle();

        if (error) throw error;

        if (project) {
          const newLikeCount = (project.like_count || 0) + 1;
          const { data: updated, error: updateErr } = await db
            .from('projects')
            .update({ like_count: newLikeCount })
            .eq('id', normalizedId)
            .select()
            .single();

          if (updateErr) throw updateErr;

          return NextResponse.json({ likes: updated.like_count });
        }
      } catch (dbError) {
        console.warn('Database like update failed, falling back:', dbError);
      }
    }

    // Fallback mock increment
    return NextResponse.json({ likes: 100 });
  } catch (error) {
    console.error('Error updating project likes:', error);
    return NextResponse.json({ error: 'Failed to update likes' }, { status: 500 });
  }
}
