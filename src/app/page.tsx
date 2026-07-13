'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial } from '@react-three/drei';
import { Sparkles, Code, Smartphone, Check, ArrowRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ComponentCard } from '@/components/ComponentCard';
import { components as mockComponents } from '@/lib/data/components';

// --- 3D Background Component ---
function AmbientBackground() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-40 md:opacity-60 mix-blend-screen">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        
        {/* Main Accent Sphere */}
        <Float speed={2} rotationIntensity={1} floatIntensity={2}>
          <Sphere args={[1.5, 64, 64]} position={[2.5, 0, -2]}>
            <MeshDistortMaterial
              color="#c026d3" // Fuchsia accent
              attach="material"
              distort={0.4}
              speed={2}
              roughness={0.2}
              metalness={0.8}
            />
          </Sphere>
        </Float>

        {/* Secondary Purple Sphere */}
        <Float speed={1.5} rotationIntensity={2} floatIntensity={1.5}>
          <Sphere args={[1.2, 64, 64]} position={[-3, 1.5, -4]}>
            <MeshDistortMaterial
              color="#7c3aed" // Deep purple
              attach="material"
              distort={0.5}
              speed={1.5}
              roughness={0.3}
              metalness={0.7}
            />
          </Sphere>
        </Float>
      </Canvas>
    </div>
  );
}

// --- Animation Variants ---
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

// --- CountUp Component ---
function CountUp({ end, label, prefix = '', suffix = '' }: { end: number; label: string; prefix?: string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isInView) {
      let start = 0;
      const duration = 2000;
      const intervalTime = 16; 
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
    <motion.div 
      ref={ref}
      variants={fadeInUp}
      className="text-center p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl hover:bg-white/10 transition-colors duration-300"
    >
      <div className="text-4xl md:text-5xl font-display font-black text-accent mb-2 drop-shadow-[0_0_15px_rgba(192,38,211,0.5)]">
        {prefix}{count}{suffix}
      </div>
      <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">{label}</div>
    </motion.div>
  );
}

const PHONE_PREVIEWS = [
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=412&h=916&fit=crop",
  "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=412&h=916&fit=crop",
  "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=412&h=916&fit=crop"
];

const TESTIMONIALS_DATA = [
  {
    text: "MoboUI saved us weeks of work. The components are gorgeous, easy to drop into Expo, and fully responsive across iOS and Android.",
    name: "Alex Rivera",
    role: "Lead Mobile Architect"
  },
  {
    text: "Being able to run live tests in the emulators with zero configurations changed the game for our design feedback cycles.",
    name: "Meera Patel",
    role: "Senior UI Engineer"
  },
  {
    text: "The cleanest Flutter code blocks I've seen in any component catalog. Extremely high standards of visual excellence.",
    name: "Marcus Thorne",
    role: "Independent Dev"
  }
];

