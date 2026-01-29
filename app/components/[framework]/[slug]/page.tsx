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
            <div className="mb-12 flex items-center justify-between">
                <Link href="/components" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-all group">
                    <div className="w-8 h-8 rounded-full bg-surface border border-border flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary group-hover:-translate-x-1 transition-all">
                        <ChevronLeft className="w-5 h-5" />
                    </div>
                    <span className="font-semibold text-sm tracking-wide uppercase">Back to Library</span>
                </Link>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="rounded-full shadow-sm">
                        <Share2 className="w-4 h-4 mr-2" /> Share
                    </Button>
                    <Button className="rounded-full bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20" asChild>
                        <Link href="/playground">
                            <Play className="w-4 h-4 mr-2 fill-current" /> Playground
                        </Link>
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                {/* Left: Preview Panel */}
                <div className="lg:col-span-5 flex flex-col gap-10">
                    <div className="flex flex-col gap-6">
                        <div className="flex items-center flex-wrap gap-3">
                            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">{component.name}</h1>
                            <Badge variant="outline" className="text-[10px] uppercase font-bold py-1 bg-primary/5 text-primary border-primary/20">
                                {component.category}
                            </Badge>
                        </div>
                        <p className="text-xl text-muted-foreground leading-relaxed italic border-l-4 border-primary/20 pl-6">
                            {component.description}
                        </p>
                    </div>

                    <div className="relative group">
                        <div className="absolute inset-x-0 -bottom-10 h-20 bg-primary/5 blur-3xl -z-10" />
                        <MobileFrame componentId={component.id} />
                    </div>
                </div>

                {/* Right: Code & Props Panel */}
                <div className="lg:col-span-7 flex flex-col gap-10">
                    <div className="space-y-4">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-primary/80">Component Implementation</h3>
                        <CodePanel code={component.code} name={component.name} />
                    </div>

                    {/* Props Table */}
                    <div className="rounded-3xl border border-border bg-surface/20 backdrop-blur-sm overflow-hidden flex flex-col">
                        <div className="bg-muted/30 px-8 py-6 border-b border-border flex items-center justify-between">
                            <h3 className="font-bold text-lg flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-primary animate-ping" />
                                Dynamic Properties
                            </h3>
                            <Badge variant="outline" className="text-xs font-mono">{component.props?.length || 0} Props</Badge>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm border-collapse">
                                <thead>
                                    <tr className="bg-black/20 text-muted-foreground/50 border-b border-border">
                                        <th className="px-8 py-4 font-bold uppercase tracking-wider text-[10px]">Property</th>
                                        <th className="px-8 py-4 font-bold uppercase tracking-wider text-[10px]">Type</th>
                                        <th className="px-8 py-4 font-bold uppercase tracking-wider text-[10px]">Default</th>
                                        <th className="px-8 py-4 font-bold uppercase tracking-wider text-[10px]">Description</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border/30">
                                    {component.props?.map((prop) => (
                                        <tr key={prop.name} className="hover:bg-primary/5 transition-colors">
                                            <td className="px-8 py-5 font-mono text-primary font-bold">{prop.name}</td>
                                            <td className="px-8 py-5">
                                                <code className="bg-accent/10 text-accent px-2 py-1 rounded text-xs">{prop.type}</code>
                                            </td>
                                            <td className="px-8 py-5 text-muted-foreground italic font-mono text-xs">{prop.default || '-'}</td>
                                            <td className="px-8 py-5 text-muted-foreground/80 leading-relaxed">{prop.description}</td>
                                        </tr>
                                    ))}
                                    {(!component.props || component.props.length === 0) && (
                                        <tr>
                                            <td colSpan={4} className="px-8 py-10 text-center text-muted-foreground italic">
                                                No properties defined for this component.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Usage Guide */}
                    <div className="rounded-3xl border border-border bg-surface/20 p-8">
                        <h3 className="font-bold text-lg mb-6 flex items-center gap-3">
                            Installation & Usage
                        </h3>
                        <div className="bg-[#1e1e1e] rounded-xl p-6 font-mono text-xs overflow-auto">
                            <pre className="text-green-400"># 1. Copy the component code above</pre>
                            <pre className="text-green-400"># 2. Paste into your project&apos;s components folder</pre>
                            <pre className="text-wrap mt-4 leading-relaxed">{component.usage}</pre>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
