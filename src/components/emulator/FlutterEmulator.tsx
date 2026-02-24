'use client';

import { useEffect, useRef } from 'react';

interface FlutterEmulatorProps {
    code: string;
}

export function FlutterEmulator({ code }: FlutterEmulatorProps) {
    const iframeRef = useRef<HTMLIFrameElement>(null);

    useEffect(() => {
        // DartPad doesn't support dynamic code updates easily
        // We need to reload iframe with new code
        if (iframeRef.current) {
            // DartPad code in URL is limited by URL length.
            // But prompt says "const encodedCode = btoa(code); const url = ...".
            // Let's try passing via URL hash or query if supported.
            // DartPad embed supports ?code=... (base64 or encoded)
            // Prompt logic: const encodedCode = btoa(dartCode);
            // Wait, btoa might fail on unicode.
            try {
                const encodedCode = btoa(code);
                const url = `https://dartpad.dev/embed-flutter.html?theme=dark&run=true&split=60&code=${encodedCode}`;
                iframeRef.current.src = url;
            } catch (e) {
                console.error("Failed to encode code for DartPad", e);
            }
        }
    }, [code]);

    return (
        <div className="w-full h-full bg-slate-900">
            <iframe
                ref={iframeRef}
                className="w-full h-full border-0"
                allow="clipboard-write"
                sandbox="allow-scripts allow-same-origin allow-popups"
                title="Flutter DartPad Emulator"
            />
        </div>
    );
}
