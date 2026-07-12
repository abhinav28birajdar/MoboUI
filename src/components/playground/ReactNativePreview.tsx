"use client";

import React, { useState, useEffect } from "react";
import { LoadingSpinner } from "./LoadingSpinner";
import { usePlaygroundStore } from "@/lib/store/playground-store";
import { useTheme } from "@/hooks/use-theme";

interface ReactNativePreviewProps {
    code: string;
    isVisible: boolean;
}

export function ReactNativePreview({ code, isVisible }: ReactNativePreviewProps) {
    const { device } = usePlaygroundStore();
    const { resolvedTheme } = useTheme();
    const theme = resolvedTheme || "dark";
    const [debouncedCode, setDebouncedCode] = useState(code);
    const [isLoading, setIsLoading] = useState(true);

    // Debounce code changes to avoid reloading iframe on every keystroke
    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => {
            setDebouncedCode(code);
            // Artificial small delay to show loading state
            setTimeout(() => setIsLoading(false), 500);
        }, 1000);
        
        return () => clearTimeout(timer);
    }, [code]);

    if (!isVisible) return null;

    // Determine platform based on selected device (basic mapping)
    const platform = device === 'android' ? 'android' : 'ios';

    // Construct Snack URL
    // We use dependencies to ensure required libraries are available in Snack
    const dependencies = encodeURIComponent("react-native-reanimated,react-native-gesture-handler,react-native-safe-area-context,lucide-react-native");
    const snackUrl = `https://snack.expo.dev/embedded?platform=${platform}&theme=${theme}&dependencies=${dependencies}&code=${encodeURIComponent(debouncedCode)}`;

    return (
        <div className="relative w-full h-full flex flex-col bg-[#0f0f14]">
            {isLoading && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#0f0f14]/80 backdrop-blur-sm">
                    <LoadingSpinner />
                </div>
            )}
            
            <iframe
                src={snackUrl}
                className="w-full h-full border-none"
                title="Expo Snack Preview"
                allow="geolocation; camera; microphone"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
                onLoad={() => setIsLoading(false)}
            />
        </div>
    );
}
