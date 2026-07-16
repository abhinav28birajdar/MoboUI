"use server";

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function getNotifications(limit = 50) {
  const db = await createClient();
  const { data: { session } } = await db.auth.getSession();

  if (!session) {
    return { error: 'Unauthorized' };
  }

  const { data, error } = await db
    .from('notifications')
    .select('*')
    .eq('user_id', session.user.id)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching notifications:', error);
    return { data: [] }; // Return empty gracefully if table is missing
  }

  return { data };
}

export async function getUnreadCount() {
  const db = await createClient();
  const { data: { session } } = await db.auth.getSession();

  if (!session) return 0;

  const { count, error } = await db
    .from('notifications')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', session.user.id)
    .eq('is_read', false);

  if (error) return 0;
  return count || 0;
}

export async function markAsRead(notificationId: string) {
  const db = await createClient();
  const { data: { session } } = await db.auth.getSession();

  if (!session) return { error: 'Unauthorized' };

  const { error } = await db
    .from('notifications')
    .update({ is_read: true })
    .eq('id', notificationId)
    .eq('user_id', session.user.id);

  if (error) return { error: error.message };

  revalidatePath('/', 'layout');
  return { success: true };
}

export async function markAllAsRead() {
  const db = await createClient();
  const { data: { session } } = await db.auth.getSession();

  if (!session) return { error: 'Unauthorized' };

  const { error } = await db
    .from('notifications')
    .update({ is_read: true })
    .eq('user_id', session.user.id)
    .eq('is_read', false);

  if (error) return { error: error.message };

  revalidatePath('/', 'layout');
  return { success: true };
}
