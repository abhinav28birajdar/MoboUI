import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { components as seedComponents } from '@/lib/data/components';
import type { Component } from '@/lib/types/component';

export interface Submission {
  id: string;
  title: string;
  author: string;
  description: string;
  imageUrl: string;
  createdAt: string;
}

interface FrontendAppState {
  components: Component[];
  favorites: string[];
  submissions: Submission[];
  isBusy: boolean;
  setBusy: (busy: boolean) => void;
  toggleFavorite: (slug: string) => void;
  addComponent: (component: Component) => void;
  addSubmission: (submission: Omit<Submission, 'id' | 'createdAt'>) => void;
}

function normalizeSlug(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export const useFrontendAppStore = create<FrontendAppState>()(
  persist(
    (set) => ({
      components: seedComponents,
      favorites: [],
      submissions: [],
      isBusy: false,
      setBusy: (busy) => set({ isBusy: busy }),
      toggleFavorite: (slug) =>
        set((state) => {
          const exists = state.favorites.includes(slug);
          return {
            favorites: exists
              ? state.favorites.filter((id) => id !== slug)
              : [...state.favorites, slug],
          };
        }),
      addComponent: (component) =>
        set((state) => {
          const slug = normalizeSlug(component.slug || component.name);
          const safeComponent: Component = {
            ...component,
            slug,
            id: component.id || slug,
          };

          const withoutExisting = state.components.filter((item) => item.slug !== slug);
          return {
            components: [safeComponent, ...withoutExisting],
          };
        }),
      addSubmission: (submission) =>
        set((state) => ({
          submissions: [
            {
              ...submission,
              id: `sub-${Date.now()}`,
              createdAt: new Date().toISOString(),
            },
            ...state.submissions,
          ],
        })),
    }),
    {
      name: 'moboui-frontend-store',
      partialize: (state) => ({
        components: state.components,
        favorites: state.favorites,
        submissions: state.submissions,
      }),
    }
  )
);
