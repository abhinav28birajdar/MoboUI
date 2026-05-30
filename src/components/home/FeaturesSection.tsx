"use client";

import { motion } from "framer-motion";
import { Zap, Target, Palette, Rocket, Shield, Sparkles } from "lucide-react";

const features = [
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Lightning Fast",
    description: "Optimized components that render at 60fps with minimal bundle impact",
  },
  {
    icon: <Target className="w-6 h-6" />,
    title: "Pixel Perfect",
    description: "Meticulously designed following modern mobile design patterns",
  },
  {
    icon: <Palette className="w-6 h-6" />,
    title: "Fully Customizable",
    description: "Complete control over colors, sizes, and animations with simple props",
  },
  {
    icon: <Rocket className="w-6 h-6" />,
    title: "Production Ready",
    description: "Every component tested and battle-hardened in production apps",
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Type Safe",
    description: "Full TypeScript support with strict type checking",
  },
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: "Future Proof",
    description: "Regular updates and new features based on community feedback",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export function FeaturesSection() {
  return (
    <section className="py-32 relative overflow-hidden bg-gradient-to-b from-background via-surface to-background">
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-300/5 blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-bold uppercase tracking-[0.2em] mb-6">
            <Sparkles size={14} />
            Why Choose MOBOUI
          </div>
          <h2 className="text-5xl md:text-6xl font-display font-medium text-text-primary mb-6 tracking-tight">
            Everything You Need
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Comprehensive component library with all the tools and features needed to build modern mobile applications
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative p-8 rounded-3xl bg-white border border-border/40 hover:border-primary/30 transition-all duration-300 hover:shadow-[0_20px_40px_rgba(243,222,44,0.1)]"
            >
              {/* Hover Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-300 pointer-events-none" />

              {/* Content */}
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent-500 flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-3 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
