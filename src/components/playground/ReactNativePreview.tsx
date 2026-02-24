"use client";

import { useState, useEffect, useRef } from "react";
import { LoadingSpinner } from "./LoadingSpinner";

interface ReactNativePreviewProps {
    code: string;
    isVisible: boolean;
}

export function ReactNativePreview({ code, isVisible }: ReactNativePreviewProps) {
    const [loading, setLoading] = useState(true);
    const iframeRef = useRef<HTMLIFrameElement>(null);

    // Initial setup
    useEffect(() => {
        if (!isVisible) return;
        setLoading(true);
    }, [isVisible]);

    // Send code updates via postMessage
    useEffect(() => {
        if (!isVisible || !iframeRef.current) return;

        const sendCode = () => {
            // Safety check for ref inside timeout
            if (!iframeRef.current) return;

            const message = {
                type: 'load',
                payload: {
                    files: {
                        'App.js': {
                            type: 'CODE',
                            contents: code
                        },
                        'assets/': {
                            type: 'ASSET',
                            contents: {}
                        }
                    },
                    name: 'Live Playground',
                    description: 'Created with MoboUI',
                    dependencies: {
                        'expo-status-bar': '*'
                    }
                }
            };

            iframeRef.current.contentWindow?.postMessage(message, '*');
            setLoading(false);
        };

        // Small delay to ensure iframe is ready or debounce
        const timer = setTimeout(sendCode, 500);

        return () => clearTimeout(timer);
    }, [code, isVisible]);

    if (!isVisible) return null;

    return (
        <div className="relative w-[340px] h-[680px] rounded-[3rem] border-[12px] border-[#1a1a1a] bg-black overflow-hidden shadow-2xl transition-all duration-500 hover:scale-[1.02]">
            {/* Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-8 bg-[#1a1a1a] rounded-b-3xl z-20 flex items-center justify-center">
                <div className="w-12 h-1 bg-white/10 rounded-full" />
            </div>

            {loading && (
                <div className="absolute inset-0 z-10 bg-[#0a0a0a] flex flex-col items-center justify-center gap-4 pointer-events-none">
                    <LoadingSpinner />
                    <span className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] animate-pulse">
                        Connecting to Expo...
                    </span>
                </div>
            )}

            <iframe
                ref={iframeRef}
                src="https://snack.expo.dev/embedded?platform=web&preview=true&theme=dark&waitForData=true"
                className="w-full h-full border-none bg-[#0a0a0a]"
                onLoad={() => {
                    // Trigger initial code send when loaded
                    // The useEffect [code] will likely handle this, but we can double check logic
                }}
                allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
                sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
            />

            {/* Home Indicator */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-white/20 rounded-full z-20" />
        </div>
    );
}
