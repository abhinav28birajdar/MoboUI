'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, ArrowRight, Code2, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GlowEffect } from '@/components/shared/GlowEffect';
import { supabase } from '@/lib/supabase/client';
import { toast } from 'sonner';

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      const { error: updateError } = await supabase.auth.updateUser({
        password: password,
      });

      if (updateError) {
        setError(updateError.message);
        toast.error(updateError.message);
        return;
      }

      toast.success('Password updated successfully! Please log in with your new password.');
      router.push('/login');
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
          <div className="inline-flex items-center gap-2 mb-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-[0_0_20px_rgba(255,202,3,0.3)]">
              <Code2 size={28} strokeWidth={2.5} />
            </div>
          </div>
          <h1 className="text-4xl font-display font-black text-white mb-3 tracking-tighter uppercase">New Password.</h1>
          <p className="text-text-secondary font-medium">Set a new, secure password for your account.</p>
        </div>

        <div className="p-10 rounded-[2rem] bg-card backdrop-blur-2xl border border-border shadow-2xl space-y-8 glass-card">
          {error && (
            <div className="flex items-center gap-3 p-4 rounded-xl bg-red-950/30 border border-red-900/50 text-red-200">
              <AlertCircle size={20} className="flex-shrink-0" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleResetPassword} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-text-muted uppercase tracking-widest pl-1">New Password</label>
              <div className="relative group">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary transition-colors" size={20} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full h-14 bg-black border border-border rounded-xl pl-14 pr-6 text-white focus:border-primary/50 outline-none transition-all placeholder:text-neutral-700"
                  placeholder="Min 8 characters"
                  disabled={loading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-text-muted uppercase tracking-widest pl-1">Confirm Password</label>
              <div className="relative group">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary transition-colors" size={20} />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full h-14 bg-black border border-border rounded-xl pl-14 pr-6 text-white focus:border-primary/50 outline-none transition-all placeholder:text-neutral-700"
                  placeholder="Re-type password"
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
                  Updating password...
                </>
              ) : (
                <>
                  Update Password
                  <ArrowRight size={20} className="ml-2" />
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
