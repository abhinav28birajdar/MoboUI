"use client";

import React from 'react';
import { cn } from '@/lib/utils/cn';
import { Smartphone, RotateCcw, ZoomIn, ZoomOut } from 'lucide-react';
import PreviewRegistry from './PreviewRegistry';

interface MobileFrameProps {
    children?: React.ReactNode;
    componentId?: string;
    device?: 'iphone-15-pro' | 'pixel-8' | 'iphone-se';
    theme?: 'light' | 'dark';
    orientation?: 'portrait' | 'landscape';
}

export default function MobileFrame({
    children,
    componentId,
    theme = 'dark',
    orientation = 'portrait'
}: MobileFrameProps) {
    return (
        <div className="flex flex-col items-center gap-8 w-full max-w-md mx-auto">
            {/* Device Selection & Controls */}
            <div className="flex items-center gap-4 bg-muted/50 backdrop-blur-sm p-1.5 rounded-full border border-border shadow-sm">
                <div className="flex items-center px-3 gap-2">
                    <Smartphone className="w-4 h-4 text-primary" />
                    <span className="text-xs font-medium">iPhone 15 Pro</span>
                </div>
                <div className="w-px h-4 bg-border" />
                <button className="p-1.5 rounded-full hover:bg-muted text-muted-foreground transition-colors group">
                    <RotateCcw className="w-4 h-4 group-active:rotate-180 transition-transform duration-500" />
                </button>
                <button className="p-1.5 rounded-full hover:bg-muted text-muted-foreground transition-colors"><ZoomIn className="w-4 h-4" /></button>
                <button className="p-1.5 rounded-full hover:bg-muted text-muted-foreground transition-colors"><ZoomOut className="w-4 h-4" /></button>
            </div>

            {/* The Phone Frame */}
            <div className={cn(
                "relative transition-all duration-700 ease-in-out",
                orientation === 'portrait' ? 'w-[320px] h-[640px]' : 'w-[640px] h-[320px]'
            )}>
                {/* Bezel */}
                <div className="absolute inset-0 bg-[#121212] rounded-[3.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border-[12px] border-[#222] p-2.5">
                    {/* Notch / Dynamic Island */}
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 h-7 w-28 bg-black rounded-full z-40 flex items-center justify-end pr-4">
                        <div className="w-2 h-2 rounded-full bg-zinc-800" />
                    </div>

                    {/* Power Button */}
                    <div className="absolute right-[-14px] top-32 w-1 h-16 bg-zinc-700 rounded-r-md" />
                    {/* Volume Buttons */}
                    <div className="absolute left-[-14px] top-24 w-1 h-8 bg-zinc-700 rounded-l-md" />
                    <div className="absolute left-[-14px] top-36 w-1 h-12 bg-zinc-700 rounded-l-md" />
                    <div className="absolute left-[-14px] top-52 w-1 h-12 bg-zinc-700 rounded-l-md" />

                    {/* Content Area */}
                    <div className={cn(
                        "w-full h-full rounded-[2.8rem] overflow-hidden relative transition-colors duration-500",
                        theme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-[#fff]'
                    )}>
                        {/* Status Bar */}
                        <div className={cn(
                            "h-12 flex items-center justify-between px-8 relative z-30 pt-2",
                            theme === 'dark' ? 'text-white' : 'text-black'
                        )}>
                            <span className="text-[12px] font-bold">9:41</span>
                            <div className="flex items-center gap-1.5 opacity-80">
                                <div className="flex gap-0.5">
                                    {[1, 2, 3, 4].map(i => <div key={i} className={cn("w-0.5 h-2 bg-current rounded-full", i > 3 && "opacity-30")} />)}
                                </div>
                                <span className="text-[10px] font-bold uppercase">5G</span>
                                <div className="w-5 h-2.5 rounded-[2px] border border-current p-[1px] relative">
                                    <div className="h-full w-full bg-current rounded-[1px]" />
                                    <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-0.5 h-1 bg-current rounded-r-sm" />
                                </div>
                            </div>
                        </div>

                        {/* Safe Area View simulation */}
                        <div className="h-full flex flex-col pt-4">
                            <div className="flex-1 overflow-auto scrollbar-hide px-6 py-4 flex items-center justify-center">
                                {children || <PreviewRegistry componentId={componentId} />}
                            </div>
                            {/* Home Indicator */}
                            <div className="h-8 flex items-center justify-center pb-2">
                                <div className={cn("h-1.5 w-32 rounded-full", theme === 'dark' ? 'bg-white/20' : 'bg-black/10')} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
