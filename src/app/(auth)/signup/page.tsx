'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Github, Chrome, Mail, Lock, User, UserCheck, ArrowRight, Code2, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GlowEffect } from '@/components/shared/GlowEffect';
import { supabase } from '@/lib/supabase/client';
import { toast } from 'sonner';

const signupSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  username: z.string()
    .min(3, 'Username must be between 3 and 20 characters')
    .max(20, 'Username must be between 3 and 20 characters')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username must be alphanumeric or underscores only'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string().min(8, 'Confirm password must be at least 8 characters'),
  acceptTerms: z.boolean().refine(val => val === true, {
    message: 'You must accept the Terms and Conditions',
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type SignupFormData = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      acceptTerms: undefined,
    }
  });

  const onSubmit = async (data: SignupFormData) => {
    setError('');
    setLoading(true);

    try {
      // Sign up with Supabase, passing username and full_name as user metadata
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            full_name: data.fullName,
            username: data.username.toLowerCase(),
          },
          emailRedirectTo: `${window.location.origin}/api/auth/callback`,
        },
      });

      if (signUpError) {
        setError(signUpError.message);
        toast.error(signUpError.message);
        return;
      }

      if (authData?.user) {
        toast.success('Account created! Please check your email for verification.');
        router.push('/login?message=verification_sent');
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
          redirectTo: `${window.location.origin}/api/auth/callback`,
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
    <div className="min-h-screen flex items-center justify-center bg-[#0A0A0B] relative overflow-hidden py-20 px-4 animate-fade-in">
      <GlowEffect className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20" size="xl" />
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center gap-2 mb-8 group">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-[0_0_20px_rgba(255,202,3,0.3)] group-hover:scale-110 transition-transform">
              <Code2 size={28} strokeWidth={2.5} />
            </div>
          </Link>
          <h1 className="text-4xl font-display font-black text-white mb-3 tracking-tighter uppercase">Create Account.</h1>
          <p className="text-text-secondary font-medium">Join the MOBOUI developers marketplace today.</p>
        </div>

        <div className="p-10 rounded-[2rem] bg-card backdrop-blur-2xl border border-border shadow-2xl space-y-8 glass-card">
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
              variant="outline"
              className="h-14 rounded-xl border-border bg-surface text-text-primary hover:bg-surface-elevated gap-2 border-0 btn-secondary"
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
              variant="outline"
              className="h-14 rounded-xl border-border bg-surface text-text-primary hover:bg-surface-elevated gap-2 border-0 btn-secondary"
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
              <div className="w-full border-t border-border"></div>
            </div>
            <span className="relative bg-[#111113] px-4 text-[10px] font-black text-text-muted uppercase tracking-widest">Or sign up with email</span>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Full Name */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-text-muted uppercase tracking-widest pl-1">Full Name</label>
              <div className="relative group">
                <User className="absolute left-5 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary transition-colors" size={20} />
                <input
                  type="text"
                  {...register('fullName')}
                  required
                  className="w-full h-14 bg-black border border-border rounded-xl pl-14 pr-6 text-white focus:border-primary/50 outline-none transition-all placeholder:text-neutral-700"
                  placeholder="John Doe"
                  disabled={loading}
                />
              </div>
              {errors.fullName && <p className="text-xs text-error font-bold mt-1">{errors.fullName.message}</p>}
            </div>

            {/* Username */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-text-muted uppercase tracking-widest pl-1">Username</label>
              <div className="relative group">
                <UserCheck className="absolute left-5 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary transition-colors" size={20} />
                <input
                  type="text"
                  {...register('username')}
                  required
                  className="w-full h-14 bg-black border border-border rounded-xl pl-14 pr-6 text-white focus:border-primary/50 outline-none transition-all placeholder:text-neutral-700"
                  placeholder="johndoe_dev"
                  disabled={loading}
                />
              </div>
              {errors.username && <p className="text-xs text-error font-bold mt-1">{errors.username.message}</p>}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-text-muted uppercase tracking-widest pl-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary transition-colors" size={20} />
                <input
                  type="email"
                  {...register('email')}
                  required
                  className="w-full h-14 bg-black border border-border rounded-xl pl-14 pr-6 text-white focus:border-primary/50 outline-none transition-all placeholder:text-neutral-700"
                  placeholder="name@example.com"
                  disabled={loading}
                />
              </div>
              {errors.email && <p className="text-xs text-error font-bold mt-1">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-text-muted uppercase tracking-widest pl-1">Password</label>
              <div className="relative group">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary transition-colors" size={20} />
                <input
                  type="password"
                  {...register('password')}
                  required
                  className="w-full h-14 bg-black border border-border rounded-xl pl-14 pr-6 text-white focus:border-primary/50 outline-none transition-all placeholder:text-neutral-700"
                  placeholder="Min 8 characters"
                  disabled={loading}
                />
              </div>
              {errors.password && <p className="text-xs text-error font-bold mt-1">{errors.password.message}</p>}
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-text-muted uppercase tracking-widest pl-1">Confirm Password</label>
              <div className="relative group">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary transition-colors" size={20} />
                <input
                  type="password"
                  {...register('confirmPassword')}
                  required
                  className="w-full h-14 bg-black border border-border rounded-xl pl-14 pr-6 text-white focus:border-primary/50 outline-none transition-all placeholder:text-neutral-700"
                  placeholder="Re-type password"
                  disabled={loading}
                />
              </div>
              {errors.confirmPassword && <p className="text-xs text-error font-bold mt-1">{errors.confirmPassword.message}</p>}
            </div>

            {/* Accept Terms Checkbox */}
            <div className="flex flex-col gap-2 pl-1">
              <label className="flex items-start gap-3 cursor-pointer text-xs text-text-secondary">
                <input
                  type="checkbox"
                  {...register('acceptTerms')}
                  className="mt-1 accent-primary border border-border rounded"
                  disabled={loading}
                />
                <span>
                  I agree to the{' '}
                  <Link href="/terms" className="text-primary hover:underline">Terms of Service</Link>
                  {' '}and{' '}
                  <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
                </span>
              </label>
              {errors.acceptTerms && <p className="text-xs text-error font-bold mt-1">{errors.acceptTerms.message}</p>}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              size="lg"
              className="w-full h-16 rounded-xl text-lg font-black btn-primary hover:shadow-[0_0_30px_rgba(255,202,3,0.2)]"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 size={20} className="animate-spin mr-2" />
                  Creating Account...
                </>
              ) : (
                <>
                  Sign Up
                  <ArrowRight size={20} className="ml-2" />
                </>
              )}
            </Button>
          </form>
        </div>

        <p className="mt-10 text-center text-text-secondary text-sm">
          Already have an account?{' '}
          <Link href="/login" className="text-white font-bold hover:text-primary transition-colors underline underline-offset-4">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
