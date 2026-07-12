'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Github, Chrome, ShieldAlert, Loader2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useLoginPromptStore } from '@/store/login-prompt-store';
import { useAuthStore } from '@/store/auth-store';
import { supabase } from '@/lib/supabase/client';
import { toast } from 'react-hot-toast';

export default function LoginPromptModal() {
  const router = useRouter();
  const pathname = usePathname();
  const { isOpen, title, description, closeModal } = useLoginPromptStore();
  const { user } = useAuthStore();
  const [oauthLoading, setOauthLoading] = useState<'github' | 'google' | null>(null);

  // Auto close if user becomes authenticated
  useEffect(() => {
    if (user && isOpen) {
      closeModal();
    }
  }, [user, isOpen, closeModal]);

  const handleOAuthSignIn = async (provider: 'github' | 'google') => {
    setOauthLoading(provider);
    try {
      const redirectPath = pathname || '/dashboard';
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/api/auth/callback?next=${encodeURIComponent(redirectPath)}`,
        },
      });

      if (error) {
        toast.error(error.message);
      } else if (data?.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error(err);
      toast.error('Authentication failed. Please try again.');
    } finally {
      setOauthLoading(null);
    }
  };

  const handleManualRedirect = (route: '/login' | '/signup') => {
    closeModal();
    const redirectPath = pathname || '/dashboard';
    router.push(`${route}?redirectTo=${encodeURIComponent(redirectPath)}`);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && closeModal()}>
      <DialogContent className="sm:max-w-md bg-[#1a1a24] border border-[#2a2a38] text-white p-8">
        <DialogHeader className="items-center text-center">
          <div className="w-12 h-12 rounded-2xl bg-fuchsia-600/10 border border-fuchsia-600/25 flex items-center justify-center text-fuchsia-600 mb-4 animate-pulse">
            <ShieldAlert size={24} />
          </div>
          <DialogTitle className="text-xl font-display font-black uppercase tracking-tight text-white">
            {title}
          </DialogTitle>
          <DialogDescription className="text-slate-400 text-sm mt-2">
            {description}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4 my-6">
          <Button
            variant="secondary"
            className="h-12 rounded-xl gap-2 text-white bg-zinc-900 border border-zinc-800 hover:bg-[#2a2a38]"
            onClick={() => handleOAuthSignIn('github')}
            disabled={oauthLoading !== null}
          >
            {oauthLoading === 'github' ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Github size={16} />
            )}
            GitHub
          </Button>
          <Button
            variant="secondary"
            className="h-12 rounded-xl gap-2 text-white bg-zinc-900 border border-zinc-800 hover:bg-[#2a2a38]"
            onClick={() => handleOAuthSignIn('google')}
            disabled={oauthLoading !== null}
          >
            {oauthLoading === 'google' ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Chrome size={16} />
            )}
            Google
          </Button>
        </div>

        <div className="relative flex items-center justify-center my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#2a2a38]"></div>
          </div>
          <span className="relative bg-[#1a1a24] px-3 text-[9px] font-black text-slate-500 uppercase tracking-widest">
            Or use email
          </span>
        </div>

        <div className="flex flex-col gap-3 mt-4">
          <Button
            variant="default"
            className="h-12 rounded-xl text-sm font-black uppercase tracking-wider bg-fuchsia-600 text-white hover:shadow-[0_0_20px_rgba(192,38,211,0.25)]"
            onClick={() => handleManualRedirect('/login')}
          >
            Log In
            <ArrowRight size={16} className="ml-1.5" />
          </Button>
          
          <button
            onClick={() => handleManualRedirect('/signup')}
            className="text-xs font-bold text-slate-400 hover:text-white transition-colors py-2 text-center"
          >
            Don't have an account? <span className="text-fuchsia-600 underline">Create one</span>
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}