import { create } from 'zustand';

export interface Notification {
  id: string;
  type: 'comment' | 'like' | 'follow' | 'system' | 'new_component' | 'submission_status';
  title: string;
  message: string;
  is_read: boolean;
  created_at: string;
  link?: string;
}

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  
  setNotifications: (notifications: Notification[]) => void;
  addNotification: (notification: Notification) => void;
  markRead: (id: string) => void;
  markAllRead: () => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [],
  unreadCount: 0,

  setNotifications: (notifications) => set({
    notifications,
    unreadCount: notifications.filter(n => !n.is_read).length
  }),
  
  addNotification: (notification) => set((state) => ({
    notifications: [notification, ...state.notifications],
    unreadCount: state.unreadCount + 1
  })),
  
  markRead: (id) => set((state) => {
    const notifications = state.notifications.map(n => 
      n.id === id ? { ...n, is_read: true } : n
    );
    return {
      notifications,
      unreadCount: notifications.filter(n => !n.is_read).length
    };
  }),
  
  markAllRead: () => set((state) => ({
    notifications: state.notifications.map(n => ({ ...n, is_read: true })),
    unreadCount: 0
  }))
}));
