import React from 'react';
import { notFound } from 'next/navigation';
import { components } from '@/lib/data/components';
import MobileFrame from '@/components/emulator/MobileFrame';
import CodePanel from '@/components/component-detail/CodePanel';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Share2, Play } from 'lucide-react';
import Link from 'next/link';

export default async function ComponentDetailPage({ params }: { params: { framework: string, slug: string } }) {
    const { slug } = await params;
    const component = components.find(c => c.id === slug);

    if (!component) {
        notFound();
    }

    return (
        <div className="container px-4 py-8 mx-auto pb-20">
            <div className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <Link href="/components" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-all group">
                    <div className="w-8 h-8 rounded-full bg-secondary border border-border flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary group-hover:-translate-x-1 transition-all">
                        <ChevronLeft className="w-5 h-5" />
                    </div>
                    <span className="font-semibold text-xs tracking-widest uppercase">Back to Library</span>
                </Link>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="rounded-full">
                        <Share2 className="w-4 h-4 mr-2" /> Share
                    </Button>
                    <Button className="rounded-full bg-primary hover:bg-primary/90" asChild>
                        <Link href="/playground">
                            <Play className="w-4 h-4 mr-2 fill-current" /> Playground
                        </Link>
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                {/* Left: Preview Panel */}
                <div className="lg:col-span-5 flex flex-col gap-10">
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center flex-wrap gap-3">
                            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">{component.name}</h1>
                            <Badge variant="secondary" className="text-[10px] uppercase font-bold py-1 bg-primary/10 text-primary border-none">
                                {component.category}
                            </Badge>
                        </div>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            {component.description}
                        </p>
                    </div>

                    <div className="relative">
                        <MobileFrame componentId={component.id} />
                    </div>
                </div>

                {/* Right: Code & Props Panel */}
                <div className="lg:col-span-7 flex flex-col gap-12">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Component Implementation</h3>
                            <Badge variant="outline" className="text-[10px] uppercase">React Native / Expo</Badge>
                        </div>
                        <CodePanel code={component.code} name={component.name} />
                    </div>

                    {/* Props Table */}
                    <div className="rounded-[2rem] border border-border bg-card overflow-hidden flex flex-col">
                        <div className="bg-secondary/50 px-8 py-6 border-b border-border flex items-center justify-between">
                            <h3 className="font-bold text-lg">Properties</h3>
                            <Badge variant="outline" className="text-xs font-mono bg-background">{component.props?.length || 0} Props</Badge>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm border-collapse">
                                <thead>
                                    <tr className="bg-secondary/30 text-muted-foreground border-b border-border">
                                        <th className="px-8 py-4 font-bold uppercase tracking-wider text-[10px]">Property</th>
                                        <th className="px-8 py-4 font-bold uppercase tracking-wider text-[10px]">Type</th>
                                        <th className="px-8 py-4 font-bold uppercase tracking-wider text-[10px]">Default</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    {component.props?.map((prop) => (
                                        <tr key={prop.name} className="hover:bg-secondary/50 transition-colors">
                                            <td className="px-8 py-5 font-mono text-primary font-bold">{prop.name}</td>
                                            <td className="px-8 py-5">
                                                <code className="bg-secondary text-foreground px-2 py-1 rounded text-[11px] font-mono border border-border">{prop.type}</code>
                                            </td>
                                            <td className="px-8 py-5 text-muted-foreground font-mono text-xs">{prop.default || '-'}</td>
                                        </tr>
                                    ))}
                                    {(!component.props || component.props.length === 0) && (
                                        <tr>
                                            <td colSpan={3} className="px-8 py-10 text-center text-muted-foreground ">
                                                No properties defined.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Usage Guide */}
                    <div className="rounded-[2rem] border border-border bg-card p-8">
                        <h3 className="font-bold text-lg mb-6">Installation</h3>
                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[10px] font-bold flex-shrink-0">1</div>
                                <p className="text-sm text-muted-foreground">Copy the component code provided above.</p>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[10px] font-bold flex-shrink-0">2</div>
                                <p className="text-sm text-muted-foreground">Create a new file in your Expo project and paste the code.</p>
                            </div>
                            <div className="mt-8">
                                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Example Usage</p>
                                <div className="bg-[#0a0a0a] rounded-2xl p-6 font-mono text-[11px] border border-border overflow-x-auto">
                                    <pre className="text-primary-foreground/90 leading-relaxed font-mono  opacity-60 mb-4">{"// Import and use in your screen"}</pre>
                                    <pre className="text-primary-foreground">{component.usage}</pre>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
