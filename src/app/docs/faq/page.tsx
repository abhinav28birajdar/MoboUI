'use client';

import { motion } from 'framer-motion';
import { HelpCircle, ChevronDown, Search, MessageCircle, Mail } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

const faqs = [
    {
        question: "Is MoboUI free to use?",
        answer: "Yes, the core MoboUI component library is completely free and open-source. You can use it in both personal and commercial projects without any attribution, though we always appreciate a shoutout!"
    },
    {
        question: "Does it support the React Native New Architecture?",
        answer: "Absolutely. All our React Native components are built from the ground up to be compatible with Fabric and Turbo Modules, ensuring they benefit from the latest performance improvements."
    },
    {
        question: "Can I use MoboUI components in an existing Flutter project?",
        answer: "Yes, simply add the mobo_ui package from pub.dev. Our widgets are standard Flutter widgets and will integrate seamlessly with your existing codebase."
    },
    {
        question: "How do I customize the default amber theme?",
        answer: "You can easily customize the theme by modifying the tokens in your design system configuration. We provide a theme.json template that controls colors, spacing, and border radius globally."
    },
    {
        question: "Do you offer premium app templates?",
        answer: "Yes, we offer a curated selection of premium, high-quality app templates for common use cases like Ecommerce, SaaS Dashboards, and Social Networks to help you launch faster."
    },
    {
        question: "How can I contribute a new component?",
        answer: "We love community contributions! Check out our contributing guide in the documentation. You can submit a pull request on GitHub or use our online submission form."
    }
];

export default function FAQPage() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <div className="max-w-4xl mx-auto space-y-16 pb-20">
            {/* Header */}
            <motion.header
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center space-y-6"
            >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-4">
                    <HelpCircle className="w-4 h-4 text-amber-500" />
                    <span className="text-xs font-bold text-amber-500 uppercase tracking-widest">Support Center</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-heading font-black tracking-tighter text-white uppercase  leading-none">
                    Frequent <span className="text-amber-500 neon-text-glow">Questions.</span>
                </h1>
                <p className="text-xl text-neutral-400 max-w-2xl mx-auto font-medium">
                    Everything you need to know about MoboUI. Can't find what you're looking for?
                    Reach out to our community.
                </p>
            </motion.header>

            {/* Support Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-8 rounded-[32px] bg-neutral-900/50 border border-white/5 hover:border-amber-500/20 transition-all group">
                    <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        <MessageCircle className="w-6 h-6 text-amber-500" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Community Discord</h3>
                    <p className="text-neutral-500 text-sm mb-6">Join 5,000+ developers, share your work, and get help in real-time.</p>
                    <Button variant="outline" className="w-full rounded-xl border-white/10 hover:bg-amber-500 hover:text-black hover:border-amber-500 transition-all font-bold">Join Server</Button>
                </div>
                <div className="p-8 rounded-[32px] bg-neutral-900/50 border border-white/5 hover:border-amber-500/20 transition-all group">
                    <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        <Mail className="w-6 h-6 text-amber-500" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Email Support</h3>
                    <p className="text-neutral-500 text-sm mb-6">For enterprise licensing or private inquiries, drop us a message.</p>
                    <Button variant="outline" className="w-full rounded-xl border-white/10 hover:bg-amber-500 hover:text-black hover:border-amber-500 transition-all font-bold">Inquire Now</Button>
                </div>
            </div>

            {/* Accordion */}
            <div className="space-y-4">
                {faqs.map((faq, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className={`rounded-3xl border transition-all duration-300 overflow-hidden ${openIndex === i
                            ? "bg-neutral-900 border-amber-500/30 shadow-[0_0_30px_rgba(217,119,6,0.05)]"
                            : "bg-neutral-900/30 border-white/5 hover:border-white/10"
                            }`}
                    >
                        <button
                            onClick={() => setOpenIndex(openIndex === i ? null : i)}
                            className="w-full p-6 flex items-center justify-between text-left group"
                        >
                            <span className={`text-lg font-bold transition-colors ${openIndex === i ? "text-amber-500" : "text-white group-hover:text-amber-400"}`}>
                                {faq.question}
                            </span>
                            <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all ${openIndex === i ? "bg-amber-500 text-black rotate-180" : "bg-white/5 text-neutral-500"}`}>
                                <ChevronDown className="w-5 h-5" />
                            </div>
                        </button>

                        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === i ? "max-h-96" : "max-h-0"}`}>
                            <div className="p-6 pt-0 text-neutral-400 leading-relaxed font-medium">
                                <div className="h-px w-full bg-white/5 mb-6" />
                                {faq.answer}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Search CTA */}
            <div className="text-center py-12">
                <p className="text-neutral-500 text-sm font-bold uppercase tracking-widest mb-8">Can't find your answer?</p>
                <div className="relative max-w-md mx-auto">
                    <Search className="absolute left-4 top-1/2 -track-y-1/2 w-5 h-5 text-neutral-600" />
                    <input
                        type="text"
                        placeholder="Search documentation..."
                        className="w-full h-14 bg-black border border-white/10 rounded-2xl pl-12 pr-4 text-white focus:outline-none focus:border-amber-500 transition-all"
                    />
                </div>
            </div>
        </div>
    );
}
