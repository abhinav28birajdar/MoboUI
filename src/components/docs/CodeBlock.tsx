'use client';

import { Button } from '@/components/ui/button';
import { Check, Copy } from 'lucide-react';
import { useState } from 'react';

export function CodeBlock({ code, language = 'bash' }: { code: string, language?: string }) {
    const [copied, setCopied] = useState(false);

    const copy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="relative mt-4 rounded-lg bg-slate-900 p-4">
            <Button
                size="icon"
                variant="ghost"
                className="absolute right-4 top-4 h-6 w-6 text-slate-400 hover:text-slate-100"
                onClick={copy}
            >
                {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
            </Button>
            <pre className="overflow-x-auto text-sm text-slate-50 font-mono">
                <code>{code}</code>
            </pre>
        </div>
    );
}
