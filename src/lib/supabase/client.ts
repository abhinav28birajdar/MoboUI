import { createClient } from '@supabase/supabase-js';

// Supabase client - connects to backend
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    'Supabase environment variables not configured. ' +
    'Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY'
  );
}

// Create Supabase client if environment variables are present. During
// build-time (static analysis) these may be missing; guard creation so
// the build does not fail. When missing, export a lightweight stub.
let _supabase: any;
try {
  if (supabaseUrl && supabaseAnonKey) {
    _supabase = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    });
  } else {
    _supabase = {} as any;
  }
} catch (err) {
  console.warn('Failed to create Supabase client during build:', err);
  _supabase = {} as any;
}

export const supabase = _supabase as any;

// Export type for TypeScript
export type SupabaseClient = typeof supabase;

