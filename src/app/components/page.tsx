"use client";

import React, { useState } from "react";
import { Search, SlidersHorizontal, Grid, List as ListIcon, X } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { ComponentCard } from "@/components/components/ComponentCard";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";

const CATEGORIES = ["All", "Buttons", "Inputs", "Navigation", "Cards", "Dialogs", "Media", "Utilities"];

const MOCK_COMPONENTS = Array.from({ length: 12 }).map((_, i) => ({
    slug: `component-${i}`,
    name: i % 3 === 0 ? "Primary Button" : i % 3 === 1 ? "Glass Card" : "Animated Tab Bar",
    category: CATEGORIES[Math.floor(Math.random() * (CATEGORIES.length - 1)) + 1],
    copies: `${(Math.random() * 5).toFixed(1)}k`,
    frameworks: ["Flutter", "RN", "Expo"].slice(0, Math.floor(Math.random() * 3) + 1),
    isPremium: i % 5 === 0,
}));

export default function ComponentsPage() {
    const [activeCategory, setActiveCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [sortBy, setSortBy] = useState("Newest");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    // Filter logic
    const filteredComponents = MOCK_COMPONENTS.filter(item => {
        const matchesCategory = activeCategory === "All" || item.category === activeCategory;
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.category.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    // Sort logic
    const sortedComponents = [...filteredComponents].sort((a, b) => {
        if (sortBy === "Newest") return 0; // In a real app, use timestamps
        if (sortBy === "Alphabetical") return a.name.localeCompare(b.name);
        return 0;
    });

    // Pagination logic
    const totalPages = Math.ceil(sortedComponents.length / itemsPerPage);
    const paginatedComponents = sortedComponents.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="container mx-auto px-4 py-32 bg-background">
            <div className="mb-16">
                <PageHeader
                    badge="Catalog"
                    title="UI Components"
                    description="Browse our library of 30+ premium mobile components. Built for performance and ready for your apps."
                />
            </div>

            {/* Filters & Search Bar */}
            <div className="flex flex-col gap-6 mb-12">
                <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                    {/* Search */}
                    <div className="relative w-full lg:max-w-md group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary transition-colors" size={20} />
                        <input
                            type="text"
                            placeholder="Search components..."
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="w-full h-14 pl-12 pr-4 bg-surface border border-border rounded-2xl text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary/50 transition-all font-medium"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery("")}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary"
                            >
                                <X size={18} />
                            </button>
                        )}
                    </div>

                    {/* Controls */}
                    <div className="flex items-center gap-3 w-full lg:w-auto">
                        <div className="relative group lg:w-48 flex-1">
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="w-full h-14 pl-10 pr-4 bg-surface border border-border rounded-2xl text-sm font-medium text-text-primary focus:outline-none focus:border-primary/50 appearance-none transition-all cursor-pointer"
                            >
                                <option>Newest</option>
                                <option>Alphabetical</option>
                                <option>Popular</option>
                            </select>
                            <SlidersHorizontal className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" size={18} />
                        </div>

                        <div className="h-10 w-px bg-border hidden lg:block mx-2" />
                        <div className="flex bg-surface p-1 rounded-xl border border-border">
                            <button
                                onClick={() => setViewMode("grid")}
                                className={cn("p-2 rounded-lg transition-all", viewMode === "grid" ? "bg-primary text-primary-foreground shadow-glow-amber" : "text-text-muted hover:text-text-primary")}
                            >
                                <Grid size={20} />
                            </button>
                            <button
                                onClick={() => setViewMode("list")}
                                className={cn("p-2 rounded-lg transition-all", viewMode === "list" ? "bg-primary text-primary-foreground shadow-glow-amber" : "text-text-muted hover:text-text-primary")}
                            >
                                <ListIcon size={20} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Category Pills */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => {
                                setActiveCategory(cat);
                                setCurrentPage(1);
                            }}
                            className={cn(
                                "px-6 py-2.5 rounded-full text-[10px] font-medium uppercase tracking-[0.2em] transition-all border whitespace-nowrap",
                                activeCategory === cat
                                    ? "bg-primary text-primary-foreground border-primary shadow-glow-amber"
                                    : "bg-surface text-text-muted border-border hover:border-primary/50 hover:text-text-primary"
                            )}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content Display */}
            {paginatedComponents.length > 0 ? (
                <div className={cn(
                    "grid gap-8 transition-all duration-500",
                    viewMode === "grid"
                        ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                        : "grid-cols-1"
                )}>
                    {paginatedComponents.map((item) => (
                        <div key={item.slug} className={cn(viewMode === "list" && "flex flex-col lg:flex-row")}>
                            <ComponentCard {...item} />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-surface rounded-[3rem] border border-dashed border-border">
                    <p className="text-text-muted font-medium">No components found matching your criteria.</p>
                </div>
            )}

            {/* Pagination / Sequence */}
            {totalPages > 1 && (
                <div className="mt-20 flex items-center justify-center gap-4">
                    <Button
                        variant="outline"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(p => p - 1)}
                        className="h-12 w-12 rounded-xl border-border p-0"
                    >
                        <SlidersHorizontal className="rotate-90" size={18} />
                    </Button>

                    <div className="flex items-center gap-2">
                        {Array.from({ length: totalPages }).map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentPage(i + 1)}
                                className={cn(
                                    "h-12 w-12 rounded-xl font-medium transition-all border",
                                    currentPage === i + 1
                                        ? "bg-primary text-primary-foreground border-primary shadow-glow-amber"
                                        : "bg-surface text-text-muted border-border hover:border-text-muted"
                                )}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>

                    <Button
                        variant="outline"
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(p => p + 1)}
                        className="h-12 w-12 rounded-xl border-border p-0"
                    >
                        <SlidersHorizontal className="-rotate-90" size={18} />
                    </Button>
                </div>
            )}
        </div>
    );
}
