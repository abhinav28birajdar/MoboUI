import React from 'react';
import Link from 'next/link';
import { Smartphone, Github, Twitter, Youtube, Mail } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="border-t border-border bg-background pt-20 pb-10">
            <div className="container px-4 mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    <div className="flex flex-col gap-6">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent text-white font-bold">
                                M
                            </div>
                            <span className="font-bold text-xl tracking-tight">
                                Mobo<span className="text-primary">UI</span>
                            </span>
                        </Link>
                        <p className="text-muted-foreground leading-relaxed">
                            Making mobile development seamless with beautiful, production-ready components for React Native and Flutter.
                        </p>
                        <div className="flex items-center gap-4">
                            <a href="#" className="p-2 rounded-full bg-surface hover:bg-primary/10 hover:text-primary transition-colors">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="#" className="p-2 rounded-full bg-surface hover:bg-primary/10 hover:text-primary transition-colors">
                                <Github className="w-5 h-5" />
                            </a>
                            <a href="#" className="p-2 rounded-full bg-surface hover:bg-primary/10 hover:text-primary transition-colors">
                                <Youtube className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6">Library</h4>
                        <ul className="flex flex-col gap-4 text-muted-foreground">
                            <li><Link href="/components" className="hover:text-primary transition-colors">Components</Link></li>
                            <li><Link href="/playground" className="hover:text-primary transition-colors">Playground</Link></li>
                            <li><Link href="/themes" className="hover:text-primary transition-colors">Themes</Link></li>
                            <li><Link href="/templates" className="hover:text-primary transition-colors">Templates</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6">Developers</h4>
                        <ul className="flex flex-col gap-4 text-muted-foreground">
                            <li><Link href="/docs" className="hover:text-primary transition-colors">Documentation</Link></li>
                            <li><Link href="/docs/getting-started" className="hover:text-primary transition-colors">Getting Started</Link></li>
                            <li><Link href="/docs/react-native" className="hover:text-primary transition-colors">React Native Guide</Link></li>
                            <li><Link href="/docs/flutter" className="hover:text-primary transition-colors">Flutter Guide</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6">Connect</h4>
                        <div className="flex flex-col gap-4 text-muted-foreground">
                            <p className="text-sm">Subscribe to our newsletter for new components and tips.</p>
                            <div className="flex gap-2">
                                <input
                                    type="email"
                                    placeholder="Email address"
                                    className="bg-surface border border-border rounded-lg px-4 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
                                />
                                <button className="bg-primary p-2 rounded-lg text-white font-bold hover:bg-primary/90 transition-colors">
                                    <Mail className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground text-center md:text-left">
                    <p>© 2026 MobileUIKit. All rights reserved.</p>
                    <div className="flex items-center gap-8 justify-center">
                        <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
