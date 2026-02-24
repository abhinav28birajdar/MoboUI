"use client";

import React from "react";
import Link from "next/link";
import { Github, Chrome, Mail, Lock, User, ArrowRight, Code2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlowEffect } from "@/components/shared/GlowEffect";

export default function RegisterPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden px-4">
            <GlowEffect className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20" size="xl" />
            <div className="absolute inset-0 bg-grid-pattern opacity-5" />

            <div className="w-full max-w-md relative z-10">
                <div className="text-center mb-10">
                    <Link href="/" className="inline-flex items-center gap-2 mb-8 group">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500 text-black shadow-amber-sm group-hover:scale-110 transition-transform">
                            <Code2 size={28} strokeWidth={2.5} />
                        </div>
                    </Link>
                    <h1 className="text-4xl font-black text-white mb-3 tracking-tighter uppercase">Join MOBOUI.</h1>
                    <p className="text-neutral-500 font-medium">Create your account to start building.</p>
                </div>

                <div className="p-10 rounded-[3rem] bg-neutral-900/80 backdrop-blur-2xl border border-white/5 shadow-2xl space-y-8">
                    {/* Credentials Form */}
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-black text-neutral-500 uppercase tracking-widest pl-1">Full Name</label>
                            <div className="relative group">
                                <User className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-600 group-focus-within:text-amber-500 transition-colors" size={20} />
                                <input
                                    type="text"
                                    className="w-full h-14 bg-black border border-white/5 rounded-2xl pl-14 pr-6 text-white focus:border-amber-500/50 outline-none transition-all placeholder:text-neutral-700"
                                    placeholder="John Doe"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-black text-neutral-500 uppercase tracking-widest pl-1">Email Address</label>
                            <div className="relative group">
                                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-600 group-focus-within:text-amber-500 transition-colors" size={20} />
                                <input
                                    type="email"
                                    className="w-full h-14 bg-black border border-white/5 rounded-2xl pl-14 pr-6 text-white focus:border-amber-500/50 outline-none transition-all placeholder:text-neutral-700"
                                    placeholder="name@example.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-black text-neutral-500 uppercase tracking-widest pl-1">Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-600 group-focus-within:text-amber-500 transition-colors" size={20} />
                                <input
                                    type="password"
                                    className="w-full h-14 bg-black border border-white/5 rounded-2xl pl-14 pr-6 text-white focus:border-amber-500/50 outline-none transition-all placeholder:text-neutral-700"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <div className="flex items-start gap-3 p-4 bg-white/5 rounded-2xl border border-white/5">
                            <ShieldCheck size={20} className="text-amber-500 shrink-0" />
                            <p className="text-[10px] text-neutral-400 leading-relaxed font-medium">
                                By clicking Register, you agree to our <span className="text-white">Terms of Use</span> and <span className="text-white">Privacy Policy</span>.
                            </p>
                        </div>

                        <Button variant="neon" size="lg" className="w-full h-16 rounded-2xl text-lg font-black shadow-amber-lg">
                            Register Now
                            <ArrowRight size={20} className="ml-2" />
                        </Button>
                    </div>
                </div>

                <p className="mt-10 text-center text-neutral-500 text-sm">
                    Already have an account?{" "}
                    <Link href="/login" className="text-white font-bold hover:text-amber-500 transition-colors underline underline-offset-4">
                        Log in instead
                    </Link>
                </p>
            </div>
        </div>
    );
}
