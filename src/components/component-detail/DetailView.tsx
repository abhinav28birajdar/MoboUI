'use client';

import { Component } from '@/lib/types/component';
import { DeviceType, deviceConfig } from '@/components/emulator/MobileFrame';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Smartphone, MonitorSmartphone, Moon, Sun, Copy, Check } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface DetailViewProps {
    component: Component;
}

export function DetailView({ component }: DetailViewProps) {
    const [device, setDevice] = useState<DeviceType>('iphone-14-pro');
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    const [codeRN, setCodeRN] = useState(component.code?.typescript || '');
    const [codeFlutter, setCodeFlutter] = useState(component.code?.dart || '');
    const [activeTab, setActiveTab] = useState<'react-native' | 'flutter'>('react-native');

    const [copied, setCopied] = useState(false);
    const handleCopy = (code: string) => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // DartPad Embed URL
    const dartPadUrl = `https://dartpad.dev/embed-flutter.html?theme=dark&run=true&split=0&code=${encodeURIComponent(codeFlutter)}`;
    // Expo Snack Embed URL
    const snackUrl = `https://snack.expo.dev/embedded?code=${encodeURIComponent(codeRN)}&preview=true&platform=ios&theme=dark`;

    return (
        <div className="flex h-[calc(100vh-64px)] flex-col lg:flex-row overflow-hidden bg-background">
            {/* Left Panel: Preview/Emulator */}
            <div className="lg:w-[50%] bg-[#050505] relative flex flex-col border-r border-border/50">
                {/* Toolbar */}
                <div className="h-16 border-b border-border/50 bg-background/80 backdrop-blur px-6 flex items-center justify-between shrink-0 z-20">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                            <span className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Live Emulator</span>
                        </div>
                        <div className="h-4 w-px bg-border" />
                        <span className="text-xs font-medium text-foreground">{deviceConfig[device]?.name || 'Device'}</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" onClick={() => setDevice('iphone-14-pro')} className={cn("h-9 w-9 rounded-xl hover:bg-secondary", device === 'iphone-14-pro' && "bg-secondary text-primary")}>
                            <Smartphone className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => setDevice('pixel-7')} className={cn("h-9 w-9 rounded-xl hover:bg-secondary", device === 'pixel-7' && "bg-secondary text-primary")}>
                            <MonitorSmartphone className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} className="h-9 w-9 rounded-xl hover:bg-secondary ml-2">
                            {theme === 'light' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                        </Button>
                    </div>
                </div>

                {/* Live Emulator Display */}
                <div className="flex-1 bg-black relative flex items-center justify-center p-4">
                    {activeTab === 'flutter' ? (
                        <iframe
                            src={dartPadUrl}
                            className="w-full h-full border-none rounded-2xl"
                            title="Flutter Preview"
                        />
                    ) : (
                        <div className="w-full h-full rounded-2xl overflow-hidden border border-white/5 shadow-2xl">
                            <iframe
                                src={snackUrl}
                                className="w-full h-full border-none"
                                title="React Native Preview"
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* Right Panel: Code Editor */}
            <div className="lg:w-[50%] flex flex-col bg-background h-full relative z-10">
                <Tabs defaultValue="react-native" className="flex flex-col h-full" onValueChange={(v) => setActiveTab(v as any)}>
                    <div className="px-6 py-3 border-b border-border flex items-center justify-between bg-surface/50">
                        <TabsList className="bg-transparent p-0 h-auto gap-8 w-auto">
                            <TabsTrigger value="react-native" className="bg-transparent data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-primary rounded-none px-0 py-3 text-[10px] uppercase font-black tracking-[0.2em] text-text-muted hover:text-foreground transition-colors">
                                React Native / Expo
                            </TabsTrigger>
                            <TabsTrigger value="flutter" className="bg-transparent data-[state=active]:bg-transparent data-[state=active]:text-sky-500 data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-sky-500 rounded-none px-0 py-3 text-[10px] uppercase font-black tracking-[0.2em] text-text-muted hover:text-foreground transition-colors">
                                Flutter / Dart
                            </TabsTrigger>
                        </TabsList>

                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                className="h-9 rounded-xl gap-2 font-bold uppercase text-[9px] tracking-widest border-border hover:bg-surface"
                                onClick={() => handleCopy(activeTab === 'react-native' ? codeRN : codeFlutter)}
                            >
                                {copied ? <Check className="w-3 h-3 text-primary" /> : <Copy className="w-3 h-3" />}
                                {copied ? 'Copied' : 'Copy Code'}
                            </Button>
                        </div>
                    </div>

                    <div className="flex-1 overflow-hidden relative group">
                        <TabsContent value="react-native" className="m-0 h-full p-0 flex flex-col">
                            <textarea
                                value={codeRN}
                                onChange={(e) => setCodeRN(e.target.value)}
                                className="flex-1 w-full bg-[#080808] text-indigo-300 font-mono text-sm p-8 outline-none resize-none scrollbar-thin scrollbar-thumb-white/5"
                                spellCheck={false}
                            />
                            <div className="absolute top-4 right-8 text-[8px] font-black uppercase text-white/10 group-hover:text-primary transition-colors">
                                Real-time Editing Active
                            </div>
                        </TabsContent>
                        <TabsContent value="flutter" className="m-0 h-full p-0 flex flex-col">
                            <textarea
                                value={codeFlutter}
                                onChange={(e) => setCodeFlutter(e.target.value)}
                                className="flex-1 w-full bg-[#080808] text-sky-300 font-mono text-sm p-8 outline-none resize-none scrollbar-thin scrollbar-thumb-white/5"
                                spellCheck={false}
                            />
                            <div className="absolute top-4 right-8 text-[8px] font-black uppercase text-white/10 group-hover:text-sky-500 transition-colors">
                                Real-time Editing Active
                            </div>
                        </TabsContent>
                    </div>

                    {/* Footer Action Bar */}
                    <div className="p-5 border-t border-border bg-surface/80 backdrop-blur-md flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="flex flex-col">
                                <span className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] mb-1">Editing Component</span>
                                <span className="text-sm font-bold text-foreground">{component.name}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="px-3 py-1.5 rounded-full bg-background border border-border text-[9px] font-bold text-text-muted uppercase tracking-widest">
                                {component.category}
                            </span>
                        </div>
                    </div>
                </Tabs>
            </div>
        </div>
    );
}
