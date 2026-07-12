import React from 'react';
import { getNotifications } from './actions';
import { GlowEffect } from '@/components/shared/GlowEffect';
import { BellRing, CheckCircle2, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Notifications | MoboUI Dashboard',
  description: 'View all your notifications and updates.',
};

export default async function NotificationsPage() {
  const { data: notifications } = await getNotifications(50); // Get up to 50 for the full page

  return (
    <div className="max-w-4xl mx-auto space-y-8 relative">
      <GlowEffect className="top-0 right-1/4 opacity-10" size="lg" />

      {/* Header */}
      <div className="flex items-end justify-between border-b border-white/10 pb-6">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tighter mb-2 flex items-center gap-3">
            Notifications <BellRing className="text-primary" />
          </h1>
          <p className="text-neutral-500 font-medium text-sm">Stay updated on community interactions and platform news.</p>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {(!notifications || notifications.length === 0) ? (
          <div className="bg-neutral-900/40 border border-dashed border-white/10 rounded-[2rem] p-16 text-center">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6 text-neutral-600">
              <CheckCircle2 size={32} />
            </div>
            <h3 className="text-xl font-black text-white mb-2">You're all caught up!</h3>
            <p className="text-neutral-500">No new notifications to show right now.</p>
          </div>
        ) : (
          notifications.map((notif: any) => (
            <div 
              key={notif.id}
              className={`p-6 rounded-3xl border transition-all ${
                notif.is_read 
                  ? 'bg-neutral-900/30 border-white/5' 
                  : 'bg-primary/5 border-primary/20 shadow-[0_0_30px_rgba(255,202,3,0.05)]'
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    {!notif.is_read && (
                      <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
                    )}
                    <h3 className="text-lg font-bold text-white">{notif.title}</h3>
                  </div>
                  <p className="text-neutral-400 text-sm leading-relaxed max-w-2xl">
                    {notif.message}
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-6 mt-4">
                    <span className="text-xs font-medium text-neutral-600 uppercase tracking-widest">
                      {new Date(notif.created_at).toLocaleDateString('en-US', {
                        month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit'
                      })}
                    </span>
                    
                    {notif.link && (
                      <Link href={notif.link} className="text-xs font-bold text-primary hover:text-primary/80 transition-colors flex items-center gap-1">
                        View Context <ExternalLink size={12} />
                      </Link>
                    )}
                  </div>
                </div>
                
                {/* Actions could go here if needed on the full page (like delete) */}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}