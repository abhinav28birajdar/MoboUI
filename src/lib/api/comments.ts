"use server";

import { createClient } from "@/lib/supabase/server";

export async function getComments(entityType: 'component' | 'project' | 'blog_post', entityId: string) {
  const supabase = (await createClient()) as any;
  
  // Get all comments for entity
  const { data, error } = await supabase
    .from("comments")
    .select("*, author:profiles(*), likes:comment_likes(user_id)")
    .eq("entity_type", entityType)
    .eq("entity_id", entityId)
    .order("created_at", { ascending: true });

  if (error) throw error;
  
  // Transform into nested structure (2 levels max typically needed)
  const comments = (data || []) as any[];
  const topLevel = comments.filter(c => !c.parent_id);
  const replies = comments.filter(c => c.parent_id);
  
  return topLevel.map(comment => ({
    ...comment,
    replies: replies.filter(r => r.parent_id === comment.id)
  }));
}

export async function addComment(userId: string, data: { entity_type: string; entity_id: string; parent_id?: string; content: string }) {
  const supabase = (await createClient()) as any;
  const { data: newComment, error } = await supabase
    .from("comments")
    .insert([{ ...data, author_id: userId }])
    .select("*, author:profiles(*)")
    .single();

  if (error) throw error;
  return newComment;
}

export async function editComment(id: string, content: string) {
  const supabase = (await createClient()) as any;
  const { data, error } = await supabase
    .from("comments")
    .update({ content, is_edited: true, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select("*, author:profiles(*)")
    .single();

  if (error) throw error;
  return data;
}

export async function deleteComment(id: string) {
  const supabase = (await createClient()) as any;
  const { error } = await supabase
    .from("comments")
    .delete()
    .eq("id", id);

  if (error) throw error;
}

export async function likeComment(userId: string, commentId: string) {
  const supabase = (await createClient()) as any;
  const { error } = await supabase
    .from("comment_likes")
    .insert([{ user_id: userId, comment_id: commentId }]);

  if (error && error.code !== '23505') {
    // If it's a unique constraint violation (already liked), maybe unlike?
    // Let's implement toggle behavior
    const { error: unlikeError } = await supabase
      .from("comment_likes")
      .delete()
      .eq("user_id", userId)
      .eq("comment_id", commentId);
    if (unlikeError) throw unlikeError;
    return false; // unliked
  }
  
  if (error) throw error;
  return true; // liked
}
