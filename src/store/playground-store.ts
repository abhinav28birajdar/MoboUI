import { create } from 'zustand';
import { ComponentFramework } from '@/types/component';
import { DeviceType, DeviceSkin, PlaygroundTheme } from '@/types/playground';

interface PlaygroundState {
  code_flutter: string;
  code_react_native: string;
  code_expo: string;
  code_web: string;
  activeFramework: ComponentFramework;
  activeDevice: DeviceType;
  deviceSkin: DeviceSkin;
  theme: PlaygroundTheme;
  fontSize: number;
  wordWrap: 'on' | 'off';
  autoSave: boolean;
  sessionId: string | null;
  isDirty: boolean;
  isSaving: boolean;
  
  setCode: (framework: ComponentFramework, code: string) => void;
  setFramework: (framework: ComponentFramework) => void;
  setDevice: (device: DeviceType) => void;
  setDeviceSkin: (skin: DeviceSkin) => void;
  setTheme: (theme: PlaygroundTheme) => void;
  setFontSize: (size: number) => void;
  setWordWrap: (wrap: 'on' | 'off') => void;
  setAutoSave: (autoSave: boolean) => void;
  setSessionId: (id: string | null) => void;
  setIsSaving: (isSaving: boolean) => void;
  reset: () => void;
  loadSession: (session: any) => void;
}

export const usePlaygroundStore = create<PlaygroundState>((set) => ({
  code_flutter: '',
  code_react_native: '',
  code_expo: '',
  code_web: '',
  activeFramework: 'react_native',
  activeDevice: 'iphone-15-pro',
  deviceSkin: 'default',
  theme: 'dark',
  fontSize: 14,
  wordWrap: 'on',
  autoSave: true,
  sessionId: null,
  isDirty: false,
  isSaving: false,

  setCode: (framework, code) => set((state) => ({ 
    [`code_${framework}`]: code, 
    isDirty: true 
  })),
  setFramework: (activeFramework) => set({ activeFramework }),
  setDevice: (activeDevice) => set({ activeDevice }),
  setDeviceSkin: (deviceSkin) => set({ deviceSkin }),
  setTheme: (theme) => set({ theme }),
  setFontSize: (fontSize) => set({ fontSize }),
  setWordWrap: (wordWrap) => set({ wordWrap }),
  setAutoSave: (autoSave) => set({ autoSave }),
  setSessionId: (sessionId) => set({ sessionId, isDirty: false }),
  setIsSaving: (isSaving) => set({ isSaving }),
  reset: () => set({
    code_flutter: '',
    code_react_native: '',
    code_expo: '',
    code_web: '',
    sessionId: null,
    isDirty: false
  }),
  loadSession: (session) => set({
    code_flutter: session.code_flutter || '',
    code_react_native: session.code_react_native || '',
    code_expo: session.code_expo || '',
    code_web: session.code_web || '',
    activeFramework: session.active_framework || 'react_native',
    activeDevice: session.device_type || 'iphone-15-pro',
    deviceSkin: session.device_skin || 'default',
    theme: session.theme || 'dark',
    sessionId: session.id,
    isDirty: false
  })
}));
