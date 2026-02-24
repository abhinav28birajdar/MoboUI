import React from 'react';
import { notFound } from 'next/navigation';
import { getDocBySlug, docsData } from '@/lib/data/docs';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface PageProps {
    params: Promise<{
        slug: string[];
    }>;
}

export async function generateMetadata({ params }: PageProps) {
    const { slug } = await params;
    const doc = getDocBySlug(slug);

    if (!doc) return { title: 'Not Found' };

    return {
        title: `${doc.title} - MoboUI Docs`,
        description: doc.description,
    };
}

export default async function DocPage({ params }: PageProps) {
    const { slug } = await params;
    const doc = getDocBySlug(slug);

    if (!doc) {
        notFound();
    }

    return (
        <div className="space-y-6 max-w-4xl">
            <div className="space-y-2">
                <div className="flex items-center text-sm text-muted-foreground mb-4">
                    <Link href="/docs" className="hover:text-foreground">Docs</Link>
                    {slug.map((s, i) => (
                        <div key={s} className="flex items-center">
                            <ChevronRight className="h-4 w-4 mx-1" />
                            <span className={i === slug.length - 1 ? "text-foreground font-medium capitalize" : "capitalize"}>
                                {s.replace('-', ' ')}
                            </span>
                        </div>
                    ))}
                </div>
                <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">{doc.title}</h1>
                <p className="text-xl text-muted-foreground">{doc.description}</p>
            </div>

            <div className="prose dark:prose-invert max-w-none pb-10">
                {/* In a real app, render MDX here. For now, we render text with line breaks */}
                {doc.content.split('\n').map((line, i) => (
                    <p key={i}>{line}</p>
                ))}
            </div>

            {/* Navigation to other sections if it's a section root */}
            {slug.length === 1 && (
                <div className="grid gap-4 md:grid-cols-2 mt-8">
                    {docsData.find(d => d.slug === slug[0])?.items?.map(item => (
                        <Link key={item.slug} href={`/docs/${slug[0]}/${item.slug}`}>
                            <Card className="hover:bg-muted/50 transition-colors h-full">
                                <CardHeader>
                                    <CardTitle className="text-base">{item.title}</CardTitle>
                                    <CardDescription>{item.description}</CardDescription>
                                </CardHeader>
                            </Card>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
