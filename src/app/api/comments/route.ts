import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const db = await createClient();
    const searchParams = request.nextUrl.searchParams;
    const entityType = searchParams.get('entity_type');
    const entityId = searchParams.get('entity_id');

    if (!entityType || !entityId) {
      return NextResponse.json({ error: 'Missing entity_type or entity_id' }, { status: 400 });
    }

    const { data: comments, error } = await db
      .from('comments')
      .select('*, author:profiles(username, full_name, avatar_url)')
      .eq('entity_type', entityType)
      .eq('entity_id', entityId)
      .order('created_at', { ascending: true });

    if (error) throw error;

    // Nest replies
    const parentComments = (comments || []).filter((c) => !c.parent_id);
    parentComments.forEach((parent) => {
      parent.replies = (comments || []).filter((c) => c.parent_id === parent.id);
    });

    return NextResponse.json(parentComments);
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

    const body = await request.json();
    const { entity_type, entity_id, parent_id, content } = body;

    if (!entity_type || !entity_id || !content) {
      return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
    }

    const { data: comment, error } = await db
      .from('comments')
      .insert({
        author_id: session.user.id,
        entity_type,
        entity_id,
        parent_id: parent_id || null,
        content,
      })
      .select('*, author:profiles(username, full_name, avatar_url)')
      .single();

    if (error) throw error;

    return NextResponse.json(comment, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const db = await createClient();
    const { data: { session } } = await db.auth.getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { id, content } = body;

    if (!id || !content) {
      return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
    }

    const { data: comment, error } = await db
      .from('comments')
      .update({ content, is_edited: true })
      .eq('id', id)
      .eq('author_id', session.user.id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(comment);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const db = await createClient();
    const { data: { session } } = await db.auth.getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Missing id' }, { status: 400 });
    }

    // Admins can delete any comments, users can delete own comments
    const { data: profile } = await db
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single();

    let query = db.from('comments').delete().eq('id', id);
    if (!profile || profile.role !== 'admin') {
      query = query.eq('author_id', session.user.id);
    }

    const { error } = await query;
    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