export default function HomePage() {
  const [currentPreviewIdx, setCurrentPreviewIdx] = useState(0);
  const featuredComponents = mockComponents.slice(0, 6);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPreviewIdx((prev) => (prev + 1) % PHONE_PREVIEWS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full bg-[#0a0a0a] text-white overflow-x-hidden selection:bg-accent selection:text-white">
      
      {/* SECTION 1 — HERO */}
      <section className="min-h-screen w-full flex items-center relative py-20 px-6 overflow-hidden">
        <AmbientBackground />
        
        {/* Glow Effects */}
        <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-fuchsia-600/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[150px] pointer-events-none" />

        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Left Hero Content */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-8"
          >
            <motion.span variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-accent text-xs font-black uppercase tracking-widest shadow-[0_0_20px_rgba(192,38,211,0.2)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
              Now with Live Emulators
            </motion.span>
            
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl lg:text-8xl font-display font-black tracking-tighter leading-[1.1] uppercase">
              Build Beautiful <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-fuchsia-400 to-purple-500 drop-shadow-sm">
                Mobile Apps
              </span> <br />
              Faster
            </motion.h1>
            
            <motion.p variants={fadeInUp} className="text-lg md:text-xl text-gray-400 max-w-xl leading-relaxed font-medium">
              Premium, glassmorphic, and production-ready components for Flutter, React Native & Expo. 
            </motion.p>
            
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto pt-4">
              <Button asChild variant="default" size="lg" className="w-full sm:w-auto uppercase tracking-widest text-xs h-14 px-8 shadow-[0_0_30px_rgba(192,38,211,0.3)] hover:shadow-[0_0_40px_rgba(192,38,211,0.5)] transition-shadow">
                <Link href="/components">Browse Components</Link>
              </Button>
              <Button asChild variant="secondary" size="lg" className="w-full sm:w-auto uppercase tracking-widest text-xs h-14 px-8 bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10">
                <Link href="/playground">Open Playground</Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Phone Mockup (3D Hover Effect) */}
          <motion.div 
            initial={{ opacity: 0, x: 50, rotateY: -15 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="lg:col-span-5 hidden lg:flex justify-center items-center relative perspective-1000"
          >
            <motion.div 
              whileHover={{ scale: 1.05, rotateY: -10, rotateX: 5 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="relative w-[300px] h-[600px] rounded-[40px] border-[2px] border-white/20 bg-zinc-950 p-2 shadow-[0_30px_60px_rgba(0,0,0,0.8),0_0_50px_rgba(192,38,211,0.2)] backdrop-blur-xl"
            >
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-black z-20 shadow-inner" />
              <div className="w-full h-full rounded-[32px] bg-black overflow-hidden relative border border-white/10">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentPreviewIdx}
                    src={PHONE_PREVIEWS[currentPreviewIdx]}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, filter: "blur(10px)" }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="w-full h-full object-cover"
                    alt="Mobile Preview Screen"
                  />
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2 — CHANGELOG STRIP */}
      <section className="w-full py-4 bg-white/5 backdrop-blur-md border-y border-white/10 overflow-hidden relative z-20">
        <div className="w-full flex">
          <motion.div 
            animate={{ x: [0, -1035] }} 
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            className="whitespace-nowrap flex gap-16 text-xs font-black uppercase tracking-widest text-gray-400 select-none"
          >
            {[...Array(2)].map((_, i) => (
              <React.Fragment key={i}>
                <span className="text-accent">✦ Flutter Live</span>
                <span>✦ 50+ Components</span>
                <span>✦ React Native Preview</span>
                <span>✦ Expo SDK</span>
                <span>✦ Premium UI</span>
                <span>✦ Glassmorphism</span>
              </React.Fragment>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 3 — FEATURED COMPONENTS GRID */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="w-full py-32 px-6 relative"
      >
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-600/10 blur-[100px] pointer-events-none" />
        <div className="container mx-auto space-y-16 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-6 gap-6">
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-display font-black tracking-tight uppercase">
              Premium <span className="text-accent">Components</span>
            </motion.h2>
            <motion.div variants={fadeInUp}>
              <Link href="/components" className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-accent transition-colors flex items-center gap-2 group">
                View Gallery <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredComponents.map((component, idx) => (
              <motion.div key={component.slug} variants={fadeInUp}>
                <ComponentCard component={component} />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* SECTION 4 — THREE EMULATORS */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="w-full py-32 px-6 bg-black/40 border-y border-white/5 relative"
      >
        <div className="container mx-auto space-y-20">
          <motion.div variants={fadeInUp} className="text-center space-y-6 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-display font-black tracking-tight uppercase leading-tight">
              Three Live Emulators. <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-gray-200">Zero Setup.</span>
            </h2>
            <p className="text-base text-gray-400 font-medium">
              Write, compile, and run your layouts instantly inside the browser with high-fidelity previews.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto perspective-1000">
            {/* React Native Card (Heroed) */}
            <motion.div variants={fadeInUp} whileHover={{ y: -10 }} className="lg:col-start-2 lg:col-span-1 lg:-mt-8">
              <Card className="h-full p-8 bg-white/5 backdrop-blur-xl border-accent/40 shadow-[0_20px_50px_rgba(192,38,211,0.15)] ring-1 ring-accent/30 flex flex-col justify-between relative overflow-hidden group rounded-3xl">
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-accent/20 blur-3xl rounded-full" />
                <Badge className="absolute top-6 right-6 bg-accent text-white text-[9px] font-black tracking-widest px-3 py-1 uppercase border-none shadow-[0_0_15px_rgba(192,38,211,0.5)]">
                  Most Used
                </Badge>
                
                <div className="space-y-6 relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-accent/20 border border-accent/40 flex items-center justify-center text-accent shadow-lg shadow-accent/20">
                    <Smartphone size={28} />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-2xl font-display font-black uppercase">React Native</h3>
                    <p className="text-sm text-gray-400 leading-relaxed font-medium">
                      Expo Snack-style environment. Fast refresh, Metro logs, multi-device testing.
                    </p>
                  </div>
                </div>
                <Button asChild className="mt-10 w-full uppercase tracking-widest text-[10px] h-12 bg-accent hover:bg-accent/90 text-white relative z-10">
                  <Link href="/playground?framework=react-native">Launch Engine →</Link>
                </Button>
              </Card>
            </motion.div>

            {/* Flutter Card */}
            <motion.div variants={fadeInUp} whileHover={{ y: -10 }} className="lg:col-start-1 lg:row-start-1">
              <Card className="h-full p-8 bg-white/5 backdrop-blur-xl border-white/10 flex flex-col justify-between group rounded-3xl hover:border-blue-500/50 transition-colors">
                 <div className="space-y-6">
                  <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                    <Code size={28} />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-2xl font-display font-black uppercase">Flutter</h3>
                    <p className="text-sm text-gray-400 leading-relaxed font-medium">
                      Full DartPad-powered preview. Hot reload, widget inspector, and performance monitors.
                    </p>
                  </div>
                </div>
                <Button asChild variant="ghost" className="mt-10 w-full border border-white/10 hover:bg-white/5 uppercase tracking-widest text-[10px] h-12">
                  <Link href="/playground?framework=flutter">Try Flutter →</Link>
                </Button>
              </Card>
            </motion.div>

            {/* Expo Card */}
            <motion.div variants={fadeInUp} whileHover={{ y: -10 }} className="lg:col-start-3 lg:row-start-1">
              <Card className="h-full p-8 bg-white/5 backdrop-blur-xl border-white/10 flex flex-col justify-between group rounded-3xl hover:border-purple-500/50 transition-colors">
                <div className="space-y-6">
                  <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                    <Sparkles size={28} />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-2xl font-display font-black uppercase">Expo SDK</h3>
                    <p className="text-sm text-gray-400 leading-relaxed font-medium">
                      Full Expo SDK support. Router, Camera, Notifications, Maps, OTA previews.
                    </p>
                  </div>
                </div>
                <Button asChild variant="ghost" className="mt-10 w-full border border-white/10 hover:bg-white/5 uppercase tracking-widest text-[10px] h-12">
                  <Link href="/playground?framework=expo">Try Expo →</Link>
                </Button>
              </Card>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* SECTION 5 — STATS */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="w-full py-24 px-6 border-b border-white/5 relative"
      >
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <CountUp end={50} label="Components" suffix="+" />
            <CountUp end={3} label="Live Emulators" />
            <CountUp end={10} label="Developers" suffix="K+" />
            
            <motion.div variants={fadeInUp} className="text-center p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl flex flex-col justify-center items-center shadow-lg">
              <div className="text-4xl md:text-5xl font-display font-black text-accent mb-2">
                WCAG
              </div>
              <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">AA Compliant</div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* SECTION 6 — CTA */}
      <section className="w-full py-32 px-6 relative overflow-hidden">
        {/* Glow behind CTA */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-accent/20 blur-[150px] pointer-events-none rounded-full" />
        
        <div className="container mx-auto max-w-4xl relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="p-12 md:p-20 rounded-[32px] bg-white/5 backdrop-blur-2xl border border-white/20 shadow-[0_0_80px_rgba(192,38,211,0.15)] flex flex-col items-center text-center space-y-10 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent" />
            
            <div className="space-y-6 max-w-2xl">
              <h2 className="text-4xl md:text-6xl font-display font-black tracking-tighter uppercase leading-none">
                Start Building <br/><span className="text-accent">Today</span>
              </h2>
              <p className="text-base text-gray-300 font-medium leading-relaxed">
                Join thousands of developers shipping beautiful, glassmorphic mobile apps with MOBOUI. Skip the boilerplate and focus on product.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto">
              <Button asChild variant="default" size="lg" className="w-full sm:w-auto uppercase tracking-widest text-xs h-14 px-10 shadow-[0_0_30px_rgba(192,38,211,0.4)]">
                <Link href="/signup">Get Started Free</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}