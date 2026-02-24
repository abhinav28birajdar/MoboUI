"use client";

import { PageHeader } from "@/components/shared/PageHeader";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils/cn";

const FAQS = [
    {
        q: "Which frameworks do you support?",
        a: "We currently support Flutter, React Native, and Expo. Each component comes with optimized code for all three platforms."
    },
    {
        q: "Can I use these in commercial projects?",
        a: "Yes! Once you purchase a license, you can use the components in unlimited personal and commercial projects."
    },
    {
        q: "Do I get free updates?",
        a: "Absolutely. All v3.x updates are free for existing customers. We add new components and templates every month."
    },
    {
        q: "Is there a community forum?",
        a: "Yes, we have a thriving Discord community where you can get support, share your work, and request new features."
    },
];

export default function FAQPage() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <div className="container mx-auto px-4 py-32 bg-background">
            <div className="max-w-3xl mx-auto">
                <PageHeader
                    badge="Support"
                    title="Frequently Asked/Questions."
                    description="Everything you need to know about MOBOUI. Can't find the answer? Reach out to our team."
                />

                <div className="mt-20 space-y-4">
                    {FAQS.map((faq, i) => (
                        <div key={i} className="bg-surface border border-border rounded-3xl overflow-hidden">
                            <button
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                className="w-full p-8 flex items-center justify-between text-left hover:bg-surface-elevated transition-colors"
                            >
                                <span className="text-lg font-black text-text-primary uppercase  tracking-tighter">{faq.q}</span>
                                <div className="p-2 rounded-full bg-background border border-border">
                                    {openIndex === i ? <Minus size={16} /> : <Plus size={16} />}
                                </div>
                            </button>
                            {openIndex === i && (
                                <div className="px-8 pb-8 text-text-secondary leading-relaxed font-medium">
                                    {faq.a}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
