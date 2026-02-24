"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
    },
  },
};

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-32 pb-20 overflow-hidden bg-black">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:64px_64px] -z-10" />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 blur-[150px] rounded-full -z-10" />

      <div className="container px-6 mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-start text-left"
          >
            <motion.h1
              variants={item}
              className="font-heading font-black text-6xl md:text-8xl lg:text-[7.5rem] leading-[0.85] tracking-[ -0.05em] text-white uppercase mb-8"
            >
              Master Your <br />
              <span className="text-primary">Mobile UI.</span>
            </motion.h1>

            <motion.p
              variants={item}
              className="font-sans text-xl text-neutral-400 max-w-lg leading-relaxed mb-10"
            >
              Let's build beautiful apps together! Increase your productivity with
              our production-ready mobile component library.
            </motion.p>

            <motion.div
              variants={item}
              className="flex flex-col sm:flex-row items-center gap-4 mb-20 w-full sm:w-auto"
            >
              <Button
                size="lg"
                className="btn-primary h-14 px-10 rounded-full text-sm font-black uppercase tracking-widest bg-primary text-black w-full sm:w-auto hover:bg-white transition-colors"
                asChild
              >
                <Link href="/components">
                  Explore Components <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </motion.div>

            <motion.div variants={item} className="grid grid-cols-2 sm:grid-cols-3 gap-12 pt-10 border-t border-white/10 w-full">
              <div className="flex flex-col gap-1">
                <span className="text-white font-black text-4xl tracking-tighter uppercase ">300+</span>
                <span className="text-neutral-500 text-[10px] uppercase tracking-[0.2em] font-bold">Total Components</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-white font-black text-4xl tracking-tighter uppercase ">1M+</span>
                <span className="text-neutral-500 text-[10px] uppercase tracking-[0.2em] font-bold">Total Downloads</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-white font-black text-4xl tracking-tighter uppercase ">99%</span>
                <span className="text-neutral-500 text-[10px] uppercase tracking-[0.2em] font-bold">Uptime Sla</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Vibrant Card Showcase */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="hidden lg:block relative"
          >
            <div className="relative aspect-square w-full max-w-[600px] ml-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-[#FF2D95] via-[#BC34FE] to-[#00D2FF] rounded-[40px] shadow-2xl overflow-hidden group">
                <div className="absolute inset-0 bg-black/10 transition-opacity group-hover:opacity-0" />
                {/* Abstract shapes/glows within the card to match inspiration */}
                <div className="absolute top-[10%] left-[10%] w-[80%] h-[80%] bg-white/20 blur-[100px] rounded-full animate-pulse" />
                <div className="absolute -bottom-20 -right-20 w-[400px] h-[400px] bg-cyan-400/40 blur-[100px] rounded-full" />

                {/* Logo/Icon overlay like in image */}
                <div className="absolute bottom-10 left-10 text-white font-black text-6xl opacity-20">
                  w.
                </div>
              </div>
              {/* Floating element snippet */}
              <div className="absolute -bottom-4 -left-4 bg-black border border-white/10 p-6 rounded-3xl shadow-2xl">
                <div className="h-3 w-20 bg-primary/50 rounded-full mb-3" />
                <div className="h-3 w-12 bg-white/20 rounded-full" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

