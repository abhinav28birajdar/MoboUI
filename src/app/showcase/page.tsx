'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Heart, Share2, Award, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SHOWCASE_APPS = [
    {
        title: 'Lumina Fitness',
        author: 'Alex River',
        description: 'A comprehensive workout tracking app with real-time heart rate monitoring and 3D exercise visualizations.',
        image: 'https://images.unsplash.com/photo-1510017803434-a899398421b3?q=80&w=600&h=800&fit=crop',
        tags: ['React Native', 'Expo', 'Reanimated'],
        likes: 1240,
        award: 'Editor\'s Choice'
    },
    {
        title: 'Zenith Banking',
        author: 'Sarah Chen',
        description: 'Modern neo-banking application featuring a glassmorphic interface and interactive financial analytics.',
        image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=600&h=800&fit=crop',
        tags: ['Flutter', 'Riverpod', 'Charts'],
        likes: 892,
    },
    {
        title: 'Voyage Travel',
        author: 'Marco Polo',
        description: 'Immersive travel discovery platform with AR navigation and offline-first itinerary management.',
        image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=600&h=800&fit=crop',
        tags: ['React Native', 'Mapbox', 'Dark Mode'],
        likes: 567,
    },
    {
        title: 'Nourish UI',
        author: 'Emma Green',
        description: 'AI-powered meal planning and grocery delivery app with smooth shared element transitions.',
        image: 'https://images.unsplash.com/photo-1547517023-7ca0c162f816?q=80&w=600&h=800&fit=crop',
        tags: ['Flutter', 'Animations', 'Supabase'],
        likes: 2105,
        award: 'Most Popular'
    }
];

export default function ShowcasePage() {
    return (
        <div className="min-h-screen bg-background pb-32 pt-24">
            <div className="container px-6 mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface border border-border text-[10px] font-black uppercase tracking-[0.3em] text-text-muted mb-8"
                >
                    <Award size={14} className="text-primary" />
                    Built with MOBOUI
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="font-display font-black text-6xl md:text-8xl lg:text-9xl mb-8 text-text-primary tracking-tighter leading-[0.85] uppercase "
                >
                    Community <br /><span className="text-primary">Showcase.</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-xl text-text-secondary mb-20 leading-relaxed max-w-2xl mx-auto font-medium"
                >
                    Be inspired by what world-class developers are building using our component library.
                </motion.p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 text-left">
                    {SHOWCASE_APPS.map((app, index) => (
                        <motion.div
                            key={app.title}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + (index * 0.1) }}
                            className="group relative"
                        >
                            <div className="flex flex-col md:flex-row bg-card border border-border rounded-[2.5rem] overflow-hidden hover:border-primary/30 transition-all duration-500 shadow-sm">
                                <div className="md:w-2/5 aspect-[3/4] md:aspect-auto relative overflow-hidden">
                                    <img
                                        src={app.image}
                                        alt={app.title}
                                        className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                                    />
                                    {app.award && (
                                        <div className="absolute top-6 left-6 px-4 py-2 bg-primary text-primary-foreground text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg">
                                            {app.award}
                                        </div>
                                    )}
                                </div>

                                <div className="flex-1 p-10 flex flex-col">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="space-y-1">
                                            <h3 className="text-3xl font-black text-text-primary  tracking-tighter uppercase">{app.title}</h3>
                                            <p className="text-text-muted font-bold text-[10px] uppercase tracking-widest">by {app.author}</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button variant="ghost" size="icon" className="rounded-full bg-surface border border-border h-10 w-10 text-text-muted hover:text-primary">
                                                <Github size={18} />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="rounded-full bg-surface border border-border h-10 w-10 text-text-muted hover:text-primary">
                                                <ExternalLink size={18} />
                                            </Button>
                                        </div>
                                    </div>

                                    <p className="text-text-secondary text-sm leading-relaxed mb-8 font-medium">
                                        {app.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2 mb-8 mt-auto">
                                        {app.tags.map(tag => (
                                            <span key={tag} className="px-3 py-1.5 rounded-full bg-surface border border-border text-[8px] font-black text-text-muted uppercase tracking-widest">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex items-center justify-between pt-8 border-t border-border">
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center gap-1.5 group/like cursor-pointer">
                                                <Heart size={18} className="text-text-muted group-hover/like:text-red-500 transition-colors" />
                                                <span className="text-xs font-black text-text-muted">{app.likes}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5 cursor-pointer text-text-muted hover:text-primary transition-colors">
                                                <Share2 size={18} />
                                            </div>
                                        </div>
                                        <Button className="rounded-2xl h-12 px-6 font-black text-[10px] uppercase tracking-widest bg-primary text-primary-foreground hover:scale-105 transition-all">
                                            Case Study
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="mt-32 p-16 bg-surface rounded-[3rem] border border-border text-center relative overflow-hidden group shadow-sm"
                >
                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <h2 className="text-4xl md:text-5xl font-display font-black text-text-primary  tracking-tighter mb-6 uppercase">Built something <span className="text-primary">amazing?</span></h2>
                    <p className="text-lg text-text-secondary max-w-xl mx-auto mb-10 font-medium">
                        Submit your application to be featured in our showcase and reach thousands of developers.
                    </p>
                    <Button size="lg" className="rounded-2xl h-16 px-12 bg-primary text-primary-foreground font-black text-md uppercase  tracking-widest hover:scale-105 transition-all">
                        Submit Project <Sparkles size={18} className="ml-2" />
                    </Button>
                </motion.div>
            </div>
        </div>
    );
}
