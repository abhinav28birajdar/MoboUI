"use server";

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function getReviews(componentId: string) {
  const db = await createClient();
  const { data, error } = await db
    .from('component_reviews')
    .select('*, author:profiles(username, full_name, avatar_url)')
    .eq('component_id', componentId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching reviews:', error);
    return []; // Return empty gracefully if table is missing or fails
  }

  return data;
}

export async function getComponentRating(componentId: string) {
  const db = await createClient();
  const { data, error } = await db
    .from('component_reviews')
    .select('rating')
    .eq('component_id', componentId);

  if (error || !data || data.length === 0) {
    return { average: 0, count: 0, distribution: [0, 0, 0, 0, 0] };
  }

  const count = data.length;
  const sum = data.reduce((acc, curr) => acc + curr.rating, 0);
  const average = sum / count;

  const distribution = [0, 0, 0, 0, 0];
  data.forEach((r) => {
    if (r.rating >= 1 && r.rating <= 5) {
      distribution[r.rating - 1] += 1;
    }
  });

  return { average, count, distribution };
}

export async function submitReview(componentId: string, rating: number, comment: string) {
  const db = await createClient();
  const { data: { session } } = await db.auth.getSession();

  if (!session) {
    return { error: 'Unauthorized. Please sign in to leave a review.' };
  }

  if (rating < 1 || rating > 5) {
    return { error: 'Rating must be between 1 and 5 stars.' };
  }

  // Check if user already reviewed
  const { data: existingReview } = await db
    .from('component_reviews')
    .select('id')
    .eq('component_id', componentId)
    .eq('user_id', session.user.id)
    .single();

  if (existingReview) {
    return { error: 'You have already reviewed this component.' };
  }

  const { error } = await db
    .from('component_reviews')
    .insert({
      component_id: componentId,
      user_id: session.user.id,
      rating,
      comment
    });

  if (error) {
    console.error('Error submitting review:', error);
    return { error: error.message };
  }

  // Calculate new average and update component table
  const newRatingStats = await getComponentRating(componentId);
  await db
    .from('components')
    .update({ 
      rating: newRatingStats.average,
      rating_count: newRatingStats.count 
    })
    .eq('id', componentId);

  revalidatePath('/components');
  return { success: true };
}
