import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface PlaygroundState {
  code: string;
  framework: 'react-native' | 'flutter';
  setCode: (code: string) => void;
  setFramework: (framework: 'react-native' | 'flutter') => void;
}

export const usePlaygroundStore = create<PlaygroundState>()(
  persist(
    (set) => ({
      code: '',
      framework: 'react-native',
      setCode: (code) => set({ code }),
      setFramework: (framework) => set({ framework }),
    }),
    {
      name: 'playground-storage',
    }
  )
);
