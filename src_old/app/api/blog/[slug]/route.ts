import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';
import { createClient } from '@/lib/supabase/server';
import { mockBlogPosts } from '@/lib/data/blog';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const normalizedSlug = decodeURIComponent(slug).toLowerCase();

    const hasDb = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const db = hasDb ? await createClient() : supabase;

    if (hasDb && db && typeof db.from === 'function') {
      try {
        const { data: post, error } = await db
          .from('blog_posts')
          .select('*')
          .eq('slug', normalizedSlug)
          .eq('is_published', true)
          .maybeSingle();

        if (error) {
          throw error;
        }

        if (post) {
          const formattedPost = {
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
          };
          return NextResponse.json(formattedPost);
        }
      } catch (dbError) {
        console.warn('Database details query failed for blog, falling back to mock data:', dbError);
      }
    }

    // Fallback Mock Logic
    const post = mockBlogPosts.find(p => p.slug.toLowerCase() === normalizedSlug);

    if (!post) {
      return NextResponse.json({ error: 'Blog post not found' }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error('Error fetching blog post details:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog post details' },
      { status: 500 }
    );
  }
}
