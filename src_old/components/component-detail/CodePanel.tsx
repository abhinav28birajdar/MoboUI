'use client';

import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { Component } from '@/lib/types/component';

interface CodePanelProps {
    component: Component;
    language?: 'typescript' | 'dart';
}

export default function CodePanel({ component, language = 'typescript' }: CodePanelProps) {
    const [copied, setCopied] = useState(false);

    const code = language === 'typescript' ? component.code.typescript : component.code.dart;

    const handleCopy = async () => {
        if (!code) return;
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (!code) {
        return (
            <div className="p-6 bg-background border border-border rounded-lg text-muted-foreground">
                No {language} code available for this component.
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                    {language === 'typescript' ? 'React Native / Expo' : 'Flutter / Dart'} Code
                </h3>
                <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold uppercase tracking-widest rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
                >
                    {copied ? (
                        <>
                            <Check className="w-3 h-3" />
                            Copied!
                        </>
                    ) : (
                        <>
                            <Copy className="w-3 h-3" />
                            Copy
                        </>
                    )}
                </button>
            </div>
            <pre className="p-6 bg-background border border-border rounded-lg overflow-x-auto">
                <code className="text-sm text-foreground font-mono whitespace-pre-wrap">
                    {code}
                </code>
            </pre>
        </div>
    );
}
