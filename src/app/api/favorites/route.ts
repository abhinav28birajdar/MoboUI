import { supabase } from '@/lib/supabase/client';
import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/favorites - Get user's favorite components
 * POST /api/favorites - Add/remove component from favorites
 */
export async function GET(request: NextRequest) {
  try {
    const hasDb = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const db = hasDb ? await createClient() : supabase;

    if (!hasDb || !db || typeof db.auth === 'undefined') {
      return NextResponse.json({ favorites: [] });
    }

    const { data: { session } } = await db.auth.getSession();

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { data: favorites, error } = await db
      .from('favorites')
      .select('component_id, components(name, slug, image_url, framework)')
      .eq('user_id', session.user.id);

    if (error) {
      throw error;
    }

    return NextResponse.json({ favorites: favorites || [] });
  } catch (error) {
    console.error('Error fetching favorites:', error);
    return NextResponse.json(
      { error: 'Failed to fetch favorites' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const hasDb = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const db = hasDb ? await createClient() : supabase;

    if (!hasDb || !db || typeof db.auth === 'undefined') {
      return NextResponse.json({ favorited: true, message: 'Local fallback mode active' });
    }

    const { data: { session } } = await db.auth.getSession();

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { componentId } = body;

    if (!componentId) {
      return NextResponse.json(
        { error: 'componentId is required' },
        { status: 400 }
      );
    }

    // Check if already favorited
    const { data: existing, error: checkError } = await db
      .from('favorites')
      .select('id')
      .eq('user_id', session.user.id)
      .eq('component_id', componentId)
      .maybeSingle();

    if (checkError) throw checkError;

    if (existing) {
      // Remove favorite
      const { error: deleteError } = await db
        .from('favorites')
        .delete()
        .eq('user_id', session.user.id)
        .eq('component_id', componentId);

      if (deleteError) throw deleteError;

      return NextResponse.json({ favorited: false });
    } else {
      // Add favorite
      const { error: insertError } = await db
        .from('favorites')
        .insert({
          user_id: session.user.id,
          component_id: componentId,
        });

      if (insertError) throw insertError;

      return NextResponse.json({ favorited: true });
    }
  } catch (error) {
    console.error('Error toggling favorite:', error);
    return NextResponse.json(
      { error: 'Failed to toggle favorite' },
      { status: 500 }
    );
  }
}
