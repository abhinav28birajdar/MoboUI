"use client";

import React, { useState, useEffect } from "react";
import type { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/shared/PageHeader";
import { ImageUpload } from "@/components/shared/ImageUpload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import { supabase } from "@/lib/supabase/client";

export default function SubmitPage() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [imagePath, setImagePath] = useState<string | null>(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isAuthLoading, setIsAuthLoading] = useState(true);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    // Check if user is authenticated
    useEffect(() => {
        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            
            if (!session) {
                // Redirect to login if not authenticated
                toast.error("Please sign in to submit a project");
                router.push("/login");
                return;
            }

            setUser(session.user);
            setIsAuthLoading(false);
        };

        checkAuth();
    }, [router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!title.trim() || !description.trim()) {
            toast.error("Please fill all required fields");
            return;
        }

        if (!imageUrl) {
            toast.error("Please upload a project screenshot");
            return;
        }

        if (!user) {
            toast.error("You must be signed in");
            return;
        }

        setIsLoading(true);

        try {
            // Submit to Supabase
            const { data, error } = await supabase
                .from('submissions')
                .insert({
                    title: title.trim(),
                    description: description.trim(),
                    image_url: imageUrl,
                    user_id: user.id,
                    status: 'pending',
                })
                .select()
                .single();

            if (error) {
                throw new Error(error.message);
            }

            setIsSubmitted(true);
            toast.success("Project submitted successfully!");
        } catch (error) {
            const message = error instanceof Error ? error.message : "Failed to submit";
            toast.error(message);
            console.error('Submission error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const resetForm = () => {
        setTitle("");
        setDescription("");
        setImageUrl(null);
        setImagePath(null);
        setIsSubmitted(false);
    };

    if (isAuthLoading) {
        return (
            <div className="container mx-auto px-4 py-32 bg-background min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="w-12 h-12 rounded-full border-2 border-primary border-t-transparent animate-spin mx-auto mb-4" />
                    <p className="text-text-secondary">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-32 bg-background min-h-screen">
            <div className="max-w-3xl mx-auto">
                <AnimatePresence mode="wait">
                    {!isSubmitted ? (
                        <motion.div
                            key="form"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                        >
                            <PageHeader
                                badge="Community"
                                title="Submit Your Project."
                                description="Show what you built with MoboUI. Your submission will be reviewed by our team."
                            />

                            <form onSubmit={handleSubmit} className="mt-16 space-y-12">
                                <div className="space-y-8">
                                    <div className="grid gap-6">
                                        <div className="grid gap-2">
                                            <Label htmlFor="title" className="text-xs font-black uppercase tracking-widest text-text-muted">Project Title</Label>
                                            <Input
                                                id="title"
                                                placeholder="e.g. Zenith Banking App"
                                                className="h-14 rounded-2xl bg-surface border-border focus:border-primary/50 transition-all font-medium"
                                                value={title}
                                                onChange={(e) => setTitle(e.target.value)}
                                                required
                                                disabled={isLoading}
                                            />
                                        </div>
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="description" className="text-xs font-black uppercase tracking-widest text-text-muted">Description</Label>
                                        <Textarea
                                            id="description"
                                            placeholder="Tell us about the project, the tech stack, and how MoboUI helped..."
                                            className="min-h-[150px] rounded-3xl bg-surface border-border focus:border-primary/50 transition-all font-medium p-6"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            required
                                            disabled={isLoading}
                                        />
                                    </div>

                                    <div className="grid gap-4">
                                        <Label className="text-xs font-black uppercase tracking-widest text-text-muted">Project Screenshot</Label>
                                        <ImageUpload 
                                            onUploadSuccess={(url) => {
                                                setImageUrl(url);
                                                toast.success("Image uploaded!");
                                            }} 
                                        />
                                        <p className="text-[10px] text-text-muted font-bold uppercase tracking-widest">PNG, JPG up to 10MB</p>
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    size="lg"
                                    disabled={isLoading}
                                    className="w-full h-16 rounded-2xl bg-primary text-primary-foreground font-black text-md uppercase tracking-widest hover:scale-[1.02] transition-all"
                                >
                                    {isLoading ? "Submitting..." : "Submit Project"}
                                    {!isLoading && <ArrowRight size={20} className="ml-2" />}
                                </Button>
                            </form>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-surface border border-border p-12 md:p-24 rounded-[4rem] text-center shadow-sm"
                        >
                            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-10">
                                <CheckCircle2 size={48} className="text-primary" />
                            </div>
                            <h2 className="text-4xl md:text-6xl font-display font-black text-text-primary uppercase tracking-tighter mb-6">Submission <br /><span className="text-primary">Received!</span></h2>
                            <p className="text-lg text-text-secondary max-w-sm mx-auto mb-12 font-medium">
                                Thank you for sharing your work. Our team will review it and get back to you soon.
                            </p>
                            <div className="flex gap-4 justify-center">
                                <Button
                                    onClick={resetForm}
                                    variant="outline"
                                    className="h-14 px-12 rounded-2xl border-border text-text-primary uppercase text-xs font-black tracking-widest"
                                >
                                    Submit Another
                                </Button>
                                <Button
                                    onClick={() => router.push('/account')}
                                    className="h-14 px-12 rounded-2xl bg-primary text-primary-foreground uppercase text-xs font-black tracking-widest"
                                >
                                    View Submissions
                                </Button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
