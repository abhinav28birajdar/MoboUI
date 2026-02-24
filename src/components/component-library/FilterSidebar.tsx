'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Heart } from 'lucide-react';
import { useCallback } from 'react';
import { categories as categoryData } from '@/lib/data/categories';

export function FilterSidebar() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    // Create a new URLSearchParams object to manipulate
    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString());
            if (params.has(name, value)) {
                params.delete(name, value);
            } else {
                params.append(name, value);
            }
            return params.toString();
        },
        [searchParams]
    );

    const isChecked = (name: string, value: string) => {
        return searchParams.getAll(name).includes(value);
    };

    const handleClearFilters = () => {
        router.push(pathname);
    };

    return (
        <aside className="w-full md:w-[280px] space-y-8 sticky top-24 self-start max-h-[calc(100vh-8rem)] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
            {/* Favorites Filter */}
            <div className="bg-secondary/10 p-4 rounded-2xl border border-primary/10">
                <div className="flex items-center justify-between">
                    <Label htmlFor="fav-toggle" className="font-bold text-sm cursor-pointer flex items-center gap-2">
                        <Heart size={16} className="text-red-500 fill-current" />
                        My Favorites
                    </Label>
                    <Switch
                        id="fav-toggle"
                        checked={searchParams.has('favorites')}
                        onCheckedChange={(checked) => {
                            const params = new URLSearchParams(searchParams.toString());
                            if (checked) params.set('favorites', 'true');
                            else params.delete('favorites');
                            router.push(pathname + '?' + params.toString());
                        }}
                        className="data-[state=checked]:bg-primary"
                    />
                </div>
            </div>

            <Separator className="bg-border/30" />

            {/* Framework Filter */}
            <div>
                <h3 className="font-heading font-bold text-[10px] uppercase tracking-[0.2em] mb-4 text-muted-foreground/60">Platform</h3>
                <div className="space-y-2">
                    {['React Native', 'Flutter'].map((fw) => (
                        <div key={fw} className="flex items-center space-x-3 group cursor-pointer hover:bg-secondary/50 p-2 rounded-xl transition-all -mx-2">
                            <Checkbox
                                id={`fw-${fw}`}
                                checked={isChecked('framework', fw)}
                                onCheckedChange={() => {
                                    router.push(pathname + '?' + createQueryString('framework', fw));
                                }}
                                className="h-5 w-5 rounded-md data-[state=checked]:bg-primary data-[state=checked]:border-primary transition-all border-2 border-border"
                            />
                            <Label htmlFor={`fw-${fw}`} className="font-semibold cursor-pointer w-full text-sm group-hover:text-primary transition-colors">{fw}</Label>
                        </div>
                    ))}
                </div>
            </div>

            <Separator className="bg-border/30" />

            {/* Category Filter */}
            <div>
                <h3 className="font-heading font-bold text-[10px] uppercase tracking-[0.2em] mb-4 text-muted-foreground/60">Category</h3>
                <div className="space-y-1">
                    <div className="flex items-center space-x-3 justify-between w-full group cursor-pointer hover:bg-secondary/50 p-2 rounded-xl transition-all -mx-2">
                        <div className="flex items-center space-x-3">
                            <Checkbox id="cat-all" checked={searchParams.getAll('category').length === 0} onCheckedChange={handleClearFilters} className="h-5 w-5 rounded-md" />
                            <Label htmlFor="cat-all" className="font-semibold cursor-pointer text-sm group-hover:text-primary">All Components</Label>
                        </div>
                        <span className="text-[10px] font-bold text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">300+</span>
                    </div>

                    {categoryData.map((cat) => (
                        <div key={cat.id} className="flex items-center space-x-3 justify-between w-full group cursor-pointer hover:bg-secondary/50 p-2 rounded-xl transition-all -mx-2">
                            <div className="flex items-center space-x-3">
                                <Checkbox
                                    id={`cat-${cat.id}`}
                                    checked={isChecked('category', cat.name)}
                                    onCheckedChange={() => {
                                        router.push(pathname + '?' + createQueryString('category', cat.name));
                                    }}
                                    className="h-5 w-5 rounded-md data-[state=checked]:bg-primary data-[state=checked]:border-primary border-2 border-border"
                                />
                                <Label htmlFor={`cat-${cat.id}`} className="font-semibold cursor-pointer text-sm group-hover:text-primary transition-colors">{cat.name}</Label>
                            </div>
                            <span className="text-[10px] font-bold text-muted-foreground bg-secondary group-hover:bg-primary/20 group-hover:text-primary px-2 py-0.5 rounded-full transition-all">{cat.count}</span>
                        </div>
                    ))}
                </div>
            </div>

            <Separator className="bg-border/30" />

            {/* Complexity Filter */}
            <div>
                <h3 className="font-heading font-bold text-[10px] uppercase tracking-[0.2em] mb-4 text-muted-foreground/60">Complexity</h3>
                <div className="space-y-2">
                    {['Beginner', 'Intermediate', 'Advanced'].map((lvl) => (
                        <div key={lvl} className="flex items-center space-x-3 group cursor-pointer hover:bg-secondary/50 p-2 rounded-xl transition-all -mx-2">
                            <Checkbox
                                id={`lvl-${lvl}`}
                                checked={isChecked('complexity', lvl.toLowerCase())}
                                onCheckedChange={() => {
                                    router.push(pathname + '?' + createQueryString('complexity', lvl.toLowerCase()));
                                }}
                                className="h-5 w-5 rounded-md data-[state=checked]:bg-primary data-[state=checked]:border-primary border-2 border-border"
                            />
                            <Label htmlFor={`lvl-${lvl}`} className="font-semibold cursor-pointer text-sm group-hover:text-primary transition-colors">{lvl}</Label>
                        </div>
                    ))}
                </div>
            </div>

            <div className="pt-4 pb-24">
                <Button
                    variant="outline"
                    className="w-full rounded-xl text-primary font-bold hover:bg-primary/10 border-2 border-primary/20 hover:border-primary/50 transition-all"
                    onClick={handleClearFilters}
                >
                    Clear All Filters
                </Button>
            </div>
        </aside>
    );
}
