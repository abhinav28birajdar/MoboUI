"use server";

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function getPosts(category?: string) {
  const db = await createClient();
  let query = db
    .from('community_posts')
    .select('*, author:profiles(username, full_name, avatar_url)', { count: 'exact' })
    .order('created_at', { ascending: false });

  if (category && category !== 'All') {
    query = query.eq('category', category);
  }

  const { data, count, error } = await query;
  if (error) {
    console.error('Error fetching community posts:', error);
    return { data: [], count: 0 };
  }
  return { data, count };
}

export async function getPostById(id: string) {
  const db = await createClient();
  const { data, error } = await db
    .from('community_posts')
    .select('*, author:profiles(username, full_name, avatar_url)')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching post:', error);
    return null;
  }
  
  // Increment view count
  const { error: viewError } = await db.rpc('increment_post_views', { post_id: id });
  if (viewError) console.error('Failed to increment views:', viewError);

  return data;
}

export async function getReplies(postId: string) {
  const db = await createClient();
  const { data, error } = await db
    .from('community_replies')
    .select('*, author:profiles(username, full_name, avatar_url)')
    .eq('post_id', postId)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching replies:', error);
    return [];
  }
  return data;
}

export async function createPost(postData: {
  title: string;
  content: string;
  category: string;
  tags: string[];
}) {
  const db = await createClient();
  const { data: { session } } = await db.auth.getSession();

  if (!session) {
    return { error: 'Unauthorized' };
  }

  const { data, error } = await db
    .from('community_posts')
    .insert({
      ...postData,
      user_id: session.user.id,
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating post:', error);
    return { error: error.message };
  }

  revalidatePath('/community');
  return { data };
}

export async function createReply(postId: string, content: string) {
  const db = await createClient();
  const { data: { session } } = await db.auth.getSession();

  if (!session) {
    return { error: 'Unauthorized' };
  }

  const { data, error } = await db
    .from('community_replies')
    .insert({
      post_id: postId,
      content,
      user_id: session.user.id,
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating reply:', error);
    return { error: error.message };
  }

  // Increment reply count
  const { error: replyError } = await db.rpc('increment_post_replies', { target_post_id: postId });
  if (replyError) console.error('Failed to increment replies:', replyError);

  revalidatePath(`/community/${postId}`);
  return { data };
}
