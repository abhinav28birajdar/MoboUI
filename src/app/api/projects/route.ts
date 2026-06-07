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
  }
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const framework = searchParams.get('framework');
    const search = searchParams.get('q');
    const authorId = searchParams.get('author_id');

    const hasDb = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const db = hasDb ? await createClient() : supabase;

    if (hasDb && db && typeof db.from === 'function') {
      try {
        let query = db
          .from('projects')
          .select('*, author:profiles(full_name, avatar_url)');

        if (authorId) {
          query = query.eq('author_id', authorId);
        } else {
          // If public view, only show approved or featured
          query = query.in('status', ['approved', 'featured']);
        }

        if (search) {
          query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`);
        }

        const { data: projects, error } = await query.order('created_at', { ascending: false });

        if (error) throw error;

        if (projects && projects.length > 0) {
          let filtered = projects;
          if (framework && framework !== 'all') {
            filtered = projects.filter((p: any) => 
              p.frameworks?.some((f: string) => f.toLowerCase().includes(framework.toLowerCase()))
            );
          }
          return NextResponse.json({ projects: filtered });
        }
      } catch (dbError) {
        console.warn('Database select failed for projects, falling back to mock data:', dbError);
      }
    }

    // Fallback Mock Logic
    let filtered = [...mockProjects];

    if (authorId) {
      filtered = filtered.filter(p => p.author_id === authorId);
    }

    if (framework && framework !== 'all') {
      filtered = filtered.filter(p =>
        p.frameworks.some(f => f.toLowerCase().includes(framework.toLowerCase()))
      );
    }

    if (search) {
      const s = search.toLowerCase();
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(s) ||
        p.description.toLowerCase().includes(s)
      );
    }

    return NextResponse.json({ projects: filtered });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const hasDb = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const db = hasDb ? await createClient() : supabase;

    // Retrieve Auth session
    if (!hasDb || !db || typeof db.auth === 'undefined') {
      const body = await request.json();
      return NextResponse.json({
        id: `mock-project-${Date.now()}`,
        author_id: 'mock-user-1',
        title: body.title,
        description: body.description,
        long_description: body.longDescription || '',
        thumbnail_url: body.thumbnailUrl,
        screenshots: body.screenshots || [],
        demo_url: body.demoUrl || '',
        github_url: body.githubUrl || '',
        app_store_url: body.appStoreUrl || '',
        play_store_url: body.playStoreUrl || '',
        tags: body.tags || [],
        frameworks: body.frameworks || [],
        status: 'pending',
        view_count: 0,
        like_count: 0,
        created_at: new Date().toISOString(),
      }, { status: 201 });
    }

    const { data: { session } } = await db.auth.getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();

    const { data: project, error } = await db
      .from('projects')
      .insert({
        author_id: session.user.id,
        title: body.title,
        description: body.description,
        long_description: body.longDescription,
        thumbnail_url: body.thumbnailUrl,
        screenshots: body.screenshots || [],
        demo_url: body.demoUrl,
        github_url: body.githubUrl,
        app_store_url: body.appStoreUrl,
        play_store_url: body.playStoreUrl,
        tags: body.tags || [],
        frameworks: body.frameworks || [],
        status: 'pending',
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
}
