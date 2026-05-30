"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Github, Chrome, Mail, Lock, ArrowRight, Code2, AlertCircle, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlowEffect } from "@/components/shared/GlowEffect";
import { signIn, signInWithOAuth } from "@/lib/auth/auth-service";
import { supabase } from "@/lib/supabase/client";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [oauthLoading, setOauthLoading] = useState<string | null>(null);

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const result = await signIn({ email, password });

            if (result.error) {
                setError(result.error.message || "Failed to sign in");
            } else if (result.session) {
                router.push("/account");
            }
        } catch (err) {
            setError("An unexpected error occurred");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleOAuthSignIn = async (provider: "github" | "google") => {
        setError("");
        setOauthLoading(provider);

        try {
            const { data, error: oauthError } = await signInWithOAuth({
                provider,
                redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback`,
            });

            if (oauthError) {
                // oauthError may be a generic object; guard access to `message`
                const msg = (oauthError as any)?.message || "OAuth sign in failed";
                setError(msg);
            } else if (data?.url) {
                window.location.href = data.url;
            }
        } catch (err) {
            setError("OAuth sign in failed");
            console.error(err);
        } finally {
            setOauthLoading(null);
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
                    <h1 className="text-4xl font-black text-white mb-3 tracking-tighter uppercase">Welcome Back.</h1>
                    <p className="text-neutral-500 font-medium">Log in to your MOBOUI account to continue.</p>
                </div>

                <div className="p-10 rounded-[3rem] bg-neutral-900/80 backdrop-blur-2xl border border-white/5 shadow-2xl space-y-8">
                    {/* Error Message */}
                    {error && (
                        <div className="flex items-center gap-3 p-4 rounded-xl bg-red-950/30 border border-red-900/50 text-red-200">
                            <AlertCircle size={20} className="flex-shrink-0" />
                            <p className="text-sm">{error}</p>
                        </div>
                    )}

                    {/* Social Logins */}
                    <div className="grid grid-cols-2 gap-4">
                        <Button
                            variant="outline"
                            className="h-14 rounded-2xl border-white/10 hover:bg-white/5 gap-2"
                            onClick={() => handleOAuthSignIn("github")}
                            disabled={oauthLoading !== null}
                        >
                            {oauthLoading === "github" ? (
                                <Loader size={20} className="animate-spin" />
                            ) : (
                                <Github size={20} />
                            )}
                            GitHub
                        </Button>
                        <Button
                            variant="outline"
                            className="h-14 rounded-2xl border-white/10 hover:bg-white/5 gap-2"
                            onClick={() => handleOAuthSignIn("google")}
                            disabled={oauthLoading !== null}
                        >
                            {oauthLoading === "google" ? (
                                <Loader size={20} className="animate-spin" />
                            ) : (
                                <Chrome size={20} />
                            )}
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
                    <form onSubmit={handleSignIn} className="space-y-6">
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
                            <div className="flex items-center justify-between pl-1">
                                <label className="text-xs font-black text-neutral-500 uppercase tracking-widest">Password</label>
                                <Link href="/auth/forgot-password" className="text-xs font-bold text-primary hover:text-amber-500">Forgot?</Link>
                            </div>
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

                        <Button
                            type="submit"
                            variant="neon"
                            size="lg"
                            className="w-full h-16 rounded-2xl text-lg font-black shadow-amber-lg"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <Loader size={20} className="animate-spin mr-2" />
                                    Signing in...
                                </>
                            ) : (
                                <>
                                    Log In
                                    <ArrowRight size={20} className="ml-2" />
                                </>
                            )}
                        </Button>
                    </form>
                </div>

                <p className="mt-10 text-center text-neutral-500 text-sm">
                    Don't have an account?{" "}
                    <Link href="/register" className="text-white font-bold hover:text-primary transition-colors underline underline-offset-4">
                        Create an account
                    </Link>
                </p>
            </div>
        </div>
    );
}
