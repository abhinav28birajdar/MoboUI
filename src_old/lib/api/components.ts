"use server";

import { createClient } from "@/lib/supabase/server";
import { Component, ComponentFilter } from "@/types/component";
import { PaginationParams, PaginatedResponse } from "@/types/api";

export async function getComponents(
  filters?: ComponentFilter,
  pagination?: PaginationParams
): Promise<PaginatedResponse<Component>> {
  const supabase = (await createClient()) as any;
  const page = pagination?.page || 1;
  const limit = pagination?.limit || 12;
  const offset = (page - 1) * limit;

  let query = supabase
    .from("components")
    .select("*, category:categories(*)", { count: "exact" })
    .eq("status", "published");

  if (filters?.framework && filters.framework.length > 0) {
    query = query.in("framework", filters.framework);
  }
  
  // Note: For tags and categories we might need more complex queries
  // For simplicity, we just filter by simple properties here
  if (filters?.is_pro !== undefined) {
    query = query.eq("is_pro", filters.is_pro);
  }
  if (filters?.is_new !== undefined) {
    query = query.eq("is_new", filters.is_new);
  }
  if (filters?.search) {
    query = query.ilike("name", `%${filters.search}%`);
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

export async function getComponentBySlug(slug: string): Promise<Component | null> {
  const supabase = (await createClient()) as any;
  
  const { data, error } = await supabase
    .from("components")
    .select("*, category:categories(*), variants:component_variants(*)")
    .eq("slug", slug)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null;
    throw error;
  }

  return data as any;
}

export async function getFeaturedComponents(): Promise<Component[]> {
  const supabase = (await createClient()) as any;
  
  const { data, error } = await supabase
    .from("components")
    .select("*, category:categories(*)")
    .eq("status", "published")
    .eq("is_featured", true)
    .limit(6);

  if (error) throw error;
  return data as any;
}

export async function getNewComponents(): Promise<Component[]> {
  const supabase = (await createClient()) as any;
  
  const { data, error } = await supabase
    .from("components")
    .select("*, category:categories(*)")
    .eq("status", "published")
    .order("created_at", { ascending: false })
    .limit(8);

  if (error) throw error;
  return data as any;
}

export async function getComponentsByCategory(categorySlug: string, pagination?: PaginationParams): Promise<PaginatedResponse<Component>> {
  const supabase = (await createClient()) as any;
  const page = pagination?.page || 1;
  const limit = pagination?.limit || 12;
  const offset = (page - 1) * limit;

  // First get category id
  const { data: category } = await supabase.from('categories').select('id').eq('slug', categorySlug).single();
  if (!category) throw new Error("Category not found");

  const { data, count, error } = await supabase
    .from("components")
    .select("*, category:categories(*)", { count: "exact" })
    .eq("status", "published")
    .eq("category_id", category.id)
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

export async function getComponentsByFramework(framework: string, pagination?: PaginationParams): Promise<PaginatedResponse<Component>> {
  const supabase = (await createClient()) as any;
  const page = pagination?.page || 1;
  const limit = pagination?.limit || 12;
  const offset = (page - 1) * limit;

  const { data, count, error } = await supabase
    .from("components")
    .select("*, category:categories(*)", { count: "exact" })
    .eq("status", "published")
    .eq("framework", framework)
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

export async function searchComponents(query: string, filters?: ComponentFilter): Promise<Component[]> {
  const supabase = (await createClient()) as any;
  
  let q = supabase
    .from("components")
    .select("*, category:categories(*)")
    .eq("status", "published")
    .ilike("name", `%${query}%`)
    .limit(10);

  if (filters?.framework && filters.framework.length > 0) {
    q = q.in("framework", filters.framework);
  }

  const { data, error } = await q;

  if (error) throw error;
  return data as any;
}

export async function incrementComponentView(id: string) {
  const supabase = (await createClient()) as any;
  await supabase.rpc('increment_view_count', { component_id: id });
}

export async function incrementComponentCopy(id: string) {
  const supabase = (await createClient()) as any;
  await supabase.rpc('increment_copy_count', { component_id: id });
}

export async function getRelatedComponents(componentId: string): Promise<Component[]> {
  const supabase = (await createClient()) as any;
  
  // Basic related components logic - get components in same category
  const { data: comp } = await supabase.from('components').select('category_id').eq('id', componentId).single();
  
  if (!comp) return [];

  const { data, error } = await supabase
    .from("components")
    .select("*, category:categories(*)")
    .eq("status", "published")
    .eq("category_id", comp.category_id)
    .neq("id", componentId)
    .limit(4);

  if (error) throw error;
  return data as any;
}

export async function getComponentStats(id: string) {
  const supabase = (await createClient()) as any;
  const { data, error } = await supabase.rpc('get_component_stats', { component_id: id });
  if (error) throw error;
  return data;
}
