'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Layers, Smartphone, Code2 } from 'lucide-react';

const features = [
  {
    icon: Layers,
    title: '300+ Components',
    description: 'Buttons, inputs, cards, modals, animations, and more. All mobile-optimized and production-ready.',
  },
  {
    icon: Smartphone,
    title: 'Live Preview',
    description: 'See components in action with real-time device simulators for iOS and Android. Multiple devices supported.',
  },
  {
    icon: Code2,
    title: 'Copy & Paste',
    description: 'One-click copy. Zero configuration required. Works seamlessly with Expo and Flutter CLI.',
  },
];

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

export function Features() {
  return (
    <section className="py-32 bg-black relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="container px-6 mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-left mb-20"
        >
          <span className="text-primary font-bold uppercase tracking-[0.3em] text-xs mb-4 block">Core Features</span>
          <h2 className="font-heading font-black text-4xl md:text-6xl text-white uppercase tracking-tighter">
            Everything You <span className="text-primary ">Need.</span>
          </h2>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-10"
        >
          {features.map((feature) => (
            <motion.div key={feature.title} variants={item}>
              <Card className="h-full border border-white/5 bg-neutral-900/50 backdrop-blur-sm transition-all duration-500 hover:border-primary/30 hover:bg-neutral-900 overflow-hidden group">
                <CardHeader className="p-10 h-full flex flex-col">
                  <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-primary/20">
                    <feature.icon className="w-6 h-6 text-black" />
                  </div>
                  <CardTitle className="font-heading font-black text-2xl mb-4 text-white uppercase tracking-tighter group-hover:text-primary transition-colors">
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="text-base leading-relaxed text-neutral-400 font-sans flex-grow">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
