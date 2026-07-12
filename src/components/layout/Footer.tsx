"use client";

import { motion } from "framer-motion";
import { Github, Twitter, Youtube, ArrowRight, Instagram } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-hot-toast";

const FOOTER_LINKS = [
    {
        title: "Product",
        links: [
            { label: "Components", href: "/components" },
            { label: "Playground", href: "/playground" },
            { label: "Upload", href: "/admin/upload" },
            { label: "Docs", href: "/docs" },
        ],
    },
    {
        title: "Company",
        links: [
            { label: "About", href: "/about" },
            { label: "Submit", href: "/submit" },
            { label: "Pricing", href: "/pricing" },
            { label: "Status", href: "/status" },
        ],
    },
    {
        title: "Support",
        links: [
            { label: "GitHub", href: "https://github.com" },
            { label: "Discord", href: "#" },
            { label: "FAQ", href: "/faq" },
            { label: "License", href: "/license" },
        ],
    },
];

export function Footer() {
    const [email, setEmail] = useState("");

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.includes("@")) {
            toast.error("Please enter a valid email address");
            return;
        }
        toast.success("Welcome to the community!");
        setEmail("");
    };

    return (
        <footer className="relative bg-bg-base border-t border-border-subtle pt-24 pb-12 overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
                    {/* Brand & Newsletter */}
                    <div className="lg:col-span-5 space-y-12">
                        <div className="space-y-6">
                            <Link href="/" className="flex flex-col group">
                                <span className="font-display font-black text-3xl tracking-tighter uppercase text-text-primary leading-none ">
                                    MOBOUI<span className="text-accent">.</span>
                                </span>
                                <span className="text-[10px] text-text-muted font-black tracking-[0.2em] uppercase">
                                    Premium Mobile Kit
                                </span>
                             </Link>
                            <p className="text-text-secondary text-base leading-relaxed max-w-sm font-medium">
                                Designing the future of mobile development. Production-ready components for the modern web.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-text-muted ">
                                News from the lab
                            </h4>
                            <form onSubmit={handleSubscribe} className="relative group max-w-sm">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="your@email.com"
                                    className="w-full h-14 bg-bg-surface border border-border-subtle rounded-[8px] px-6 py-2 text-sm text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent-glow transition-all"
                                />
                                <button
                                    type="submit"
                                    className="absolute right-1.5 top-1.5 h-11 px-6 bg-accent text-white font-black text-[10px] uppercase tracking-widest rounded-[6px] flex items-center justify-center gap-2 hover:scale-105 transition-all shadow-[0_0_24px_rgba(192,38,211,0.2)]"
                                >
                                    JOIN <ArrowRight size={14} />
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Links Grid */}
                    <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-12">
                        {FOOTER_LINKS.map((group) => (
                            <div key={group.title} className="space-y-8">
                                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-text-muted ">
                                    {group.title}
                                </h4>
                                <ul className="space-y-4">
                                    {group.links.map((link) => (
                                        <li key={link.label}>
                                            <Link href={link.href}>
                                                <span className="text-sm text-text-secondary hover:text-accent transition-all cursor-pointer block font-bold">
                                                    {link.label}
                                                </span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="pt-12 border-t border-border-subtle flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
                        <p className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em]">
                            © {new Date().getFullYear()} MOBOUI LABS.
                        </p>
                        <div className="flex gap-6">
                            {[Twitter, Github, Youtube, Instagram].map((Icon, i) => (
                                <Link key={i} href="#" className="text-text-muted hover:text-accent transition-colors">
                                    <Icon size={18} />
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-8 text-[10px] font-black text-text-muted uppercase tracking-[0.2em]">
                        <Link href="/privacy" className="hover:text-text-primary transition-colors">
                            Privacy
                        </Link>
                        <Link href="/terms" className="hover:text-text-primary transition-colors">
                            Terms
                        </Link>
                        <Link href="https://instagram.com/abhinav28birajdar" target="_blank" className="text-accent hover:scale-105 transition-all ">
                            @abhinav28birajdar
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
