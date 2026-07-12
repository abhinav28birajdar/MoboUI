"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search, Layers, Layout, BookOpen } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { ComponentCard } from "@/components/ComponentCard";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";
import { docsData } from "@/lib/data/docs";
import { useFrontendAppStore } from "@/lib/store/frontend-app-store";

type SearchResult = {
    id: string;
    title: string;
    description: string;
    category: string;
    type: "component" | "doc";
    url: string;
};

export default function SearchPage() {
    const searchParams = useSearchParams();
    const initialQuery = searchParams.get("q") || "";
    const components = useFrontendAppStore((state) => state.components);
    const [activeTab, setActiveTab] = useState<"all" | "components" | "docs">("all");
    const [query, setQuery] = useState(initialQuery);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => setLoading(false), 250);
        return () => clearTimeout(timer);
    }, [query]);

    const results = useMemo(() => {
        const normalized = query.trim().toLowerCase();
        if (!normalized) return [];

        const componentResults: SearchResult[] = components
            .filter(
                (item) =>
                    item.name.toLowerCase().includes(normalized) ||
                    item.category.toLowerCase().includes(normalized) ||
                    item.description.toLowerCase().includes(normalized) ||
                    item.tags.some((tag) => tag.toLowerCase().includes(normalized))
            )
            .map((item) => ({
                id: item.id,
                title: item.name,
                description: item.description,
                category: item.category,
                type: "component",
                url: `/components/${item.slug}`,
            }));

        const docResults: SearchResult[] = docsData.flatMap((section) =>
            (section.items || [])
                .filter(
                    (item) =>
                        item.title.toLowerCase().includes(normalized) ||
                        item.description.toLowerCase().includes(normalized) ||
                        section.title.toLowerCase().includes(normalized)
                )
                .map((item) => ({
                    id: `${section.slug}-${item.slug}`,
                    title: item.title,
                    description: item.description,
                    category: section.title,
                    type: "doc" as const,
                    url: `/docs/${section.slug}/${item.slug}`,
                }))
        );

        return [...componentResults, ...docResults];
    }, [components, query]);

    const componentResults = useMemo(
        () => results.filter((item) => item.type === "component"),
        [results]
    );

    const docsResults = useMemo(
        () => results.filter((item) => item.type === "doc"),
        [results]
    );

    const componentCards = useMemo(
        () =>
            componentResults
                .map((result) => components.find((component) => component.id === result.id))
                .filter((component): component is (typeof components)[number] => Boolean(component)),
        [componentResults, components]
    );

    return (
        <div className="container mx-auto px-4 py-32 min-h-screen">
            <div className="mb-16">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
                    <PageHeader
                        title={query ? `Results for "${query}"` : "Search MoboUI"}
                        description={
                            loading
                                ? "Searching components and docs..."
                                : `Found ${results.length} matches across components and documentation.`
                        }
                    />
                    <div className="relative w-full max-w-lg">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-text-muted" size={24} />
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="w-full h-16 pl-16 pr-6 bg-surface border border-border rounded-3xl text-text-primary text-xl focus:border-primary/50 outline-none transition-all placeholder:text-text-muted/50 font-medium"
                            placeholder="Search anything..."
                        />
                    </div>
                </div>

                {/* Search Tabs */}
                <div className="flex border-b border-border mb-12">
                    {[
                        { id: "all", label: "All Results", icon: <Layout size={16} /> },
                        { id: "components", label: `Components (${componentResults.length})`, icon: <Layers size={16} /> },
                        { id: "docs", label: `Documentation (${docsResults.length})`, icon: <BookOpen size={16} /> },
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as "all" | "components" | "docs")}
                            className={cn(
                                "pb-4 px-6 flex items-center gap-2 font-medium transition-all relative text-sm tracking-tight",
                                activeTab === tab.id ? "text-primary" : "text-text-muted hover:text-text-primary"
                            )}
                        >
                            {tab.icon}
                            {tab.label}
                            {activeTab === tab.id && <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-full transition-all" />}
                        </button>
                    ))}
                </div>

                {/* Results Sections */}
                {activeTab === "all" || activeTab === "components" ? (
                    <div className="mb-24">
                        <h3 className="text-[10px] font-medium text-text-muted uppercase tracking-[0.3em] mb-10 flex items-center gap-4">
                            COMPONENTS
                            <div className="h-px bg-border flex-grow" />
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {componentCards.length > 0 ? (
                                componentCards.map((component) => (
                                    <ComponentCard key={component.id} component={component} />
                                ))
                            ) : (
                                <p className="text-sm text-text-muted col-span-full">No component matches found.</p>
                            )}
                        </div>
                    </div>
                ) : null}

                {activeTab === "all" || activeTab === "docs" ? (
                    <div>
                        <h3 className="text-[10px] font-medium text-text-muted uppercase tracking-[0.3em] mb-10 flex items-center gap-4">
                            DOCUMENTATION
                            <div className="h-px bg-border flex-grow" />
                        </h3>
                        <div className="grid gap-4">
                            {docsResults.length > 0 ? docsResults.map((doc) => (
                                <Link
                                    key={doc.id}
                                    href={doc.url}
                                    className="p-8 rounded-[2.5rem] bg-surface border border-border hover:border-primary/30 transition-all group"
                                >
                                    <h4 className="text-xl font-medium text-text-primary mb-2 group-hover:text-primary transition-colors font-display tracking-tight">{doc.title}</h4>
                                    <p className="text-text-secondary text-sm font-medium">{doc.description}</p>
                                </Link>
                            )) : <p className="text-sm text-text-muted">No documentation matches found.</p>}
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    );
}
