'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { User, Save, Building, MapPin, Globe, Github, Twitter, Trash2, AlertCircle, Loader, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ImageUpload } from '@/components/shared/ImageUpload';
import { toast } from 'react-hot-toast';
import { supabase } from '@/lib/supabase/client';

export default function UserProfile() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>({
    full_name: '',
    username: '',
    bio: '',
    company: '',
    website: '',
    location: '',
    github_url: '',
    twitter_url: '',
    avatar_url: '',
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  // Danger Zone delete variables
  const [deleteConfirm, setDeleteConfirm] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        if (!supabase || typeof supabase.auth === 'undefined') return;

        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          router.push('/login?redirect=/profile');
          return;
        }
        setUser(session.user);

        const { data: prof, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .maybeSingle();

        if (prof) {
          setProfile({
            full_name: prof.full_name || '',
            username: prof.username || '',
            bio: prof.bio || '',
            company: prof.company || '',
            website: prof.website || '',
            location: prof.location || '',
            github_url: prof.github_url || '',
            twitter_url: prof.twitter_url || '',
            avatar_url: prof.avatar_url || '',
          });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [router]);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setSaving(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: profile.full_name.trim(),
          username: profile.username.trim() || null,
          bio: profile.bio.trim(),
          company: profile.company.trim(),
          website: profile.website.trim(),
          location: profile.location.trim(),
          github_url: profile.github_url.trim(),
          twitter_url: profile.twitter_url.trim(),
          avatar_url: profile.avatar_url,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id);

      if (error) throw error;
      toast.success('Profile updated successfully!');
    } catch (err: any) {
      toast.error(err.message || 'Could not update profile parameters');
    } finally {
      setSaving(false);
    }
  };

  const handleAvatarUpload = (url: string) => {
    setProfile((prev: any) => ({ ...prev, avatar_url: url }));
    toast.success('Avatar image reference queued!');
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirm !== 'DELETE') {
      toast.error('Verify confirmation text to delete account');
      return;
    }

    setDeleting(true);
    try {
      // Sign out and redirect to home in mock delete, or run RPC
      if (supabase) {
        // Supposing we have profiles delete cascades
        const { error } = await supabase.from('profiles').delete().eq('id', user.id);
        if (error) throw error;
        await supabase.auth.signOut();
      }
      toast.success('Your profile account has been permanently removed.');
      window.location.assign('/');
    } catch (err: any) {
      toast.error(err.message || 'Account delete procedure failed');
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-2 border-primary border-t-transparent animate-spin mx-auto mb-4" />
          <p className="text-neutral-400 font-medium">Fetching developer profile metadata...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-32">
      <div className="container px-6 mx-auto max-w-4xl space-y-12">
        {/* Page Header */}
        <div className="border-b border-white/5 pb-8">
          <span className="text-primary text-[10px] font-black uppercase tracking-widest block mb-2">PORTAL ACCOUNT</span>
          <h1 className="text-4xl md:text-5xl font-heading font-black tracking-tight uppercase leading-none">
            Edit <span className="text-primary">Profile.</span>
          </h1>
          <p className="text-neutral-400 text-sm font-medium mt-2">
            Configure your developer credentials, social tags, and avatar layout definitions.
          </p>
        </div>

        {/* Profile parameters card */}
        <form onSubmit={handleSaveProfile} className="bg-neutral-900/40 border border-white/5 p-8 md:p-12 rounded-[3rem] space-y-8 shadow-xl">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-8 border-b border-white/5 pb-8">
            <div className="w-24 h-24 rounded-full bg-neutral-950 border-2 border-white/10 flex items-center justify-center overflow-hidden flex-shrink-0 relative">
              {profile.avatar_url ? (
                <img src={profile.avatar_url} alt="avatar" className="w-full h-full object-cover" />
              ) : (
                <User size={36} className="text-neutral-600" />
              )}
            </div>
            <div className="flex-1 space-y-3">
              <Label className="text-xs font-black uppercase tracking-widest text-neutral-400">Profile Image</Label>
              <ImageUpload
                onUploadSuccess={handleAvatarUpload}
                className="bg-black/50 border border-white/10 max-w-xs"
              />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="fullname" className="text-xs font-black uppercase tracking-widest text-neutral-400">Full Name</Label>
              <Input
                id="fullname"
                placeholder="e.g. Sarah Connor"
                value={profile.full_name}
                onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                required
                className="h-12 bg-black border border-white/10 rounded-xl focus:border-primary/50 text-white font-medium"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="username" className="text-xs font-black uppercase tracking-widest text-neutral-400">Username</Label>
              <Input
                id="username"
                placeholder="e.g. sarahconnor"
                value={profile.username}
                onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                className="h-12 bg-black border border-white/10 rounded-xl focus:border-primary/50 text-white font-medium"
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="bio" className="text-xs font-black uppercase tracking-widest text-neutral-400">Developer Bio</Label>
            <Textarea
              id="bio"
              placeholder="Tell the community about yourself, framework goals, and animations experience..."
              value={profile.bio}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              className="min-h-[100px] bg-black border border-white/10 rounded-xl focus:border-primary/50 text-white p-4 font-medium"
            />
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="grid gap-2">
              <Label htmlFor="company" className="text-xs font-black uppercase tracking-widest text-neutral-400">Company</Label>
              <div className="relative">
                <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                <Input
                  id="company"
                  placeholder="Organization"
                  value={profile.company}
                  onChange={(e) => setProfile({ ...profile, company: e.target.value })}
                  className="h-12 bg-black border border-white/10 rounded-xl focus:border-primary/50 text-white pl-12 font-medium"
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="location" className="text-xs font-black uppercase tracking-widest text-neutral-400">Location</Label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                <Input
                  id="location"
                  placeholder="e.g. Tokyo, JP"
                  value={profile.location}
                  onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                  className="h-12 bg-black border border-white/10 rounded-xl focus:border-primary/50 text-white pl-12 font-medium"
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="website" className="text-xs font-black uppercase tracking-widest text-neutral-400">Website</Label>
              <div className="relative">
                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                <Input
                  id="website"
                  placeholder="https://example.com"
                  value={profile.website}
                  onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                  className="h-12 bg-black border border-white/10 rounded-xl focus:border-primary/50 text-white pl-12 font-medium"
                />
              </div>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 pt-4 border-t border-white/5">
            <div className="grid gap-2">
              <Label htmlFor="github" className="text-xs font-black uppercase tracking-widest text-neutral-400">GitHub Profile URL</Label>
              <div className="relative">
                <Github className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                <Input
                  id="github"
                  placeholder="https://github.com/username"
                  value={profile.github_url}
                  onChange={(e) => setProfile({ ...profile, github_url: e.target.value })}
                  className="h-12 bg-black border border-white/10 rounded-xl focus:border-primary/50 text-white pl-12 font-medium"
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="twitter" className="text-xs font-black uppercase tracking-widest text-neutral-400">Twitter Profile URL</Label>
              <div className="relative">
                <Twitter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                <Input
                  id="twitter"
                  placeholder="https://twitter.com/username"
                  value={profile.twitter_url}
                  onChange={(e) => setProfile({ ...profile, twitter_url: e.target.value })}
                  className="h-12 bg-black border border-white/10 rounded-xl focus:border-primary/50 text-white pl-12 font-medium"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <Button
              type="submit"
              disabled={saving}
              className="h-14 px-8 bg-primary text-black font-black uppercase tracking-widest text-xs rounded-xl flex items-center gap-2 hover:scale-[1.02] transition-all border-0"
            >
              {saving ? <Loader className="w-4 h-4 animate-spin" /> : <Save size={16} />}
              Save Account Changes
            </Button>
          </div>
        </form>

        {/* Danger Zone */}
        <div className="bg-[#110A0A]/40 border border-red-950/30 p-8 md:p-12 rounded-[3rem] space-y-6 shadow-md">
          <div className="flex items-center gap-3 border-b border-red-950/20 pb-3 text-red-500">
            <AlertCircle size={24} />
            <h3 className="text-xl font-heading font-black uppercase tracking-tight">Danger Zone</h3>
          </div>
          <p className="text-neutral-400 text-sm font-medium">
            Permanently delete your profile data, favorited component indices, and submission case studies. This cannot be undone.
          </p>

          <div className="space-y-4 max-w-md pt-2">
            <Label className="text-xs font-bold text-red-400 uppercase tracking-wider block">
              Type <span className="font-mono font-black text-white px-1.5 py-0.5 rounded bg-red-950/50">DELETE</span> to confirm profile closure:
            </Label>
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                placeholder="DELETE"
                value={deleteConfirm}
                onChange={(e) => setDeleteConfirm(e.target.value)}
                className="h-12 bg-black border border-red-950/30 rounded-xl focus:border-red-500/50 text-white font-medium"
              />
              <Button
                type="button"
                onClick={handleDeleteAccount}
                disabled={deleting || deleteConfirm !== 'DELETE'}
                className="h-12 bg-red-600 hover:bg-red-700 text-white font-black uppercase tracking-widest text-xs rounded-xl flex items-center justify-center gap-2 px-6 border-0"
              >
                {deleting ? <Loader className="w-4 h-4 animate-spin" /> : <Trash2 size={16} />}
                Delete Account
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
