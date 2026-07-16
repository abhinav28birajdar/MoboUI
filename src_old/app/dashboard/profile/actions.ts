"use server";

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function updateProfile(data: {
  username?: string;
  full_name?: string;
  biography?: string;
  github_url?: string;
  twitter_url?: string;
  avatar_url?: string;
}) {
  try {
    const db = await createClient();
    const { data: { session } } = await db.auth.getSession();

    if (!session) {
      return { error: 'Unauthorized' };
    }

    const { error } = await db
      .from('profiles')
      .upsert({
        id: session.user.id,
        ...data,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'id' });

    if (error) {
      console.error('Error updating profile:', error);
      return { error: error.message };
    }

    revalidatePath('/dashboard/profile');
    return { success: true };
  } catch (error: any) {
    console.error('Server action error:', error);
    return { error: error.message || 'An unexpected error occurred.' };
  }
}