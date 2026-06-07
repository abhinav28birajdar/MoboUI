'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Lock, Bell, Download, Shield, Loader, Save, Sparkles, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'react-hot-toast';
import { supabase } from '@/lib/supabase/client';

export default function UserSettings() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Security Form States
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [updatingPassword, setUpdatingPassword] = useState(false);

  // Preference Settings
  const [themePreference, setThemePreference] = useState('dark');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [savingSettings, setSavingSettings] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);
        if (!supabase || typeof supabase.auth === 'undefined') return;

        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          router.push('/login?redirect=/settings');
          return;
        }
        setUser(session.user);

        // Fetch user settings from db
        const { data: settings } = await supabase
          .from('user_settings')
          .select('*')
          .eq('user_id', session.user.id)
          .maybeSingle();

        if (settings) {
          setThemePreference(settings.theme_preference || 'dark');
          setNotificationsEnabled(settings.notifications_enabled ?? true);
          setEmailNotifications(settings.email_notifications ?? true);
          setNewsletterSubscribed(settings.newsletter_subscribed ?? false);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, [router]);

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }

    if (newPassword.length < 6) {
      toast.error('Password must be at least 6 characters.');
      return;
    }

    setUpdatingPassword(true);
    try {
      if (supabase && typeof supabase.auth !== 'undefined') {
        const { error } = await supabase.auth.updateUser({
          password: newPassword,
        });
        if (error) throw error;
      }
      toast.success('Password updated successfully!');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      toast.error(err.message || 'Could not update password');
    } finally {
      setUpdatingPassword(false);
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setSavingSettings(true);
    try {
      if (supabase) {
        const { error } = await supabase
          .from('user_settings')
          .upsert({
            user_id: user.id,
            theme_preference: themePreference,
            notifications_enabled: notificationsEnabled,
            email_notifications: emailNotifications,
            newsletter_subscribed: newsletterSubscribed,
            updated_at: new Date().toISOString(),
          }, { onConflict: 'user_id' });

        if (error) throw error;
      }
      toast.success('User preferences saved successfully!');
    } catch (err: any) {
      toast.error(err.message || 'Failed to sync settings database');
    } finally {
      setSavingSettings(false);
    }
  };

  // JSON exporter script
  const handleExportData = async () => {
    try {
      toast.loading('Assembling backup files...');
      
      let exportData: any = {
        exportedAt: new Date().toISOString(),
        user: {
          id: user.id,
          email: user.email,
          createdAt: user.created_at,
        },
        preferences: {
          themePreference,
          notificationsEnabled,
          emailNotifications,
          newsletterSubscribed,
        }
      };

      if (supabase) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .maybeSingle();

        const { data: favorites } = await supabase
          .from('favorites')
          .select('*, components(name, slug)')
          .eq('user_id', user.id);

        const { data: projects } = await supabase
          .from('projects')
          .select('*')
          .eq('author_id', user.id);

        exportData.profile = profile || {};
        exportData.favorites = favorites || [];
        exportData.projects = projects || [];
      }

      toast.dismiss();

      // Download file browser trigger
      const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(exportData, null, 2))}`;
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute('href', jsonString);
      downloadAnchor.setAttribute('download', `moboui_backup_${user.email.split('@')[0]}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();

      toast.success('Backup bundle exported successfully!');
    } catch (err) {
      console.error(err);
      toast.error('Could not package export files');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-2 border-primary border-t-transparent animate-spin mx-auto mb-4" />
          <p className="text-neutral-400 font-medium">Connecting user parameters...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-32">
      <div className="container px-6 mx-auto max-w-4xl space-y-12">
        {/* Page Header */}
        <div className="border-b border-white/5 pb-8">
          <span className="text-primary text-[10px] font-black uppercase tracking-widest block mb-2">SECURITY & CONFIG</span>
          <h1 className="text-4xl md:text-5xl font-heading font-black tracking-tight uppercase leading-none">
            User <span className="text-primary">Settings.</span>
          </h1>
          <p className="text-neutral-400 text-sm font-medium mt-2">
            Configure system themes, subscriptions, updates, and export dashboard directories.
          </p>
        </div>

        {/* Stateful Tabs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          
          {/* Security Column */}
          <form onSubmit={handleUpdatePassword} className="bg-neutral-900/40 border border-white/5 p-8 rounded-[2.5rem] space-y-6 shadow-xl">
            <h3 className="text-lg font-heading font-black uppercase tracking-tight text-white flex items-center gap-2 border-b border-white/5 pb-3">
              <Shield size={18} className="text-primary" /> Update Password
            </h3>

            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="newpass" className="text-xs font-black uppercase tracking-widest text-neutral-400">New Password</Label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                  <Input
                    id="newpass"
                    type="password"
                    placeholder="••••••••"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="h-12 bg-black border border-white/10 rounded-xl focus:border-primary/50 text-white pl-12 font-medium"
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="confpass" className="text-xs font-black uppercase tracking-widest text-neutral-400">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                  <Input
                    id="confpass"
                    type="password"
                    placeholder="••••••••"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="h-12 bg-black border border-white/10 rounded-xl focus:border-primary/50 text-white pl-12 font-medium"
                  />
                </div>
              </div>
            </div>

            <Button
              type="submit"
              disabled={updatingPassword}
              className="w-full h-12 bg-primary text-black font-black uppercase tracking-widest text-xs rounded-xl flex items-center justify-center gap-2 border-0"
            >
              {updatingPassword ? <Loader className="w-4 h-4 animate-spin" /> : 'Update Password'}
            </Button>
          </form>

          {/* Preferences Column */}
          <form onSubmit={handleSaveSettings} className="bg-neutral-900/40 border border-white/5 p-8 rounded-[2.5rem] space-y-6 shadow-xl">
            <h3 className="text-lg font-heading font-black uppercase tracking-tight text-white flex items-center gap-2 border-b border-white/5 pb-3">
              <Bell size={18} className="text-primary" /> Preferences & Alerts
            </h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-neutral-950/40 border border-white/5 rounded-xl">
                <div>
                  <p className="text-xs font-bold text-white uppercase tracking-wider">System Theme</p>
                  <p className="text-[10px] text-neutral-500 font-medium">Dark aesthetic is enforced by default</p>
                </div>
                <select
                  value={themePreference}
                  onChange={(e) => setThemePreference(e.target.value)}
                  className="bg-black border border-white/10 text-neutral-400 rounded-lg px-2 py-1 text-xs focus:outline-none cursor-pointer"
                >
                  <option value="dark">Dark Theme</option>
                  <option value="system">System Preference</option>
                </select>
              </div>

              <div className="flex items-center justify-between p-4 bg-neutral-950/40 border border-white/5 rounded-xl">
                <div>
                  <p className="text-xs font-bold text-white uppercase tracking-wider">Dashboard Alerts</p>
                  <p className="text-[10px] text-neutral-500 font-medium">Show screen alerts for review status updates</p>
                </div>
                <input
                  type="checkbox"
                  checked={notificationsEnabled}
                  onChange={(e) => setNotificationsEnabled(e.target.checked)}
                  className="w-4 h-4 accent-primary cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-neutral-950/40 border border-white/5 rounded-xl">
                <div>
                  <p className="text-xs font-bold text-white uppercase tracking-wider">Email Notifications</p>
                  <p className="text-[10px] text-neutral-500 font-medium">Send review statements directly to inbox</p>
                </div>
                <input
                  type="checkbox"
                  checked={emailNotifications}
                  onChange={(e) => setEmailNotifications(e.target.checked)}
                  className="w-4 h-4 accent-primary cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-neutral-950/40 border border-white/5 rounded-xl">
                <div>
                  <p className="text-xs font-bold text-white uppercase tracking-wider">Newsletter subscription</p>
                  <p className="text-[10px] text-neutral-500 font-medium">Subscribe to new component design releases</p>
                </div>
                <input
                  type="checkbox"
                  checked={newsletterSubscribed}
                  onChange={(e) => setNewsletterSubscribed(e.target.checked)}
                  className="w-4 h-4 accent-primary cursor-pointer"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={savingSettings}
              className="w-full h-12 bg-primary text-black font-black uppercase tracking-widest text-xs rounded-xl flex items-center justify-center gap-2 border-0"
            >
              {savingSettings ? <Loader className="w-4 h-4 animate-spin" /> : <Save size={14} />}
              Save Preferences
            </Button>
          </form>
        </div>

        {/* Data Portability exporter */}
        <div className="bg-neutral-900/40 border border-white/5 p-8 md:p-12 rounded-[3rem] space-y-6 shadow-xl">
          <div className="flex items-center gap-2 border-b border-white/5 pb-3">
            <Download size={20} className="text-primary" />
            <h3 className="text-xl font-heading font-black uppercase tracking-tight text-white">Data Portability</h3>
          </div>
          <p className="text-neutral-400 text-sm font-medium">
            Export a complete backup containing all registered credentials, saved components list, profiles, and case studies metadata in a single JSON schema.
          </p>

          <Button
            type="button"
            onClick={handleExportData}
            className="bg-white/5 border border-white/10 hover:border-primary/30 text-white hover:text-primary font-black uppercase tracking-widest text-xs rounded-xl flex items-center gap-2 h-12 px-6"
          >
            <Download size={14} />
            Export My Data (JSON)
          </Button>
        </div>
      </div>
    </div>
  );
}
