import { supabase } from '@/lib/supabase/client';
import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';
import { components as mockComponents } from '@/lib/data/components';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q') || '';
    const categorySlugs = searchParams.get('categories') ? searchParams.get('categories')!.split(',') : [];
    const framework = searchParams.get('framework') || 'all';
    
    const isFree = searchParams.get('free') === 'true';
    const isPremium = searchParams.get('premium') === 'true';
    const isNew = searchParams.get('new') === 'true';
    const isFeatured = searchParams.get('featured') === 'true';
    
    const wcagLevels = searchParams.get('wcag') ? searchParams.get('wcag')!.split(',') : [];
    
    const sortBy = searchParams.get('sort') || 'newest';
    const limit = Math.min(Math.max(Number(searchParams.get('limit')) || 24, 1), 100);
    const offset = Number(searchParams.get('offset')) || 0;

    const hasDb = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const db = hasDb ? await createClient() : supabase;

    if (hasDb && db && typeof db.from === 'function') {
      try {
        let queryBuilder = db
          .from('components')
          .select('*, categories!inner(slug)', { count: 'exact' })
          .eq('is_published', true);

        // Text Search
        if (query) {
          queryBuilder = queryBuilder.or(
            `name.ilike.%${query}%,description.ilike.%${query}%,tags.cs.{"${query}"}`
          );
        }

        // Framework filter
        if (framework !== 'all') {
          queryBuilder = queryBuilder.or(`framework.eq.${framework},framework.eq.both`);
        }

        // Category slugs filter
        if (categorySlugs.length > 0) {
          queryBuilder = queryBuilder.in('categories.slug', categorySlugs);
        }

        // Attribute filters
        if (isFree && !isPremium) {
          queryBuilder = queryBuilder.eq('is_premium', false);
        } else if (isPremium && !isFree) {
          queryBuilder = queryBuilder.eq('is_premium', true);
        }
        if (isNew) {
          queryBuilder = queryBuilder.eq('is_new', true);
        }
        if (isFeatured) {
          queryBuilder = queryBuilder.eq('is_featured', true);
        }

        // WCAG
        if (wcagLevels.length > 0) {
          queryBuilder = queryBuilder.in('wcag_level', wcagLevels);
        }

        // Sorting
        if (sortBy === 'newest') {
          queryBuilder = queryBuilder.order('created_at', { ascending: false });
        } else if (sortBy === 'popular') {
          queryBuilder = queryBuilder.order('view_count', { ascending: false });
        } else if (sortBy === 'favorites') {
          queryBuilder = queryBuilder.order('favorite_count', { ascending: false });
        } else if (sortBy === 'az') {
          queryBuilder = queryBuilder.order('name', { ascending: true });
        }

        // Pagination
        queryBuilder = queryBuilder.range(offset, offset + limit - 1);

        const { data: components, error, count } = await queryBuilder;

        if (error) throw error;

        return NextResponse.json({
          components: components || [],
          total: count || 0,
          limit,
          offset,
        });
      } catch (dbError) {
        console.warn('Database query failed, falling back to mock data:', dbError);
      }
    }

    // Fallback: Local Javascript Filtering of mock components list
    let filtered = [...mockComponents];

    if (query) {
      const q = query.toLowerCase();
      filtered = filtered.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q) ||
          c.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (categorySlugs.length > 0) {
      filtered = filtered.filter((c) =>
        categorySlugs.includes(c.category.toLowerCase().replace(/\s+/g, '-'))
      );
    }

    if (framework !== 'all') {
      filtered = filtered.filter(
        (c) => c.framework === framework || c.framework === 'both'
      );
    }

    if (isFree && !isPremium) {
      filtered = filtered.filter((c) => !c.is_premium);
    } else if (isPremium && !isFree) {
      filtered = filtered.filter((c) => c.is_premium);
    }

    if (isNew) {
      filtered = filtered.filter((c) => c.is_new);
    }

    if (isFeatured) {
      // Mock components don't have is_featured column, map popularity
      filtered = filtered.filter((c) => (c.popularity || 0) > 200);
    }

    if (wcagLevels.length > 0) {
      filtered = filtered.filter((c) => wcagLevels.includes(c.wcag_level || 'AA'));
    }

    // Sort Fallback
    if (sortBy === 'newest') {
      // Keep order
    } else if (sortBy === 'popular') {
      filtered.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
    } else if (sortBy === 'favorites') {
      filtered.sort((a, b) => (b.favorite_count || 0) - (a.favorite_count || 0));
    } else if (sortBy === 'az') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    const total = filtered.length;
    const paginated = filtered.slice(offset, offset + limit);

    return NextResponse.json({
      components: paginated,
      total,
      limit,
      offset,
    });
  } catch (error) {
    console.error('Error fetching components:', error);
    return NextResponse.json(
      { error: 'Failed to fetch components' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const hasDb = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const db = hasDb ? await createClient() : supabase;

    if (!hasDb || !db || typeof db.auth === 'undefined') {
      const body = await request.json();
      return NextResponse.json({
        ...body,
        id: `mock-${Date.now()}`,
        status: 'published',
        created_at: new Date().toISOString(),
      }, { status: 201 });
    }

    const { data: { session } } = await db.auth.getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: profile } = await db
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single();

    if (!profile || (profile.role !== 'admin' && profile.role !== 'moderator')) {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    const body = await request.json();
    const { data: component, error } = await db
      .from('components')
      .insert({
        ...body,
        author_id: session.user.id,
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(component, { status: 201 });
  } catch (error) {
    console.error('Error creating component:', error);
    return NextResponse.json({ error: 'Failed to create component' }, { status: 500 });
  }
}
