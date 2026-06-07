'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FolderHeart, History, Eye, User, Bell, ChevronRight, Layout, Sparkles, AlertCircle, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { toast } from 'react-hot-toast';
import { supabase } from '@/lib/supabase/client';

interface Stats {
  favorites: number;
  projects: number;
  views: number;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  created_at: string;
  read: boolean;
}

export default function UserDashboard() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [stats, setStats] = useState<Stats>({ favorites: 0, projects: 0, views: 0 });
  const [favoritesList, setFavoritesList] = useState<any[]>([]);
  const [projectsList, setProjectsList] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        if (!supabase || typeof supabase.auth === 'undefined') return;

        const { data: { session } } = await supabase.auth.getSession();
        if (!session) return;
        setUser(session.user);

        // Fetch Profile
        const { data: prof } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .maybeSingle();
        setProfile(prof);

        // Fetch Favorites
        const { data: favs } = await supabase
          .from('favorites')
          .select('*, components(*)')
          .eq('user_id', session.user.id);
        
        const formattedFavs = favs || [];
        setFavoritesList(formattedFavs);

        // Fetch user projects
        const { data: projs } = await supabase
          .from('projects')
          .select('*')
          .eq('author_id', session.user.id);
        
        const formattedProjs = projs || [];
        setProjectsList(formattedProjs);

        // Sum project views
        const totalViews = formattedProjs.reduce((acc: number, curr: any) => acc + (curr.view_count || 0), 0);

        setStats({
          favorites: formattedFavs.length,
          projects: formattedProjs.length,
          views: totalViews,
        });

        // Fetch Notifications
        const { data: notifs } = await supabase
          .from('notifications')
          .select('*')
          .eq('user_id', session.user.id)
          .order('created_at', { ascending: false })
          .limit(5);

        setNotifications(
          notifs || [
            {
              id: '1',
              title: 'Welcome to MOBOUI Portal',
              message: 'Explore the dashboard, configure settings, and submit mobile apps to the showcase list.',
              created_at: new Date().toISOString(),
              read: false,
            },
          ]
        );

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleMarkAsRead = async (id: string) => {
    try {
      if (supabase) {
        await supabase
          .from('notifications')
          .update({ read: true, read_at: new Date().toISOString() })
          .eq('id', id);
      }
      setNotifications(prev =>
        prev.map(n => (n.id === id ? { ...n, read: true } : n))
      );
      toast.success('Notification marked as read');
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-2 border-primary border-t-transparent animate-spin mx-auto mb-4" />
          <p className="text-neutral-400 font-medium">Synchronizing dashboard sessions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-32">
      <div className="container px-6 mx-auto space-y-12">
        {/* Banner / Welcome Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/5 pb-8">
          <div>
            <span className="text-primary text-[10px] font-black uppercase tracking-widest block mb-2">DEVELOPER DASHBOARD</span>
            <h1 className="text-4xl md:text-5xl font-heading font-black tracking-tight uppercase leading-none">
              Welcome back, <span className="text-primary">{profile?.full_name || user?.email?.split('@')[0]}</span>
            </h1>
            <p className="text-neutral-400 text-sm font-medium mt-2">
              Manage your saved components, submitted case studies, and security parameters.
            </p>
          </div>
          <div className="flex gap-3">
            <Button asChild variant="outline" className="border-white/10 hover:bg-white/5 text-white font-bold uppercase tracking-widest text-[10px] rounded-xl h-11 px-5">
              <Link href="/profile">Edit Profile</Link>
            </Button>
            <Button asChild className="bg-primary text-black font-bold uppercase tracking-widest text-[10px] rounded-xl h-11 px-5 border-0">
              <Link href="/projects/submit">Submit Project</Link>
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: 'Favorites', val: stats.favorites, icon: FolderHeart, desc: 'Saved UI components' },
            { label: 'Showcase Submissions', val: stats.projects, icon: History, desc: 'Registered case studies' },
            { label: 'Cumulative Views', val: stats.views, icon: Eye, desc: 'Views on your designs' },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-neutral-900/35 border border-white/5 p-6 rounded-[2rem] flex items-center justify-between shadow-sm relative overflow-hidden"
            >
              <div className="space-y-1">
                <span className="text-neutral-500 text-[9px] font-black uppercase tracking-widest">{item.label}</span>
                <p className="text-3xl font-black text-white">{item.val}</p>
                <p className="text-neutral-500 text-[10px] font-medium">{item.desc}</p>
              </div>
              <div className="p-4 bg-white/5 rounded-2xl border border-white/5 text-primary">
                <item.icon size={20} />
              </div>
            </div>
          ))}
        </div>

        {/* Multi Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          {/* Main items (Favorites and Projects) */}
          <div className="lg:col-span-2 space-y-10">
            {/* Favorites Catalog */}
            <div className="space-y-6">
              <h3 className="text-xl font-heading font-black uppercase tracking-tight text-white flex items-center gap-2">
                <FolderHeart size={18} className="text-primary" /> Saved Favorites
              </h3>

              {favoritesList.length === 0 ? (
                <div className="p-8 text-center bg-neutral-900/20 border border-dashed border-white/10 rounded-[2.5rem]">
                  <p className="text-neutral-500 text-sm font-medium">You haven't favorited any components yet.</p>
                  <Button asChild size="sm" className="mt-4 bg-primary text-black font-bold uppercase tracking-widest text-[9px] rounded-lg">
                    <Link href="/components">Browse Library</Link>
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {favoritesList.map((fav) => {
                    const comp = fav.components;
                    if (!comp) return null;
                    return (
                      <div
                        key={comp.id}
                        className="p-5 bg-neutral-900/40 border border-white/5 rounded-2xl flex flex-col justify-between hover:border-primary/30 transition-all group"
                      >
                        <div className="space-y-2">
                          <span className="text-primary text-[8px] font-black uppercase tracking-widest">{comp.framework}</span>
                          <h4 className="text-md font-bold text-white uppercase truncate">{comp.name}</h4>
                          <p className="text-neutral-500 text-xs font-medium line-clamp-2">{comp.description}</p>
                        </div>
                        <div className="flex items-center justify-between pt-4 mt-4 border-t border-white/5">
                          <span className="text-neutral-600 text-[10px] font-mono">{comp.version}</span>
                          <Button asChild size="sm" variant="ghost" className="text-primary text-[10px] font-black uppercase tracking-widest p-0 h-auto hover:bg-transparent">
                            <Link href={`/components/${comp.category_id || 'all'}/${comp.slug}`}>
                              View Component <ChevronRight size={12} className="ml-1" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Showcase Log */}
            <div className="space-y-6">
              <h3 className="text-xl font-heading font-black uppercase tracking-tight text-white flex items-center gap-2">
                <History size={18} className="text-primary" /> Submission Registry
              </h3>

              {projectsList.length === 0 ? (
                <div className="p-8 text-center bg-neutral-900/20 border border-dashed border-white/10 rounded-[2.5rem]">
                  <p className="text-neutral-500 text-sm font-medium">You haven't submitted any showcase applications.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {projectsList.map((proj) => (
                    <div
                      key={proj.id}
                      className="p-5 bg-neutral-900/40 border border-white/5 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <h4 className="text-md font-bold text-white uppercase">{proj.title}</h4>
                        <p className="text-neutral-400 text-xs font-medium line-clamp-2">{proj.description}</p>
                        <div className="flex items-center gap-4 text-[10px] text-neutral-500 font-mono pt-1">
                          <span>Views: {proj.view_count}</span>
                          <span>Likes: {proj.like_count}</span>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider h-fit border ${
                        proj.status === 'approved' || proj.status === 'featured'
                          ? 'bg-green-500/10 border-green-500/25 text-green-500'
                          : proj.status === 'rejected'
                          ? 'bg-red-500/10 border-red-500/25 text-red-500'
                          : 'bg-yellow-500/10 border-yellow-500/25 text-yellow-500'
                      }`}>
                        {proj.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar Notifications */}
          <div className="space-y-6 lg:sticky lg:top-28 bg-neutral-900/30 border border-white/5 p-6 rounded-[2.5rem]">
            <h3 className="text-md font-heading font-black uppercase tracking-tight text-white flex items-center gap-2 border-b border-white/5 pb-3">
              <Bell size={16} className="text-primary" /> System Updates
            </h3>

            {notifications.length === 0 ? (
              <p className="text-neutral-500 text-xs font-medium">No active notification logs.</p>
            ) : (
              <div className="space-y-4">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={`p-4 rounded-xl border transition-all ${
                      notif.read ? 'bg-neutral-950/20 border-white/5 opacity-55' : 'bg-primary/5 border-primary/20'
                    }`}
                  >
                    <div className="flex justify-between items-start gap-2">
                      <p className="font-bold text-white text-xs uppercase">{notif.title}</p>
                      {!notif.read && (
                        <button
                          onClick={() => handleMarkAsRead(notif.id)}
                          className="text-[9px] font-black uppercase tracking-wider text-primary hover:underline"
                        >
                          Mark Read
                        </button>
                      )}
                    </div>
                    <p className="text-neutral-400 text-[11px] font-medium leading-normal mt-1">{notif.message}</p>
                    <span className="text-[8px] font-mono text-neutral-600 block mt-2">
                      {new Date(notif.created_at).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
