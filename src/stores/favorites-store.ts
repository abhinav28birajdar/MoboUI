import { create } from 'zustand';

interface FavoritesState {
  favorites: Set<string>;
  toggleFavorite: (componentId: string) => Promise<void>;
  loadFavorites: () => Promise<void>;
  isFavorited: (componentId: string) => boolean;
}

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  favorites: new Set<string>(),

  loadFavorites: async () => {
    try {
      const res = await fetch('/api/favorites');
      if (res.ok) {
        const data = await res.json();
        // Extract component IDs from query result list
        const ids = (data.favorites || []).map((fav: any) => fav.component_id);
        set({ favorites: new Set<string>(ids) });
      }
    } catch (error) {
      console.error('Failed to load favorites:', error);
    }
  },

  toggleFavorite: async (componentId: string) => {
    const current = new Set(get().favorites);
    const wasFavorited = current.has(componentId);
    
    // Optimistic Update
    if (wasFavorited) {
      current.delete(componentId);
    } else {
      current.add(componentId);
    }
    set({ favorites: current });

    try {
      const res = await fetch('/api/favorites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ componentId }),
      });
      
      if (!res.ok) {
        throw new Error('Sync toggle favorite failed');
      }
      
      const data = await res.json();
      const updated = new Set(get().favorites);
      if (data.favorited) {
        updated.add(componentId);
      } else {
        updated.delete(componentId);
      }
      set({ favorites: updated });
    } catch (error) {
      console.error('Database sync failed for favorite, reverting state:', error);
      // Revert optimistic update on failure
      const reverted = new Set(get().favorites);
      if (wasFavorited) {
        reverted.add(componentId);
      } else {
        reverted.delete(componentId);
      }
      set({ favorites: reverted });
    }
  },

  isFavorited: (componentId: string) => {
    return get().favorites.has(componentId);
  },
}));
