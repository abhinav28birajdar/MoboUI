'use client';

import React from 'react';
import { cn } from '@/lib/utils/cn';
import { Battery, Wifi, Signal } from 'lucide-react';
import PreviewRegistry from './PreviewRegistry';

export type DeviceType = 'iphone-14-pro' | 'iphone-se' | 'pixel-7' | 'ipad-pro' | 'galaxy-s23';

interface MobileFrameProps {
    children?: React.ReactNode;
    componentId?: string;
    device?: DeviceType;
    orientation?: 'portrait' | 'landscape';
    theme?: 'light' | 'dark';
}

export const deviceConfig = {
    'iphone-14-pro': { width: 393, height: 852, radius: 48, notch: 'dynamic-island', bezel: 12, name: 'iPhone 14 Pro' },
    'iphone-se': { width: 375, height: 667, radius: 5, notch: 'classic', bezel: 14, name: 'iPhone SE' }, // radius 5 to imply older look? SE is rounded rect. 3rd gen is 8/iPhone 8 body.
    'pixel-7': { width: 412, height: 915, radius: 24, notch: 'punch-hole', bezel: 10, name: 'Pixel 7' },
    'ipad-pro': { width: 1024, height: 1366, radius: 18, notch: 'none', bezel: 16, name: 'iPad Pro' },
    'galaxy-s23': { width: 360, height: 780, radius: 24, notch: 'punch-hole', bezel: 8, name: 'Galaxy S23' },
};

export default function MobileFrame({
    children,
    componentId,
    device = 'iphone-14-pro',
    orientation = 'portrait',
    theme = 'light'
}: MobileFrameProps) {
    const config = deviceConfig[device];
    const isLandscape = orientation === 'landscape';
    // Swap dims if landscape
    const width = isLandscape ? config.height : config.width;
    const height = isLandscape ? config.width : config.height;

    // Fixed scaling for presentation
    const scale = device === 'ipad-pro' ? 0.5 : 0.85;

    return (
        <div
            className="relative transition-all duration-500 ease-in-out shadow-2xl bg-[#1A1A1A] border border-gray-800 ring-1 ring-white/10"
            style={{
                width: width * scale,
                height: height * scale,
                borderRadius: config.radius * scale,
                padding: config.bezel * scale,
            }}
        >
            {/* Side Buttons (Abstracted) */}
            <div className="absolute top-24 -left-[2px] w-[2px] h-8 bg-gray-700 rounded-l" />
            <div className="absolute top-40 -left-[2px] w-[2px] h-12 bg-gray-700 rounded-l" />
            <div className="absolute top-28 -right-[2px] w-[2px] h-16 bg-gray-700 rounded-r" />

            {/* Screen Content */}
            <div
                className={cn(
                    "w-full h-full overflow-hidden relative flex flex-col transition-colors duration-300 mask-image:radial-gradient(white, black)",
                    theme === 'dark' ? 'bg-[#000000] text-white' : 'bg-[#FFFFFF] text-black'
                )}
                style={{
                    borderRadius: (config.radius - config.bezel + 4) * scale
                }}
            >
                {/* Status Bar */}
                <div className={cn(
                    "flex items-center justify-between px-6 z-30 select-none transition-colors duration-300 pt-3 pb-1",
                    theme === 'dark' ? 'text-white' : 'text-black'
                )}>
                    <span className="text-[12px] font-semibold tracking-wide">9:41</span>
                    <div className="flex items-center gap-1.5 opacity-90">
                        <Signal className="w-3.5 h-3.5" strokeWidth={2.5} />
                        <Wifi className="w-3.5 h-3.5" strokeWidth={2.5} />
                        <Battery className="w-4 h-4" strokeWidth={2.5} />
                    </div>
                </div>

                {/* Notch / Dynamic Island */}
                {config.notch === 'dynamic-island' && (
                    <div className="absolute top-[11px] left-1/2 -translate-x-1/2 w-[90px] h-[24px] bg-black rounded-full z-40 flex items-center justify-center">
                        {/* Camera reflection hint */}
                        <div className="absolute right-3 w-2 h-2 rounded-full bg-[#1c1c1e]" />
                    </div>
                )}
                {config.notch === 'punch-hole' && (
                    <div className="absolute top-3 left-1/2 -translate-x-1/2 w-3 h-3 bg-black rounded-full z-40" />
                )}
                {config.notch === 'classic' && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-xl z-40" />
                )}

                {/* Main Content Area */}
                <div className="flex-1 overflow-y-auto overflow-x-hidden relative z-10 w-full scrollbar-none">
                    {children ? children : (componentId && <PreviewRegistry componentId={componentId} />)}
                </div>

                {/* Home Indicator */}
                {(device.startsWith('iphone') || device === 'ipad-pro') && (
                    <div className="h-5 flex items-center justify-center pb-1 flex-shrink-0 z-20 pointer-events-none">
                        <div className={cn("w-28 h-1 rounded-full opacity-40", theme === 'dark' ? 'bg-white' : 'bg-black')} />
                    </div>
                )}
            </div>
        </div>
    );
}
