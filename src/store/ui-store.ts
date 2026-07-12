import { create } from 'zustand';

interface UIState {
  sidebarOpen: boolean;
  filterSidebarOpen: boolean;
  searchOpen: boolean;
  commandPaletteOpen: boolean;
  activeModal: string | null;
  
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  
  toggleFilterSidebar: () => void;
  setFilterSidebarOpen: (open: boolean) => void;
  
  toggleSearch: () => void;
  setSearchOpen: (open: boolean) => void;
  
  toggleCommandPalette: () => void;
  setCommandPaletteOpen: (open: boolean) => void;
  
  setActiveModal: (modalId: string | null) => void;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: false,
  filterSidebarOpen: true, // Default to true on desktop
  searchOpen: false,
  commandPaletteOpen: false,
  activeModal: null,

  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  
  toggleFilterSidebar: () => set((state) => ({ filterSidebarOpen: !state.filterSidebarOpen })),
  setFilterSidebarOpen: (open) => set({ filterSidebarOpen: open }),
  
  toggleSearch: () => set((state) => ({ searchOpen: !state.searchOpen })),
  setSearchOpen: (open) => set({ searchOpen: open }),
  
  toggleCommandPalette: () => set((state) => ({ commandPaletteOpen: !state.commandPaletteOpen })),
  setCommandPaletteOpen: (open) => set({ commandPaletteOpen: open }),
  
  setActiveModal: (modalId) => set({ activeModal: modalId }),
}));
