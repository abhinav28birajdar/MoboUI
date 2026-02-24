'use client';

import { motion } from 'framer-motion';

const techs = [
    {
        name: "Next.js",
        desc: "App Infrastructure",
        icon: (
            <svg viewBox="0 0 128 128" className="w-8 h-8 fill-white">
                <path d="M64 0C28.7 0 0 28.7 0 64s28.7 64 64 64c11.2 0 21.7-2.9 30.8-7.9L48.4 55.4v31.3h-7.8V41.1h7.8l47.5 61.6c8.9-10.4 14.3-23.9 14.3-38.7 0-35.3-28.7-64-64-64zm37.8 41.1v23.1L64 41.1h37.8z" />
            </svg>
        )
    },
    {
        name: "TypeScript",
        desc: "Type Safety",
        icon: (
            <svg viewBox="0 0 128 128" className="w-8 h-8 fill-[#3178C6]">
                <path d="M1.5 1.5h125v125h-125V1.5zm104.3 104.3V38.5h-13v67.3h13zm-27.4 0V51h-12.9v54.8h12.9zm-26.3 0V63.5H39.2v42.3h12.9z" />
            </svg>
        )
    },
    {
        name: "Tailwind",
        desc: "Modern Styling",
        icon: (
            <svg viewBox="0 0 128 128" className="w-8 h-8 fill-[#38BDF8]">
                <path d="M64 32c-12 0-18 6-18 18 0 12 6 18 18 18s18-6 18-18c0-12-6-18-18-18zm0 46c-17.7 0-32 14.3-32 32s14.3 32 32 32 32-14.3 32-32-14.3-32-32-32z" />
            </svg>
        )
    },
    {
        name: "React Native",
        desc: "Native Bridge",
        icon: (
            <svg viewBox="0 0 128 128" className="w-8 h-8 fill-[#61DAFB]">
                <path d="M64 53.9c-2.8 0-5.1 2.3-5.1 5.1s2.3 5.1 5.1 5.1 5.1-2.3 5.1-5.1-2.3-5.1-5.1-5.1z" /><path d="M121 54.3c-.3-1.1-.9-2.1-1.7-2.9-.8-.8-1.8-1.4-2.9-1.7-1.1-.3-2.3-.3-3.4-.1l-9.5 2c-3.1-6.1-7.2-11.7-12.1-16.6-4.9-4.9-10.5-9-16.6-12.1l2-9.5c.2-1.1.2-2.3-.1-3.4-.3-1.1-.9-2.1-1.7-2.9-.8-.8-1.8-1.4-2.9-1.7-1.1-.3-2.3-.3-3.4-.1l-9.5 2c-6.1-3.1-11.7-7.2-16.6-12.1C34.7 6.4 30.6 2.3 27.5-.8l2-9.5c.2-1.1.2-2.3-.1-3.4-.3-1.1-.9-2.1-1.7-2.9-.8-.8-1.8-1.4-2.9-1.7-1.1-.3-2.3-.3-3.4-.1l-9.5 2c-3.1 6.1-7.2 11.7-12.1 16.6-4.9 4.9-9 10.5-12.1 16.6l-9.5-2c-1.1-.2-2.3-.2-3.4.1-1.1.3-2.1.9-2.9 1.7-.8.8-1.4 1.8-1.7 2.9-.3 1.1-.3 2.3-.1 3.4l2 9.5c-3.1 6.1-7.2 11.7-12.1 16.6-4.9 4.9-9 10.5-12.1 16.6l-9.5-2c-1.1-.2-2.3-.2-3.4.1-2.3.6-3.8 2.3-3.8 4.6 0 2.3 1.5 4 3.8 4.6l9.5 2c3.1 6.1 7.2 11.7 12.1 16.6 4.9 4.9 10.5 9 16.6 12.1l-2 9.5c-.2 1.1-.2 2.3.1 3.4.3 1.1.9 2.1 1.7 2.9.8.8 1.8 1.4 2.9 1.7 1.1.3 2.3.3 3.4.1l9.5-2c6.1 3.1 11.7 7.2 16.6 12.1 4.9 4.9 9 10.5 12.1 16.6l-2 9.5c-.2 1.1-.2 2.3.1 3.4.3 1.1.9 2.1 1.7 2.9.8.8 1.8 1.4 2.9 1.7 1.1.3 2.3.3 3.4.1l9.5-2c3.1-6.1 7.2-11.7 12.1-16.6 4.9-4.9 9-10.5 12.1-16.6l9.5 2c1.1.2 2.3.2 3.4-.1 1.1-.3 2.1-.9 2.9-1.7.8-.8 1.4-1.8 1.7-2.9.3-1.1.3-2.3.1-3.4l-2-9.5c3.1-6.1 7.2-11.7 12.1-16.6 4.9-4.9 9-10.5 12.1-16.6l9.5 2c1.1.2 2.3.2 3.4-.1 2.3-.6 3.8-2.3 3.8-4.6 0-2.3-1.5-4-3.8-4.6l-9.5-2z" />
            </svg>
        )
    },
    {
        name: "Flutter",
        desc: "Pixel Perfect",
        icon: (
            <svg viewBox="0 0 128 128" className="w-8 h-8 fill-[#02569B]">
                <path d="M128 64l-42.7 42.7H42.7L64 85.3 42.7 64h42.6L128 64zM85.3 21.3L42.7 64l21.3 21.3L106.7 42.7 85.3 21.3z" />
            </svg>
        )
    },
    {
        name: "Expo",
        desc: "Fast Iteration",
        icon: (
            <svg viewBox="0 0 128 128" className="w-8 h-8 fill-white">
                <path d="M64 0C28.7 0 0 28.7 0 64s28.7 64 64 64 64-28.7 64-64S99.3 0 64 0zm0 110.7c-25.8 0-46.7-20.9-46.7-46.7S38.2 17.3 64 17.3 110.7 38.2 110.7 64 89.8 110.7 64 110.7z" />
            </svg>
        )
    },
];

