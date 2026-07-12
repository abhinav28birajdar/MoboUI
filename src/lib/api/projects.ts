"use server";

import { createClient } from "@/lib/supabase/server";
import { Project, ProjectFilter } from "@/types/project";
import { PaginationParams, PaginatedResponse } from "@/types/api";
import { slugify } from "@/lib/utils";

export async function getProjects(
  filters?: ProjectFilter,
  pagination?: PaginationParams
): Promise<PaginatedResponse<Project>> {
  const supabase = (await createClient()) as any;
  const page = pagination?.page || 1;
  const limit = pagination?.limit || 12;
  const offset = (page - 1) * limit;

  let query = supabase
    .from("projects")
    .select("*, author:profiles(*)", { count: "exact" });

  if (filters?.status) {
    query = query.eq("status", filters.status);
  } else {
    query = query.in("status", ["approved", "featured"]);
  }

  if (filters?.framework) {
    query = query.eq("framework", filters.framework);
  }
  
  if (filters?.author_id) {
    query = query.eq("author_id", filters.author_id);
  }

  if (filters?.search) {
    query = query.ilike("title", `%${filters.search}%`);
  }

  const { data, count, error } = await query
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) throw error;

  return {
    data: data as any,
    count: count || 0,
    page,
    pageSize: limit,
    hasMore: (count || 0) > offset + limit,
    error: null,
  };
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const supabase = (await createClient()) as any;
  const { data, error } = await supabase
    .from("projects")
    .select("*, author:profiles(*)")
    .eq("slug", slug)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null;
    throw error;
  }

  return data as any;
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const supabase = (await createClient()) as any;
  const { data, error } = await supabase
    .from("projects")
    .select("*, author:profiles(*)")
    .eq("status", "featured")
    .order("created_at", { ascending: false })
    .limit(4);

  if (error) throw error;
  return data as any;
}

export async function submitProject(userId: string, data: any) {
  const supabase = (await createClient()) as any;
  const slug = slugify(data.title) + '-' + Date.now();
  
  const { data: newProject, error } = await supabase
    .from("projects")
    .insert([{ ...data, author_id: userId, slug }])
    .select()
    .single();

  if (error) throw error;
  return newProject;
}

export async function likeProject(userId: string, projectId: string) {
  const supabase = (await createClient()) as any;
  const { error } = await supabase
    .from("project_likes")
    .insert([{ user_id: userId, project_id: projectId }]);

  if (error && error.code !== '23505') { // Ignore unique constraint violation if already liked
    throw error;
  }
  
  // Optimistically incrementing likes here, actual trigger or RPC is better,
  // but for simplicity doing an update.
  if (!error) {
    const { data } = await supabase.from('projects').select('like_count').eq('id', projectId).single();
    if (data) {
      await supabase.from('projects').update({ like_count: data.like_count + 1 }).eq('id', projectId);
    }
  }
}

export async function getUserProjects(userId: string) {
  const supabase = (await createClient()) as any;
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("author_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}
