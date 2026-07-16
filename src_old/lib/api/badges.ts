"use server";

import { createClient } from '@/lib/supabase/server';
import { BADGE_DICTIONARY } from '@/lib/data/badges';

export async function getUserBadges(userId: string) {
  const db = await createClient();
  const { data, error } = await db
    .from('user_badges')
    .select('badge_id, earned_at')
    .eq('user_id', userId)
    .order('earned_at', { ascending: false });

  if (error) {
    console.error('Error fetching user badges:', error);
    // If table doesn't exist yet, we will gracefully fallback to returning empty array
    // or maybe simulate 'early-adopter' if they are an admin or just return nothing.
    return [];
  }

  // Hydrate with dictionary data
  return (data || []).map((b) => ({
    ...b,
    ...BADGE_DICTIONARY[b.badge_id],
  })).filter(b => b.name); // ensure badge exists in dictionary
}

export async function getMockUserBadges(userId: string) {
  // For UI testing when DB table isn't migrated
  return [
    { badge_id: 'early-adopter', earned_at: new Date().toISOString(), ...BADGE_DICTIONARY['early-adopter'] },
    { badge_id: 'verified-dev', earned_at: new Date().toISOString(), ...BADGE_DICTIONARY['verified-dev'] },
  ];
}

export async function awardBadge(userId: string, badgeId: string) {
  const db = await createClient();
  const { error } = await db
    .from('user_badges')
    .insert({
      user_id: userId,
      badge_id: badgeId
    });

  if (error && error.code !== '23505') { // ignore unique constraint violation (already has badge)
    console.error('Error awarding badge:', error);
    return { error: error.message };
  }

  return { success: true };
}
