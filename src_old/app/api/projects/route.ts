import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const db = await createClient();
    const searchParams = request.nextUrl.searchParams;
    
    const framework = searchParams.get('framework') || 'all';
    const status = searchParams.get('status') || 'approved';
    const search = searchParams.get('q') || '';
    const sortBy = searchParams.get('sort') || 'newest';

    let query = db
      .from('projects')
      .select('*, author:profiles(username, full_name, avatar_url)', { count: 'exact' });

    if (status) {
      query = query.eq('status', status);
    }
    if (framework !== 'all') {
      query = query.eq('framework', framework);
    }
    if (search) {
      query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`);
    }

    if (sortBy === 'popular') {
      query = query.order('view_count', { ascending: false });
    } else if (sortBy === 'likes') {
      query = query.order('like_count', { ascending: false });
    } else {
      query = query.order('created_at', { ascending: false });
    }

    const { data, count, error } = await query;
    if (error) throw error;

    return NextResponse.json({
      projects: data || [],
      total: count || 0,
    });
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
    const { title, description, long_description, cover_image_url, project_url, github_url, tags, framework } = body;

    if (!title) {
      return NextResponse.json({ error: 'Missing title' }, { status: 400 });
    }

    const { data: project, error } = await db
      .from('projects')
      .insert({
        author_id: session.user.id,
        title,
        description: description || null,
        long_description: long_description || null,
        cover_image_url: cover_image_url || null,
        project_url: project_url || null,
        github_url: github_url || null,
        tags: tags || [],
        framework: framework || null,
        status: 'pending',
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(project, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
