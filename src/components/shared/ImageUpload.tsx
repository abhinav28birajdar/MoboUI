"use client";

import React, { useState, useRef } from 'react';
import { Upload, X, ImageIcon, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils/cn';
import { uploadImage } from '@/lib/supabase/storage';
import { toast } from 'react-hot-toast';

interface ImageUploadProps {
    onUploadSuccess?: (url: string) => void;
    className?: string;
}

export function ImageUpload({ onUploadSuccess, className }: ImageUploadProps) {
    const [isUploading, setIsUploading] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Show local preview
        const objectUrl = URL.createObjectURL(file);
        setPreviewUrl(objectUrl);

        try {
            setIsUploading(true);
            const url = await uploadImage(file);
            onUploadSuccess?.(url);
            toast.success('Image uploaded successfully');
        } catch (error: any) {
            console.error('Upload failed:', error);
            toast.error(error.message || 'Failed to upload image');
            setPreviewUrl(null);
        } finally {
            setIsUploading(false);
        }
    };

    const clearPreview = () => {
        setPreviewUrl(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    return (
        <div className={cn("w-full", className)}>
            <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
                ref={fileInputRef}
            />

            {!previewUrl ? (
                <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full aspect-video rounded-2xl border-2 border-dashed border-border hover:border-primary/50 hover:bg-surface transition-all flex flex-col items-center justify-center gap-4 group"
                >
                    <div className="w-12 h-12 rounded-full bg-surface-elevated flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Upload size={20} className="text-text-secondary group-hover:text-primary" />
                    </div>
                    <div className="text-center">
                        <p className="text-sm font-bold text-text-primary">Click to upload image</p>
                        <p className="text-xs text-text-muted mt-1">PNG, JPG up to 10MB</p>
                    </div>
                </button>
            ) : (
                <div className="relative aspect-video rounded-2xl overflow-hidden border border-border bg-surface">
                    <img
                        src={previewUrl}
                        alt="Preview"
                        className="w-full h-full object-cover"
                    />

                    {isUploading && (
                        <div className="absolute inset-0 bg-background/60 backdrop-blur-sm flex flex-col items-center justify-center gap-3">
                            <Loader2 className="w-8 h-8 text-primary animate-spin" />
                            <p className="text-xs font-bold text-text-primary uppercase tracking-widest">Uploading...</p>
                        </div>
                    )}

                    {!isUploading && (
                        <button
                            onClick={clearPreview}
                            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-background/80 backdrop-blur-md border border-border flex items-center justify-center text-text-primary hover:bg-background hover:text-red-500 transition-all"
                        >
                            <X size={16} />
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}
