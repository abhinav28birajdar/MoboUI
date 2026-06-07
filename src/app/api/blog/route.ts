import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';
import { createClient } from '@/lib/supabase/server';
import { mockBlogPosts } from '@/lib/data/blog';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const tag = searchParams.get('tag');
    const query = searchParams.get('q');
    const limitParam = searchParams.get('limit');
    const limit = limitParam ? Math.min(Math.max(Number(limitParam) || 0, 1), 50) : 10;

    const hasDb = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const db = hasDb ? await createClient() : supabase;

    if (hasDb && db && typeof db.from === 'function') {
      try {
        let queryBuilder = db
          .from('blog_posts')
          .select('*')
          .eq('is_published', true)
          .order('published_at', { ascending: false })
          .limit(limit);

        if (category) {
          queryBuilder = queryBuilder.eq('category', category);
        }

        if (tag) {
          queryBuilder = queryBuilder.contains('tags', [tag]);
        }

        if (query) {
          queryBuilder = queryBuilder.or(`title.ilike.%${query}%,excerpt.ilike.%${query}%`);
        }

        const { data: posts, error } = await queryBuilder;

        if (error) {
          throw error;
        }

        if (posts && posts.length > 0) {
          // Map snake_case database schema to camelCase front-end expectations
          const formattedPosts = posts.map((post: any) => ({
            id: post.id,
            title: post.title,
            slug: post.slug,
            excerpt: post.excerpt,
            content: post.content,
            coverImageUrl: post.cover_image_url,
            tags: post.tags || [],
            category: post.category,
            isPublished: post.is_published,
            isFeatured: post.is_featured,
            viewCount: post.view_count,
            readTimeMinutes: post.read_time_minutes,
            publishedAt: post.published_at,
            createdAt: post.created_at,
            updatedAt: post.updated_at,
          }));

          return NextResponse.json({ posts: formattedPosts });
        }
      } catch (dbError) {
        console.warn('Database query failed for blog, falling back to mock data:', dbError);
      }
    }

    // Fallback Mock Logic
    let filtered = [...mockBlogPosts];

    if (category) {
      filtered = filtered.filter(post => post.category.toLowerCase() === category.toLowerCase());
    }

    if (tag) {
      filtered = filtered.filter(post => post.tags.some(t => t.toLowerCase() === tag.toLowerCase()));
    }

    if (query) {
      const q = query.toLowerCase();
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(q) || 
        post.excerpt.toLowerCase().includes(q)
      );
    }

    const sliced = filtered.slice(0, limit);

    return NextResponse.json({ posts: sliced });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json({ error: 'Failed to fetch blog posts' }, { status: 500 });
  }
}
