import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';
import { components as mockComponents } from '@/lib/data/components-data';

const hasDb = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q') || '';

    if (!query) {
      return NextResponse.json({ components: [], projects: [], blogs: [], users: [] });
    }

    if (hasDb) {
      const db = await createClient();
      const match = `%${query}%`;

      const [compsRes, projsRes, blogsRes, usersRes] = await Promise.all([
        db.from('components').select('*').or(`name.ilike.${match},description.ilike.${match}`).limit(8),
        db.from('projects').select('*').or(`title.ilike.${match},description.ilike.${match}`).eq('status', 'approved').limit(8),
        db.from('blog_posts').select('*').or(`title.ilike.${match},excerpt.ilike.${match}`).limit(8),
        db.from('profiles').select('id, username, full_name, avatar_url').or(`username.ilike.${match},full_name.ilike.${match}`).limit(8),
      ]);

      return NextResponse.json({
        components: compsRes.data || [],
        projects: projsRes.data || [],
        blogs: blogsRes.data || [],
        users: usersRes.data || [],
      });
    }

    // Mock Fallback
    const q = query.toLowerCase();
    const matchedComponents = mockComponents.filter(
      (c) => c.name.toLowerCase().includes(q) || (c.description || '').toLowerCase().includes(q)
    ).slice(0, 8);

    return NextResponse.json({
      components: matchedComponents,
      projects: [],
      blogs: [],
      users: [],
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
