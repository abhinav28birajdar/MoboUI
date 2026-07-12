import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/database'

// Note: This client uses the service role key and bypasses Row Level Security (RLS).
// Never expose this client to the browser or use it in client components.
export function createAdminClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }
  )
}
