'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Code2, Palette, Cpu, Layout, HelpCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const docsSections = [
    {
        title: 'Getting Started',
        description: 'Learn how to set up and use MoboUI in your project',
        icon: BookOpen,
        href: '/docs/getting-started',
        color: 'text-blue-500',
        bg: 'bg-blue-500/10'
    },
    {
        title: 'React Native',
        description: 'Complete guide for React Native integration',
        icon: Code2,
        href: '/docs/react-native',
        color: 'text-cyan-500',
        bg: 'bg-cyan-500/10'
    },
    {
        title: 'Flutter',
        description: 'Flutter integration and usage guide',
        icon: Cpu,
        href: '/docs/flutter',
        color: 'text-blue-600',
        bg: 'bg-blue-600/10'
    },
    {
        title: 'Theming',
        description: 'Customize colors, typography, and more',
        icon: Palette,
        href: '/docs/theming',
        color: 'text-primary',
        bg: 'bg-primary/10'
    },
    {
        title: 'Components',
        description: 'Browse the full component library',
        icon: Layout,
        href: '/components',
        color: 'text-purple-500',
        bg: 'bg-purple-500/10'
    },
    {
        title: 'FAQ',
        description: 'Common questions and troubleshooting',
        icon: HelpCircle,
        href: '/docs/faq',
        color: 'text-yellow-500',
        bg: 'bg-yellow-500/10'
    }
];

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

export default function DocsPage() {
    return (
        <div className="container mx-auto py-20 px-6 relative overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/5 blur-[150px] -z-10 rounded-full pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-500/5 blur-[150px] -z-10 rounded-full pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-20 space-y-6"
            >
                <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest border border-primary/20 shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
                    Documentation Hub
                </div>
                <h1 className="font-heading font-black text-6xl md:text-8xl text-white tracking-tighter uppercase  leading-none">
                    Master the <span className="text-primary neon-text-glow">Toolkit.</span>
                </h1>
                <p className="text-xl text-neutral-400 max-w-2xl leading-relaxed">
                    Everything you need to build production-ready mobile apps with MoboUI. Guides, API docs, and architecture patterns.
                </p>
            </motion.div>

            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
            >
                {docsSections.map((section) => (
                    <motion.div key={section.title} variants={item}>
                        <Link href={section.href}>
                            <Card className="h-full border border-white/5 bg-neutral-900/50 backdrop-blur-md hover:bg-neutral-900 hover:border-primary/50 transition-all duration-500 group cursor-pointer overflow-hidden relative rounded-3xl p-2">
                                <CardHeader className="p-8">
                                    <div className={`mb-8 flex h-16 w-16 items-center justify-center rounded-2xl ${section.bg} border border-white/5 transition-all group-hover:scale-110 group-hover:rotate-6 group-hover:border-primary/30 group-hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)] duration-500`}>
                                        <section.icon className={`h-8 w-8 ${section.color}`} />
                                    </div>
                                    <CardTitle className="text-2xl font-heading font-black text-white mb-4 group-hover:text-primary transition-colors uppercase  tracking-tight">{section.title}</CardTitle>
                                    <CardDescription className="text-base text-neutral-400 leading-relaxed font-medium">
                                        {section.description}
                                    </CardDescription>
                                </CardHeader>
                                <div className="absolute bottom-6 right-10 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                                    <ArrowRight className={`w-8 h-8 ${section.color} drop-shadow-[0_0_10px_currentColor]`} />
                                </div>
                            </Card>
                        </Link>
                    </motion.div>
                ))}
            </motion.div>

            {/* CTA Section */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-32 p-12 md:p-20 rounded-[48px] bg-neutral-900 border border-white/5 relative overflow-hidden group"
            >
                {/* Glow behind section */}
                <div className="absolute inset-0 bg-primary/5 opacity-50" />

                <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
                    <div className="space-y-6 text-center lg:text-left">
                        <h2 className="text-4xl md:text-5xl font-heading font-black text-white tracking-tighter uppercase  leading-tight">
                            Ready to build? <br />
                            <span className="text-primary">Start with a template.</span>
                        </h2>
                        <p className="text-xl text-neutral-400 max-w-lg mx-auto lg:mx-0">
                            Don't start from scratch. Browse our ready-to-use mobile app templates for ecommerce, social, and SaaS.
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                        <Button size="lg" className="btn-primary h-16 px-12 rounded-2xl text-lg shadow-xl shadow-primary/20">
                            Explore Templates
                        </Button>
                        <Button size="lg" variant="outline" className="btn-secondary h-16 px-12 rounded-2xl text-lg">
                            Get Help
                        </Button>
                    </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-1/2 right-0 -translate-y-1/2 w-64 h-64 bg-primary/5 blur-[120px] rounded-full group-hover:scale-150 transition-transform duration-1000" />
            </motion.div>
        </div>
    );
}
