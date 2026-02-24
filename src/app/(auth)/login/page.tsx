"use client";

import React from "react";
import Link from "next/link";
import { Github, Chrome, Mail, Lock, ArrowRight, Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlowEffect } from "@/components/shared/GlowEffect";

export default function LoginPage() {
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
                    <h1 className="text-4xl font-black text-white mb-3 tracking-tighter uppercase">Welcome Back.</h1>
                    <p className="text-neutral-500 font-medium">Log in to your MOBOUI account to continue.</p>
                </div>

                <div className="p-10 rounded-[3rem] bg-neutral-900/80 backdrop-blur-2xl border border-white/5 shadow-2xl space-y-8">
                    {/* Social Logins */}
                    <div className="grid grid-cols-2 gap-4">
                        <Button variant="outline" className="h-14 rounded-2xl border-white/10 hover:bg-white/5 gap-2">
                            <Github size={20} />
                            GitHub
                        </Button>
                        <Button variant="outline" className="h-14 rounded-2xl border-white/10 hover:bg-white/5 gap-2">
                            <Chrome size={20} />
                            Google
                        </Button>
                    </div>

                    <div className="relative flex items-center justify-center">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-white/5"></div>
                        </div>
                        <span className="relative bg-[#171717] px-4 text-xs font-black text-neutral-600 uppercase tracking-widest">Or with email</span>
                    </div>

                    {/* Credentials Form */}
                    <div className="space-y-6">
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
                            <div className="flex items-center justify-between pl-1">
                                <label className="text-xs font-black text-neutral-500 uppercase tracking-widest">Password</label>
                                <Link href="#" className="text-xs font-bold text-amber-500 hover:text-amber-400">Forgot?</Link>
                            </div>
                            <div className="relative group">
                                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-600 group-focus-within:text-amber-500 transition-colors" size={20} />
                                <input
                                    type="password"
                                    className="w-full h-14 bg-black border border-white/5 rounded-2xl pl-14 pr-6 text-white focus:border-amber-500/50 outline-none transition-all placeholder:text-neutral-700"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <Button variant="neon" size="lg" className="w-full h-16 rounded-2xl text-lg font-black shadow-amber-lg">
                            Log In
                            <ArrowRight size={20} className="ml-2" />
                        </Button>
                    </div>
                </div>

                <p className="mt-10 text-center text-neutral-500 text-sm">
                    Don't have an account?{" "}
                    <Link href="/register" className="text-white font-bold hover:text-amber-500 transition-colors underline underline-offset-4">
                        Create an account
                    </Link>
                </p>
            </div>
        </div>
    );
}
