import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';

export function CallToAction() {
  return (
    <section className="py-24 relative overflow-hidden bg-[#0f0f14]">
      {/* Background Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[800px] h-[300px] bg-fuchsia-600/20 blur-[120px] rounded-[100%]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center border border-[#2a2a38] bg-[#1a1a24]/80 backdrop-blur-xl p-10 md:p-16 rounded-3xl shadow-2xl">
          <div className="w-16 h-16 bg-gradient-to-tr from-fuchsia-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg shadow-fuchsia-600/20">
            <Sparkles className="text-white" size={32} />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            Ready to Build Faster?
          </h2>
          
          <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Join thousands of developers building enterprise-grade mobile apps with MOBOUI. Start for free, upgrade when you need more.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="w-full sm:w-auto h-14 px-10 text-base font-bold shadow-[0_0_30px_rgba(192,38,211,0.3)]" asChild>
              <Link href="/signup">
                Get Started Free <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-10 text-base font-bold" asChild>
              <Link href="/pricing">
                View Pricing
              </Link>
            </Button>
          </div>
          
          <p className="mt-8 text-sm text-slate-500 font-medium">
            No credit card required for the free tier.
          </p>
        </div>
      </div>
    </section>
  );
}
