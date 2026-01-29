"use client";

import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Copy, Check, Download } from "lucide-react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import copy from 'copy-to-clipboard';
import { toast } from 'sonner';

export default function CodePanel({ code }: { code: { reactNative?: string, flutter?: string }, name: string }) {
    const [copied, setCopied] = useState(false);
    const [activeTab, setActiveTab] = useState(code.reactNative ? "react-native" : "flutter");

    const handleCopy = () => {
        const text = activeTab === "react-native" ? code.reactNative : code.flutter;
        if (text) {
            copy(text);
            setCopied(true);
            toast.success("Code copied to clipboard");
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className="rounded-2xl border border-border bg-black/40 backdrop-blur-sm overflow-hidden flex flex-col h-full min-h-[500px]">
            <Tabs defaultValue={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="flex flex-col h-full">
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/5">
                    <TabsList className="bg-black/20 h-9">
                        {code.reactNative && <TabsTrigger value="react-native" className="text-xs">React Native</TabsTrigger>}
                        {code.flutter && <TabsTrigger value="flutter" className="text-xs">Flutter</TabsTrigger>}
                    </TabsList>

                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            className="h-8 rounded-full bg-surface hover:bg-muted"
                            onClick={handleCopy}
                        >
                            {copied ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
                            <span className="ml-2 hidden sm:inline text-[10px] font-bold uppercase tracking-wider">Copy</span>
                        </Button>
                        <Button variant="outline" size="sm" className="h-8 w-8 rounded-full bg-surface p-0">
                            <Download className="w-3 h-3" />
                        </Button>
                    </div>
                </div>

                <div className="flex-1 overflow-auto bg-[#1e1e1e]">
                    <TabsContent value="react-native" className="mt-0 h-full">
                        <div className="p-6 text-sm">
                            <SyntaxHighlighter
                                language="typescript"
                                style={vscDarkPlus}
                                customStyle={{ background: 'transparent', padding: 0, margin: 0 }}
                                wrapLines={true}
                                showLineNumbers={true}
                            >
                                {code.reactNative || ''}
                            </SyntaxHighlighter>
                        </div>
                    </TabsContent>

                    <TabsContent value="flutter" className="mt-0 h-full">
                        <div className="p-6 text-sm">
                            <SyntaxHighlighter
                                language="dart"
                                style={vscDarkPlus}
                                customStyle={{ background: 'transparent', padding: 0, margin: 0 }}
                                wrapLines={true}
                                showLineNumbers={true}
                            >
                                {code.flutter || ''}
                            </SyntaxHighlighter>
                        </div>
                    </TabsContent>
                </div>
            </Tabs>
        </div>
    );
}
