'use client';

import { motion } from 'framer-motion';
import { Package, Terminal, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const reactNativeDeps = [
    { name: 'lucide-react-native', purpose: 'Icons' },
    { name: 'expo-linear-gradient', purpose: 'Gradient backgrounds' },
    { name: 'expo-blur', purpose: 'Glassmorphism effects' },
    { name: 'react-native-reanimated', purpose: 'Advanced animations' },
    { name: 'react-native-gesture-handler', purpose: 'Touch interactions' },
    { name: '@react-navigation/native', purpose: 'Navigation' },
];

const flutterDeps = [
    { name: 'lucide_icons', purpose: 'Icons' },
    { name: 'google_fonts', purpose: 'Typography' },
    { name: 'flutter_inset_box_shadow', purpose: 'Neumorphism effects' },
    { name: 'provider', purpose: 'State management' },
    { name: 'animations', purpose: 'Material motion' },
];

export default function DependenciesPage() {
    return (
        <div className="container mx-auto px-4 py-12 md:py-20 font-sans">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-16"
                >
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest border border-primary/20 mb-6">
                        Setup Guide
                    </div>
                    <h1 className="text-5xl md:text-7xl font-heading font-black tracking-tighter mb-8 leading-[0.9]">
                        Required <span className="text-primary ">Dependencies.</span>
                    </h1>
                    <p className="text-xl text-muted-foreground leading-relaxed mb-10 max-w-2xl font-medium">
                        To use MoboUI components in your project without any errors,
                        ensure you have these core dependencies installed.
                    </p>
                </motion.div>

                {/* React Native Section */}
                <section className="mb-20">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center">
                            <Package className="w-5 h-5 text-cyan-500" />
                        </div>
                        <h2 className="text-3xl font-heading font-bold">React Native / Expo</h2>
                    </div>

                    <div className="bg-black rounded-3xl p-8 border border-white/10 mb-8">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-2">
                                <Terminal className="w-4 h-4 text-primary" />
                                <span className="text-xs font-mono text-white/50">Terminal</span>
                            </div>
                            <Button variant="ghost" size="sm" className="text-[10px] uppercase font-black tracking-widest text-primary hover:bg-primary/10" onClick={() => navigator.clipboard.writeText('npm install lucide-react-native expo-linear-gradient expo-blur react-native-reanimated react-native-gesture-handler')}>
                                Copy Command
                            </Button>
                        </div>
                        <code className="text-sm md:text-base font-mono text-white block overflow-x-auto whitespace-nowrap pb-2">
                            npm install <span className="text-primary">lucide-react-native expo-linear-gradient expo-blur react-native-reanimated react-native-gesture-handler</span>
                        </code>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {reactNativeDeps.map((dep) => (
                            <div key={dep.name} className="p-4 rounded-2xl bg-secondary/20 border border-border/50 flex items-center justify-between">
                                <div>
                                    <div className="font-bold text-foreground">{dep.name}</div>
                                    <div className="text-xs text-muted-foreground">{dep.purpose}</div>
                                </div>
                                <CheckCircle2 className="w-5 h-5 text-primary/50" />
                            </div>
                        ))}
                    </div>
                </section>

                {/* Flutter Section */}
                <section className="mb-20">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                            <Package className="w-5 h-5 text-blue-500" />
                        </div>
                        <h2 className="text-3xl font-heading font-bold">Flutter</h2>
                    </div>

                    <div className="bg-black rounded-3xl p-8 border border-white/10 mb-8">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-2">
                                <Terminal className="w-4 h-4 text-primary" />
                                <span className="text-xs font-mono text-white/50">pubspec.yaml</span>
                            </div>
                        </div>
                        <pre className="text-sm font-mono text-white overflow-x-auto">
                            <span className="text-white/40">dependencies:</span>{`
  flutter:
    sdk: flutter
  lucide_icons: ^0.8.0
  google_fonts: ^6.1.0
  flutter_inset_box_shadow: ^1.0.8
  provider: ^6.1.1
  animations: ^2.0.11`}
                        </pre>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {flutterDeps.map((dep) => (
                            <div key={dep.name} className="p-4 rounded-2xl bg-secondary/20 border border-border/50 flex items-center justify-between">
                                <div>
                                    <div className="font-bold text-foreground">{dep.name}</div>
                                    <div className="text-xs text-muted-foreground">{dep.purpose}</div>
                                </div>
                                <CheckCircle2 className="w-5 h-5 text-primary/50" />
                            </div>
                        ))}
                    </div>
                </section>

                <div className="p-8 rounded-3xl bg-primary/5 border border-primary/20 flex gap-6 items-start">
                    <AlertCircle className="w-6 h-6 text-primary shrink-0 mt-1" />
                    <div>
                        <h4 className="font-bold text-foreground mb-2">Pro Tip</h4>
                        <p className="text-muted-foreground leading-relaxed">
                            For the best experience in the playground, we stay up to date with the latest stable versions of these packages.
                            If you encounter any build errors in your local project, check for version compatibility with your SDK.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
