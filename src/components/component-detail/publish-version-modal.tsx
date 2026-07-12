"use client";

import React, { useState } from 'react';
import { UploadCloud, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { publishVersion } from '@/lib/api/versions';
import { toast } from 'react-hot-toast';

interface PublishVersionModalProps {
  componentId: string;
  currentCode: any;
}

export function PublishVersionModal({ componentId, currentCode }: PublishVersionModalProps) {
  const [open, setOpen] = useState(false);
  const [version, setVersion] = useState('');
  const [changelog, setChangelog] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!version.trim()) {
      toast.error('Version number is required.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await publishVersion(componentId, version, currentCode, changelog);
      if (res.error) {
        toast.error(res.error);
      } else {
        toast.success(`Version ${version} published successfully!`);
        setOpen(false);
        setVersion('');
        setChangelog('');
        window.location.reload();
      }
    } catch (err) {
      toast.error('An unexpected error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" size="sm" className="bg-primary text-black font-bold uppercase tracking-widest text-[10px] gap-2 h-8">
          <UploadCloud size={14} /> Publish Update
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-neutral-900 border-white/10 text-white rounded-[2rem]">
        <DialogHeader>
          <DialogTitle className="text-xl font-black uppercase tracking-tighter">Publish New Version</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500">
              Version Number
            </label>
            <Input
              value={version}
              onChange={(e) => setVersion(e.target.value)}
              placeholder="e.g. 1.1.0"
              className="bg-black/50 border-white/10"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500">
              Changelog
            </label>
            <textarea
              value={changelog}
              onChange={(e) => setChangelog(e.target.value)}
              placeholder="What changed in this update?"
              className="w-full bg-black/50 border border-white/10 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 min-h-[100px] resize-none"
            />
          </div>
          <Button 
            type="submit" 
            disabled={isSubmitting || !version.trim()}
            className="w-full bg-primary hover:bg-primary/90 text-black font-black uppercase tracking-widest"
          >
            {isSubmitting ? <Loader2 size={16} className="animate-spin mr-2" /> : null}
            Publish Version
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
