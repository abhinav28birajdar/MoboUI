"use client";

import React, { useState, useMemo } from "react";
import { Search, SlidersHorizontal, Grid, List as ListIcon, X, TrendingUp, Zap } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { ComponentCard } from "@/components/components/ComponentCard";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";

const CATEGORIES = ["All", "Buttons", "Inputs", "Navigation", "Cards", "Dialogs", "Media", "Utilities"];

import { useComponents } from "@/hooks/useComponents";

export default function ComponentsPage() {
    const { components: allComponents, loading, error } = useComponents();
    const [activeCategory, setActiveCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [sortBy, setSortBy] = useState("Newest");
    const [currentPage, setCurrentPage] = useState(1);
    const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
    const itemsPerPage = 8;

    // Get search recommendations
    const searchRecommendations = useMemo(() => {
        if (!searchQuery.trim()) return [];
        
        const query = searchQuery.toLowerCase();
        const matches = allComponents
            .filter(comp => 
                comp.name.toLowerCase().includes(query) || 
                comp.category.toLowerCase().includes(query) ||
                (comp.tags && comp.tags.some(tag => tag.toLowerCase().includes(query)))
            )
            .slice(0, 5)
            .map(comp => ({
                name: comp.name,
                category: comp.category,
                slug: comp.slug,
            }));

        return matches;
    }, [searchQuery, allComponents]);

    // Filter logic
    const filteredComponents = allComponents.filter(item => {
        const matchesCategory = activeCategory === "All" || item.category.toLowerCase() === activeCategory.toLowerCase();
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (item.tags && item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())));
        return matchesCategory && matchesSearch;
    });

    // Sort logic
    const sortedComponents = [...filteredComponents].sort((a, b) => {
        if (sortBy === "Alphabetical") return a.name.localeCompare(b.name);
        if (sortBy === "Popular") return (b.popularity || 0) - (a.popularity || 0);
        return 0;
    });

    // Pagination logic
    const totalPages = Math.ceil(sortedComponents.length / itemsPerPage);
    const paginatedComponents = sortedComponents.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleSearchSelect = (suggestion: any) => {
        setSearchQuery(suggestion.name);
        setShowSearchSuggestions(false);
        setCurrentPage(1);
    };

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
                    {/* Search with Recommendations */}
                    <div className="relative w-full lg:max-w-md group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary transition-colors" size={20} />
                        <input
                            type="text"
                            placeholder="Search components..."
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setCurrentPage(1);
                                setShowSearchSuggestions(true);
                            }}
                            onFocus={() => setShowSearchSuggestions(true)}
                            onBlur={() => setTimeout(() => setShowSearchSuggestions(false), 200)}
                            className="w-full h-14 pl-12 pr-10 bg-surface border border-border rounded-2xl text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary/50 transition-all font-medium"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => {
                                    setSearchQuery("");
                                    setShowSearchSuggestions(false);
                                    setCurrentPage(1);
                                }}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors"
                                title="Clear search"
                            >
                                <X size={18} />
                            </button>
                        )}

                        {/* Search Recommendations Dropdown */}
                        {showSearchSuggestions && searchQuery.trim() && searchRecommendations.length > 0 && (
                            <div className="absolute top-full left-0 right-0 mt-2 bg-surface border border-border rounded-2xl shadow-lg overflow-hidden z-10 animate-in fade-in slide-in-from-top-2 duration-200">
                                <div className="p-3 space-y-2">
                                    <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted">
                                        <div className="flex items-center gap-2">
                                            <TrendingUp size={14} />
                                            Recommendations
                                        </div>
                                    </div>
                                    {searchRecommendations.map((rec, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => handleSearchSelect(rec)}
                                            className="w-full flex items-center justify-between px-3 py-3 rounded-xl hover:bg-surface-elevated transition-all text-left group/item"
                                        >
                                            <div className="flex items-center gap-3 flex-1 min-w-0">
                                                <Zap size={14} className="text-primary flex-shrink-0" />
                                                <div className="min-w-0">
                                                    <p className="text-sm font-semibold text-text-primary truncate">{rec.name}</p>
                                                    <p className="text-xs text-text-muted">{rec.category}</p>
                                                </div>
                                            </div>
                                            <Search size={14} className="text-text-muted ml-2 flex-shrink-0 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                                        </button>
                                    ))}
                                </div>
                            </div>
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
                                className={cn("p-2 rounded-lg transition-all", viewMode === "grid" ? "bg-primary text-primary-foreground" : "text-text-muted hover:text-text-primary")}
                                title="Grid view"
                            >
                                <Grid size={20} />
                            </button>
                            <button
                                onClick={() => setViewMode("list")}
                                className={cn("p-2 rounded-lg transition-all", viewMode === "list" ? "bg-primary text-primary-foreground" : "text-text-muted hover:text-text-primary")}
                                title="List view"
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
                                "px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] transition-all border whitespace-nowrap",
                                activeCategory === cat
                                    ? "bg-primary text-primary-foreground border-primary"
                                    : "bg-surface text-text-muted border-border hover:border-primary/50 hover:text-text-primary"
                            )}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content Display */}
            {loading ? (
                <div className="flex flex-col items-center justify-center py-32 space-y-6">
                    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                    <p className="text-text-muted font-medium animate-pulse uppercase tracking-[0.2em] text-[10px]">Loading Components...</p>
                </div>
            ) : error ? (
                <div className="text-center py-20 bg-surface rounded-[3rem] border border-destructive/20 bg-destructive/5">
                    <p className="text-destructive font-bold mb-2">Failed to load components</p>
                    <p className="text-text-muted text-sm">{error}</p>
                </div>
            ) : paginatedComponents.length > 0 ? (
                <div className={cn(
                    "grid gap-8 transition-all duration-500",
                    viewMode === "grid"
                        ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                        : "grid-cols-1"
                )}>
                    {paginatedComponents.map((item) => (
                        <div key={item.slug} className={cn(viewMode === "list" && "flex flex-col lg:flex-row")}>
                            <ComponentCard component={item} />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-surface rounded-[3rem] border border-dashed border-border">
                    <p className="text-text-muted font-medium">No components found matching your criteria.</p>
                </div>
            )}

            {/* Pagination / Sequence - Removed numbered pagination */}
        </div>
    );
}

