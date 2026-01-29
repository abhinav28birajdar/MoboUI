"use client";

import React from 'react';
import { categories } from '@/lib/data/components';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

export default function FilterSidebar() {
    return (
        <div className="space-y-8 sticky top-24">
            <div>
                <h3 className="font-bold mb-4 px-2">Framework</h3>
                <div className="space-y-2">
                    {['React Native', 'Flutter', 'Expo'].map(f => (
                        <div key={f} className="flex items-center space-x-2 px-2 py-1.5 rounded-lg hover:bg-muted transition-colors cursor-pointer">
                            <Checkbox id={f} />
                            <Label htmlFor={f} className="flex-1 cursor-pointer">{f}</Label>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <h3 className="font-bold mb-4 px-2">Category</h3>
                <div className="space-y-1">
                    {categories.map(cat => (
                        <div key={cat.id} className="flex items-center justify-between px-2 py-1.5 rounded-lg hover:bg-muted transition-colors cursor-pointer group">
                            <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground">{cat.name}</span>
                            <span className="text-xs text-muted-foreground/50">{cat.count}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
