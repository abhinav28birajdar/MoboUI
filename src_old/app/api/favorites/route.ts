import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const db = await createClient();
    const { data: { session } } = await db.auth.getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data, error } = await db
      .from('favorites')
      .select('*, components(*)')
      .eq('user_id', session.user.id);

    if (error) throw error;

    return NextResponse.json(data.map((fav: any) => fav.components));
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const db = await createClient();
    const { data: { session } } = await db.auth.getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { component_id } = await request.json();
    if (!component_id) {
      return NextResponse.json({ error: 'Missing component_id' }, { status: 400 });
    }

    const { data: existing } = await db
      .from('favorites')
      .select('id')
      .eq('user_id', session.user.id)
      .eq('component_id', component_id)
      .maybeSingle();

    if (existing) {
      const { error } = await db
        .from('favorites')
        .delete()
        .eq('user_id', session.user.id)
        .eq('component_id', component_id);
      if (error) throw error;
      return NextResponse.json({ favorited: false });
    } else {
      const { error } = await db
        .from('favorites')
        .insert({ user_id: session.user.id, component_id });
      if (error) throw error;
      return NextResponse.json({ favorited: true });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
