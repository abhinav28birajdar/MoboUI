'use client';

import { useState } from 'react';
import Prism from 'prismjs';
import { Button } from '@/components/ui/button';
import { Copy, Check } from 'lucide-react';

export function CodeExample({ code, language = 'tsx' }: { code: string, language?: string }) {
    const [copied, setCopied] = useState(false);

    const highlight = (code: string) => {
        // In a real app we would use Prism or similar here
        return code;
    };

    return (
        <div className="relative rounded-lg border bg-slate-950 p-4 overflow-x-auto text-white font-mono text-sm">
            <div className="absolute top-4 right-4">
                <Button variant="ghost" size="icon" className="text-white hover:text-white/80" onClick={() => {
                    navigator.clipboard.writeText(code);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                }}>
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
            </div>
            <pre>
                <code>{code}</code>
            </pre>
        </div>
    );
}
