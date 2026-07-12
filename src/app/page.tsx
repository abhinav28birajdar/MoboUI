'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Sparkles, Code, Smartphone, Check, HelpCircle, ArrowRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ComponentCard } from '@/components/ComponentCard';
import { components as mockComponents } from '@/lib/data/components';

// Count-up helper component for stats section
function CountUp({ end, label, prefix = '', suffix = '' }: { end: number; label: string; prefix?: string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isInView) {
      let start = 0;
      const duration = 1500; // ms
      const intervalTime = 16; // ms (~60fps)
      const totalSteps = duration / intervalTime;
      const increment = end / totalSteps;
      
      timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          if (timer) clearInterval(timer);
          setCount(end);
        } else {
          setCount(Math.floor(start));
        }
      }, intervalTime);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isInView, end]);

  return (
    <div ref={ref} className="text-center p-6 bg-bg-card/40 border border-border-subtle rounded-[10px]">
      <div className="text-4xl md:text-5xl font-display font-black text-accent mb-2">
        {prefix}{count}{suffix}
      </div>
      <div className="text-xs font-bold text-text-secondary uppercase tracking-widest">{label}</div>
    </div>
  );
}

const PHONE_PREVIEWS = [
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=412&h=916&fit=crop",
  "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=412&h=916&fit=crop",
  "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=412&h=916&fit=crop",
  "https://images.unsplash.com/photo-1510017803434-a899398421b3?q=80&w=412&h=916&fit=crop"
];

const TESTIMONIALS_DATA = [
  {
    text: "MoboUI saved us weeks of work. The components are gorgeous, easy to drop into Expo, and fully responsive across iOS and Android.",
    name: "Alex Rivera",
    role: "Lead Mobile Architect at Fintech Startup"
  },
  {
    text: "Being able to run live tests in the emulators with zero configurations changed the game for our design feedback cycles.",
    name: "Meera Patel",
    role: "Senior UI Engineer at Design Studio"
  },
  {
    text: "The cleanest Flutter code blocks I've seen in any component catalog. Extremely high standards of visual excellence.",
    name: "Marcus Thorne",
    role: "Independent App Developer"
  }
];

