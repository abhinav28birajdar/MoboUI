'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, ArrowRight, Code2, AlertCircle, CheckCircle2, Loader2, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GlowEffect } from '@/components/shared/GlowEffect';
import { supabase } from '@/lib/supabase/client';
import { toast } from 'sonner';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleResetRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setLoading(true);

    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (resetError) {
        setError(resetError.message);
        toast.error(resetError.message);
        return;
      }

      setSuccess(true);
      toast.success('Password reset link sent to your email!');
    } catch (err) {
      setError('An unexpected error occurred');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A0A0B] relative overflow-hidden px-4 animate-fade-in">
      <GlowEffect className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20" size="xl" />
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center gap-2 mb-8 group">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-[0_0_20px_rgba(255,202,3,0.3)] group-hover:scale-110 transition-transform">
              <Code2 size={28} strokeWidth={2.5} />
            </div>
          </Link>
          <h1 className="text-4xl font-display font-black text-white mb-3 tracking-tighter uppercase">Reset Password.</h1>
          <p className="text-text-secondary font-medium">We'll send you a link to securely reset your password.</p>
        </div>

        <div className="p-10 rounded-[2rem] bg-card backdrop-blur-2xl border border-border shadow-2xl space-y-8 glass-card">
          {error && (
            <div className="flex items-center gap-3 p-4 rounded-xl bg-red-950/30 border border-red-900/50 text-red-200">
              <AlertCircle size={20} className="flex-shrink-0" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          {success ? (
            <div className="space-y-6 text-center py-4">
              <div className="w-16 h-16 bg-success/10 border border-success/20 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="text-success" size={32} />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-white uppercase tracking-tight">Check Your Inbox</h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  We've sent a password recovery link to <strong className="text-white">{email}</strong>.
                </p>
              </div>
              <Button asChild className="w-full h-14 rounded-xl btn-secondary border-0 mt-4 bg-surface-elevated text-white hover:bg-surface-elevated/85">
                <Link href="/login" className="flex items-center justify-center gap-2">
                  <ArrowLeft size={16} /> Back to Login
                </Link>
              </Button>
            </div>
          ) : (
            <form onSubmit={handleResetRequest} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-text-muted uppercase tracking-widest pl-1">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary transition-colors" size={20} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full h-14 bg-black border border-border rounded-xl pl-14 pr-6 text-white focus:border-primary/50 outline-none transition-all placeholder:text-neutral-700"
                    placeholder="name@example.com"
                    disabled={loading}
                  />
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full h-16 rounded-xl text-lg font-black btn-primary hover:shadow-[0_0_30px_rgba(255,202,3,0.2)]"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 size={20} className="animate-spin mr-2" />
                    Sending link...
                  </>
                ) : (
                  <>
                    Send Reset Link
                    <ArrowRight size={20} className="ml-2" />
                  </>
                )}
              </Button>
            </form>
          )}
        </div>

        {!success && (
          <p className="mt-10 text-center text-text-secondary text-sm">
            Remember your password?{' '}
            <Link href="/login" className="text-white font-bold hover:text-primary transition-colors underline underline-offset-4">
              Log in
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}
