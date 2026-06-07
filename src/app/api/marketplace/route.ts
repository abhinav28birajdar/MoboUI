import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';
import { createClient } from '@/lib/supabase/server';
import { mockMarketplaceItems } from '@/lib/data/marketplace';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const framework = searchParams.get('framework');
    const pricing = searchParams.get('pricing'); // 'all', 'free', 'paid'
    const query = searchParams.get('q');
    const sort = searchParams.get('sort') || 'popular'; // 'popular', 'newest', 'rating', 'price_asc', 'price_desc'
    const limitParam = searchParams.get('limit');
    const limit = limitParam ? Math.min(Math.max(Number(limitParam) || 0, 1), 50) : 12;

    const hasDb = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const db = hasDb ? await createClient() : supabase;

    if (hasDb && db && typeof db.from === 'function') {
      try {
        let queryBuilder = db
          .from('marketplace_items')
          .select('*')
          .eq('is_active', true);

        if (category && category !== 'all') {
          queryBuilder = queryBuilder.eq('category', category);
        }

        if (pricing === 'free') {
          queryBuilder = queryBuilder.eq('price_cents', 0);
        } else if (pricing === 'paid') {
          queryBuilder = queryBuilder.gt('price_cents', 0);
        }

        if (query) {
          queryBuilder = queryBuilder.or(`title.ilike.%${query}%,description.ilike.%${query}%`);
        }

        // Apply sorting
        if (sort === 'newest') {
          queryBuilder = queryBuilder.order('created_at', { ascending: false });
        } else if (sort === 'rating') {
          queryBuilder = queryBuilder.order('rating_average', { ascending: false });
        } else if (sort === 'price_asc') {
          queryBuilder = queryBuilder.order('price_cents', { ascending: true });
        } else if (sort === 'price_desc') {
          queryBuilder = queryBuilder.order('price_cents', { ascending: false });
        } else {
          // Default: popular (downloads count desc)
          queryBuilder = queryBuilder.order('downloads', { ascending: false });
        }

        queryBuilder = queryBuilder.limit(limit);

        const { data: items, error } = await queryBuilder;

        if (error) {
          throw error;
        }

        if (items && items.length > 0) {
          // Map database snake_case keys to camelCase fields expected by frontend
          const formattedItems = items.map((item: any) => ({
            id: item.id,
            title: item.title,
            description: item.description,
            priceCents: item.price_cents,
            currency: item.currency,
            downloads: item.downloads,
            ratingAverage: Number(item.rating_average),
            ratingCount: item.rating_count,
            isActive: item.is_active,
            imageUrl: item.image_url,
            category: item.category,
            createdAt: item.created_at,
            updatedAt: item.updated_at,
            frameworks: item.frameworks || ['React Native', 'Flutter'], // Fallback if column null
            features: item.features || [],
          }));

          // Client-side framework filtering if requested
          let finalItems = formattedItems;
          if (framework && framework !== 'all') {
            finalItems = formattedItems.filter((item: any) =>
              item.frameworks.some((f: string) => f.toLowerCase().includes(framework.toLowerCase()))
            );
          }

          return NextResponse.json({ items: finalItems });
        }
      } catch (dbError) {
        console.warn('Database query failed for marketplace, falling back to mock data:', dbError);
      }
    }

    // Fallback Mock Logic
    let filtered = [...mockMarketplaceItems];

    if (category && category !== 'all') {
      filtered = filtered.filter(item => item.category.toLowerCase() === category.toLowerCase());
    }

    if (framework && framework !== 'all') {
      filtered = filtered.filter(item =>
        item.frameworks.some(f => f.toLowerCase().includes(framework.toLowerCase()))
      );
    }

    if (pricing === 'free') {
      filtered = filtered.filter(item => item.priceCents === 0);
    } else if (pricing === 'paid') {
      filtered = filtered.filter(item => item.priceCents > 0);
    }

    if (query) {
      const q = query.toLowerCase();
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q)
      );
    }

    // Apply mock sorting
    if (sort === 'newest') {
      filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (sort === 'rating') {
      filtered.sort((a, b) => b.ratingAverage - a.ratingAverage);
    } else if (sort === 'price_asc') {
      filtered.sort((a, b) => a.priceCents - b.priceCents);
    } else if (sort === 'price_desc') {
      filtered.sort((a, b) => b.priceCents - a.priceCents);
    } else {
      // popular
      filtered.sort((a, b) => b.downloads - a.downloads);
    }

    const sliced = filtered.slice(0, limit);
    return NextResponse.json({ items: sliced });
  } catch (error) {
    console.error('Error fetching marketplace items:', error);
    return NextResponse.json({ error: 'Failed to fetch marketplace items' }, { status: 500 });
  }
}
