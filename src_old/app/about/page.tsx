'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Users, Heart, Zap, Globe, Sparkles, Star, Award } from 'lucide-react';

export default function AboutPage() {
  const stats = [
    { icon: Users, label: 'Active Developers', value: '15,000+' },
    { icon: Heart, label: 'Satisfaction Rate', value: '99.4%' },
    { icon: Zap, label: 'Layout Efficiency', value: '3.5x' },
    { icon: Globe, label: 'Supported Locales', value: '120+' },
  ];

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-32">
      <div className="container px-6 mx-auto relative overflow-hidden">
        {/* Background Glows */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/5 blur-[150px] -z-10 rounded-full pointer-events-none" />

        {/* Page Header */}
        <div className="max-w-4xl mx-auto text-center mb-20 space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/5 text-[10px] font-black uppercase tracking-[0.3em] text-neutral-500"
          >
            <Award size={14} className="text-primary" />
            OUR MISSION & VISION
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-heading font-black tracking-tighter uppercase leading-none"
          >
            DESIGN FASTER. <br />
            <span className="text-primary neon-text-glow">BUILD BETTER.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-neutral-400 max-w-2xl mx-auto font-medium leading-relaxed"
          >
            MOBOUI was born to bridge the gap between high-fidelity interactive design and mobile codebase layouts.
          </motion.p>
        </div>

        {/* Core Vision Sections */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-neutral-900/35 border border-white/5 p-10 rounded-[2.5rem] space-y-6 hover:border-primary/20 transition-all duration-300 shadow-sm"
          >
            <h3 className="text-3xl font-heading font-black uppercase tracking-tight text-white flex items-center gap-2">
              <Sparkles className="text-primary" size={24} /> The Vision.
            </h3>
            <p className="text-neutral-400 text-base leading-relaxed font-medium">
              We believe mobile applications should never suffer from generic layout configurations or laggy transition timelines. By building reusable, framework-agnostic design definitions, we empower developers to launch state-of-the-art products in days rather than months.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-neutral-900/35 border border-white/5 p-10 rounded-[2.5rem] space-y-6 hover:border-primary/20 transition-all duration-300 shadow-sm"
          >
            <h3 className="text-3xl font-heading font-black uppercase tracking-tight text-white flex items-center gap-2">
              <Star className="text-primary" size={24} /> The Library.
            </h3>
            <p className="text-neutral-400 text-base leading-relaxed font-medium">
              With thousands of layout iterations, custom animation profiles, and full integration frameworks for Flutter, React Native, and Expo, MOBOUI is the most comprehensive design ecosystem built specifically for mobile screens.
            </p>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <div className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-neutral-900/50 border border-white/5 p-8 rounded-[2rem] text-center hover:border-primary/20 transition-colors"
            >
              <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4 text-primary">
                <stat.icon size={20} />
              </div>
              <p className="text-3xl font-black text-white tracking-tight">{stat.value}</p>
              <p className="text-[10px] font-black uppercase tracking-widest text-neutral-500 mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
