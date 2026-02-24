"use client";

import React, { useState } from "react";
import { PageHeader } from "@/components/shared/PageHeader";
import { ImageUpload } from "@/components/shared/ImageUpload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";

export default function SubmitPage() {
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!imageUrl) {
            toast.error("Please upload a project screenshot");
            return;
        }

        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsLoading(false);
        setIsSubmitted(true);
        toast.success("Project submitted successfully!");
    };

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
                                description="Show the world what you built with MOBOUI. Featured projects get 10k+ monthly views."
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
                                                required
                                            />
                                        </div>

                                        <div className="grid gap-2">
                                            <Label htmlFor="author" className="text-xs font-black uppercase tracking-widest text-text-muted">Author Name</Label>
                                            <Input
                                                id="author"
                                                placeholder="Your Name or Studio"
                                                className="h-14 rounded-2xl bg-surface border-border focus:border-primary/50 transition-all font-medium"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="description" className="text-xs font-black uppercase tracking-widest text-text-muted">Description</Label>
                                        <Textarea
                                            id="description"
                                            placeholder="Tell us about the project, the tech stack, and how MOBOUI helped..."
                                            className="min-h-[150px] rounded-3xl bg-surface border-border focus:border-primary/50 transition-all font-medium p-6"
                                            required
                                        />
                                    </div>

                                    <div className="grid gap-4">
                                        <Label className="text-xs font-black uppercase tracking-widest text-text-muted">Project Screenshot</Label>
                                        <ImageUpload onUploadSuccess={(url) => setImageUrl(url)} />
                                        <p className="text-[10px] text-text-muted font-bold uppercase tracking-widest ">This image will be featured in the community showcase.</p>
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    size="lg"
                                    disabled={isLoading}
                                    className="w-full h-16 rounded-2xl bg-primary text-primary-foreground font-black text-md uppercase  tracking-widest hover:scale-[1.02] transition-all shadow-glow-amber"
                                >
                                    {isLoading ? "Processing..." : "Submit Project"}
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
                            <h2 className="text-4xl md:text-6xl font-display font-black text-text-primary uppercase  tracking-tighter mb-6">Submission <br /><span className="text-primary">Received!</span></h2>
                            <p className="text-lg text-text-secondary max-w-sm mx-auto mb-12 font-medium">
                                Thank you for sharing your work. Our team will review your submission and notify you once it's live on the showcase.
                            </p>
                            <Button
                                onClick={() => setIsSubmitted(false)}
                                variant="outline"
                                className="h-14 px-12 rounded-2xl border-border text-text-primary uppercase text-xs font-black tracking-widest"
                            >
                                Submit Another
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
