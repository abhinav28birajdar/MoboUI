'use client';

import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export function MobileNav() {
    const [isOpen, setIsOpen] = useState(false);

    const routes = [
        { href: '/components', label: 'Components' },
        { href: '/playground', label: 'Playground' },
        { href: '/templates', label: 'Templates' },
        { href: '/docs', label: 'Documentation' },
    ];

    return (
        <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>

            {isOpen && (
                <div className="absolute top-14 left-0 w-full border-b bg-background p-4 shadow-lg z-50">
                    <nav className="grid gap-4">
                        {routes.map((route) => (
                            <Link
                                key={route.href}
                                href={route.href}
                                className="text-sm font-medium transition-colors hover:text-primary"
                                onClick={() => setIsOpen(false)}
                            >
                                {route.label}
                            </Link>
                        ))}
                    </nav>
                </div>
            )}
        </div>
    );
}
