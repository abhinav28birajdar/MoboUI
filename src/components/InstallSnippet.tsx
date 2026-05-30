'use client';

import { Button } from '@/components/ui/button';
import { Copy, Check } from 'lucide-react';
import { useState } from 'react';
// import Prism from 'prismjs'; // Syntax highlighting - can be enabled when needed

interface InstallSnippetProps {
    packageName?: string;
}

export function InstallSnippet({ packageName = 'mobile-ui-kit' }: InstallSnippetProps) {
    const [copied, setCopied] = useState(false);
    const command = `npm install ${packageName}`;

    const copy = () => {
        navigator.clipboard.writeText(command);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="mt-6">
            <h3 className="text-sm font-medium mb-2">Installation</h3>
            <div className="flex items-center justify-between rounded-md border bg-muted px-4 py-3 font-mono text-sm">
                <span>{command}</span>
                <Button variant="ghost" size="icon" onClick={copy} className="h-4 w-4">
                    {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                </Button>
            </div>
        </div>
    );
}