export function TechStack() {
    return (
        <section className="py-32 bg-black relative overflow-hidden">
            {/* Background Accent */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 blur-[120px] rounded-full -z-10" />

            <div className="container px-6 mx-auto relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-[10px] font-black uppercase tracking-[0.4em] text-primary"
                    >
                        The Ecosystem
                    </motion.span>
                    <h2 className="font-heading font-black text-5xl md:text-7xl mb-6 tracking-tighter uppercase  text-white leading-[0.9]">
                        Powering Modern <span className="text-primary neon-text-glow">Development</span>
                    </h2>
                    <p className="text-neutral-400 text-lg font-medium max-w-2xl mx-auto leading-relaxed">
                        Built on an industrial-grade stack. Our components are native by design,
                        performant by nature, and developer-obsessed.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {techs.map((tech, i) => (
                        <motion.div
                            key={tech.name}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="group p-10 rounded-[40px] bg-neutral-900/50 border border-white/5 hover:border-primary/30 transition-all cursor-pointer relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl -z-10 group-hover:bg-primary/10 transition-all duration-700" />

                            <div className="w-16 h-16 mb-8 bg-black rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 border border-white/5">
                                {tech.icon}
                            </div>

                            <div className="space-y-2">
                                <h3 className="font-heading font-black text-2xl text-white uppercase  tracking-tight group-hover:text-primary transition-colors">
                                    {tech.name}
                                </h3>
                                <p className="text-sm text-neutral-500 font-bold uppercase tracking-widest">{tech.desc}</p>
                            </div>

                            <div className="mt-6 flex items-center gap-2">
                                <span className="h-1 w-12 bg-primary/20 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ x: '-100%' }}
                                        whileInView={{ x: '0%' }}
                                        transition={{ duration: 1, delay: 0.5 + (i * 0.1) }}
                                        className="h-full w-full bg-primary"
                                    />
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
