"use server";

import { createClient } from "@/lib/supabase/server";

export async function getUserFavorites(userId: string) {
  const supabase = (await createClient()) as any;
  const { data, error } = await supabase
    .from("favorites")
    .select("*, component:components(*, category:categories(*))")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function isFavorited(userId: string, componentId: string): Promise<boolean> {
  const supabase = (await createClient()) as any;
  const { data, error } = await supabase
    .from("favorites")
    .select("id")
    .eq("user_id", userId)
    .eq("component_id", componentId)
    .single();

  if (error && error.code !== 'PGRST116') throw error;
  return !!data;
}

export async function toggleFavorite(userId: string, componentId: string): Promise<boolean> {
  const supabase = (await createClient()) as any;
  const isFav = await isFavorited(userId, componentId);

  if (isFav) {
    const { error } = await supabase
      .from("favorites")
      .delete()
      .eq("user_id", userId)
      .eq("component_id", componentId);
    if (error) throw error;
    return false;
  } else {
    const { error } = await supabase
      .from("favorites")
      .insert([{ user_id: userId, component_id: componentId }]);
    if (error) throw error;
    return true;
  }
}

export async function getFavoriteCount(componentId: string): Promise<number> {
  const supabase = (await createClient()) as any;
  const { count, error } = await supabase
    .from("favorites")
    .select("*", { count: "exact", head: true })
    .eq("component_id", componentId);

  if (error) throw error;
  return count || 0;
}
