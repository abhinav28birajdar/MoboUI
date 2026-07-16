"use server";

import { createClient } from "@/lib/supabase/server";

export async function getUserCollections(userId: string) {
  const supabase = (await createClient()) as any;
  const { data, error } = await supabase
    .from("collections")
    .select("*, components:collection_components(component_id)")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function getCollectionById(id: string) {
  const supabase = (await createClient()) as any;
  const { data, error } = await supabase
    .from("collections")
    .select("*, collection_components(*, component:components(*, category:categories(*)))")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
}

export async function createCollection(userId: string, data: { name: string; description?: string; is_public: boolean }) {
  const supabase = (await createClient()) as any;
  const slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now();
  const { data: newCollection, error } = await supabase
    .from("collections")
    .insert([{ ...data, user_id: userId, slug }])
    .select()
    .single();

  if (error) throw error;
  return newCollection;
}

export async function updateCollection(id: string, data: { name?: string; description?: string; is_public?: boolean }) {
  const supabase = (await createClient()) as any;
  const { data: updated, error } = await supabase
    .from("collections")
    .update(data)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return updated;
}

export async function deleteCollection(id: string) {
  const supabase = (await createClient()) as any;
  const { error } = await supabase
    .from("collections")
    .delete()
    .eq("id", id);

  if (error) throw error;
}

export async function addToCollection(collectionId: string, componentId: string) {
  const supabase = (await createClient()) as any;
  const { error } = await supabase
    .from("collection_components")
    .insert([{ collection_id: collectionId, component_id: componentId }]);

  if (error) throw error;
}

export async function removeFromCollection(collectionId: string, componentId: string) {
  const supabase = (await createClient()) as any;
  const { error } = await supabase
    .from("collection_components")
    .delete()
    .eq("collection_id", collectionId)
    .eq("component_id", componentId);

  if (error) throw error;
}
