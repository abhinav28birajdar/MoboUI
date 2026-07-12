"use client";

import React, { useEffect, useState, useRef } from 'react';
import { Bell, Check, ExternalLink } from 'lucide-react';
import { getNotifications, getUnreadCount, markAsRead, markAllAsRead } from '@/app/dashboard/notifications/actions';
import { useAuth } from '@/hooks/use-auth';
import Link from 'next/link';

interface Notification {
  id: string;
  title: string;
  message: string;
  link?: string;
  is_read: boolean;
  created_at: string;
}

export function NotificationsPopover() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const popoverRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const fetchNotifications = async () => {
      const [{ data }, count] = await Promise.all([
        getNotifications(5),
        getUnreadCount()
      ]);
      setNotifications(data || []);
      setUnreadCount(count || 0);
    };

    fetchNotifications();
    // In a real app, you might set up a realtime subscription here using Supabase
  }, [user]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMarkAsRead = async (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    await markAsRead(id);
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: true } : n));
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const handleMarkAllAsRead = async () => {
    await markAllAsRead();
    setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
    setUnreadCount(0);
  };

  if (!user) return null;

  return (
    <div className="relative" ref={popoverRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-xl bg-neutral-900/50 border border-white/5 hover:bg-neutral-800 transition-colors"
      >
        <Bell size={20} className="text-neutral-300" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-black">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 md:w-96 bg-neutral-900/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50">
          <div className="p-4 border-b border-white/10 flex items-center justify-between">
            <h3 className="font-bold text-white">Notifications</h3>
            {unreadCount > 0 && (
              <button 
                onClick={handleMarkAllAsRead}
                className="text-xs text-primary hover:text-white transition-colors font-bold flex items-center gap-1"
              >
                <Check size={12} />
                Mark all read
              </button>
            )}
          </div>
          
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-neutral-500 text-sm">
                No notifications yet.
              </div>
            ) : (
              notifications.map((notif) => (
                <div 
                  key={notif.id} 
                  className={`p-4 border-b border-white/5 hover:bg-white/5 transition-colors group relative ${!notif.is_read ? 'bg-primary/5' : ''}`}
                >
                  {!notif.is_read && (
                    <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-primary" />
                  )}
                  <h4 className="text-sm font-bold text-white pr-6">{notif.title}</h4>
                  <p className="text-xs text-neutral-400 mt-1 line-clamp-2">{notif.message}</p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-[10px] text-neutral-600 font-medium">
                      {new Date(notif.created_at).toLocaleDateString()}
                    </span>
                    <div className="flex gap-2">
                      {!notif.is_read && (
                        <button 
                          onClick={(e) => handleMarkAsRead(notif.id, e)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] text-neutral-400 hover:text-white"
                        >
                          Mark read
                        </button>
                      )}
                      {notif.link && (
                        <Link href={notif.link} onClick={() => setIsOpen(false)} className="text-[10px] text-primary flex items-center gap-1">
                          View <ExternalLink size={10} />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          
          <div className="p-2 border-t border-white/10 bg-black/20">
            <Link 
              href="/dashboard/notifications" 
              onClick={() => setIsOpen(false)}
              className="block w-full text-center py-2 text-xs font-bold text-neutral-400 hover:text-white transition-colors rounded-lg hover:bg-white/5"
            >
              View All Notifications
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
