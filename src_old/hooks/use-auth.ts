import { useAuthStore } from '@/store/auth-store';
import { supabase } from '@/lib/supabase/client';
import { toast } from 'react-hot-toast';

export function useAuth() {
  const { user, profile, session, isLoading, isAuthenticated, signOut } = useAuthStore();

  const signInWithGithub = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) throw error;
    } catch (e: any) {
      toast.error(e.message || 'GitHub login failed');
    }
  };

  const signInWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) throw error;
    } catch (e: any) {
      toast.error(e.message || 'Google login failed');
    }
  };

  return {
    user,
    profile,
    session,
    isLoading,
    isAuthenticated,
    signOut,
    signInWithGithub,
    signInWithGoogle,
  };
}
