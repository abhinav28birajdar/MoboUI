"use client";

import { useState, useEffect } from "react";
import { Copy, Check, Share2, Twitter, Linkedin, Link as LinkIcon, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useParams, useRouter, usePathname } from "next/navigation";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { usePlaygroundStore } from "@/lib/store/playground-store";

export function ShareDialog() {
    const [isOpen, setIsOpen] = useState(false);
    const [copied, setCopied] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [savedId, setSavedId] = useState<string | null>(null);
    const { code, framework, device } = usePlaygroundStore();
    const params = useParams();
    const pathname = usePathname();
    const router = useRouter();

    const currentId = params?.id as string | undefined;

    // Use current ID if on a saved page, or the newly saved ID, or fallback
    const shareUrl = typeof window !== "undefined"
        ? `${window.location.origin}/playground/${currentId || savedId || ''}`
        : "";

    useEffect(() => {
        if (isOpen && !currentId && !savedId) {
            // Save the session
            const saveSession = async () => {
                setIsSaving(true);
                try {
                    const res = await fetch('/api/playground/share', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            code,
                            framework,
                            deviceType: device,
                        }),
                    });
                    
                    if (res.ok) {
                        const data = await res.json();
                        if (data.id) {
                            setSavedId(data.id);
                            // Optionally redirect to the new URL without refreshing
                            window.history.pushState(null, '', `/playground/${data.id}`);
                        }
                    }
                } catch (error) {
                    console.error('Failed to save session:', error);
                    toast.error('Failed to generate share link');
                } finally {
                    setIsSaving(false);
                }
            };
            saveSession();
        }
    }, [isOpen, currentId, savedId, code, framework, device]);

    const handleCopy = () => {
        navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        toast.success("Link copied to clipboard");
        setTimeout(() => setCopied(false), 2000);
    };

    const shareToTwitter = () => {
        window.open(`https://twitter.com/intent/tweet?text=Check%20out%20this%20component%20built%20with%20MoboUI!&url=${encodeURIComponent(shareUrl)}`, "_blank");
    };

    const shareToLinkedin = () => {
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, "_blank");
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="text-white/40 hover:text-white gap-2">
                    <Share2 size={14} />
                    Share
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md bg-[#1a1a1a] border-[#333] text-white">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold">Share Playground</DialogTitle>
                    <DialogDescription className="text-gray-400">
                        Share your component with the world. Anyone with the link can view this playground.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col gap-6 py-4">
                    <div className="flex items-center space-x-2">
                        <div className="grid flex-1 gap-2">
                            <div className="relative">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                                    <LinkIcon size={14} />
                                </div>
                                <input
                                    readOnly
                                    value={isSaving ? "Generating link..." : shareUrl}
                                    className="w-full h-10 pl-9 pr-4 rounded-lg bg-black border border-[#333] text-sm text-gray-300 focus:outline-none focus:border-primary/50 transition-colors"
                                />
                            </div>
                        </div>
                        <Button size="icon" onClick={handleCopy} disabled={isSaving || !shareUrl} className="h-10 w-10 bg-[#333] hover:bg-[#444] text-white border-0">
                            {isSaving ? <Loader2 className="h-4 w-4 animate-spin text-gray-400" /> : copied ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
                        </Button>
                    </div>

                    <div className="flex flex-col gap-3">
                        <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Share via</span>
                        <div className="grid grid-cols-2 gap-3">
                            <Button variant="outline" onClick={shareToTwitter} className="bg-[#000] border-[#333] hover:bg-[#111] text-gray-300 gap-2 justify-center">
                                <Twitter size={16} className="text-[#1DA1F2]" />
                                Twitter
                            </Button>
                            <Button variant="outline" onClick={shareToLinkedin} className="bg-[#000] border-[#333] hover:bg-[#111] text-gray-300 gap-2 justify-center">
                                <Linkedin size={16} className="text-[#0A66C2]" />
                                LinkedIn
                            </Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
