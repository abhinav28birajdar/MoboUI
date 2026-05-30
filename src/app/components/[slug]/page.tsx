'use client';

import React from "react";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useComponent } from "@/hooks/useComponents";
import { DetailView } from "@/components/component-detail/DetailView";

export default function ComponentDetailPage() {
    const params = useParams<{ slug?: string | string[] }>();
    const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug || "";
    const { component, loading, error } = useComponent(slug);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-black space-y-6">
                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                <p className="text-text-muted font-black uppercase tracking-[0.3em] text-xs">Initializing Emulator...</p>
            </div>
        );
    }

    if (error || !component) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-black p-8 text-center">
                <div className="w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center mb-8 border border-destructive/20">
                    <ChevronLeft className="text-destructive" size={32} />
                </div>
                <h1 className="text-4xl font-black text-white mb-4 uppercase tracking-tighter">Component Not Found</h1>
                <p className="text-text-muted mb-12 max-w-md">The component you are looking for does not exist or has been removed from our library.</p>
                <Link href="/components">
                    <button className="px-10 py-4 bg-primary text-black font-black uppercase tracking-widest rounded-full hover:bg-white transition-all">
                        Return to Library
                    </button>
                </Link>
            </div>
        );
    }

    return (
        <div className="pt-20 bg-background min-h-screen">
            {/* Simple Header with Back button */}
            <div className="bg-background border-b border-border/50 px-6 py-4 flex items-center gap-6">
                <Link href="/components" className="h-10 w-10 flex items-center justify-center rounded-xl bg-surface border border-border text-text-muted hover:text-primary transition-all">
                    <ChevronLeft size={20} />
                </Link>
                <div className="flex flex-col">
                    <h1 className="text-lg font-bold text-white tracking-tight">{component.name}</h1>
                    <span className="text-[10px] font-black uppercase tracking-widest text-text-muted">{component.category}</span>
                </div>
            </div>

            {/* The DetailView handles the live emulator and code editor */}
            <DetailView component={component} />
        </div>
    );
}
