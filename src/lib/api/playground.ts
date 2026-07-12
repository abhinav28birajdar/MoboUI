"use server";

import { createClient } from "@/lib/supabase/server";

export async function savePlaygroundSession(data: any) {
  const supabase = (await createClient()) as any;
  const { data: { user } } = await supabase.auth.getUser();

  // If user is not logged in, we rely on session_token
  const sessionToken = data.session_token || crypto.randomUUID();

  const payload = {
    ...data,
    user_id: user?.id || null,
    session_token: sessionToken,
    last_saved: new Date().toISOString()
  };

  const { data: result, error } = await supabase
    .from("playground_sessions")
    .upsert(payload, { onConflict: "session_token" })
    .select()
    .single();

  if (error) throw error;
  return result;
}

export async function getPlaygroundSession(token: string) {
  const supabase = (await createClient()) as any;
  const { data, error } = await supabase
    .from("playground_sessions")
    .select("*")
    .eq("session_token", token)
    .single();

  if (error) throw error;
  return data;
}
