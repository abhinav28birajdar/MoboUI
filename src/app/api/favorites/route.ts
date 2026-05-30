import { supabase } from '@/lib/supabase/client';
import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/favorites - Get user's favorite components
 * POST /api/favorites - Add component to favorites
 */
export async function GET(request: NextRequest) {
  try {
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { data: favorites, error } = await supabase
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
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { componentId } = body;

    // Check if already favorited
    const { data: existing } = await supabase
      .from('favorites')
      .select('id')
      .eq('user_id', session.user.id)
      .eq('component_id', componentId)
      .single();

    if (existing) {
      // Remove favorite
      const { error } = await supabase
        .from('favorites')
        .delete()
        .eq('user_id', session.user.id)
        .eq('component_id', componentId);

      if (error) throw error;

      return NextResponse.json({ favorited: false });
    } else {
      // Add favorite
      const { error } = await supabase
        .from('favorites')
        .insert({
          user_id: session.user.id,
          component_id: componentId,
        });

      if (error) throw error;

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
