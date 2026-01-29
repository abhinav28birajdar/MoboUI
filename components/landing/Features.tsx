import React from 'react';
import {
    Palette,
    Smartphone,
    Copy,
    Monitor,
    Code2,
    Zap,
    Globe,
    Lock,
    Layers
} from 'lucide-react';

const features = [
    {
        title: "Copy-Paste Ready",
        description: "No complex npm installs. Just browse, copy the code, and paste it directly into your project.",
        icon: Copy,
        color: "text-blue-500",
        bg: "bg-blue-500/10"
    },
    {
        title: "Live Preview",
        description: "See your components in real-time with our built-in mobile emulator supporting iOS and Android frames.",
        icon: Smartphone,
        color: "text-purple-500",
        bg: "bg-purple-500/10"
    },
    {
        title: "Multi-Theme Support",
        description: "Built-in support for Light, Dark, and custom themes with easy configuration generators.",
        icon: Palette,
        color: "text-pink-500",
        bg: "bg-pink-500/10"
    },
    {
        title: "Interactive Playground",
        description: "Tweak props and styles live in our integrated Monaco-powered editor before you copy.",
        icon: Monitor,
        color: "text-cyan-500",
        bg: "bg-cyan-500/10"
    },
    {
        title: "Universal Support",
        description: "Definitive library for both React Native (Expo/Vanilla) and Flutter developers.",
        icon: Globe,
        color: "text-green-500",
        bg: "bg-green-500/10"
    },
    {
        title: "Zero Dependency",
        description: "Clean code with minimal external libraries, keeping your mobile app bundle lean and fast.",
        icon: Zap,
        color: "text-yellow-500",
        bg: "bg-yellow-500/10"
    }
];

export default function Features() {
    return (
        <section className="container px-4 py-20 mx-auto">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold mb-4">Everything you need to <span className="text-primary">ship faster</span></h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    We built the tools so you can focus on building your product.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                    <div
                        key={index}
                        className="group p-8 rounded-[2rem] border border-border bg-surface/30 hover:bg-surface/50 hover:border-primary/20 transition-all duration-300"
                    >
                        <div className={`w-12 h-12 rounded-2xl ${feature.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                            <feature.icon className={`w-6 h-6 ${feature.color}`} />
                        </div>
                        <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            {feature.description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
