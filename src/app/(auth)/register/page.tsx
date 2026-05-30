"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, User, ArrowRight, Code2, ShieldCheck, AlertCircle, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlowEffect } from "@/components/shared/GlowEffect";
import { signUp } from "@/lib/auth/auth-service";

export default function RegisterPage() {
    const router = useRouter();
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [agreed, setAgreed] = useState(false);

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        // Validation
        if (!fullName.trim()) {
            setError("Full name is required");
            return;
        }

        if (password.length < 8) {
            setError("Password must be at least 8 characters");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if (!agreed) {
            setError("You must agree to the terms");
            return;
        }

        setLoading(true);

        try {
            const result = await signUp({
                email,
                password,
                fullName,
            });

            if (result.error) {
                setError(result.error.message || "Failed to create account");
            } else if (result.user) {
                // Show confirmation message
                router.push("/auth/verify-email?email=" + encodeURIComponent(email));
            }
        } catch (err) {
            setError("An unexpected error occurred");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden px-4">
            <GlowEffect className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20" size="xl" />
            <div className="absolute inset-0 bg-grid-pattern opacity-5" />

            <div className="w-full max-w-md relative z-10">
                <div className="text-center mb-10">
                    <Link href="/" className="inline-flex items-center gap-2 mb-8 group">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-amber-sm group-hover:scale-110 transition-transform">
                            <Code2 size={28} strokeWidth={2.5} />
                        </div>
                    </Link>
                    <h1 className="text-4xl font-black text-white mb-3 tracking-tighter uppercase">Join MOBOUI.</h1>
                    <p className="text-neutral-500 font-medium">Create your account to start building.</p>
                </div>

                <div className="p-10 rounded-[3rem] bg-neutral-900/80 backdrop-blur-2xl border border-white/5 shadow-2xl space-y-8">
                    {/* Error Message */}
                    {error && (
                        <div className="flex items-center gap-3 p-4 rounded-xl bg-red-950/30 border border-red-900/50 text-red-200">
                            <AlertCircle size={20} className="flex-shrink-0" />
                            <p className="text-sm">{error}</p>
                        </div>
                    )}

                    {/* Credentials Form */}
                    <form onSubmit={handleSignUp} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-black text-neutral-500 uppercase tracking-widest pl-1">Full Name</label>
                            <div className="relative group">
                                <User className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-600 group-focus-within:text-primary transition-colors" size={20} />
                                <input
                                    type="text"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    required
                                    className="w-full h-14 bg-black border border-white/5 rounded-2xl pl-14 pr-6 text-white focus:border-primary/50 outline-none transition-all placeholder:text-neutral-700"
                                    placeholder="John Doe"
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-black text-neutral-500 uppercase tracking-widest pl-1">Email Address</label>
                            <div className="relative group">
                                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-600 group-focus-within:text-primary transition-colors" size={20} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full h-14 bg-black border border-white/5 rounded-2xl pl-14 pr-6 text-white focus:border-primary/50 outline-none transition-all placeholder:text-neutral-700"
                                    placeholder="name@example.com"
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-black text-neutral-500 uppercase tracking-widest pl-1">Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-600 group-focus-within:text-primary transition-colors" size={20} />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full h-14 bg-black border border-white/5 rounded-2xl pl-14 pr-6 text-white focus:border-primary/50 outline-none transition-all placeholder:text-neutral-700"
                                    placeholder="••••••••"
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-black text-neutral-500 uppercase tracking-widest pl-1">Confirm Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-600 group-focus-within:text-primary transition-colors" size={20} />
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    className="w-full h-14 bg-black border border-white/5 rounded-2xl pl-14 pr-6 text-white focus:border-primary/50 outline-none transition-all placeholder:text-neutral-700"
                                    placeholder="••••••••"
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        <label className="flex items-start gap-3 p-4 bg-white/5 rounded-2xl border border-white/5 cursor-pointer hover:bg-white/10 transition-colors">
                            <input
                                type="checkbox"
                                checked={agreed}
                                onChange={(e) => setAgreed(e.target.checked)}
                                disabled={loading}
                                className="w-5 h-5 rounded-lg accent-primary mt-0.5 flex-shrink-0"
                            />
                            <p className="text-[10px] text-neutral-400 leading-relaxed font-medium">
                                By clicking Register, you agree to our <span className="text-white">Terms of Use</span> and <span className="text-white">Privacy Policy</span>.
                            </p>
                        </label>

                        <Button
                            type="submit"
                            variant="neon"
                            size="lg"
                            className="w-full h-16 rounded-2xl text-lg font-black shadow-amber-lg"
                            disabled={loading || !agreed}
                        >
                            {loading ? (
                                <>
                                    <Loader size={20} className="animate-spin mr-2" />
                                    Creating account...
                                </>
                            ) : (
                                <>
                                    Register Now
                                    <ArrowRight size={20} className="ml-2" />
                                </>
                            )}
                        </Button>
                    </form>
                </div>

                <p className="mt-10 text-center text-neutral-500 text-sm">
                    Already have an account?{" "}
                    <Link href="/login" className="text-white font-bold hover:text-primary transition-colors underline underline-offset-4">
                        Log in instead
                    </Link>
                </p>
            </div>
        </div>
    );
}
