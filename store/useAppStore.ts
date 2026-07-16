import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Framework } from '@/types'

interface AppState {
  favorites: string[]
  addFavorite: (slug: string) => void
  removeFavorite: (slug: string) => void
  isFavorite: (slug: string) => boolean
  
  activeFramework: Framework | 'all'
  setActiveFramework: (fw: Framework | 'all') => void
  
  searchQuery: string
  setSearchQuery: (q: string) => void
  isSearchOpen: boolean
  setSearchOpen: (open: boolean) => void
  
  playgroundCode: Record<Framework, string>
  setPlaygroundCode: (fw: Framework, code: string) => void
  
  activeDevice: 'iphone' | 'android'
  setActiveDevice: (d: 'iphone' | 'android') => void
  
  recentSearches: string[]
  addRecentSearch: (q: string) => void
  clearRecentSearches: () => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      favorites: [],
      addFavorite: (slug) => set((state) => ({ favorites: [...new Set([...state.favorites, slug])] })),
      removeFavorite: (slug) => set((state) => ({ favorites: state.favorites.filter(f => f !== slug) })),
      isFavorite: (slug) => get().favorites.includes(slug),
      
      activeFramework: 'all',
      setActiveFramework: (fw) => set({ activeFramework: fw }),
      
      searchQuery: '',
      setSearchQuery: (q) => set({ searchQuery: q }),
      isSearchOpen: false,
      setSearchOpen: (open) => set({ isSearchOpen: open }),
      
      playgroundCode: { flutter: '', 'react-native': '', expo: '', web: '' },
      setPlaygroundCode: (fw, code) => set((state) => ({
        playgroundCode: { ...state.playgroundCode, [fw]: code }
      })),
      
      activeDevice: 'iphone',
      setActiveDevice: (d) => set({ activeDevice: d }),
      
      recentSearches: [],
      addRecentSearch: (q) => set((state) => {
        const filtered = state.recentSearches.filter(s => s !== q)
        return { recentSearches: [q, ...filtered].slice(0, 5) }
      }),
      clearRecentSearches: () => set({ recentSearches: [] })
    }),
    {
      name: 'moboui-storage',
      partialize: (state) => ({ favorites: state.favorites, recentSearches: state.recentSearches }),
    }
  )
)
