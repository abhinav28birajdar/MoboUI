export type DeviceCategory = 'iphone' | 'android' | 'tablet';
export type DeviceOrientation = 'portrait' | 'landscape';

export interface Device {
    id: string;
    name: string;
    type: DeviceCategory;
    width: number;
    height: number;
    pixelRatio: number;
    statusBarHeight: number;
    hasNotch: boolean;
    icon: string;
}

export interface DeviceFrame {
    device: Device;
    orientation: DeviceOrientation;
    scale: number;
}

export const DEVICES: Record<string, Device> = {
    iphone15Pro: {
        id: 'iphone-15-pro',
        name: 'iPhone 15 Pro',
        type: 'iphone',
        width: 393,
        height: 852,
        pixelRatio: 3,
        statusBarHeight: 59,
        hasNotch: true,
        icon: 'smartphone',
    },
    iphone15ProMax: {
        id: 'iphone-15-pro-max',
        name: 'iPhone 15 Pro Max',
        type: 'iphone',
        width: 430,
        height: 932,
        pixelRatio: 3,
        statusBarHeight: 59,
        hasNotch: true,
        icon: 'smartphone',
    },
    pixel8: {
        id: 'pixel-8',
        name: 'Google Pixel 8',
        type: 'android',
        width: 412,
        height: 915,
        pixelRatio: 2.625,
        statusBarHeight: 24,
        hasNotch: false,
        icon: 'smartphone',
    },
    galaxyS23: {
        id: 'galaxy-s23',
        name: 'Samsung Galaxy S23',
        type: 'android',
        width: 360,
        height: 780,
        pixelRatio: 3,
        statusBarHeight: 24,
        hasNotch: false,
        icon: 'smartphone',
    },
    ipadPro: {
        id: 'ipad-pro',
        name: 'iPad Pro 11"',
        type: 'tablet',
        width: 834,
        height: 1194,
        pixelRatio: 2,
        statusBarHeight: 24,
        hasNotch: false,
        icon: 'tablet',
    },
};
