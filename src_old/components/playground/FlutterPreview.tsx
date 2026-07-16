"use client";

import React, { useState, useEffect, useRef } from "react";
import { LoadingSpinner } from "./LoadingSpinner";
import { usePlaygroundStore } from "@/lib/store/playground-store";
import { useTheme } from "@/hooks/use-theme";

interface FlutterPreviewProps {
    code: string;
    isVisible: boolean;
}

export function FlutterPreview({ code, isVisible }: FlutterPreviewProps) {
    const { resolvedTheme } = useTheme();
    const theme = resolvedTheme || "dark";
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [iframeReady, setIframeReady] = useState(false);

    // Default Flutter template for Dartpad
    const baseCode = `import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      theme: ThemeData(${theme === 'dark' ? 'brightness: Brightness.dark,' : ''}
        colorSchemeSeed: Colors.purple,
      ),
      home: const Scaffold(
        body: Center(
          child: ExampleComponent(),
        ),
      ),
    );
  }
}

// User code below
${code}
`;

    // Listen for Dartpad ready event
    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            if (event.data?.type === 'ready') {
                setIframeReady(true);
                setIsLoading(false);
            }
        };

        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, []);

    // Send code to Dartpad when ready or code changes
    useEffect(() => {
        if (!iframeReady || !iframeRef.current || !isVisible) return;
        
        // Let's add a small delay to ensure it's fully ready to receive
        const timer = setTimeout(() => {
            try {
                iframeRef.current?.contentWindow?.postMessage({
                    sourceCode: {
                        "main.dart": baseCode
                    },
                    type: 'sourceCode'
                }, '*');
            } catch (err) {
                console.error("Failed to post message to Dartpad:", err);
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [baseCode, iframeReady, isVisible]);

    if (!isVisible) return null;

    // Use embed-flutter.html with split=false to hide Dartpad's own editor
    const dartpadUrl = `https://dartpad.dev/embed-flutter.html?theme=${theme}&split=false&run=true`;

    return (
        <div className="relative w-full h-full flex flex-col bg-[#0f0f14]">
            {isLoading && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#0f0f14]/80 backdrop-blur-sm">
                    <LoadingSpinner />
                </div>
            )}
            
            <iframe
                ref={iframeRef}
                src={dartpadUrl}
                className="w-full h-full border-none"
                title="DartPad Preview"
                allow="geolocation; camera; microphone"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
                onLoad={() => {
                    // Fallback in case ready message doesn't come through
                    setTimeout(() => {
                        setIsLoading(false);
                        setIframeReady(true);
                    }, 2000);
                }}
            />
        </div>
    );
}
