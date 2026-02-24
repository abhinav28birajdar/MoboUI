"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";
import { Search, Menu, X, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/button";

export function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);


    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const routes = [
        { href: "/components", label: "Components" },
        { href: "/ai/generator", label: "AI Generator" },
        { href: "/ai/converter", label: "AI Converter" },
        { href: "/showcase", label: "Showcase" },
        { href: "/docs", label: "Docs" },
    ];



    return (
        <header
            className={cn(
                "fixed top-0 z-50 w-full transition-all duration-300",
                scrolled
                    ? "h-20 bg-background/80 backdrop-blur-md border-b border-border shadow-sm"
                    : "h-24 bg-transparent"
            )}
        >
            <div className="container h-full flex items-center justify-between px-6 mx-auto">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="flex flex-col">
                        <span className="font-display font-black text-2xl tracking-tighter uppercase text-text-primary leading-none ">
                            MOBOUI<span className="text-primary">.</span>
                        </span>
                        <span className="text-[9px] text-text-muted font-black tracking-[0.2em] uppercase">
                            Premium Kit
                        </span>
                    </div>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden lg:flex items-center gap-8 flex-1 justify-center">
                    {/* Search Bar - Clean appearance */}
                    <div className="relative group w-48 xl:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted group-focus-within:text-primary transition-colors" />
                        <input
                            type="text"
                            placeholder="Find components..."
                            className="w-full bg-surface/50 border border-border rounded-xl py-2 pl-10 pr-4 text-xs text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary/50 transition-all font-mono"
                        />
                    </div>

                    <nav className="flex items-center gap-8">
                        {routes.map((route) => (
                            <Link
                                key={route.href}
                                href={route.href}
                                className={cn(
                                    "text-[11px] font-black uppercase tracking-[0.1em] transition-all py-1",
                                    pathname?.startsWith(route.href)
                                        ? "text-text-primary border-b-2 border-primary"
                                        : "text-text-muted hover:text-text-primary"
                                )}
                            >
                                {route.label}
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* Actions */}
                <div className="hidden lg:flex items-center gap-4">
                    <ThemeToggle />

                    <Button
                        asChild
                        className="h-11 px-6 bg-primary text-primary-foreground font-black rounded-xl hover:scale-105 transition-all shadow-glow-amber uppercase tracking-widest text-[10px] "
                    >
                        <Link href="/playground">Playground <Sparkles size={14} className="ml-2" /></Link>
                    </Button>
                </div>

                {/* Mobile Toggle */}
                <div className="lg:hidden flex items-center gap-4">
                    <ThemeToggle />
                    <button
                        className="p-2 text-text-primary"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="lg:hidden fixed inset-0 top-[80px] z-50 animate-in fade-in slide-in-from-right duration-300">
                    <div className="absolute inset-0 bg-background/98 backdrop-blur-xl p-8 flex flex-col gap-8">
                        <div className="flex flex-col gap-6">
                            {routes.map((route) => (
                                <Link
                                    key={route.href}
                                    href={route.href}
                                    className={cn(
                                        "text-4xl font-display font-black uppercase tracking-tighter  transition-all",
                                        pathname?.startsWith(route.href) ? "text-primary" : "text-text-muted hover:text-text-primary"
                                    )}
                                    onClick={() => setIsOpen(false)}
                                >
                                    {route.label}
                                </Link>
                            ))}
                        </div>

                        <div className="mt-auto flex flex-col gap-4">
                            <Button
                                asChild
                                className="w-full h-16 text-md bg-primary text-primary-foreground font-black rounded-2xl shadow-glow-amber uppercase  tracking-widest"
                            >
                                <Link href="/playground" onClick={() => setIsOpen(false)}>Open Playground</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
