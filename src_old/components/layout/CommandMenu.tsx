'use client';

import * as React from 'react';
import { Command } from 'cmdk';
import { Search, X, Layers, Smartphone, BookOpen, Layout, Rocket, Zap } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { componentsData } from '@/lib/data/components-metadata';
import { docsData } from '@/lib/data/docs';

export function CommandMenu() {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState('');
    const router = useRouter();

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };

        document.addEventListener('keydown', down);
        return () => document.removeEventListener('keydown', down);
    }, []);

    const runCommand = React.useCallback((command: () => unknown) => {
        setOpen(false);
        command();
    }, [router]);

    // Focus input on open
    useEffect(() => {
        if (open) {
            setSearch('');
        }
    }, [open]);

    if (!open) return (
        <button
            onClick={() => setOpen(true)}
            className="group flex items-center justify-between gap-3 px-3 py-1.5 h-10 w-64 bg-secondary/30 hover:bg-secondary/50 border border-border/50 rounded-xl transition-all hover:border-primary/50"
        >
            <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                <span className="text-[13px] text-muted-foreground font-medium">Search anything...</span>
            </div>
            <kbd className="hidden lg:flex items-center gap-1 text-[10px] font-black text-muted-foreground/40 border border-border/50 px-1.5 py-0.5 rounded-md bg-background/50">
                <span>⌘</span>
                <span>K</span>
            </kbd>
        </button>
    );

    const filteredDocs = docsData.flatMap(section =>
        (section.items || []).filter(item =>
            item.title.toLowerCase().includes(search.toLowerCase()) ||
            item.description.toLowerCase().includes(search.toLowerCase())
        ).map(item => ({ ...item, section: section.title, sectionSlug: section.slug }))
    );

    return (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4">
            {/* Backdrop */}
            <div className="fixed inset-0 bg-[#000]/60 backdrop-blur-md animate-in fade-in duration-300" onClick={() => setOpen(false)} />

            {/* Modal */}
            <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-[#0D0D0D] shadow-[0_0_50px_rgba(0,0,0,0.5)] animate-in fade-in zoom-in-95 duration-300">
                <Command className="flex flex-col w-full h-full overflow-hidden" label="Global Search">
                    <div className="flex items-center px-4 h-16 border-b border-white/5">
                        <Search className="mr-3 h-5 w-5 shrink-0 text-primary opacity-70" />
                        <Command.Input
                            value={search}
                            onValueChange={setSearch}
                            autoFocus
                            placeholder="Type a command or search components..."
                            className="flex h-full w-full rounded-md bg-transparent py-3 text-base text-gray-100 outline-none placeholder:text-gray-500 font-medium"
                        />
                        <button onClick={() => setOpen(false)} className="ml-2 p-1.5 hover:bg-white/5 rounded-lg transition-colors text-gray-500 hover:text-white">
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    <Command.List className="max-h-[450px] overflow-y-auto p-3 scrollbar-none space-y-2">
                        <Command.Empty className="py-12 text-center text-sm text-gray-500 flex flex-col items-center gap-3">
                            <div className="p-3 bg-white/5 rounded-full mb-2">
                                <Search className="w-6 h-6 opacity-30" />
                            </div>
                            <span>No results found for "<span className="text-gray-300">{search}</span>"</span>
                        </Command.Empty>

                        {!search && (
                            <>
                                <Command.Group heading="QUICK ACTIONS" className="px-2 py-3 text-[10px] font-black text-gray-500 tracking-[0.2em] mb-1">
                                    <Command.Item onSelect={() => runCommand(() => router.push('/components'))} className="flex cursor-pointer select-none items-center rounded-xl px-4 py-3 text-sm text-gray-300 hover:bg-white/5 hover:text-primary transition-all group my-1">
                                        <Layers className="mr-4 h-5 w-5 opacity-40 group-hover:opacity-100 transition-opacity" />
                                        <span className="flex-1 font-bold">Browse Library</span>
                                        <span className="text-[10px] font-black text-gray-600 group-hover:text-primary/40">G C</span>
                                    </Command.Item>
                                    <Command.Item onSelect={() => runCommand(() => router.push('/playground'))} className="flex cursor-pointer select-none items-center rounded-xl px-4 py-3 text-sm text-gray-300 hover:bg-white/5 hover:text-primary transition-all group my-1">
                                        <Smartphone className="mr-4 h-5 w-5 opacity-40 group-hover:opacity-100 transition-opacity" />
                                        <span className="flex-1 font-bold">Open Playground</span>
                                        <span className="text-[10px] font-black text-gray-600 group-hover:text-primary/40">G P</span>
                                    </Command.Item>
                                    <Command.Item onSelect={() => runCommand(() => router.push('/docs'))} className="flex cursor-pointer select-none items-center rounded-xl px-4 py-3 text-sm text-gray-300 hover:bg-white/5 hover:text-purple-500 transition-all group my-1">
                                        <BookOpen className="mr-4 h-5 w-5 opacity-40 group-hover:opacity-100 transition-opacity" />
                                        <span className="flex-1 font-bold">Documentation</span>
                                        <span className="text-[10px] font-black text-gray-600 group-hover:text-purple-500/40">G D</span>
                                    </Command.Item>
                                </Command.Group>

                                <div className="h-px bg-white/5 mx-2 my-2" />

                                <Command.Group heading="RECOMMENDED" className="px-2 py-3 text-[10px] font-black text-gray-500 tracking-[0.2em] mb-1">
                                    <Command.Item onSelect={() => runCommand(() => router.push('/docs/getting-started'))} className="flex cursor-pointer select-none items-center rounded-xl px-4 py-3 text-sm text-gray-300 hover:bg-white/5 transition-all group my-1">
                                        <Rocket className="mr-4 h-5 w-5 text-orange-500 opacity-60" />
                                        <span className="flex-1 font-bold">Getting Started Guide</span>
                                    </Command.Item>
                                    <Command.Item onSelect={() => runCommand(() => router.push('/components?category=buttons'))} className="flex cursor-pointer select-none items-center rounded-xl px-4 py-3 text-sm text-gray-300 hover:bg-white/5 transition-all group my-1">
                                        <Zap className="mr-4 h-5 w-5 text-yellow-500 opacity-60" />
                                        <span className="flex-1 font-bold">Premium Components</span>
                                    </Command.Item>
                                </Command.Group>
                            </>
                        )}

                        {search && (
                            <>
                                {componentsData.length > 0 && (
                                    <Command.Group heading="COMPONENTS" className="px-2 py-3 text-[10px] font-black text-gray-500 tracking-[0.2em] mb-1">
                                        {componentsData
                                            .filter(c =>
                                                c.name.toLowerCase().includes(search.toLowerCase()) ||
                                                c.category.toLowerCase().includes(search.toLowerCase()) ||
                                                c.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
                                            )
                                            .slice(0, 5)
                                            .map(c => (
                                                <Command.Item
                                                    key={c.id}
                                                    onSelect={() => runCommand(() => router.push(`/components/${c.slug}`))}
                                                    className="flex cursor-pointer select-none items-center rounded-xl px-4 py-3 text-sm text-gray-300 hover:bg-primary/10 hover:text-primary transition-all group my-1 border border-transparent hover:border-primary/20"
                                                >
                                                    <div className="mr-4 h-10 w-10 flex items-center justify-center rounded-lg bg-white/5 group-hover:bg-primary/20 transition-colors">
                                                        <Layout className="h-5 w-5 opacity-40 group-hover:opacity-100" />
                                                    </div>
                                                    <div className="flex-1 flex flex-col gap-0.5">
                                                        <span className="font-bold">{c.name}</span>
                                                        <span className="text-[10px] text-gray-600 font-black uppercase tracking-widest">{c.category}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1.5">
                                                        <span className="text-[9px] font-black border border-white/10 px-1.5 py-0.5 rounded text-gray-600 group-hover:text-primary-foreground group-hover:bg-primary group-hover:border-primary transition-all">RN</span>
                                                        <span className="text-[9px] font-black border border-white/10 px-1.5 py-0.5 rounded text-gray-600 group-hover:text-white group-hover:bg-blue-600 group-hover:border-blue-600 transition-all">FL</span>
                                                    </div>
                                                </Command.Item>
                                            ))}
                                    </Command.Group>
                                )}

                                {filteredDocs.length > 0 && (
                                    <Command.Group heading="DOCUMENTATION" className="px-2 py-3 text-[10px] font-black text-gray-500 tracking-[0.2em] mb-1">
                                        {filteredDocs.slice(0, 5).map(doc => (
                                            <Command.Item
                                                key={`${doc.sectionSlug}-${doc.slug}`}
                                                onSelect={() => runCommand(() => router.push(`/docs/${doc.sectionSlug}/${doc.slug}`))}
                                                className="flex cursor-pointer select-none items-center rounded-xl px-4 py-3 text-sm text-gray-300 hover:bg-purple-500/10 hover:text-purple-400 transition-all group my-1 border border-transparent hover:border-purple-500/20"
                                            >
                                                <div className="mr-4 h-10 w-10 flex items-center justify-center rounded-lg bg-white/5 group-hover:bg-purple-500/20 transition-colors">
                                                    <BookOpen className="h-5 w-5 opacity-40 group-hover:opacity-100" />
                                                </div>
                                                <div className="flex-1 flex flex-col gap-0.5">
                                                    <span className="font-bold">{doc.title}</span>
                                                    <span className="text-[10px] text-gray-600 font-black uppercase tracking-widest">{doc.section}</span>
                                                </div>
                                            </Command.Item>
                                        ))}
                                    </Command.Group>
                                )}
                            </>
                        )}
                    </Command.List>

                    <div className="h-10 bg-[#111] px-4 border-t border-white/5 flex items-center justify-between text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                        <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1.5"><kbd className="bg-white/5 px-1 rounded">↵</kbd> Select</span>
                            <span className="flex items-center gap-1.5"><kbd className="bg-white/5 px-1 rounded">↑↓</kbd> Navigate</span>
                        </div>
                        <div className="flex items-center gap-1">
                            Built by <span className="text-primary ">MobileUI Team</span>
                        </div>
                    </div>
                </Command>
            </div>
        </div>
    );
}
