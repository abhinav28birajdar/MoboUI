import React from 'react';
import {
    Code2,
    स्मार्टफोन,
    Layers,
    Smartphone,
    Wind,
    Layers as Framer,
    Terminal,
    Zap
} from 'lucide-react';

const techs = [
    { name: "React Native", icon: Smartphone },
    { name: "Flutter", icon: Code2 },
    { name: "Expo", icon: Zap },
    { name: "TypeScript", icon: Terminal },
    { name: "Tailwind CSS", icon: Wind },
    { name: "Framer Motion", icon: Framer }
];

export default function TechStack() {
    return (
        <section className="py-20 border-y border-border/50">
            <div className="container px-4 mx-auto">
                <p className="text-center text-muted-foreground font-medium uppercase tracking-[0.2em] text-xs mb-12">
                    Work with the tools you love
                </p>
                <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 lg:gap-24 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700">
                    {techs.map((tech) => (
                        <div key={tech.name} className="flex flex-col items-center gap-3 group cursor-default">
                            <tech.icon className="w-8 h-8 md:w-10 md:h-10 group-hover:text-primary transition-colors" />
                            <span className="font-bold text-[10px] md:text-sm tracking-widest">{tech.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
