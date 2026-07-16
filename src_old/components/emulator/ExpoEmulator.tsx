'use client';

import { useEffect, useRef, useState } from 'react';

interface ExpoEmulatorProps {
    code: string;
    platform: 'ios' | 'android';
}

export function ExpoEmulator({ code, platform }: ExpoEmulatorProps) {
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Reset loading when code or platform changes
        // Actually, Snack iframe doesn't reload ref on prop change easily, 
        // but the URL change triggers it content reload.
        // However, the postMessage is the main content driver.
        // Or URL logic.
        // The prompt says: "Wait for iframe to load... iframe.addEventListener('load'...)"

        // Also prompt note: "snackUrl = ...?platform=..."
        // If we change platform, URL changes, iframe reloads.

        setIsLoading(true);
    }, [platform]);

    useEffect(() => {
        const iframe = iframeRef.current;
        if (!iframe) return;

        const handleLoad = () => {
            setIsLoading(false);
            // Send code to Snack
            // Note: Snack might need time to initialize its listener
            setTimeout(() => {
                iframe.contentWindow?.postMessage({
                    type: 'updateCode',
                    code: code,
                    files: {
                        'App.js': code
                    }
                }, '*');
            }, 1000);
        };

        iframe.addEventListener('load', handleLoad);
        return () => iframe.removeEventListener('load', handleLoad);
    }, [code, platform]);

    // Also updating code when it changes without full reload if possible?
    // Snack allows postMessage updates.
    useEffect(() => {
        if (!iframeRef.current) return;
        if (isLoading) return; // Wait for load

        // Send update
        iframeRef.current.contentWindow?.postMessage({
            type: 'updateCode',
            code: code,
            files: {
                'App.js': code
            }
        }, '*');
    }, [code, isLoading]);

    const snackUrl = `https://snack.expo.dev/embedded?platform=${platform}&theme=dark&name=Mobile%20UI%20Kit%20Preview&preview=true&waitForData=true`;

    return (
        <div className="relative h-full w-full bg-slate-900">
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-900 z-10">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
                </div>
            )}

            <iframe
                ref={iframeRef}
                src={snackUrl}
                className="w-full h-full border-0"
                allow="geolocation; microphone; camera; clipboard-write"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
                title="Expo Snack Emulator"
            />
        </div>
    );
}
