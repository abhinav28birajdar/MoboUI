import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Code, Smartphone, Blocks, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-24 pb-16 md:pt-32 md:pb-24 lg:pt-40 lg:pb-32">
      {/* Background Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-fuchsia-600/20 rounded-full blur-[120px]" />
        <div className="absolute top-[20%] right-[10%] w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-8">
          <Badge variant="outline" className="px-4 py-1.5 border-[#2a2a38] bg-[#1a1a24] text-slate-300 gap-2 text-sm">
            <span className="flex h-2 w-2 rounded-full bg-fuchsia-500 animate-pulse" />
            Introducing MOBOUI Pro
          </Badge>

          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white leading-[1.1]">
            Build Mobile Apps <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-indigo-500">10x Faster</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-400 max-w-2xl leading-relaxed">
            Enterprise-grade mobile UI component library. Copy-paste beautiful, customizable components for Flutter, React Native, Expo, and Web.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
            <Link href="/components" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-base font-bold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-fuchsia-600 text-white hover:bg-fuchsia-700 h-14 px-8 w-full sm:w-auto shadow-[0_0_30px_rgba(192,38,211,0.3)]">
                Browse Components <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link href="/playground" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-base font-bold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-[#1a1a24] text-white border border-[#2a2a38] hover:bg-[#2a2a38] h-14 px-8 w-full sm:w-auto">
                Open Playground
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12 pt-12 opacity-60">
            <div className="flex items-center gap-2 font-mono text-sm">
              <Smartphone size={16} /> Flutter
            </div>
            <div className="flex items-center gap-2 font-mono text-sm">
              <Code size={16} /> React Native
            </div>
            <div className="flex items-center gap-2 font-mono text-sm">
              <Blocks size={16} /> Expo
            </div>
            <div className="flex items-center gap-2 font-mono text-sm">
              <Zap size={16} /> Web
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
