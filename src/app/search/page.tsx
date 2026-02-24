"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search, Layers, Layout, BookOpen } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { ComponentCard } from "@/components/components/ComponentCard";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";

export default function SearchPage() {
    const searchParams = useSearchParams();
    const query = searchParams.get("q") || "";
    const [activeTab, setActiveTab] = useState<"all" | "components" | "docs">("all");

    return (
        <div className="container mx-auto px-4 py-32 min-h-screen">
            <div className="mb-16">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
                    <PageHeader
                        title={query ? `Results for "${query}"` : "Search motion.dev"}
                        description={`Found ${query ? "12" : "0"} matches across components and documentation.`}
                    />
                    <div className="relative w-full max-w-lg">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-text-muted" size={24} />
                        <input
                            type="text"
                            defaultValue={query}
                            className="w-full h-16 pl-16 pr-6 bg-surface border border-border rounded-3xl text-text-primary text-xl focus:border-primary/50 outline-none transition-all placeholder:text-text-muted/50 font-medium"
                            placeholder="Search anything..."
                        />
                    </div>
                </div>

                {/* Search Tabs */}
                <div className="flex border-b border-border mb-12">
                    {[
                        { id: "all", label: "All Results", icon: <Layout size={16} /> },
                        { id: "components", label: "Components (8)", icon: <Layers size={16} /> },
                        { id: "docs", label: "Documentation (4)", icon: <BookOpen size={16} /> },
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
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
                            {/* Search results would go here */}
                            <ComponentCard
                                slug="primary-button"
                                name="Primary Button"
                                category="Buttons"
                                copies="2.3k"
                                frameworks={["Flutter", "RN"]}
                            />
                            <ComponentCard
                                slug="glass-card"
                                name="Glass Card"
                                category="Cards"
                                copies="1.1k"
                                frameworks={["RN", "Expo"]}
                                isPremium
                            />
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
                            {[
                                { title: "Installation Guide", desc: "Setting up motion.dev in your Next.js project...", path: "/docs/installation" },
                                { title: "Customizing Buttons", desc: "Learn how to tweak the button styling using our amber design tokens...", path: "/docs/components/buttons" },
                            ].map((doc, i) => (
                                <Link
                                    key={i}
                                    href={doc.path}
                                    className="p-8 rounded-[2.5rem] bg-surface border border-border hover:border-primary/30 transition-all group"
                                >
                                    <h4 className="text-xl font-medium text-text-primary mb-2 group-hover:text-primary transition-colors font-display tracking-tight">{doc.title}</h4>
                                    <p className="text-text-secondary text-sm font-medium">{doc.desc}</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    );
}
