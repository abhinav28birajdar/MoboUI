'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle2, AlertCircle, Sparkles, Upload, Trash2, Plus, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ImageUpload } from '@/components/shared/ImageUpload';
import { toast } from 'react-hot-toast';
import { supabase } from '@/lib/supabase/client';

export default function SubmitProjectPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Form States
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [longDescription, setLongDescription] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const [screenshots, setScreenshots] = useState<string[]>([]);
  const [demoUrl, setDemoUrl] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [appStoreUrl, setAppStoreUrl] = useState('');
  const [playStoreUrl, setPlayStoreUrl] = useState('');
  
  // Tag and Framework lists
  const [frameworks, setFrameworks] = useState<string[]>([]);
  const [tagsInput, setTagsInput] = useState('');

  // Check auth session
  useEffect(() => {
    const checkAuth = async () => {
      if (supabase && typeof supabase.auth !== 'undefined') {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          toast.error('You must be signed in to submit a project.');
          router.push('/login?redirect=/projects/submit');
          return;
        }
        setUser(session.user);
      }
      setIsAuthLoading(false);
    };
    checkAuth();
  }, [router]);

  const handleFrameworkToggle = (fw: string) => {
    if (frameworks.includes(fw)) {
      setFrameworks(prev => prev.filter(f => f !== fw));
    } else {
      setFrameworks(prev => [...prev, fw]);
    }
  };

  const handleScreenshotUpload = (url: string) => {
    setScreenshots(prev => [...prev, url]);
  };

  const handleRemoveScreenshot = (idx: number) => {
    setScreenshots(prev => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      toast.error('Title and short description are required.');
      return;
    }

    if (!thumbnailUrl) {
      toast.error('Thumbnail screenshot is required.');
      return;
    }

    if (frameworks.length === 0) {
      toast.error('Select at least one framework compatibility.');
      return;
    }

    setIsLoading(true);

    try {
      const parsedTags = tagsInput
        .split(',')
        .map(t => t.trim())
        .filter(t => t.length > 0);

      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim(),
          longDescription: longDescription.trim() || description.trim(),
          thumbnailUrl,
          screenshots,
          demoUrl: demoUrl.trim(),
          githubUrl: githubUrl.trim(),
          appStoreUrl: appStoreUrl.trim(),
          playStoreUrl: playStoreUrl.trim(),
          tags: parsedTags,
          frameworks,
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to submit case study.');
      }

      setIsSubmitted(true);
      toast.success('Case study submitted for moderation reviews!');
    } catch (err: any) {
      toast.error(err.message || 'Failed to submit project.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setLongDescription('');
    setThumbnailUrl(null);
    setScreenshots([]);
    setDemoUrl('');
    setGithubUrl('');
    setAppStoreUrl('');
    setPlayStoreUrl('');
    setFrameworks([]);
    setTagsInput('');
    setIsSubmitted(false);
  };

  if (isAuthLoading) {
    return (
      <div className="container mx-auto px-6 py-32 bg-black min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-2 border-primary border-t-transparent animate-spin mx-auto mb-4" />
          <p className="text-neutral-400">Verifying session status...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-32 bg-black min-h-screen">
      <div className="max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.div
              key="submit-form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-12"
            >
              {/* Form Heading */}
              <div className="space-y-4 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/5 text-[10px] font-black uppercase tracking-[0.3em] text-neutral-500">
                  <Sparkles size={14} className="text-primary" />
                  CASE STUDY REGISTRY
                </div>
                <h1 className="text-4xl md:text-6xl font-heading font-black tracking-tight uppercase leading-[0.95] text-white">
                  SUBMIT YOUR <span className="text-primary">PROJECT.</span>
                </h1>
                <p className="text-lg text-neutral-400 max-w-2xl font-medium leading-relaxed">
                  Showcase your application designs and share engineering challenges with the developer community.
                </p>
              </div>

              {/* Submission Form */}
              <form onSubmit={handleSubmit} className="space-y-10 bg-neutral-900/40 border border-white/5 p-8 md:p-12 rounded-[3rem] shadow-xl">
                
                {/* Meta details */}
                <div className="space-y-6">
                  <h3 className="text-xl font-heading font-black uppercase tracking-tight text-white border-b border-white/5 pb-3">
                    Project Info
                  </h3>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="grid gap-2">
                      <Label htmlFor="title" className="text-xs font-black uppercase tracking-widest text-neutral-400">Project Name</Label>
                      <Input
                        id="title"
                        placeholder="e.g. Lumina Workout Tracker"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        disabled={isLoading}
                        className="h-12 bg-black border border-white/10 rounded-xl focus:border-primary/50 text-white font-medium"
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="frameworks" className="text-xs font-black uppercase tracking-widest text-neutral-400">Framework Compatibility</Label>
                      <div className="flex flex-wrap gap-2 pt-1">
                        {['React Native', 'Expo', 'Flutter'].map((fw) => (
                          <button
                            key={fw}
                            type="button"
                            onClick={() => handleFrameworkToggle(fw)}
                            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider border transition-all ${
                              frameworks.includes(fw)
                                ? 'bg-primary text-black border-primary'
                                : 'bg-black text-neutral-400 border-white/10 hover:border-primary/30'
                            }`}
                          >
                            {fw}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="description" className="text-xs font-black uppercase tracking-widest text-neutral-400">Short Summary</Label>
                    <Input
                      id="description"
                      placeholder="Brief overview explaining what this mobile application accomplishes (1-2 sentences)."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                      disabled={isLoading}
                      className="h-12 bg-black border border-white/10 rounded-xl focus:border-primary/50 text-white font-medium"
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="longDescription" className="text-xs font-black uppercase tracking-widest text-neutral-400">Case Study Overview & Details</Label>
                    <Textarea
                      id="longDescription"
                      placeholder="Describe the application features, case study elements, challenges, and design implementations in detail..."
                      value={longDescription}
                      onChange={(e) => setLongDescription(e.target.value)}
                      disabled={isLoading}
                      className="min-h-[150px] bg-black border border-white/10 rounded-xl focus:border-primary/50 text-white p-4 font-medium"
                    />
                  </div>
                </div>

                {/* Upload Thumbnail & Screenshots */}
                <div className="space-y-6 pt-6 border-t border-white/5">
                  <h3 className="text-xl font-heading font-black uppercase tracking-tight text-white pb-3">
                    Project Previews
                  </h3>

                  <div className="grid gap-8 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label className="text-xs font-black uppercase tracking-widest text-neutral-400">Thumbnail Cover (Required)</Label>
                      <ImageUpload
                        onUploadSuccess={(url) => setThumbnailUrl(url)}
                        className="bg-black/50 border border-white/10"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs font-black uppercase tracking-widest text-neutral-400">Add Screenshots (Optional)</Label>
                      <ImageUpload
                        onUploadSuccess={handleScreenshotUpload}
                        className="bg-black/50 border border-white/10"
                      />
                      {screenshots.length > 0 && (
                        <div className="grid grid-cols-3 gap-2 mt-4">
                          {screenshots.map((url, idx) => (
                            <div key={idx} className="relative aspect-video rounded-lg overflow-hidden border border-white/10">
                              <img src={url} alt="screenshot" className="w-full h-full object-cover" />
                              <button
                                type="button"
                                onClick={() => handleRemoveScreenshot(idx)}
                                className="absolute top-1 right-1 p-1 bg-red-600 rounded-full text-white hover:bg-red-700 transition-colors"
                              >
                                <Trash2 size={12} />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Integrations & Links */}
                <div className="space-y-6 pt-6 border-t border-white/5">
                  <h3 className="text-xl font-heading font-black uppercase tracking-tight text-white pb-3">
                    URLs & Keywords
                  </h3>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="grid gap-2">
                      <Label htmlFor="githubUrl" className="text-xs font-black uppercase tracking-widest text-neutral-400">GitHub Repository URL</Label>
                      <Input
                        id="githubUrl"
                        placeholder="https://github.com/username/project"
                        value={githubUrl}
                        onChange={(e) => setGithubUrl(e.target.value)}
                        disabled={isLoading}
                        className="h-12 bg-black border border-white/10 rounded-xl focus:border-primary/50 text-white font-medium"
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="demoUrl" className="text-xs font-black uppercase tracking-widest text-neutral-400">Live Demo / Website Link</Label>
                      <Input
                        id="demoUrl"
                        placeholder="https://project-demo.com"
                        value={demoUrl}
                        onChange={(e) => setDemoUrl(e.target.value)}
                        disabled={isLoading}
                        className="h-12 bg-black border border-white/10 rounded-xl focus:border-primary/50 text-white font-medium"
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="appStoreUrl" className="text-xs font-black uppercase tracking-widest text-neutral-400">App Store Link (iOS)</Label>
                      <Input
                        id="appStoreUrl"
                        placeholder="https://apps.apple.com/..."
                        value={appStoreUrl}
                        onChange={(e) => setAppStoreUrl(e.target.value)}
                        disabled={isLoading}
                        className="h-12 bg-black border border-white/10 rounded-xl focus:border-primary/50 text-white font-medium"
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="playStoreUrl" className="text-xs font-black uppercase tracking-widest text-neutral-400">Play Store Link (Android)</Label>
                      <Input
                        id="playStoreUrl"
                        placeholder="https://play.google.com/..."
                        value={playStoreUrl}
                        onChange={(e) => setPlayStoreUrl(e.target.value)}
                        disabled={isLoading}
                        className="h-12 bg-black border border-white/10 rounded-xl focus:border-primary/50 text-white font-medium"
                      />
                    </div>
                  </div>

                  <div className="grid gap-2 pt-2">
                    <Label htmlFor="tags" className="text-xs font-black uppercase tracking-widest text-neutral-400">Project Tags (Comma Separated)</Label>
                    <Input
                      id="tags"
                      placeholder="e.g. Animations, Dark Mode, Riverpod, Reanimated"
                      value={tagsInput}
                      onChange={(e) => setTagsInput(e.target.value)}
                      disabled={isLoading}
                      className="h-12 bg-black border border-white/10 rounded-xl focus:border-primary/50 text-white font-medium"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={isLoading}
                  className="w-full h-16 rounded-2xl bg-primary text-black font-black text-md uppercase tracking-widest hover:scale-[1.02] transition-all flex items-center justify-center gap-2 border-0"
                >
                  {isLoading ? 'Registering details...' : 'Submit Showcase Project'}
                  {!isLoading && <ArrowRight size={18} />}
                </Button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="submit-success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-neutral-900 border border-white/10 p-12 md:p-24 rounded-[4rem] text-center shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 bg-primary/10 w-48 h-48 rounded-full blur-3xl" />
              <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-10">
                <CheckCircle2 size={48} className="text-primary" />
              </div>
              <h2 className="text-4xl md:text-6xl font-heading font-black text-white uppercase tracking-tighter mb-6 leading-none">
                Submission <br /><span className="text-primary">Received!</span>
              </h2>
              <p className="text-lg text-neutral-400 max-w-sm mx-auto mb-12 font-medium leading-relaxed">
                Thank you for sharing your work. Our community review board will verify it within 24 hours.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button
                  onClick={resetForm}
                  variant="outline"
                  className="h-14 px-8 rounded-2xl border-white/10 text-white hover:bg-white/5 uppercase text-xs font-black tracking-widest"
                >
                  Submit Another
                </Button>
                <Button
                  onClick={() => router.push('/projects')}
                  className="h-14 px-8 rounded-2xl bg-primary text-black uppercase text-xs font-black tracking-widest border-0"
                >
                  View Showcase List
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
