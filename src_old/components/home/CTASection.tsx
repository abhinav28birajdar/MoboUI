"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Zap } from "lucide-react";
import Link from "next/link";

export function CTASection() {
  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-primary/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 -right-40 w-96 h-96 bg-accent-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-[3rem] overflow-hidden"
        >
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-text-primary via-text-primary to-text-primary/95" />
          
          {/* Pattern Overlay */}
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
          
          {/* Animated Accent */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/20 -skew-x-12 translate-x-1/3 opacity-50 blur-3xl" />

          {/* Content */}
          <div className="relative z-10 p-16 md:p-24 lg:p-32">
            <div className="max-w-3xl mx-auto text-center">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 border border-white/30 text-white text-xs font-bold uppercase tracking-[0.2em] mb-8 backdrop-blur-md"
              >
                <Sparkles size={14} />
                Ready to Build?
              </motion.div>

              {/* Headline */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6 leading-tight tracking-tight"
              >
                Start Building Faster Today
              </motion.h2>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-white/80 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed"
              >
                Join thousands of developers using MOBOUI to create beautiful, performant mobile applications. Start your free trial today.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <Link href="/components">
                  <Button className="h-14 px-10 bg-accent-500 hover:bg-accent-600 text-text-primary font-bold text-base rounded-2xl transition-all shadow-[0_10px_30px_rgba(243,222,44,0.3)] hover:shadow-[0_15px_40px_rgba(243,222,44,0.4)] hover:scale-105 group">
                    Explore Components
                    <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>

                <Link href="/docs">
                  <Button
                    variant="outline"
                    className="h-14 px-10 border-2 border-white/30 bg-white/10 hover:bg-white/20 text-white font-bold text-base rounded-2xl transition-all backdrop-blur-md"
                  >
                    Read Documentation
                  </Button>
                </Link>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="mt-16 pt-12 border-t border-white/20 flex flex-col md:flex-row justify-center items-center gap-12 md:gap-16"
              >
                {[
                  { label: "Components", value: "50+" },
                  { label: "Active Users", value: "12K+" },
                  { label: "Avg. Rating", value: "4.9★" },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className="text-center"
                  >
                    <p className="text-3xl font-bold text-white font-display">{stat.value}</p>
                    <p className="text-white/60 text-sm font-medium mt-2">{stat.label}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
