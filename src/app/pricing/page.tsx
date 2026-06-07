'use client';

import React, { useState } from 'react';
import { Check, ChevronRight, HelpCircle, Plus, Minus, Sparkles, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils/cn';

const FAQ_ITEMS = [
  {
    question: 'How do I download and install components?',
    answer: 'Once you select a component, you can copy the code snippet directly from its page and drop it into your project folder. The package dependencies needed for specific animations (like Framer Motion, Reanimated, or Riverpod) are fully detailed in our documentation guide.'
  },
  {
    question: 'Are there license limitations for commercial projects?',
    answer: 'All components under the Free and Pro plans are licensed under MIT. You can use them in personal and commercial projects. However, re-distribution as a competitor library is strictly prohibited.'
  },
  {
    question: 'Can I request custom modules or configurations?',
    answer: 'Yes! Pro and Enterprise developers can submit component request reviews on the Dashboard portal, or email our design systems team to request tailor-made modules.'
  },
  {
    question: 'What is the refund policy for Pro memberships?',
    answer: 'If you are not satisfied with the premium templates or custom icons, contact us within 14 days of upgrade for a full refund.'
  }
];

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);

  const plans = [
    {
      name: 'Free Plan',
      price: '$0',
      description: 'Browse the mobile library and test out playground scripts.',
      features: [
        'Access to 25+ base components',
        'React Native, Expo, and Flutter code blocks',
        'Interactive device preview mockups',
        'Standard community support forums'
      ],
      cta: 'Get Started Free',
      highlighted: false,
      href: '/signup'
    },
    {
      name: 'Pro Developer',
      price: billingCycle === 'monthly' ? '$12' : '$10',
      description: 'Unlock premium layouts, complex animations, and priority reviews.',
      features: [
        'Access to 100+ premium components',
        'Unlimited live playground script saves',
        'Priority showcase submission review',
        'Full Figma styling toolkit file',
        'Private Slack support access',
        'Early access to weekly updates'
      ],
      cta: 'Upgrade to Pro',
      highlighted: true,
      href: '/signup'
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'Custom components, custom icons, and dedicated support for organizations.',
      features: [
        'Unlimited seats for styling teams',
        'Tailor-made custom component requests',
        'SLA guaranteed developer support',
        'Self-hosted registry solutions',
        'Custom billing & procurement terms'
      ],
      cta: 'Contact Sales',
      highlighted: false,
      href: '/contact'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-32">
      <div className="container px-6 mx-auto">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/5 text-[10px] font-black uppercase tracking-[0.3em] text-neutral-500">
            <Star size={14} className="text-primary" />
            PLANS & PRICING
          </div>
          <h1 className="text-5xl md:text-7xl font-heading font-black tracking-tighter uppercase leading-none">
            CHOOSE YOUR <span className="text-primary neon-text-glow">PLAN.</span>
          </h1>
          <p className="text-xl text-neutral-400 max-w-2xl mx-auto font-medium leading-relaxed">
            Unlock premium component bundles, custom animation profiles, and showcase priorities.
          </p>

          {/* Billing Cycle Toggle */}
          <div className="flex items-center justify-center pt-8">
            <div className="bg-neutral-900/80 p-1 rounded-2xl border border-white/5 flex shadow-sm">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={cn(
                  'px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all',
                  billingCycle === 'monthly'
                    ? 'bg-black text-white shadow'
                    : 'text-neutral-500 hover:text-white'
                )}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={cn(
                  'px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all relative',
                  billingCycle === 'yearly'
                    ? 'bg-black text-white shadow'
                    : 'text-neutral-500 hover:text-white'
                )}
              >
                Yearly
                <span className="absolute -top-3 -right-3 bg-primary text-black text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                  -20%
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-32">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={cn(
                'p-8 md:p-10 rounded-[3rem] border bg-neutral-900/30 backdrop-blur-md relative flex flex-col justify-between transition-all duration-500 hover:scale-[1.02]',
                plan.highlighted
                  ? 'border-primary/40 shadow-[0_0_50px_rgba(255,202,3,0.05)] ring-1 ring-primary/20'
                  : 'border-white/5 hover:border-white/10'
              )}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-primary text-black text-[9px] font-black uppercase tracking-widest rounded-full z-20 shadow-lg flex items-center gap-1">
                  <Sparkles size={10} /> RECOMMENDED
                </div>
              )}

              <div>
                <span className="text-primary text-[10px] font-black uppercase tracking-widest block mb-4">
                  {plan.name}
                </span>

                <div className="flex items-baseline gap-1 mb-6 border-b border-white/5 pb-6">
                  <span className="text-5xl font-black text-white tracking-tight">{plan.price}</span>
                  {plan.price !== 'Custom' && (
                    <span className="text-neutral-500 text-sm font-bold uppercase tracking-wider">
                      /{billingCycle === 'monthly' ? 'mo' : 'mo billed yearly'}
                    </span>
                  )}
                </div>

                <p className="text-neutral-400 text-sm font-medium leading-relaxed mb-8">
                  {plan.description}
                </p>

                <div className="space-y-4 mb-10">
                  {plan.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-3 text-neutral-300 font-medium text-sm">
                      <Check size={16} className="text-primary shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Button
                onClick={() => window.location.assign(plan.href)}
                className={cn(
                  'w-full h-14 rounded-2xl text-xs font-black uppercase tracking-widest transition-all border-0 flex items-center justify-center gap-2',
                  plan.highlighted
                    ? 'bg-primary text-black hover:bg-primary/90'
                    : 'bg-white/5 border border-white/10 text-white hover:bg-white/10'
                )}
              >
                {plan.cta} <ChevronRight size={14} />
              </Button>
            </div>
          ))}
        </div>

        {/* Accordion FAQ Section */}
        <div className="max-w-3xl mx-auto space-y-10 pt-16 border-t border-white/5">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-heading font-black tracking-tight uppercase">
              Frequently Asked <span className="text-primary">Questions.</span>
            </h2>
            <p className="text-neutral-400 text-sm font-medium">
              Have questions about license keys, commercial terms, or customizations? Check these answers.
            </p>
          </div>

          <div className="space-y-4">
            {FAQ_ITEMS.map((faq, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div
                  key={idx}
                  className="bg-neutral-900/35 border border-white/5 rounded-2xl overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-white hover:text-primary transition-colors"
                  >
                    <span className="text-sm uppercase tracking-wide">{faq.question}</span>
                    {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 text-neutral-400 text-xs leading-relaxed font-medium">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
