"use client";

import React from "react";
import { PageHeader } from "@/components/shared/PageHeader";
import { GlowEffect } from "@/components/shared/GlowEffect";
import { Button } from "@/components/ui/button";
import { Github, MessageSquare, Award, Users, Heart, Share2 } from "lucide-react";

export default function CommunityPage() {
    return (
        <div className="pt-32 pb-24 min-h-screen bg-black overflow-hidden relative">
            <GlowEffect className="top-1/4 -right-20 opacity-10" size="xl" />
            <GlowEffect className="bottom-1/4 -left-20 opacity-10" size="xl" color="white" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="mb-20">
                    <PageHeader
                        badge="Community"
                        title="Join the Club."
                        description="A growing community of developers building the future of mobile UI."
                    />
                </div>

                {/* Community Cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
                    {[
                        {
                            title: "GitHub Contributors",
                            desc: "Help us build the core library and components.",
                            icon: <Github size={32} />,
                            action: "View Repository",
                            stats: "1.2k Stars",
                            color: "from-neutral-800 to-neutral-900"
                        },
                        {
                            title: "Discord Community",
                            desc: "Chat with other developers and get instant help.",
                            icon: <MessageSquare size={32} />,
                            action: "Join Discord",
                            stats: "4.5k Members",
                            color: "from-blue-600/20 to-blue-700/20"
                        },
                        {
                            title: "Contributor Awards",
                            desc: "Get badges and special perks for your submissions.",
                            icon: <Award size={32} />,
                            action: "Learn More",
                            stats: "150+ Badges",
                            color: "from-amber-600/20 to-amber-700/20"
                        }
                    ].map((item, i) => (
                        <div key={i} className={cn("p-10 rounded-[3rem] border border-white/5 bg-gradient-to-br transition-all hover:scale-[1.02] shadow-2xl", item.color)}>
                            <div className="h-16 w-16 rounded-2xl bg-white/5 flex items-center justify-center text-amber-500 mb-8 border border-white/5">
                                {item.icon}
                            </div>
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-2xl font-black text-white">{item.title}</h3>
                                <span className="text-xs font-bold text-amber-400">{item.stats}</span>
                            </div>
                            <p className="text-neutral-400 mb-10 leading-relaxed">{item.desc}</p>
                            <Button variant="outline" className="w-full h-14 rounded-2xl border-white/10 hover:bg-amber-500 hover:text-black hover:border-amber-500 transition-all font-bold">
                                {item.action}
                            </Button>
                        </div>
                    ))}
                </div>

                {/* Recent Activity Feed (Simplified) */}
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-black text-white mb-12 text-center uppercase tracking-tighter">
                        Real-time <span className="text-amber-500">Activity.</span>
                    </h2>

                    <div className="space-y-6">
                        {[
                            { user: "dev_marcus", action: "submitted", item: "Glassmorphic Card", time: "2m ago", icon: <Users size={16} /> },
                            { user: "sarah_designer", action: "favorited", item: "Neumorphic Toggle", time: "15m ago", icon: <Heart size={16} /> },
                            { user: "alex_code", action: "customized", item: "Primary Button", time: "1h ago", icon: <Share2 size={16} /> },
                            { user: "ui_guru", action: "joined", item: "MoboUI Pro", time: "3h ago", icon: <Award size={16} /> },
                        ].map((activity, i) => (
                            <div key={i} className="flex items-center justify-between p-6 rounded-3xl bg-neutral-900/30 border border-white/5 hover:bg-neutral-900 transition-colors group">
                                <div className="flex items-center gap-4">
                                    <div className="h-10 w-10 rounded-full bg-neutral-800 border border-white/10 flex items-center justify-center text-neutral-500 group-hover:text-amber-500 transition-colors">
                                        {activity.icon}
                                    </div>
                                    <div className="text-sm">
                                        <span className="font-bold text-white">@{activity.user}</span>
                                        <span className="text-neutral-400"> {activity.action} </span>
                                        <span className="font-bold text-amber-500">{activity.item}</span>
                                    </div>
                                </div>
                                <span className="text-xs font-medium text-neutral-600 ">{activity.time}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

import { cn } from "@/lib/utils/cn";
