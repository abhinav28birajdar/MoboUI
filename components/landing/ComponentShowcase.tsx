"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { components } from '@/lib/data/components';
import { Smartphone, ExternalLink } from 'lucide-react';

export default function ComponentShowcase() {
    const showcaseComponents = components.slice(0, 4);

    return (
        <section className="py-20 bg-surface/20">
            <div className="container px-4 mx-auto">
                <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
                    <div className="max-w-xl">
                        <h2 className="text-3xl md:text-5xl font-bold mb-4">Curated <span className="text-accent">Collections</span></h2>
                        <p className="text-muted-foreground text-lg">
                            Explore our most popular mobile components, battle-tested in real production environments.
                        </p>
                    </div>
                    <Button variant="outline" className="rounded-full" asChild>
                        <Link href="/components">View All Library</Link>
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {showcaseComponents.map((component, index) => (
                        <motion.div
                            key={component.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative bg-background border border-border rounded-3xl overflow-hidden hover:border-primary/50 transition-all duration-300"
                        >
                            <div className="aspect-[4/3] bg-muted/20 flex items-center justify-center p-6 bg-gradient-to-br from-surface to-background relative overflow-hidden">
                                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                <Smartphone className="w-12 h-12 text-muted-foreground/30 group-hover:text-primary transition-colors" />
                                <div className="absolute top-4 right-4">
                                    <Badge variant="secondary" className="capitalize text-[10px]">
                                        {component.framework === 'both' ? 'Hybrid' : (component.framework === 'react-native' ? 'React Native' : 'Flutter')}
                                    </Badge>
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="font-bold text-lg mb-1">{component.name}</h3>
                                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{component.description}</p>
                                <div className="flex items-center justify-between">
                                    <Badge variant="outline" className="text-[10px] uppercase tracking-wider">{component.category}</Badge>
                                    <Link
                                        href={`/components/${component.framework === 'both' ? 'react-native' : component.framework}/${component.id}`}
                                        className="text-primary text-sm font-medium flex items-center gap-1 hover:underline"
                                    >
                                        Details <ExternalLink className="w-3 h-3" />
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
