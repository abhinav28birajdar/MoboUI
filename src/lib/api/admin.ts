"use server";

import { createAdminClient } from "@/lib/supabase/admin";

export async function getAdminUsersStats() {
  const adminAuthClient = createAdminClient();
  
  // Example of using admin client to manage users
  // Note: Only accessible with SERVICE_ROLE_KEY
  const { data: users, error } = await adminAuthClient.auth.admin.listUsers();
  
  if (error) throw error;
  
  return {
    totalUsers: users.users.length,
    lastSignup: users.users.length > 0 ? users.users[0].created_at : null
  };
}

export async function deleteUserAdmin(userId: string) {
  const adminAuthClient = createAdminClient();
  const { error } = await adminAuthClient.auth.admin.deleteUser(userId);
  if (error) throw error;
  return true;
}
