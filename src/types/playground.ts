export type DeviceType = 'iphone-15-pro' | 'iphone-15' | 'iphone-14-pro-max' | 'iphone-se' | 'pixel-8-pro' | 'samsung-s24-ultra';

export type DeviceSkin = 'default' | 'minimal' | 'none';

export type PlaygroundTheme = 'light' | 'dark';

export interface PlaygroundSettings {
  fontSize: number;
  wordWrap: 'on' | 'off';
  autoSave: boolean;
  theme: PlaygroundTheme;
}

export interface PlaygroundSession {
  id: string;
  user_id: string | null;
  session_token: string;
  code_flutter: string;
  code_react_native: string;
  code_expo: string;
  code_web: string;
  active_framework: 'flutter' | 'react_native' | 'expo' | 'web';
  device_type: DeviceType;
  device_skin: DeviceSkin;
  theme: PlaygroundTheme;
  last_saved: string;
  created_at: string;
}
