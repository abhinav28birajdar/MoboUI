"use server";

import { createClient } from "@/lib/supabase/server";

export async function trackEvent(data: { component_id: string; event_type: string; framework?: string; device_type?: string }) {
  const supabase = await createClient();
  const { error } = await (supabase as any)
    .from("component_analytics")
    .insert([{ ...data }]);

  if (error) console.error("Analytics tracking error:", error);
  // We typically don't throw for analytics to not disrupt UX
}

export async function getComponentAnalytics(componentId: string, daysBack: number = 30) {
  const supabase = await createClient();
  
  const dateStr = new Date();
  dateStr.setDate(dateStr.getDate() - daysBack);
  
  const { data, error } = await (supabase as any)
    .from("component_analytics")
    .select("event_type, created_at, framework")
    .eq("component_id", componentId)
    .gte("created_at", dateStr.toISOString());

  if (error) throw error;
  return data;
}

export async function getDashboardStats() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  // In a real app, this would ideally be a dedicated view or RPC for performance
  // But for now we can do a few count queries
  
  const [favCount, colCount, profViews] = await Promise.all([
    (supabase as any).from("favorites").select("*", { count: "exact", head: true }).eq("user_id", user.id),
    (supabase as any).from("collections").select("*", { count: "exact", head: true }).eq("user_id", user.id),
    // Dummy stat since profile views table wasn't in schema
    Promise.resolve({ count: 42 }) 
  ]);

  return {
    totalFavorites: favCount.count || 0,
    collectionsCreated: colCount.count || 0,
    componentsCopied: 120, // Dummy stat
    profileViews: profViews.count || 0
  };
}

export async function getAdminStats() {
  const supabase = await createClient();
  
  const [userCount, compCount, projCount] = await Promise.all([
    (supabase as any).from("profiles").select("*", { count: "exact", head: true }),
    (supabase as any).from("components").select("*", { count: "exact", head: true }),
    (supabase as any).from("projects").select("*", { count: "exact", head: true })
  ]);

  return {
    totalUsers: userCount.count || 0,
    totalComponents: compCount.count || 0,
    totalProjects: projCount.count || 0,
  };
}
