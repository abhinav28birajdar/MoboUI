'use client';

import { Button } from '@/components/ui/button';
import { RefreshCcw, ZoomIn, ZoomOut } from 'lucide-react';

interface EmulatorToolbarProps {
    platform: 'ios' | 'android';
    setPlatform: (p: 'ios' | 'android') => void;
    scale: number;
    setScale: (s: number) => void;
}

export function EmulatorToolbar({ platform, setPlatform, scale, setScale }: EmulatorToolbarProps) {
    return (
        <div className="flex items-center justify-between border-b px-4 py-2 bg-muted/20">
            <div className="flex items-center space-x-2">
                <div className="flex items-center bg-background rounded-md border p-0.5">
                    <Button
                        variant={platform === 'ios' ? 'secondary' : 'ghost'}
                        size="sm"
                        className="h-7 px-2"
                        onClick={() => setPlatform('ios')}
                    >
                        iOS
                    </Button>
                    <Button
                        variant={platform === 'android' ? 'secondary' : 'ghost'}
                        size="sm"
                        className="h-7 px-2"
                        onClick={() => setPlatform('android')}
                    >
                        Android
                    </Button>
                </div>
            </div>

            <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setScale(Math.max(0.5, scale - 0.1))}>
                    <ZoomOut className="h-4 w-4" />
                </Button>
                <span className="text-xs w-12 text-center">{Math.round(scale * 100)}%</span>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setScale(Math.min(1.5, scale + 0.1))}>
                    <ZoomIn className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                    <RefreshCcw className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}
