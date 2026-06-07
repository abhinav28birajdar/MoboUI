import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';
import { createClient } from '@/lib/supabase/server';
import { mockMarketplaceItems } from '@/lib/data/marketplace';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const normalizedId = decodeURIComponent(id).toLowerCase();

    const hasDb = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const db = hasDb ? await createClient() : supabase;

    if (hasDb && db && typeof db.from === 'function') {
      try {
        const { data: item, error } = await db
          .from('marketplace_items')
          .select('*, seller:profiles(*)')
          .eq('id', normalizedId)
          .maybeSingle();

        if (error) {
          throw error;
        }

        if (item) {
          // Fetch reviews for this item
          const { data: reviews, error: reviewsError } = await db
            .from('marketplace_reviews')
            .select('*, reviewer:profiles(full_name, avatar_url)')
            .eq('item_id', item.id)
            .order('created_at', { ascending: false });

          const formattedReviews = (reviews || []).map((rev: any) => ({
            id: rev.id,
            rating: rev.rating,
            review: rev.review,
            reviewerName: rev.reviewer?.full_name || 'Anonymous Developer',
            reviewerAvatarUrl: rev.reviewer?.avatar_url,
            createdAt: rev.created_at,
          }));

          const formattedItem = {
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
            frameworks: item.frameworks || ['React Native', 'Flutter'],
            features: item.features || [
              'Custom spacing attributes',
              'Smooth theme adjustments',
              'Easy integration steps',
            ],
            seller: item.seller ? {
              name: item.seller.full_name || item.seller.username || 'MOBOUI Seller',
              avatarUrl: item.seller.avatar_url,
              isVerified: item.seller.is_verified || false,
            } : {
              name: 'MOBOUI Official',
              isVerified: true,
            },
            reviews: formattedReviews,
          };

          return NextResponse.json(formattedItem);
        }
      } catch (dbError) {
        console.warn('Database details query failed for marketplace item, falling back to mock data:', dbError);
      }
    }

    // Fallback Mock Logic
    const item = mockMarketplaceItems.find(
      (m) => m.id.toLowerCase() === normalizedId || m.title.toLowerCase().replace(/\s+/g, '-').includes(normalizedId)
    );

    if (!item) {
      return NextResponse.json({ error: 'Marketplace item not found' }, { status: 404 });
    }

    return NextResponse.json(item);
  } catch (error) {
    console.error('Error fetching marketplace item details:', error);
    return NextResponse.json(
      { error: 'Failed to fetch marketplace item details' },
      { status: 500 }
    );
  }
}
