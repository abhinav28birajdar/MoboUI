import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase/client';
import { useAuth } from './use-auth';
import { useNotificationStore, Notification } from '@/store/notification-store';
import { useEffect } from 'react';

const hasDb = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export function useNotifications() {
  const { user } = useAuth();
  const { notifications, unreadCount, setNotifications, markRead, markAllRead, addNotification } = useNotificationStore();

  const { data: dbNotifications = [] } = useQuery<Notification[], Error>({
    queryKey: ['notifications', user?.id],
    queryFn: async () => {
      if (!user || !hasDb) return [];
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      if (!error && data) return data as unknown as Notification[];
      return [];
    },
    enabled: !!user && !!hasDb,
  });

  // Sync with Zustand
  useEffect(() => {
    if (dbNotifications && dbNotifications.length > 0) {
      setNotifications(dbNotifications);
    }
  }, [dbNotifications, setNotifications]);

  const handleMarkRead = async (id: string) => {
    markRead(id);
    if (hasDb && user) {
      await (supabase as any)
        .from('notifications')
        .update({ is_read: true })
        .eq('id', id);
    }
  };

  const handleMarkAllRead = async () => {
    markAllRead();
    if (hasDb && user) {
      await (supabase as any)
        .from('notifications')
        .update({ is_read: true })
        .eq('user_id', user.id);
    }
  };

  return {
    notifications,
    unreadCount,
    markRead: handleMarkRead,
    markAllRead: handleMarkAllRead,
    addNotification,
  };
}
