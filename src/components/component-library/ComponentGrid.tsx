'use client';

import { ComponentCard, ComponentCardProps } from './ComponentCard';
import { Button } from '@/components/ui/button';
import { X, SearchX } from 'lucide-react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useCallback } from 'react';

interface ComponentGridProps {
    components: ComponentCardProps[];
}

export function ComponentGrid({ components }: ComponentGridProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString());
            params.delete(name); // Remove all values for this key to start fresh or remove specific value logic
            // Actually simpler: remove the specific key-value pair
            // But URLSearchParams doesn't support removing specific value easily without iteration
            // For simplicity, let's just clear the key if it's single value, or filter it out

            const values = params.getAll(name);
            params.delete(name);
            values.filter(v => v !== value).forEach(v => params.append(name, v));

            return params.toString();
        },
        [searchParams]
    );

    const handleClearFilters = () => {
        router.replace(pathname);
    };

    const removeFilter = (key: string, value: string) => {
        const newQuery = createQueryString(key, value);
        router.push(pathname + '?' + newQuery);
    };

    if (components.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-24 px-4 text-center bg-secondary/10 rounded-[32px] border border-dashed border-border/50 animate-in fade-in zoom-in duration-500">
                <div className="w-20 h-20 rounded-full bg-muted/20 flex items-center justify-center mb-6 animate-bounce-slow">
                    <SearchX className="w-10 h-10 text-muted-foreground/50" />
                </div>
                <h3 className="font-heading font-bold text-2xl mb-3 text-foreground">No components found</h3>
                <p className="text-muted-foreground max-w-md mb-8 leading-relaxed text-lg">
                    We couldn't find any components matching your current filters. Try adjusting them or search for something else.
                </p>
                <Button onClick={handleClearFilters} variant="outline" size="lg" className="border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/60 transition-all font-semibold rounded-xl px-8">
                    Clear All Filters
                </Button>
            </div>
        );
    }

    const activeFilters = Array.from(searchParams.entries());

    return (
        <div className="w-full">
            {/* Active Filters Display */}
            {activeFilters.length > 0 && (
                <div className="mb-8 flex flex-wrap items-center gap-3 animate-in slide-in-from-top-2 duration-300">
                    <span className="text-sm font-medium text-muted-foreground mr-2">Using filters:</span>
                    {activeFilters.map(([key, value]) => (
                        <div key={`${key}-${value}`} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold border border-primary/20 hover:bg-primary/20 transition-colors group">
                            <span className="capitalize text-primary/80 group-hover:text-primary">{key}:</span>
                            <span className="text-foreground/80 group-hover:text-foreground">{value}</span>
                            <button
                                onClick={() => removeFilter(key, value)}
                                className="ml-1 hover:bg-primary/30 rounded-full p-0.5 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
                                aria-label={`Remove filter ${key}: ${value}`}
                            >
                                <X className="w-3 h-3" />
                            </button>
                        </div>
                    ))}
                    <Button variant="ghost" size="sm" onClick={handleClearFilters} className="text-xs font-semibold text-muted-foreground hover:text-destructive h-7 px-2 hover:bg-destructive/10 rounded-full transition-colors ml-auto md:ml-0">
                        Clear All
                    </Button>
                </div>
            )}

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {components.map((component, index) => (
                    <div key={component.id} className="animate-in fade-in slide-in-from-bottom-4 fill-mode-backwards" style={{ animationDelay: `${index * 50}ms` }}>
                        <ComponentCard {...component} />
                    </div>
                ))}
            </div>

            {/* Load More Skeleton / Pagination placeholder could go here */}
        </div>
    );
}
