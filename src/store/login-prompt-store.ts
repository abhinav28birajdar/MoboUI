import { create } from 'zustand';

interface LoginPromptState {
  isOpen: boolean;
  title: string;
  description: string;
  openModal: (title?: string, description?: string) => void;
  closeModal: () => void;
}

export const useLoginPromptStore = create<LoginPromptState>((set) => ({
  isOpen: false,
  title: 'Sign in required',
  description: 'Please sign in to your MoboUI account to access this feature.',
  openModal: (title, description) => set({
    isOpen: true,
    title: title || 'Sign in required',
    description: description || 'Please sign in to your MoboUI account to access this feature.',
  }),
  closeModal: () => set({ isOpen: false }),
}));
