import Link from 'next/link';
import { Github, Twitter, Instagram } from 'lucide-react';

const footerLinks = {
    product: [
        { name: 'Components', href: '/components' },
        { name: 'Playground', href: '/playground' },
        { name: 'Themes', href: '/themes' },
        { name: 'Templates', href: '/templates' },
    ],
    docs: [
        { name: 'Getting Started', href: '/docs/getting-started' },
        { name: 'React Native', href: '/docs/react-native' },
        { name: 'Expo', href: '/docs/expo' },
        { name: 'Flutter', href: '/docs/flutter' },
    ],
    community: [
        { name: 'GitHub', href: 'https://github.com' },
        { name: 'Discord', href: '#' },
        { name: 'Twitter', href: '#' },
        { name: 'Blog', href: '#' },
    ],
};

export function Footer() {
    return (
        <footer className="border-t bg-background">
            <div className="container mx-auto px-8 py-16">
                <div className="grid grid-cols-2 gap-12 md:grid-cols-4">
                    <div className="col-span-2 md:col-span-1">
                        <Link href="/" className="flex items-center gap-3 group mb-6">
                            <div className="flex flex-col">
                                <span className="font-display font-medium text-2xl tracking-tighter text-foreground leading-none brand-text">
                                    motion<span className="text-primary italic-none">.</span>dev
                                </span>
                                <span className="text-[9px] text-text-muted font-medium tracking-[0.2em] uppercase mt-1">
                                    Mobile UI Kit
                                </span>
                            </div>
                        </Link>
                        <p className="text-sm text-text-secondary leading-relaxed font-medium">
                            Production-ready mobile UI components for React Native, Expo and Flutter. Optimized for performance and high-end design.
                        </p>
                        <div className="mt-8 flex items-center gap-6">
                            <div className="flex gap-4">
                                <Link
                                    href="https://github.com/abhinav28birajdar"
                                    className="text-text-muted hover:text-primary transition-all hover:scale-110"
                                >
                                    <Github className="h-5 w-5" />
                                </Link>
                                <Link
                                    href="https://x.com/abhinav28birajdar"
                                    className="text-text-muted hover:text-primary transition-all hover:scale-110"
                                >
                                    <Twitter className="h-5 w-5" />
                                </Link>
                                <Link
                                    href="https://instagram.com/abhinav28birajdar"
                                    className="text-text-muted hover:text-primary transition-all hover:scale-110"
                                >
                                    <Instagram className="h-5 w-5" />
                                </Link>
                            </div>
                            <div className="h-4 w-px bg-border" />
                            <span className="text-[10px] font-medium text-text-muted tracking-widest uppercase opacity-50">
                                @abhi28birajdar
                            </span>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-xs font-medium uppercase tracking-[0.2em] text-text-muted mb-6">Product</h4>
                        <ul className="space-y-4">
                            {footerLinks.product.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-text-secondary hover:text-text-primary font-medium transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-xs font-medium uppercase tracking-[0.2em] text-text-muted mb-6">Documentation</h4>
                        <ul className="space-y-4">
                            {footerLinks.docs.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-text-secondary hover:text-text-primary font-medium transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-xs font-medium uppercase tracking-[0.2em] text-text-muted mb-6">Community</h4>
                        <ul className="space-y-4">
                            {footerLinks.community.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-text-secondary hover:text-text-primary font-medium transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="mt-20 border-t border-border/5 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-xs text-text-muted font-medium">
                        © {new Date().getFullYear()} motion.dev. All rights reserved.
                    </p>
                    <div className="flex gap-8">
                        <Link href="/privacy" className="text-xs text-text-muted hover:text-text-primary font-medium transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="text-xs text-text-muted hover:text-text-primary font-medium transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
