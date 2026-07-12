"use server";

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function getComponentVersions(componentId: string) {
  const db = await createClient();
  const { data, error } = await db
    .from('component_versions')
    .select('*')
    .eq('component_id', componentId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching versions:', error);
    return []; // Graceful fallback
  }

  return data;
}

export async function publishVersion(componentId: string, versionStr: string, code: any, changelog: string) {
  const db = await createClient();
  const { data: { session } } = await db.auth.getSession();

  if (!session) {
    return { error: 'Unauthorized. Please sign in to publish a version.' };
  }

  // Verify ownership
  const { data: component } = await db
    .from('components')
    .select('author_id')
    .eq('id', componentId)
    .single();

  if (!component || component.author_id !== session.user.id) {
    return { error: 'Forbidden. You do not have permission to update this component.' };
  }

  // Check if version already exists
  const { data: existingVersion } = await db
    .from('component_versions')
    .select('id')
    .eq('component_id', componentId)
    .eq('version', versionStr)
    .maybeSingle();

  if (existingVersion) {
    return { error: `Version ${versionStr} already exists. Please choose a new version number.` };
  }

  // Insert new version
  const { error: insertError } = await db
    .from('component_versions')
    .insert({
      component_id: componentId,
      version: versionStr,
      code,
      changelog
    });

  if (insertError) {
    console.error('Error publishing version:', insertError);
    return { error: insertError.message };
  }

  // Update component's current version and code
  const { error: updateError } = await db
    .from('components')
    .update({ 
      version: versionStr,
      code: code
    })
    .eq('id', componentId);

  if (updateError) {
    console.error('Error updating component table:', updateError);
    return { error: updateError.message };
  }

  revalidatePath('/components');
  return { success: true };
}
