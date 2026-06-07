import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';
import { createClient } from '@/lib/supabase/server';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { rating, review } = body;

    if (!rating || rating < 1 || rating > 5) {
      return NextResponse.json({ error: 'Rating must be an integer between 1 and 5' }, { status: 400 });
    }

    const hasDb = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const db = hasDb ? await createClient() : supabase;

    if (!hasDb || !db || typeof db.auth === 'undefined') {
      // Local fallback mode success
      return NextResponse.json({
        id: `mock-review-${Date.now()}`,
        rating,
        review: review || '',
        reviewerName: 'Test Developer (Offline Mode)',
        createdAt: new Date().toISOString(),
      }, { status: 201 });
    }

    const { data: { session } } = await db.auth.getSession();

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized: You must be signed in to review products' },
        { status: 401 }
      );
    }

    // Insert review
    const { data, error } = await db
      .from('marketplace_reviews')
      .insert({
        item_id: id,
        reviewer_id: session.user.id,
        rating,
        review: review?.trim() || '',
      })
      .select()
      .single();

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json({ error: 'You have already reviewed this item' }, { status: 409 });
      }
      throw error;
    }

    return NextResponse.json({
      id: data.id,
      rating: data.rating,
      review: data.review,
      reviewerName: session.user.user_metadata?.full_name || session.user.email || 'Anonymous Developer',
      createdAt: data.created_at,
    }, { status: 201 });
  } catch (error) {
    console.error('Error submitting review:', error);
    return NextResponse.json(
      { error: 'Failed to submit review' },
      { status: 500 }
    );
  }
}
