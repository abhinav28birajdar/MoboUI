'use client';

import { Component } from '@/lib/types/component';
import MobileFrame, { DeviceType } from '@/components/emulator/MobileFrame';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Smartphone, MonitorSmartphone, TabletSmartphone, RotateCw, Moon, Sun, Copy, Check, Play } from 'lucide-react';
import { CodeBlock } from '@/components/docs/CodeBlock';
import { cn } from '@/lib/utils/cn';
import Link from 'next/link';

interface DetailViewProps {
    component: Component;
}

export function DetailView({ component }: DetailViewProps) {
    const [device, setDevice] = useState<DeviceType>('iphone-14-pro');
    const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    const [copied, setCopied] = useState(false);
    const handleCopy = (code?: string) => {
        if (!code) return;
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex h-[calc(100vh-64px)] flex-col lg:flex-row overflow-hidden bg-background">
            {/* Left Panel: Preview */}
            <div className="lg:w-[60%] bg-secondary/30 relative flex flex-col border-r border-border/50">
                {/* Toolbar */}
                <div className="h-16 border-b border-border/50 bg-background/80 backdrop-blur px-6 flex items-center justify-between shrink-0 z-20">
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" onClick={() => setDevice('iphone-14-pro')} className={cn("rounded-lg hover:bg-secondary", device === 'iphone-14-pro' && "bg-secondary text-primary")}>
                            <Smartphone className="w-5 h-5" />
                            <span className="sr-only">iPhone 14 Pro</span>
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => setDevice('pixel-7')} className={cn("rounded-lg hover:bg-secondary", device === 'pixel-7' && "bg-secondary text-primary")}>
                            <MonitorSmartphone className="w-5 h-5" />
                            <span className="sr-only">Pixel 7</span>
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => setDevice('ipad-pro')} className={cn("rounded-lg hover:bg-secondary", device === 'ipad-pro' && "bg-secondary text-primary")}>
                            <TabletSmartphone className="w-5 h-5" />
                            <span className="sr-only">iPad Pro</span>
                        </Button>
                    </div>

                    <div className="flex items-center gap-2 pl-4 ml-4 border-l border-border/50">
                        <Button variant="ghost" size="icon" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} className="rounded-lg hover:bg-secondary">
                            {theme === 'light' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => setOrientation(orientation === 'portrait' ? 'landscape' : 'portrait')} className="rounded-lg hover:bg-secondary">
                            <RotateCw className="w-5 h-5" />
                        </Button>
                    </div>
                </div>

                {/* Canvas */}
                <div className="flex-1 overflow-auto flex items-center justify-center p-8 bg-grid-pattern [background-size:24px_24px] bg-fixed">
                    <MobileFrame
                        componentId={component.id}
                        device={device}
                        orientation={orientation}
                        theme={theme}
                    >
                        {/* 
                   Ideally, we render the actual component here. 
                   For now, MobileFrame will show PreviewRegistry if no children.
                   If we want to pass specific props or state, we'd do it here.
                */}
                    </MobileFrame>
                </div>
            </div>

            {/* Right Panel: Code */}
            <div className="lg:w-[40%] flex flex-col bg-background h-full relative z-10">
                <Tabs defaultValue="react-native" className="flex flex-col h-full">
                    <div className="px-6 py-3 border-b border-border flex items-center justify-between bg-secondary/5">
                        <TabsList className="bg-transparent p-0 h-auto gap-6 w-auto">
                            <TabsTrigger value="react-native" className="bg-transparent data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-primary rounded-none px-0 py-2.5 font-semibold text-muted-foreground hover:text-foreground transition-colors">
                                React Native
                            </TabsTrigger>
                            <TabsTrigger value="flutter" className="bg-transparent data-[state=active]:bg-transparent data-[state=active]:text-blue-500 data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-blue-500 rounded-none px-0 py-2.5 font-semibold text-muted-foreground hover:text-foreground transition-colors">
                                Flutter
                            </TabsTrigger>
                        </TabsList>

                        <div className="flex items-center gap-2">
                            <Button size="sm" variant="ghost" className="h-8 gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground">
                                Props
                            </Button>
                        </div>
                    </div>

                    <div className="flex-1 overflow-hidden relative">
                        <TabsContent value="react-native" className="m-0 h-full p-0 overflow-auto">
                            <div className="p-0 h-full">
                                <CodeBlock
                                    code={component.code?.typescript || '// No React Native code available'}
                                    language="typescript"
                                />
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    className="absolute top-4 right-4 h-8 gap-1.5 text-xs bg-background/80 backdrop-blur border border-border/50 hover:bg-background shadow-sm z-10"
                                    onClick={() => handleCopy(component.code?.typescript)}
                                >
                                    {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                                    {copied ? 'Copied' : 'Copy'}
                                </Button>
                            </div>
                        </TabsContent>
                        <TabsContent value="flutter" className="m-0 h-full p-0 overflow-auto">
                            <div className="p-0 h-full">
                                <CodeBlock
                                    code={component.code?.dart || '// No Flutter code available'}
                                    language="dart"
                                />
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    className="absolute top-4 right-4 h-8 gap-1.5 text-xs bg-background/80 backdrop-blur border border-border/50 hover:bg-background shadow-sm z-10"
                                    onClick={() => handleCopy(component.code?.dart)}
                                >
                                    {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                                    {copied ? 'Copied' : 'Copy'}
                                </Button>
                            </div>
                        </TabsContent>
                    </div>

                    {/* Footer Action Bar */}
                    <div className="p-4 border-t border-border bg-background flex items-center justify-between shadow-[0_-1px_10px_rgba(0,0,0,0.05)]">
                        <div className="flex items-center gap-3">
                            <span className="text-sm font-bold text-foreground">{component.name}</span>
                            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-secondary text-muted-foreground uppercase tracking-wide border border-border/50">
                                {component.category}
                            </span>
                        </div>
                        <Button asChild size="sm" className="bg-primary text-black hover:bg-primary/90 font-semibold shadow-lg hover:shadow-primary/20 transition-all">
                            <Link href={`/playground?template=${component.slug}`}>
                                <Play className="w-3.5 h-3.5 mr-2 fill-current" />
                                Open in Playground
                            </Link>
                        </Button>
                    </div>
                </Tabs>
            </div>
        </div>
    );
}
