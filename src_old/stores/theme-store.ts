import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface ThemeTokens {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    borderRadius: number;
    fontFamily: string;
}

interface ThemeState {
    tokens: ThemeTokens;
    setToken: (key: keyof ThemeTokens, value: string | number) => void;
    resetTheme: () => void;
    importTheme: (theme: ThemeTokens) => void;
}

const defaultTokens: ThemeTokens = {
    primary: '#77D970',
    secondary: '#1A1A1A',
    accent: '#77D970',
    background: '#0A0A0A',
    surface: '#121212',
    text: '#FFFFFF',
    borderRadius: 16,
    fontFamily: 'Inter',
};

export const useThemeStore = create<ThemeState>()(
    persist(
        (set) => ({
            tokens: defaultTokens,
            setToken: (key, value) =>
                set((state) => ({
                    tokens: { ...state.tokens, [key]: value }
                })),
            resetTheme: () => set({ tokens: defaultTokens }),
            importTheme: (theme) => set({ tokens: theme }),
        }),
        {
            name: 'mobile-ui-theme',
        }
    )
);
