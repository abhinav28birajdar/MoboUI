import { create } from 'zustand';

interface UiState {
  sidebarOpen: boolean;
  mobileNavOpen: boolean;
  searchOpen: boolean;
  toggleSidebar: (open?: boolean) => void;
  toggleMobileNav: (open?: boolean) => void;
  toggleSearch: (open?: boolean) => void;
}

export const useUiStore = create<UiState>((set) => ({
  sidebarOpen: false,
  mobileNavOpen: false,
  searchOpen: false,
  toggleSidebar: (open) => set((state) => ({ sidebarOpen: open !== undefined ? open : !state.sidebarOpen })),
  toggleMobileNav: (open) => set((state) => ({ mobileNavOpen: open !== undefined ? open : !state.mobileNavOpen })),
  toggleSearch: (open) => set((state) => ({ searchOpen: open !== undefined ? open : !state.searchOpen })),
}));
