import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface PlaygroundState {
  code: string;
  platform: 'react-native' | 'expo' | 'flutter';
  template: 'blank' | 'button' | 'form' | 'list';
  framework: 'react-native' | 'flutter';
  setCode: (code: string) => void;
  setPlatform: (platform: 'react-native' | 'expo' | 'flutter') => void;
  setTemplate: (template: 'blank' | 'button' | 'form' | 'list') => void;
  setFramework: (framework: 'react-native' | 'flutter') => void;
  reset: () => void;
}

const initialState = {
  code: '',
  platform: 'react-native' as const,
  template: 'blank' as const,
  framework: 'react-native' as const,
};

export const usePlaygroundStore = create<PlaygroundState>()(
  persist(
    (set) => ({
      ...initialState,
      setCode: (code) => set({ code }),
      setPlatform: (platform) => set({ platform }),
      setTemplate: (template) => set({ template }),
      setFramework: (framework) => set({ framework }),
      reset: () => set(initialState),
    }),
    {
      name: 'playground-storage',
    }
  )
);