export default function HomePage() {
  const [currentPreviewIdx, setCurrentPreviewIdx] = useState(0);

  // Cycle phone previews every 3s
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPreviewIdx((prev) => (prev + 1) % PHONE_PREVIEWS.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  // Take first 6 components from mock data
  const featuredComponents = mockComponents.slice(0, 6);

  return (
    <div className="w-full bg-bg-base overflow-x-hidden">
      
      {/* SECTION 1 — HERO */}
      <section className="min-h-[calc(100vh-80px)] w-full flex items-center relative py-12 px-6">
        {/* Ambient Radial Gradients */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/3 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Hero Content */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-accent/20 bg-bg-card text-accent text-[10px] font-black uppercase tracking-widest">
              ✦ Now with Live Emulators
            </span>
            <h1 className="text-5xl md:text-7xl font-display font-black tracking-tight leading-none text-text-primary uppercase">
              Build Beautiful <br />
              <span className="bg-gradient-to-r from-accent to-purple-400 bg-clip-text text-transparent">
                Mobile Apps
              </span> <br />
              Faster
            </h1>
            <p className="text-base md:text-lg text-text-secondary max-w-xl leading-relaxed font-body font-medium">
              Production-ready components for Flutter, React Native & Expo. Three live emulators. One platform.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Button asChild variant="default" size="lg" className="w-full sm:w-auto uppercase tracking-widest text-[10px]">
                <Link href="/components">Browse Components</Link>
              </Button>
              <Button asChild variant="secondary" size="lg" className="w-full sm:w-auto uppercase tracking-widest text-[10px] border border-border-default bg-transparent">
                <Link href="/playground">Open Playground</Link>
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-8 pt-8 border-t border-border-subtle/50 w-full">
              <div className="flex items-center gap-2 text-text-muted">
                <span className="text-text-primary font-bold">50+</span> Components
              </div>
              <div className="flex items-center gap-2 text-text-muted">
                <span className="text-text-primary font-bold">3</span> Live Emulators
              </div>
              <div className="flex items-center gap-2 text-text-muted">
                <span className="text-accent font-bold">WCAG</span> AA
              </div>
            </div>
          </div>

          {/* Right Phone Mockup */}
          <div className="lg:col-span-5 hidden lg:flex justify-center items-center relative">
            <div className="absolute w-[350px] h-[350px] bg-accent/10 rounded-full blur-[100px] -z-10 pointer-events-none" />
            
            {/* Phone Outer Frame (Android Pixel 9 Pro style) */}
            <div className="relative w-[280px] h-[560px] rounded-[36px] border-[8px] border-zinc-800 bg-zinc-950 p-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.8)] outline-none overflow-hidden">
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-zinc-800 z-20" /> {/* punch hole camera */}
              <div className="w-full h-full rounded-[26px] bg-black overflow-hidden relative">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentPreviewIdx}
                    src={PHONE_PREVIEWS[currentPreviewIdx]}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    className="w-full h-full object-cover"
                    alt="Mobile Preview Screen"
                  />
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — TICKER / CHANGELOG STRIP */}
      <section className="w-full py-4 bg-bg-card border-y border-border-subtle overflow-hidden">
        <div className="w-full flex">
          <div className="animate-marquee whitespace-nowrap flex gap-16 text-xs font-black uppercase tracking-widest text-text-secondary select-none">
            <span>✦ Flutter Emulator Live</span>
            <span>✦ 50+ Components</span>
            <span>✦ React Native Snack-style Preview</span>
            <span>✦ Expo SDK Support</span>
            <span>✦ Monaco Code Editor</span>
            <span>✦ GitHub OAuth</span>
            {/* Repeating for seamless loop */}
            <span>✦ Flutter Emulator Live</span>
            <span>✦ 50+ Components</span>
            <span>✦ React Native Snack-style Preview</span>
            <span>✦ Expo SDK Support</span>
            <span>✦ Monaco Code Editor</span>
            <span>✦ GitHub OAuth</span>
          </div>
        </div>
      </section>

      {/* SECTION 3 — FRAMEWORK LOGOS BAR */}
      <section className="w-full py-16 px-6 border-b border-border-subtle bg-bg-base/30">
        <div className="container mx-auto flex flex-col items-center text-center space-y-6">
          <span className="text-[10px] font-black tracking-[0.3em] text-text-muted uppercase">
            Components built natively for
          </span>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {['Flutter', 'React Native', 'Expo', 'TypeScript'].map((fw) => (
              <div
                key={fw}
                className="px-6 py-3 rounded-full border border-border-subtle bg-bg-card/80 text-text-primary text-xs font-bold uppercase tracking-wider hover:border-accent hover:shadow-[0_0_15px_rgba(192,38,211,0.15)] transition-all cursor-default"
              >
                {fw}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 — FEATURED COMPONENTS GRID */}
      <section className="w-full py-24 px-6 border-b border-border-subtle">
        <div className="container mx-auto space-y-12">
          <div className="flex items-center justify-between border-b border-border-subtle/50 pb-6">
            <h2 className="text-2xl md:text-3xl font-display font-black tracking-tight uppercase text-text-primary">
              Featured Components
            </h2>
            <Link href="/components" className="text-xs font-bold uppercase tracking-widest text-accent hover:text-accent-dark transition-colors flex items-center gap-1">
              View all <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredComponents.map((component) => (
              <ComponentCard key={component.slug} component={component} />
            ))}
          </div>

          <div className="flex justify-center pt-8">
            <Button asChild variant="ghost" size="lg" className="border border-border-default uppercase tracking-widest text-[10px] text-text-primary">
              <Link href="/components">View all 50+ components</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* SECTION 5 — THREE EMULATORS FEATURE HIGHLIGHT */}
      <section className="w-full py-24 px-6 bg-bg-card/30 border-b border-border-subtle">
        <div className="container mx-auto space-y-16">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-black tracking-tight uppercase text-text-primary leading-none">
              Three Live Emulators. Zero Setup.
            </h2>
            <p className="text-sm text-text-secondary font-medium">
              Write, compile, and run your layouts instantly inside the browser. High fidelity previews for all runtimes.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Card 1 - Flutter */}
            <Card variant="glass" className="p-8 flex flex-col justify-between group">
              <div className="space-y-6">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                  <Code size={24} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-display font-black uppercase text-text-primary">Flutter Emulator</h3>
                  <p className="text-xs text-text-secondary leading-relaxed font-medium">
                    Full DartPad-powered preview. Hot reload, widget inspector, performance monitor, device rotation.
                  </p>
                </div>
                <ul className="space-y-2.5">
                  {['Hot Reload', 'Widget Inspector', 'Performance Monitor', 'Dark/Light Theme Toggle'].map((feat) => (
                    <li key={feat} className="flex items-center gap-2.5 text-xs text-text-secondary font-semibold">
                      <Check size={14} className="text-blue-400" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Button asChild variant="ghost" size="sm" className="mt-8 w-full border border-border-subtle uppercase tracking-widest text-[10px]">
                <Link href="/playground?framework=flutter">Try Flutter →</Link>
              </Button>
            </Card>

            {/* Card 2 - React Native (Featured Accent Glow Card) */}
            <Card variant="glass" className="p-8 border-accent/40 shadow-[0_0_24px_rgba(192,38,211,0.1)] ring-1 ring-accent/20 flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute top-4 right-4">
                <Badge variant="new" className="text-[8px] font-black tracking-widest px-2 py-0.5 uppercase">
                  Most Used
                </Badge>
              </div>
              <div className="space-y-6">
                <div className="w-12 h-12 rounded-xl bg-accent/15 border border-accent/30 flex items-center justify-center text-accent">
                  <Smartphone size={24} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-display font-black uppercase text-text-primary">React Native</h3>
                  <p className="text-xs text-text-secondary leading-relaxed font-medium">
                    Expo Snack-style environment. Fast refresh, Metro logs, QR code, multi-device testing.
                  </p>
                </div>
                <ul className="space-y-2.5">
                  {['Fast Refresh', 'Metro Log Output', 'Expo QR Code Access', 'iOS + Android Simulation'].map((feat) => (
                    <li key={feat} className="flex items-center gap-2.5 text-xs text-text-secondary font-semibold">
                      <Check size={14} className="text-accent" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Button asChild variant="default" size="sm" className="mt-8 w-full uppercase tracking-widest text-[10px]">
                <Link href="/playground?framework=react-native">Try React Native →</Link>
              </Button>
            </Card>

            {/* Card 3 - Expo */}
            <Card variant="glass" className="p-8 flex flex-col justify-between group">
              <div className="space-y-6">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                  <Sparkles size={24} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-display font-black uppercase text-text-primary">Expo SDK Emulator</h3>
                  <p className="text-xs text-text-secondary leading-relaxed font-medium">
                    Full Expo SDK support. Router, Camera, Notifications, Maps, OTA previews.
                  </p>
                </div>
                <ul className="space-y-2.5">
                  {['Expo Router Compatibility', 'OTA Preview Loader', 'Device API Integrations', 'Console stream logs'].map((feat) => (
                    <li key={feat} className="flex items-center gap-2.5 text-xs text-text-secondary font-semibold">
                      <Check size={14} className="text-purple-400" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Button asChild variant="ghost" size="sm" className="mt-8 w-full border border-border-subtle uppercase tracking-widest text-[10px]">
                <Link href="/playground?framework=expo">Try Expo →</Link>
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* SECTION 6 — STATS COUNTER */}
      <section className="w-full py-20 px-6 border-b border-border-subtle">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <CountUp end={50} label="Components" suffix="+" />
            <CountUp end={3} label="Live Emulators" />
            <CountUp end={10} label="Developers" suffix="K+" />
            
            {/* WCAG AA Static Card */}
            <div className="text-center p-6 bg-bg-card/40 border border-border-subtle rounded-[10px] flex flex-col justify-center items-center">
              <div className="text-4xl md:text-5xl font-display font-black text-accent mb-2">
                WCAG
              </div>
              <div className="text-xs font-bold text-text-secondary uppercase tracking-widest">AA Compliant</div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7 — FEATURES GRID */}
      <section className="w-full py-24 px-6 border-b border-border-subtle bg-bg-card/10">
        <div className="container mx-auto space-y-16">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-black tracking-tight uppercase text-text-primary">
              Everything You Need to Ship Faster
            </h2>
            <p className="text-sm text-text-secondary font-medium">
              We design and write components built specifically to accelerate native layout composition.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { title: "Copy-Paste Ready", desc: "Code snippets ready for Flutter, React Native, and Expo with a single click." },
              { title: "Live Preview", desc: "Instantly preview layout variations and properties inside custom device frames." },
              { title: "TypeScript First", desc: "Fully typed API endpoints and layout props for rock-solid compiler checks." },
              { title: "WCAG Compliant", desc: "Rigorous accessibility setups conforming to WCAG AA guidelines." },
              { title: "Dark Mode Built-in", desc: "Natively integrated stylesheets designed for midnight black visuals." },
              { title: "Community Driven", desc: "Submit component snippets, showcase mobile apps, and review builds." }
            ].map((feat, idx) => (
              <div key={idx} className="p-6 bg-bg-card border border-border-subtle rounded-[10px] space-y-4 hover:border-accent/30 transition-all duration-300">
                <h3 className="text-lg font-display font-black uppercase text-text-primary">{feat.title}</h3>
                <p className="text-xs text-text-secondary leading-relaxed font-medium">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8 — TESTIMONIALS */}
      <section className="w-full py-24 px-6 border-b border-border-subtle bg-bg-base">
        <div className="container mx-auto space-y-16">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-black tracking-tight uppercase text-text-primary">
              Loved by Mobile Developers
            </h2>
            <p className="text-sm text-text-secondary font-medium">
              See what engineers building high-fidelity projects say about MoboUI tools.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {TESTIMONIALS_DATA.map((t, idx) => (
              <div key={idx} className="p-8 bg-bg-card border border-border-subtle rounded-[10px] flex flex-col justify-between space-y-6 hover:border-accent/20 transition-all duration-300">
                <span className="text-4xl font-display font-black text-accent leading-none">“</span>
                <p className="text-xs text-text-secondary leading-relaxed font-medium italic">
                  {t.text}
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-border-subtle/50">
                  <div className="w-10 h-10 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center text-accent text-xs font-black">
                    {t.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-text-primary">{t.name}</h4>
                    <p className="text-[10px] text-text-muted font-semibold">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 9 — CTA SECTION */}
      <section className="w-full py-24 px-6 relative">
        <div className="container mx-auto max-w-4xl">
          {/* Card with Fuchsia Gradient Border */}
          <div className="p-12 md:p-16 rounded-[16px] bg-bg-card/90 border border-accent/40 shadow-[0_0_50px_rgba(192,38,211,0.08)] flex flex-col items-center text-center space-y-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-accent via-purple-500 to-accent" />
            
            <div className="space-y-4 max-w-xl">
              <h2 className="text-4xl md:text-5xl font-display font-black tracking-tight uppercase text-text-primary leading-none">
                Start Building Today
              </h2>
              <p className="text-sm text-text-secondary font-medium leading-relaxed">
                Join thousands of developers shipping beautiful mobile apps with MOBOUI. Save weeks of design and coding setup.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Button asChild variant="default" size="lg" className="w-full sm:w-auto uppercase tracking-widest text-[10px]">
                <Link href="/signup">Get Started Free</Link>
              </Button>
              <Button asChild variant="secondary" size="lg" className="w-full sm:w-auto border border-border-default bg-transparent uppercase tracking-widest text-[10px]">
                <Link href="/components">Browse Components</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
