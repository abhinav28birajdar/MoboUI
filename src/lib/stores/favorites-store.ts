import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FavoritesState {
    favorites: string[];
    addFavorite: (componentId: string) => void;
    removeFavorite: (componentId: string) => void;
    toggleFavorite: (componentId: string) => void;
    isFavorite: (componentId: string) => boolean;
    clearFavorites: () => void;
}

export const useFavoritesStore = create<FavoritesState>()(
    persist(
        (set, get) => ({
            favorites: [],
            addFavorite: (id) =>
                set((state) => ({ favorites: [...state.favorites, id] })),
            removeFavorite: (id) =>
                set((state) => ({ favorites: state.favorites.filter((fid) => fid !== id) })),
            toggleFavorite: (id) => {
                const { favorites } = get();
                if (favorites.includes(id)) {
                    get().removeFavorite(id);
                } else {
                    get().addFavorite(id);
                }
            },
            isFavorite: (id) => get().favorites.includes(id),
            clearFavorites: () => set({ favorites: [] }),
        }),
        {
            name: 'moboui-favorites',
        }
    )
);
