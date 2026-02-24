'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Newspaper } from 'lucide-react';
import Link from 'next/link';

const POSTS = [
    {
        slug: 'modern-mobile-theming',
        title: 'Modern Mobile Theming: Beyond Light and Dark Mode',
        excerpt: 'Discover how to implement advanced design token systems that scale across Flutter and React Native.',
        author: 'Julian Howard',
        date: 'Feb 15, 2026',
        readTime: '8 min read',
        image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&h=400&fit=crop',
        category: 'Design Systems'
    },
    {
        slug: 'optimizing-flutter-animations',
        title: 'Optimizing Flutter Animations for 120Hz Displays',
        excerpt: 'Learn the secrets of the RepaintBoundary and how to achieve buttery smooth 120 FPS in complex UIs.',
        author: 'Elena Vance',
        date: 'Feb 10, 2026',
        readTime: '12 min read',
        image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=600&h=400&fit=crop',
        category: 'Performance'
    },
    {
        slug: 'react-native-reanimated-3',
        title: 'Mastering Reanimated 3: Layout Animations and Beyond',
        excerpt: 'Explore the new possibilities of declarative layout animations in the latest Reanimated release.',
        author: 'Marcus Aurelius',
        date: 'Feb 05, 2026',
        readTime: '10 min read',
        image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=600&h=400&fit=crop',
        category: 'React Native'
    }
];

export default function BlogPage() {
    return (
        <div className="min-h-screen bg-black text-white pt-24 pb-32">
            <div className="container px-6 mx-auto">
                <div className="max-w-4xl mb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/5 text-[10px] font-black uppercase tracking-[0.3em] text-neutral-500 mb-8"
                    >
                        <Newspaper size={14} className="text-primary" />
                        LATEST ARTICLES
                    </motion.div>

                    <h1 className="text-5xl md:text-7xl font-heading font-black tracking-tighter  mb-6">
                        THE <span className="text-primary neon-text-glow">BLOG.</span>
                    </h1>
                    <p className="text-xl text-neutral-400 max-w-2xl font-medium">
                        Insights, tutorials, and best practices from the forefront of mobile engineering.
                    </p>
                </div>

                <div className="grid gap-16">
                    {/* Featured Post */}
                    <div className="group relative">
                        <div className="absolute inset-0 bg-primary/20 blur-[120px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                        <Link href={`/blog/${POSTS[0].slug}`} className="relative block">
                            <div className="bg-neutral-900/50 border border-white/5 rounded-[3rem] overflow-hidden flex flex-col lg:flex-row h-full">
                                <div className="lg:w-1/2 aspect-video lg:aspect-auto overflow-hidden">
                                    <img
                                        src={POSTS[0].image}
                                        alt={POSTS[0].title}
                                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
                                    />
                                </div>
                                <div className="flex-1 p-10 lg:p-16 flex flex-col justify-center">
                                    <div className="text-primary text-xs font-black uppercase tracking-widest mb-4">{POSTS[0].category}</div>
                                    <h2 className="text-4xl md:text-5xl font-heading font-black  tracking-tighter text-white mb-6 group-hover:text-primary transition-colors leading-[0.95]">
                                        {POSTS[0].title}
                                    </h2>
                                    <p className="text-neutral-400 text-lg mb-8 font-medium">
                                        {POSTS[0].excerpt}
                                    </p>
                                    <div className="flex items-center gap-6 text-sm font-bold text-neutral-500">
                                        <div className="flex items-center gap-2"><Calendar size={16} /> {POSTS[0].date}</div>
                                        <div className="flex items-center gap-2"><Clock size={16} /> {POSTS[0].readTime}</div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>

                    {/* Secondary Grid */}
                    <div className="grid md:grid-cols-2 gap-12">
                        {POSTS.slice(1).map((post) => (
                            <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                                <div className="flex flex-col h-full bg-neutral-900/50 border border-white/5 rounded-[2.5rem] overflow-hidden hover:border-primary/30 transition-all duration-500">
                                    <div className="aspect-video overflow-hidden">
                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                                        />
                                    </div>
                                    <div className="p-10 flex flex-col flex-1">
                                        <div className="text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-3">{post.category}</div>
                                        <h3 className="text-2xl font-black text-white  tracking-tighter mb-4 group-hover:text-primary transition-colors leading-none">
                                            {post.title}
                                        </h3>
                                        <p className="text-neutral-500 text-sm mb-8 font-medium line-clamp-2">
                                            {post.excerpt}
                                        </p>
                                        <div className="flex items-center gap-4 text-[10px] font-black text-neutral-500 mt-auto uppercase tracking-widest">
                                            <span>{post.date}</span>
                                            <span>•</span>
                                            <span>{post.readTime}</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
