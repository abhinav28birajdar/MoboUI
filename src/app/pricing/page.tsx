"use client";

import React, { useState } from "react";
import { Check, Zap, Shield, Users, Crown, ChevronRight } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";

const PLANS = [
    {
        name: "Free",
        price: "$0",
        description: "Perfect for exploring and side projects.",
        features: [
            "Access to 25+ base components",
            "Flutter, RN & Expo code",
            "3 Playground saves",
            "Community support",
        ],
        cta: "Join Now",
        popular: false,
    },
    {
        name: "Pro",
        price: "$9",
        description: "For professional developers who want more.",
        features: [
            "Access to 50+ premium components",
            "Unlimited Playground saves",
            "Priority submission review",
            "1,000 API requests/day",
            "Advanced customization",
            "Email support",
        ],
        cta: "Upgrade to Pro",
        popular: true,
    },
    {
        name: "Team",
        price: "$29",
        description: "Best for styling teams and agencies.",
        features: [
            "Everything in Pro",
            "Up to 5 team seats",
            "10k API requests/day",
            "Custom branding kits",
            "Shared component library",
            "Priority team support",
        ],
        cta: "Contact Sales",
        popular: false,
    }
];

export default function PricingPage() {
    const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

    return (
        <div className="pt-32 pb-24 min-h-screen bg-background overflow-hidden relative">
            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <PageHeader
                        badge="Pricing"
                        title="Simple Plans/No Hidden Costs."
                        description="Start for free and upgrade as you grow. Huge savings for yearly subscriptions."
                        centered
                    />

                    {/* Billing Toggle */}
                    <div className="flex items-center justify-center mt-12">
                        <div className="bg-surface p-1 rounded-2xl border border-border flex shadow-sm">
                            <button
                                onClick={() => setBillingCycle("monthly")}
                                className={cn("px-6 py-2.5 rounded-xl text-sm font-bold transition-all", billingCycle === "monthly" ? "bg-background shadow-sm text-text-primary" : "text-text-muted hover:text-text-primary")}
                            >
                                Monthly
                            </button>
                            <button
                                onClick={() => setBillingCycle("yearly")}
                                className={cn("px-6 py-2.5 rounded-xl text-sm font-bold transition-all relative", billingCycle === "yearly" ? "bg-background shadow-sm text-text-primary" : "text-text-muted hover:text-text-primary")}
                            >
                                Yearly
                                <span className="absolute -top-3 -right-4 bg-primary text-primary-foreground text-[10px] font-black px-2 py-0.5 rounded-full shadow-glow-amber">
                                    SAVE 20%
                                </span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Pricing Cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24 max-w-6xl mx-auto">
                    {PLANS.map((plan, i) => (
                        <div
                            key={i}
                            className={cn(
                                "p-10 rounded-[3rem] border bg-card border-border relative flex flex-col transition-all duration-500 hover:scale-[1.02] hover:shadow-xl",
                                plan.popular && "border-primary/20 ring-1 ring-primary/10 shadow-glow-amber"
                            )}
                        >
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-[10px] font-black rounded-full shadow-glow-amber z-20">
                                    MOST POPULAR
                                </div>
                            )}

                            <div className="mb-10">
                                <h3 className="text-2xl font-black text-text-primary uppercase mb-4 tracking-tighter ">{plan.name}</h3>
                                <div className="flex items-baseline gap-1 mb-4">
                                    <span className="text-5xl font-black text-text-primary tracking-tight ">{plan.price}</span>
                                    <span className="text-text-muted font-bold text-sm">/{billingCycle === "monthly" ? "mo" : "yr"}</span>
                                </div>
                                <p className="text-text-secondary text-sm leading-relaxed">{plan.description}</p>
                            </div>

                            <div className="space-y-5 mb-12 flex-grow">
                                {plan.features.map((feature, idx) => (
                                    <div key={idx} className="flex items-start gap-3">
                                        <Check size={16} className="text-primary shrink-0 mt-0.5" strokeWidth={3} />
                                        <span className="text-sm font-medium text-text-secondary">{feature}</span>
                                    </div>
                                ))}
                            </div>

                            <Button
                                size="lg"
                                className={cn(
                                    "w-full h-16 rounded-2xl text-md font-black  uppercase tracking-widest transition-all",
                                    plan.popular ? "bg-primary text-primary-foreground shadow-glow-amber" : "bg-surface border border-border text-text-primary hover:bg-surface-elevated"
                                )}
                            >
                                {plan.cta}
                                <ChevronRight size={18} className="ml-2" />
                            </Button>
                        </div>
                    ))}
                </div>

                {/* Trust Section */}
                <div className="text-center">
                    <p className="text-text-muted text-[10px] uppercase tracking-[0.3em] font-black mb-12">Trusted by teams at</p>
                    <div className="flex flex-wrap justify-center items-center gap-16 grayscale opacity-30">
                        <span className="text-2xl font-black text-text-primary  tracking-tighter">APPSTER</span>
                        <span className="text-2xl font-black text-text-primary tracking-widest uppercase">DESIGN.IO</span>
                        <span className="text-2xl font-black text-text-primary tracking-tighter uppercase">PROTO.</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
