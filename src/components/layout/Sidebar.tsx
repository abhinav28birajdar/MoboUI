'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils/cn';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'; // Assuming shadcn input
import { Search } from 'lucide-react';

const categories = [
    { name: 'Foundation', count: 4, slug: 'foundation' },
    { name: 'Navigation', count: 2, slug: 'navigation' },
    { name: 'Data Display', count: 3, slug: 'data-display' }, // Stats, Progress Ring
    { name: 'Cards', count: 2, slug: 'cards' }, // Glass
    { name: 'Inputs', count: 3, slug: 'inputs' }, // OTP, Search, Segmented
    { name: 'Buttons', count: 2, slug: 'buttons' }, // Primary, Social
    { name: 'Feedback', count: 1, slug: 'feedback' }, // Shimmer
    { name: 'Social', count: 1, slug: 'social' }, // Story Ring
    { name: 'Lists', count: 1, slug: 'lists' }, // Product Grid
    { name: 'Controls', count: 1, slug: 'controls' }, // Theme Switch
    { name: 'Animations', count: 1, slug: 'animations' }, // Lottie
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="w-full">
            <div className="mb-6">
                <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search components..." className="pl-8" />
                </div>
            </div>

            <div className="space-y-1">
                <h3 className="mb-2 px-4 text-sm font-semibold tracking-tight">
                    Categories
                </h3>
                {categories.map((category) => (
                    <Link
                        key={category.slug}
                        href={`/components?category=${category.slug}`}
                    >
                        <Button
                            variant="ghost"
                            className={cn(
                                "w-full justify-start",
                                pathname === '/components' && "bg-secondary/50" // Highlighting logic needs refinement based on query or segment
                            )}
                        >
                            {category.name}
                            <span className="ml-auto text-xs text-muted-foreground">
                                {category.count}
                            </span>
                        </Button>
                    </Link>
                ))}
            </div>
        </div>
    );
}
