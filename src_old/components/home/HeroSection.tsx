"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronRight, Play, Sparkles, ShieldCheck, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

// --- Advanced Animation Variants ---
const staggerContainer = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const textBlurReveal: any = {
  initial: { opacity: 0, y: 20, filter: "blur(8px)" },
  animate: { 
    opacity: 1, 
    y: 0, 
    filter: "blur(0px)", 
    transition: { duration: 0.8, ease: "easeInOut" } 
  },
};

const floatingElement: any = {
  animate: {
    y: [0, -15, 0],
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export const HeroSection = () => {
  const { scrollY } = useScroll();
  // Smooth parallax for scroll
  const y1 = useTransform(scrollY, [0, 500], [0, -120]);
  const y2 = useTransform(scrollY, [0, 500], [0, -60]);

  return (
    <section className="relative min-h-[90vh] flex items-center pt-24 pb-16 overflow-hidden bg-background">
      {/* --- Dynamic Background Elements --- */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/15 blur-[140px] rounded-full" 
        />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-40 mask-[linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* --- Left Column: Content --- */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="flex flex-col"
          >
            {/* Animated Badge */}
            <motion.div variants={textBlurReveal} className="mb-8">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-bold uppercase tracking-[0.2em] shadow-[0_4px_12px_rgba(0,0,0,0.1)] backdrop-blur-md">
                <Sparkles size={14} className="animate-pulse" />
                New v3.0 Components live
              </span>
            </motion.div>

            {/* Staggered Text Reveal Headline */}
            <motion.h1 className="text-6xl md:text-7xl lg:text-[5.5rem] font-medium tracking-tighter text-text-primary mb-6 leading-[1.05] font-display">
              <motion.span variants={textBlurReveal} className="block">Build mobile</motion.span>
              <motion.span variants={textBlurReveal} className="block">
                <span className="pr-4 text-primary font-semibold italic">
                  interfaces
                </span>
              </motion.span>
              <motion.span variants={textBlurReveal} className="block">in minutes.</motion.span>
            </motion.h1>

            <motion.p 
              variants={textBlurReveal}
              className="text-lg md:text-xl text-text-secondary max-w-lg mb-10 leading-relaxed font-medium"
            >
              The ultimate design system for Flutter and React Native. Ship high-performance apps with pre-built, conversion-optimized components.
            </motion.p>

            <motion.div variants={textBlurReveal} className="flex flex-wrap gap-5">
              <Button size="lg" className="h-14 px-8 rounded-2xl bg-primary hover:bg-primary-hover text-primary-foreground font-medium text-base transition-all shadow-[0_4px_12px_rgba(0,0,0,0.2)] hover:shadow-[0_6px_16px_rgba(0,0,0,0.25)] hover:-translate-y-1 group">
                Get Started
                <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
              </Button>
              
              <Button variant="ghost" size="lg" className="h-14 px-8 rounded-2xl border border-border/50 bg-surface/30 backdrop-blur-md font-medium text-base hover:bg-surface hover:-translate-y-1 transition-all">
                <Play size={16} className="mr-2 fill-current" />
                Watch Demo
              </Button>
            </motion.div>

            {/* Social Proof / Stats */}
            <motion.div variants={textBlurReveal} className="mt-16 pt-8 border-t border-border/40 flex gap-12">
              <div className="group cursor-pointer">
                <p className="text-3xl font-bold font-display group-hover:text-primary transition-colors">12k+</p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-text-muted font-bold mt-1">Developers</p>
              </div>
              <div className="group cursor-pointer">
                <p className="text-3xl font-bold font-display group-hover:text-primary transition-colors">4.9/5</p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-text-muted font-bold mt-1">Rating</p>
              </div>
            </motion.div>
          </motion.div>

          {/* --- Right Column: Visual Stack --- */}
          <div className="relative lg:h-175 flex items-center justify-center mt-12 lg:mt-0">
            
            {/* Frameless, Larger Main Image with Levitation & Parallax */}
            <motion.div 
              style={{ y: y2 }}
              className="relative z-20 w-full flex justify-center"
            >
              <motion.img 
                variants={floatingElement}
                animate="animate"
                src="/assets/mobileimage1.png" 
                alt="Main UI Preview" 
                // Removed all border/rounded clipping. Added massive drop-shadow & larger max-width
                className="w-full max-w-120 object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.3)] dark:drop-shadow-[0_30px_60px_rgba(0,0,0,0.4)]"
              />
            </motion.div>

            {/* Floating Card 1: Features (Parallax + Float) */}
            <motion.div
              style={{ y: y1 }}
              initial={{ opacity: 0, scale: 0.8, x: 50 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.8, type: "spring" }}
              className="absolute -right-4 md:right-4 top-1/4 z-30 bg-background/70 backdrop-blur-2xl p-4 rounded-3xl border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.1)] hidden md:flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground shadow-inner">
                <Zap size={22} className="fill-white/20" />
              </div>
              <div className="pr-2">
                <p className="text-sm font-bold text-text-primary">Fast Refresh</p>
                <p className="text-[11px] text-text-muted font-medium mt-0.5">Optimized 60fps</p>
              </div>
            </motion.div>

            {/* Floating Card 2: Security (Parallax + Float) */}
            <motion.div
              style={{ y: y1 }}
              initial={{ opacity: 0, scale: 0.8, x: -50 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ delay: 1.1, duration: 0.8, type: "spring" }}
              className="absolute -left-4 md:left-4 bottom-1/4 z-30 bg-background/70 backdrop-blur-2xl p-4 rounded-3xl border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.1)] hidden md:flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-inner">
                <ShieldCheck size={22} className="fill-white/20" />
              </div>
              <div className="pr-2">
                <p className="text-sm font-bold text-text-primary">Enterprise</p>
                <p className="text-[11px] text-text-muted font-medium mt-0.5">Bank-grade security</p>
              </div>
            </motion.div>

            {/* Central Decorative Glow behind frameless image */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[70%] bg-primary/20 blur-[120px] rounded-full -z-10" />
          </div>

        </div>
      </div>
    </section>
  );
};