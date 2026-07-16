"use client";

import React, { useState } from "react";
import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Upload,
    Code2,
    Smartphone,
    Layers,
    X,
    Loader2
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { useFrontendAppStore } from "@/lib/store/frontend-app-store";
import type { Component } from "@/lib/types/component";
import { AuthGuard } from "@/components/shared/AuthGuard";

const CATEGORIES = ["Buttons", "Inputs", "Navigation", "Cards", "Dialogs", "Media", "Utilities", "Auth", "Finance", "Analytics"];
const FRAMEWORKS = [
    { id: "react-native", label: "React Native", icon: Smartphone },
    { id: "flutter", label: "Flutter", icon: Code2 },
    { id: "both", label: "Both", icon: Layers }
] as const;

type FrameworkId = (typeof FRAMEWORKS)[number]["id"];

function toSlug(value: string) {
    return value.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

export default function UploadPage() {
    const addComponent = useFrontendAppStore((state) => state.addComponent);
    const [loading, setLoading] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    const [formData, setFormData] = useState<{
        name: string;
        slug: string;
        category: string;
        framework: FrameworkId;
        description: string;
        tags: string;
        code_rn: string;
        code_flutter: string;
        is_premium: boolean;
    }>({
        name: "",
        slug: "",
        category: "Buttons",
        framework: "both",
        description: "",
        tags: "",
        code_rn: "",
        code_flutter: "",
        is_premium: false
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (!selectedFile) return;
        setPreviewUrl(URL.createObjectURL(selectedFile));
    };

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name.trim()) {
            setMessage("Component name is required.");
            return;
        }

        const finalSlug = toSlug(formData.slug || formData.name);

        const newComponent: Component = {
            id: finalSlug,
            slug: finalSlug,
            name: formData.name.trim(),
            category: formData.category.toLowerCase(),
            description: formData.description.trim() || "Newly submitted component",
            tags: formData.tags
                .split(",")
                .map((tag) => tag.trim())
                .filter(Boolean),
            framework: formData.framework,
            complexity: "intermediate",
            is_premium: formData.is_premium,
            image_url: previewUrl || undefined,
            code: {
                typescript: formData.code_rn || "// No React Native code provided",
                dart: formData.code_flutter || "// No Flutter code provided",
            },
        };

        try {
            setLoading(true);
            setMessage(null);
            await new Promise((resolve) => setTimeout(resolve, 900));
            addComponent(newComponent);
            setMessage("Component published locally. It now appears in the Components page.");
            setFormData({
                name: "",
                slug: "",
                category: "Buttons",
                framework: "both",
                description: "",
                tags: "",
                code_rn: "",
                code_flutter: "",
                is_premium: false
            });
            setPreviewUrl(null);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthGuard requireAdmin>
            <div className="container mx-auto px-4 py-32 max-w-5xl">
            <PageHeader
                badge="Admin"
                title="Upload Component"
                description="Add new high-quality mobile components to the local frontend library."
            />

            <form onSubmit={handleUpload} className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-1 space-y-8">
                    <div className="space-y-4">
                        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted">Preview Image</label>
                        <div
                            className={cn(
                                "relative aspect-[4/3] rounded-[2rem] border-2 border-dashed border-border overflow-hidden flex flex-col items-center justify-center transition-all group",
                                previewUrl ? "border-solid" : "hover:border-primary/50 bg-surface/50"
                            )}
                        >
                            {previewUrl ? (
                                <>
                                    <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                                    <button
                                        type="button"
                                        onClick={() => setPreviewUrl(null)}
                                        className="absolute top-4 right-4 h-10 w-10 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-destructive transition-colors"
                                    >
                                        <X size={20} />
                                    </button>
                                </>
                            ) : (
                                <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
                                    <div className="w-16 h-16 rounded-3xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                        <Upload className="text-primary" size={32} />
                                    </div>
                                    <p className="text-sm font-bold text-text-primary">Click to add image</p>
                                    <p className="text-[10px] text-text-muted mt-2">PNG, JPG or WebP</p>
                                    <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                                </label>
                            )}
                        </div>
                    </div>

                    <div className="space-y-6 bg-surface p-8 rounded-[2.5rem] border border-border">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Framework</label>
                            <div className="grid grid-cols-3 gap-2">
                                {FRAMEWORKS.map((fw) => (
                                    <button
                                        key={fw.id}
                                        type="button"
                                        onClick={() => setFormData({ ...formData, framework: fw.id })}
                                        className={cn(
                                            "flex flex-col items-center justify-center p-3 rounded-2xl border transition-all gap-2",
                                            formData.framework === fw.id
                                                ? "bg-primary/10 border-primary text-primary shadow-glow-fuchsia"
                                                : "bg-background border-border text-text-muted hover:border-border-hover"
                                        )}
                                    >
                                        <fw.icon size={18} />
                                        <span className="text-[8px] font-black uppercase">{fw.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Category</label>
                            <select
                                className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50"
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            >
                                {CATEGORIES.map((cat) => <option key={cat}>{cat}</option>)}
                            </select>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-background rounded-2xl border border-border">
                            <label className="text-xs font-bold text-text-primary">Premium Component</label>
                            <input
                                type="checkbox"
                                checked={formData.is_premium}
                                onChange={(e) => setFormData({ ...formData, is_premium: e.target.checked })}
                                className="w-5 h-5 accent-primary"
                            />
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-2 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Component Name</label>
                            <Input
                                placeholder="e.g. Glassmorphic Login"
                                className="h-14 rounded-2xl"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Slug</label>
                            <Input
                                placeholder="e.g. glassmorphic-login"
                                className="h-14 rounded-2xl font-mono text-xs"
                                value={formData.slug}
                                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Description</label>
                        <Textarea
                            placeholder="Describe what this component does and how to use it..."
                            className="min-h-[120px] rounded-2xl py-4"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-text-muted">React Native / Expo (TSX)</label>
                            <Textarea
                                placeholder="// Paste your React Native code here..."
                                className="min-h-[220px] rounded-[2rem] bg-[#0A0A0A] border-border font-mono text-xs p-6 text-indigo-300 focus:border-indigo-500/50"
                                value={formData.code_rn}
                                onChange={(e) => setFormData({ ...formData, code_rn: e.target.value })}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Flutter / Dart</label>
                            <Textarea
                                placeholder="// Paste your Flutter code here..."
                                className="min-h-[220px] rounded-[2rem] bg-[#0A0A0A] border-border font-mono text-xs p-6 text-sky-300 focus:border-sky-500/50"
                                value={formData.code_flutter}
                                onChange={(e) => setFormData({ ...formData, code_flutter: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Tags (comma separated)</label>
                        <Input
                            placeholder="glassmorphism, interactive, finance..."
                            className="h-14 rounded-2xl"
                            value={formData.tags}
                            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                        />
                    </div>

                    {message && (
                        <div className="rounded-2xl border border-primary/30 bg-primary/5 px-4 py-3 text-sm text-text-primary">
                            {message}
                        </div>
                    )}

                    <div className="pt-4">
                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full h-16 rounded-full bg-primary text-black font-black uppercase tracking-[0.2em] text-sm hover:bg-white transition-all shadow-glow-fuchsia disabled:opacity-50"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                    Publishing...
                                </>
                            ) : (
                                "Upload Component"
                            )}
                        </Button>
                    </div>
                </div>
            </form>
        </div>
        </AuthGuard>
    );
}
