"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "../ThemeToggle";
import { Search, ChevronDown, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/button";

export function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [framework, setFramework] = useState("React Native");
    const [showFramework, setShowFramework] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const routes = [
        { href: "/components", label: "Components" },
        { href: "/ai/generator", label: "AI Generator" },
        { href: "/ai/converter", label: "AI Converter" },
        { href: "/templates", label: "Templates" },
        { href: "/docs", label: "Docs" },
    ];

    const frameworks = ["React Native", "Flutter", "Expo"];

    return (
        <header
            className={cn(
                "sticky top-0 z-50 w-full transition-all duration-500",
                scrolled
                    ? "h-20 bg-background/90 backdrop-blur-xl border-b border-border/5"
                    : "h-24 bg-transparent"
            )}
        >
            <div className="container h-full flex items-center justify-between px-8 mx-auto">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="flex flex-col">
                        <span className="font-display font-medium text-3xl tracking-tighter text-foreground leading-none brand-text">
                            motion<span className="text-primary italic-none">.</span>dev
                        </span>
                        <span className="text-[10px] text-text-muted font-medium tracking-[0.2em] uppercase mt-1">
                            Mobile UI Kit
                        </span>
                    </div>
                </Link>

                {/* Center Nav & Search & Framework */}
                <div className="hidden lg:flex items-center gap-10 flex-1 justify-center">
                    {/* Search Bar */}
                    <div className="relative group w-72">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 group-focus-within:text-primary transition-colors" />
                        <input
                            type="text"
                            placeholder="Universal search..."
                            className="w-full bg-surface/30 border border-border/10 rounded-xl py-2.5 pl-12 pr-4 text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-sm"
                        />
                    </div>

                    {/* Main Links */}
                    <nav className="flex items-center gap-8">
                        {routes.map((route) => (
                            <Link
                                key={route.href}
                                href={route.href}
                                className={cn(
                                    "text-sm font-medium tracking-tight transition-all py-1",
                                    pathname?.startsWith(route.href) && route.href !== "/"
                                        ? "text-primary"
                                        : "text-text-secondary hover:text-text-primary"
                                )}
                            >
                                {route.label}
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* Actions */}
                <div className="hidden lg:flex items-center gap-6">
                    {/* Framework Selector (Compact) */}
                    <div className="relative">
                        <button
                            onClick={() => setShowFramework(!showFramework)}
                            onBlur={() => setTimeout(() => setShowFramework(false), 200)}
                            className="flex items-center gap-2 bg-surface/30 border border-border/10 rounded-xl py-2 px-4 text-xs font-medium text-text-primary hover:border-primary/50 transition-all"
                        >
                            {framework}
                            <ChevronDown className="w-3.5 h-3.5 text-muted" />
                        </button>
                        {showFramework && (
                            <div className="absolute top-12 left-0 w-40 bg-surface border border-border rounded-xl shadow-2xl overflow-hidden z-50 p-1">
                                {frameworks.map(fw => (
                                    <button
                                        key={fw}
                                        onClick={() => { setFramework(fw); setShowFramework(false); }}
                                        className={cn(
                                            "w-full text-left px-4 py-2 text-xs font-medium rounded-lg transition-colors",
                                            framework === fw ? "bg-primary text-primary-foreground" : "text-text-muted hover:text-text-primary hover:bg-surface-elevated"
                                        )}
                                    >
                                        {fw}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <ThemeToggle />

                    <Button
                        asChild
                        className="h-12 px-8 bg-primary text-primary-foreground font-medium rounded-2xl hover:bg-primary/90 hover:scale-105 active:scale-95 transition-all shadow-glow-amber text-sm tracking-tight"
                    >
                        <Link href="/playground">Playground</Link>
                    </Button>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="lg:hidden p-2 text-foreground"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="lg:hidden fixed inset-0 top-[64px] z-50 animate-in fade-in slide-in-from-right duration-300">
                    <div className="absolute inset-0 bg-background p-8 flex flex-col gap-10">
                        {/* Mobile Search */}
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                            <input
                                type="text"
                                placeholder="Universal search..."
                                className="w-full bg-surface border border-border rounded-2xl py-4 pl-14 pr-4 text-base text-foreground placeholder:text-muted focus:outline-none focus:border-primary shadow-sm"
                            />
                        </div>

                        {/* Mobile Links */}
                        <div className="flex flex-col gap-8">
                            {routes.map((route) => (
                                <Link
                                    key={route.href}
                                    href={route.href}
                                    className={cn(
                                        "text-4xl font-display font-medium tracking-tighter transition-all",
                                        pathname?.startsWith(route.href) ? "text-primary" : "text-text-muted hover:text-text-primary"
                                    )}
                                    onClick={() => setIsOpen(false)}
                                >
                                    {route.label}
                                </Link>
                            ))}
                        </div>

                        <div className="mt-auto flex flex-col gap-4 pb-10">
                            <Button
                                asChild
                                className="w-full py-8 text-xl bg-primary text-primary-foreground font-medium rounded-2xl shadow-glow-amber h-auto"
                            >
                                <Link href="/playground" onClick={() => setIsOpen(false)}>Open Playground</Link>
                            </Button>

                            <div className="pt-6 flex items-center justify-between border-t border-border mt-4">
                                <span className="text-sm font-medium text-text-muted transition-colors">Theme Mode</span>
                                <ThemeToggle />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
