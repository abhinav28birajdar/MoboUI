export interface DeviceConfig {
  id: string;
  name: string;
  type: 'ios' | 'android';
  width: number;
  height: number;
  borderRadius: number;
  notchType: 'island' | 'notch' | 'punch-hole' | 'none';
  cameraType: 'single' | 'dual' | 'triple';
}

export const devices: Record<string, DeviceConfig> = {
  'iphone-15-pro': {
    id: 'iphone-15-pro',
    name: 'iPhone 15 Pro',
    type: 'ios',
    width: 393,
    height: 852,
    borderRadius: 55,
    notchType: 'island',
    cameraType: 'triple',
  },
  'iphone-15': {
    id: 'iphone-15',
    name: 'iPhone 15',
    type: 'ios',
    width: 393,
    height: 852,
    borderRadius: 55,
    notchType: 'island',
    cameraType: 'dual',
  },
  'iphone-14-pro-max': {
    id: 'iphone-14-pro-max',
    name: 'iPhone 14 Pro Max',
    type: 'ios',
    width: 430,
    height: 932,
    borderRadius: 55,
    notchType: 'island',
    cameraType: 'triple',
  },
  'iphone-se': {
    id: 'iphone-se',
    name: 'iPhone SE (3rd Gen)',
    type: 'ios',
    width: 375,
    height: 667,
    borderRadius: 0,
    notchType: 'none',
    cameraType: 'single',
  },
  'pixel-8-pro': {
    id: 'pixel-8-pro',
    name: 'Pixel 8 Pro',
    type: 'android',
    width: 412,
    height: 892,
    borderRadius: 32,
    notchType: 'punch-hole',
    cameraType: 'triple',
  },
  'samsung-s24-ultra': {
    id: 'samsung-s24-ultra',
    name: 'Samsung Galaxy S24 Ultra',
    type: 'android',
    width: 412,
    height: 915,
    borderRadius: 16,
    notchType: 'punch-hole',
    cameraType: 'triple',
  },
};

export const defaultDevice = devices['iphone-15-pro'];
