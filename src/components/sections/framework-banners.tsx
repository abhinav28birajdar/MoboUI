import React from 'react';
import Link from 'next/link';
import { ArrowRight, Smartphone, Code, Blocks } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function FrameworkBanners() {
  const frameworks = [
    {
      id: 'react-native',
      name: 'React Native',
      icon: Code,
      color: 'text-cyan-400',
      bgClass: 'from-cyan-950/40 to-[#1a1a24]',
      borderClass: 'group-hover:border-cyan-500/50',
      description: 'Production-ready components for React Native CLI projects.'
    },
    {
      id: 'flutter',
      name: 'Flutter',
      icon: Smartphone,
      color: 'text-blue-400',
      bgClass: 'from-blue-950/40 to-[#1a1a24]',
      borderClass: 'group-hover:border-blue-500/50',
      description: 'Beautiful, high-performance widgets for Flutter applications.'
    },
    {
      id: 'expo',
      name: 'Expo',
      icon: Blocks,
      color: 'text-white',
      bgClass: 'from-slate-800/40 to-[#1a1a24]',
      borderClass: 'group-hover:border-slate-500/50',
      description: 'Universal components optimized for Expo SDK and Web.'
    }
  ];

  return (
    <section className="py-20 border-t border-[#2a2a38] bg-[#0f0f14]">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Choose Your Stack</h2>
          <p className="text-slate-400 text-lg">
            We provide native code for the most popular mobile frameworks. No generic wrappers, just pure, optimized code.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {frameworks.map((fw) => {
            const Icon = fw.icon;
            return (
              <Link key={fw.id} href={`/components?framework=${fw.id}`} className="group block">
                <div className={`h-full rounded-2xl border border-[#2a2a38] bg-gradient-to-b ${fw.bgClass} ${fw.borderClass} p-8 transition-all duration-300`}>
                  <div className={`w-14 h-14 rounded-xl bg-[#0f0f14] border border-[#2a2a38] flex items-center justify-center mb-6 ${fw.color}`}>
                    <Icon size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{fw.name}</h3>
                  <p className="text-slate-400 mb-8 flex-1">{fw.description}</p>
                  <div className="flex items-center text-sm font-bold text-white group-hover:text-fuchsia-400 transition-colors">
                    Explore Components <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
