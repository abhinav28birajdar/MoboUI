"use client";

import React from 'react';
import { Component } from '@/lib/data/components';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Smartphone, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function ComponentCard({ component }: { component: Component }) {
    const framework = component.framework === 'both' ? 'Hybrid' : (component.framework === 'react-native' ? 'React Native' : 'Flutter');

    return (
        <Link href={`/components/${component.framework === 'both' ? 'react-native' : component.framework}/${component.id}`}>
            <Card className="overflow-hidden group hover:border-primary/50 transition-all duration-300 h-full flex flex-col cursor-pointer">
                <div className="aspect-video bg-surface/50 flex items-center justify-center relative overflow-hidden flex-shrink-0">
                    <Smartphone className="w-12 h-12 text-muted-foreground/20 group-hover:text-primary/50 group-hover:scale-110 transition-all duration-500" />
                    <div className="absolute top-3 right-3">
                        <Badge variant="secondary" className="text-[10px]">{framework}</Badge>
                    </div>
                </div>
                <CardContent className="p-5 flex-1">
                    <Badge variant="outline" className="text-[10px] uppercase mb-2 bg-muted/30">{component.category}</Badge>
                    <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">{component.name}</h3>
                    <p className="text-muted-foreground text-sm line-clamp-2">{component.description}</p>
                </CardContent>
                <CardFooter className="px-5 py-4 border-t border-border flex items-center justify-between group-hover:bg-primary/5 transition-colors">
                    <span className="text-xs font-medium text-muted-foreground">View Details</span>
                    <ChevronRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
                </CardFooter>
            </Card>
        </Link>
    );
}
