import { supabase } from '@/lib/supabase/client';
import type { AuthError, Session, User } from '@supabase/supabase-js';

export interface AuthResponse {
  user: User | null;
  session: Session | null;
  error: AuthError | null;
}

export interface SignUpInput {
  email: string;
  password: string;
  fullName?: string;
}

export interface SignInInput {
  email: string;
  password: string;
}

export interface OAuthInput {
  provider: 'github' | 'google';
  redirectTo?: string;
}

/**
 * Get current session
 */
export async function getSession() {
  try {
    const { data, error } = await supabase.auth.getSession();
    return { session: data.session, error };
  } catch (error) {
    return { session: null, error };
  }
}

/**
 * Get current user
 */
export async function getCurrentUser() {
  try {
    const { data, error } = await supabase.auth.getUser();
    return { user: data.user, error };
  } catch (error) {
    return { user: null, error };
  }
}

/**
 * Sign up with email and password
 */
export async function signUp(input: SignUpInput): Promise<AuthResponse> {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: input.email,
      password: input.password,
      options: {
        data: {
          full_name: input.fullName,
        },
        emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
      },
    });

    return {
      user: data.user || null,
      session: data.session || null,
      error,
    };
  } catch (error) {
    console.error('Sign up error:', error);
    return {
      user: null,
      session: null,
      error: error as AuthError,
    };
  }
}

/**
 * Sign in with email and password
 */
export async function signIn(input: SignInInput): Promise<AuthResponse> {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: input.email,
      password: input.password,
    });

    return {
      user: data.user || null,
      session: data.session || null,
      error,
    };
  } catch (error) {
    console.error('Sign in error:', error);
    return {
      user: null,
      session: null,
      error: error as AuthError,
    };
  }
}

/**
 * Sign in with OAuth provider
 */
export async function signInWithOAuth(input: OAuthInput) {
  try {
    const redirectTo = input.redirectTo || `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`;

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: input.provider,
      options: {
        redirectTo,
      },
    });

    return { data, error };
  } catch (error) {
    console.error('OAuth sign in error:', error);
    return { data: null, error };
  }
}

/**
 * Sign out
 */
export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    return { error };
  } catch (error) {
    console.error('Sign out error:', error);
    return { error };
  }
}

/**
 * Reset password
 */
export async function resetPassword(email: string) {
  try {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password`,
    });

    return { data, error };
  } catch (error) {
    console.error('Password reset error:', error);
    return { data: null, error };
  }
}

/**
 * Update password
 */
export async function updatePassword(newPassword: string) {
  try {
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    return { data, error };
  } catch (error) {
    console.error('Password update error:', error);
    return { data: null, error };
  }
}

/**
 * Set up auth state listener
 */
export function onAuthStateChange(
  callback: (user: User | null, session: Session | null) => void
) {
  const { data } = supabase.auth.onAuthStateChange((event: any, session: Session | null) => {
    callback(session?.user || null, session || null);
  });

  return data.subscription;
}

/**
 * Get user profile from database
 */
export async function getUserProfile(userId: string) {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    return { profile: data, error };
  } catch (error) {
    console.error('Get profile error:', error);
    return { profile: null, error };
  }
}

/**
 * Update user profile
 */
export async function updateUserProfile(userId: string, updates: Record<string, any>) {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();

    return { profile: data, error };
  } catch (error) {
    console.error('Update profile error:', error);
    return { profile: null, error };
  }
}

/**
 * Check if username is available
 */
export async function checkUsernameAvailability(username: string) {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('id')
      .eq('username', username)
      .single();

    return { available: !data, error };
  } catch (error) {
    // If error is "no rows found", username is available
    return { available: true, error };
  }
}
