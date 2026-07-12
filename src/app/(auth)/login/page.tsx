'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Github, Chrome, Mail, Lock, ArrowRight, Code2, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase/client';
import { useAuthStore } from '@/store/auth-store';
import { toast } from 'react-hot-toast';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setUser, setProfile } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState<string | null>(null);

  const redirectTo = searchParams.get('redirectTo') || '/dashboard';

  useEffect(() => {
    const errorParam = searchParams.get('error');
    if (errorParam === 'auth_failed') {
      setError('OAuth authentication failed. Please try again.');
    }
  }, [searchParams]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        setError(signInError.message);
        toast.error(signInError.message);
        return;
      }

      if (data?.user) {
        setUser(data.user);
        
        // Fetch user profile
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .single();
        setProfile(profile);

        toast.success('Welcome back to MOBOUI!');
        router.push(redirectTo);
        router.refresh();
      }
    } catch (err) {
      setError('An unexpected error occurred');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthSignIn = async (provider: 'github' | 'google') => {
    setError('');
    setOauthLoading(provider);

    try {
      const { data, error: oauthError } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/api/auth/callback?next=${encodeURIComponent(redirectTo)}`,
        },
      });

      if (oauthError) {
        setError(oauthError.message);
        toast.error(oauthError.message);
      } else if (data?.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      setError('OAuth sign in failed');
      console.error(err);
    } finally {
      setOauthLoading(null);
    }
  };

  return (
    <div className="w-full max-w-md relative z-10">
      <div className="text-center mb-10">
        <Link href="/" className="inline-flex items-center gap-2 mb-8 group">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-fuchsia-600 text-white shadow-[0_0_20px_rgba(192,38,211,0.3)] group-hover:scale-110 transition-transform">
            <Code2 size={28} strokeWidth={2.5} />
          </div>
        </Link>
        <h1 className="text-4xl font-display font-black text-white mb-3 tracking-tighter uppercase">Welcome Back.</h1>
        <p className="text-slate-400 font-medium">Log in to your MOBOUI account to continue.</p>
      </div>

      <div className="p-10 rounded-[2rem] border border-[#2a2a38] bg-[#1a1a24] shadow-2xl space-y-8">
        {/* Error Message */}
        {error && (
          <div className="flex items-center gap-3 p-4 rounded-xl bg-red-950/30 border border-red-900/50 text-red-200">
            <AlertCircle size={20} className="flex-shrink-0" />
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* Social Logins */}
        <div className="grid grid-cols-2 gap-4">
          <Button
            variant="secondary"
            className="h-14 rounded-xl gap-2 text-white hover:bg-[#2a2a38]"
            onClick={() => handleOAuthSignIn('github')}
            disabled={oauthLoading !== null}
          >
            {oauthLoading === 'github' ? (
              <Loader2 size={20} className="animate-spin" />
            ) : (
              <Github size={20} />
            )}
            GitHub
          </Button>
          <Button
            variant="secondary"
            className="h-14 rounded-xl gap-2 text-white hover:bg-[#2a2a38]"
            onClick={() => handleOAuthSignIn('google')}
            disabled={oauthLoading !== null}
          >
            {oauthLoading === 'google' ? (
              <Loader2 size={20} className="animate-spin" />
            ) : (
              <Chrome size={20} />
            )}
            Google
          </Button>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#2a2a38]"></div>
          </div>
          <span className="relative bg-[#1a1a24] px-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Or with email</span>
        </div>

        {/* Credentials Form */}
        <form onSubmit={handleSignIn} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Email Address</label>
            <div className="relative group">
              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-fuchsia-600 transition-colors" size={20} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full h-14 bg-black/50 border border-[#2a2a38] rounded-xl pl-14 pr-6 text-white focus:border-fuchsia-600 outline-none transition-all placeholder:text-neutral-700"
                placeholder="name@example.com"
                disabled={loading}
              />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between pl-1">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Password</label>
              <Link href="/forgot-password" className="text-xs font-bold text-fuchsia-600 hover:text-fuchsia-500">Forgot?</Link>
            </div>
            <div className="relative group">
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-fuchsia-600 transition-colors" size={20} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full h-14 bg-black/50 border border-[#2a2a38] rounded-xl pl-14 pr-6 text-white focus:border-fuchsia-600 outline-none transition-all placeholder:text-neutral-700"
                placeholder="••••••••"
                disabled={loading}
              />
            </div>
          </div>

          <Button
            type="submit"
            variant="default"
            size="lg"
            className="w-full h-16 rounded-xl text-lg font-black hover:shadow-[0_0_30px_rgba(192,38,211,0.25)]"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 size={20} className="animate-spin mr-2" />
                Signing in...
              </>
            ) : (
              <>
                Log In
                <ArrowRight size={20} className="ml-2" />
              </>
            )}
          </Button>
        </form>
      </div>

      <p className="mt-10 text-center text-slate-400 text-sm">
        Don't have an account?{' '}
        <Link href="/signup" className="text-white font-bold hover:text-fuchsia-600 transition-colors underline underline-offset-4">
          Create an account
        </Link>
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f0f14] relative overflow-hidden px-4">
      {/* Glow shapes */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-fuchsia-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <Suspense fallback={
        <div className="text-center">
          <Loader2 className="w-10 h-10 animate-spin text-fuchsia-600 mx-auto mb-4" />
          <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">Loading...</p>
        </div>
      }>
        <LoginForm />
      </Suspense>
    </div>
  );
}
