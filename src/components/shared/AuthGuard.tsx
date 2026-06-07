"use client";

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { toast } from 'react-hot-toast';

interface AuthGuardProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export function AuthGuard({ children, requireAdmin = false }: AuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (!supabase || typeof supabase.auth === 'undefined') {
          // If Supabase client stub is used, permit bypass for development/testing
          setAuthorized(true);
          setLoading(false);
          return;
        }

        const { data: { session } } = await supabase.auth.getSession();

        if (!session) {
          toast.error("Please log in to access this page");
          router.push(`/login?next=${encodeURIComponent(pathname || '')}`);
          return;
        }

        if (requireAdmin) {
          // Fetch profile to verify role
          const { data: profile, error } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', session.user.id)
            .single();

          if (error || !profile || (profile.role !== 'admin' && profile.role !== 'moderator')) {
            toast.error("Access denied: Administrator privileges required");
            router.push('/account');
            return;
          }
        }

        setAuthorized(true);
      } catch (err) {
        console.error('Authorization check failed:', err);
        router.push('/');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router, pathname, requireAdmin]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background space-y-4">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-text-muted text-xs font-bold uppercase tracking-widest animate-pulse">Verifying Credentials...</p>
      </div>
    );
  }

  return authorized ? <>{children}</> : null;
}
