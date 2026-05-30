"use client";

import React, { useMemo, useState } from "react";
import { FolderHeart, Plus, Share2, LayoutGrid, List, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFrontendAppStore } from "@/lib/store/frontend-app-store";
import { ComponentCard } from "@/components/components/ComponentCard";
import { cn } from "@/lib/utils/cn";

export default function FavoritesPage() {
    const favorites = useFrontendAppStore((state) => state.favorites);
    const components = useFrontendAppStore((state) => state.components);
    const toggleFavorite = useFrontendAppStore((state) => state.toggleFavorite);
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

    const favoriteComponents = useMemo(
        () => components.filter((component) => favorites.includes(component.slug)),
        [components, favorites]
    );

    return (
        <div className="container mx-auto py-16 px-6 relative">
            <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-primary/5 blur-[150px] -z-10 rounded-full pointer-events-none" />

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div>
                    <h1 className="text-4xl font-heading font-black tracking-tighter text-white uppercase mb-4">
                        Favorites
                    </h1>
                    <p className="text-neutral-400 text-lg">
                        Your saved components. Fully local and instantly updated.
                    </p>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 bg-black p-1 rounded-xl border border-white/10 hidden sm:flex">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setViewMode("grid")}
                            className={cn(
                                "h-10 w-10 rounded-lg transition-colors",
                                viewMode === "grid" ? "text-primary bg-primary/10" : "text-neutral-500 hover:text-white"
                            )}
                        >
                            <LayoutGrid className="w-5 h-5" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setViewMode("list")}
                            className={cn(
                                "h-10 w-10 rounded-lg transition-colors",
                                viewMode === "list" ? "text-primary bg-primary/10" : "text-neutral-500 hover:text-white"
                            )}
                        >
                            <List className="w-5 h-5" />
                        </Button>
                    </div>
                    <Button className="btn-primary" onClick={() => window.location.assign('/components')}>
                        <Plus className="w-5 h-5 mr-2" /> Browse Components
                    </Button>
                </div>
            </div>

            {favoriteComponents.length === 0 ? (
                <div className="card-neon border-dashed flex flex-col items-center justify-center min-h-[320px] gap-4 text-center">
                    <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mb-2">
                        <FolderHeart className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-white">No favorites yet</h3>
                    <p className="text-neutral-500 text-sm max-w-md">
                        Tap the bookmark icon on any component card to save it here.
                    </p>
                    <Button className="btn-primary" onClick={() => window.location.assign('/components')}>
                        Explore Library
                    </Button>
                </div>
            ) : (
                <div className={cn(
                    "grid gap-8",
                    viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
                )}>
                    {favoriteComponents.map((component) => (
                        <div key={component.slug} className="space-y-3">
                            <ComponentCard component={component} />
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    className="flex-1 border-white/10 text-neutral-300 hover:text-white"
                                    onClick={() => window.location.assign(`/components/${component.slug}`)}
                                >
                                    Open
                                </Button>
                                <Button
                                    variant="outline"
                                    className="border-white/10 text-neutral-300 hover:text-white"
                                    onClick={() => toggleFavorite(component.slug)}
                                >
                                    <Trash2 className="w-4 h-4 mr-2" /> Remove
                                </Button>
                                <Button
                                    variant="outline"
                                    className="border-white/10 text-neutral-300 hover:text-white"
                                    onClick={() => navigator.clipboard.writeText(`${window.location.origin}/components/${component.slug}`)}
                                >
                                    <Share2 className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
