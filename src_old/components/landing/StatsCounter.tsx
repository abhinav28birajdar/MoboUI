"use client";

import { CountUp } from "@/components/animations/CountUp";
import { motion } from "framer-motion";

const stats = [
    { label: "Components", value: 317, suffix: "" },
    { label: "Categories", value: 18, suffix: "" },
    { label: "Frameworks", value: 2, suffix: "" },
    { label: "Previews", value: 317, suffix: "" },
];

export function StatsCounter() {
    return (
        <section className="py-24 bg-black relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-white/[0.01] bg-[length:60px_60px]" />
            <div className="container px-6 mx-auto relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="text-left"
                        >
                            <div className="text-5xl md:text-7xl font-black text-white mb-2 tracking-tighter">
                                <CountUp end={stat.value} suffix={stat.suffix} />
                            </div>
                            <p className="text-primary font-black uppercase tracking-[0.2em] text-xs">
                                {stat.label}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
