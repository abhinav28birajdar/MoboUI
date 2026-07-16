"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Loader2, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ImageUpload } from '@/components/shared/ImageUpload';

const projectSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(100),
  description: z.string().min(10, "Description must be at least 10 characters").max(500),
  long_description: z.string().optional(),
  framework: z.string().min(1, "Please select a framework"),
  github_url: z.string().url("Must be a valid URL").optional().or(z.literal('')),
  project_url: z.string().url("Must be a valid URL").optional().or(z.literal('')),
});

type ProjectFormValues = z.infer<typeof projectSchema>;

export function ProjectSubmitForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [coverImageUrl, setCoverImageUrl] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: '',
      description: '',
      long_description: '',
      framework: 'React Native',
      github_url: '',
      project_url: '',
    },
  });

  const handleAddTag = () => {
    const newTag = tagInput.trim().toLowerCase();
    if (newTag && !tags.includes(newTag) && tags.length < 5) {
      setTags([...tags, newTag]);
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  const onSubmit = async (data: ProjectFormValues) => {
    if (!coverImageUrl) {
      toast.error("Please upload a cover image.");
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          cover_image_url: coverImageUrl,
          tags,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to submit project');
      }

      toast.success('Project submitted successfully! It is now pending review.');
      router.push('/dashboard/my-projects');
      router.refresh();
    } catch (error: any) {
      console.error('Submission error:', error);
      toast.error(error.message || 'An error occurred during submission.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-neutral-900/40 border border-white/10 rounded-[2rem] p-8 max-w-3xl mx-auto backdrop-blur-md">
      <div className="mb-8">
        <h2 className="text-3xl font-black uppercase tracking-tighter mb-2">Submit Component</h2>
        <p className="text-neutral-500 font-medium text-sm">Fill out the details below to submit your UI component or project to the marketplace.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Cover Image */}
        <div>
          <label className="block text-[10px] font-black uppercase tracking-widest text-neutral-400 mb-3">
            Cover Image <span className="text-primary">*</span>
          </label>
          <div className="bg-black/50 rounded-2xl p-4 border border-dashed border-white/10">
            <ImageUpload
              onUploadSuccess={(url) => setCoverImageUrl(url)}
            />
          </div>
        </div>

        {/* Basic Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-[10px] font-black uppercase tracking-widest text-neutral-400">
              Title <span className="text-primary">*</span>
            </label>
            <Input
              {...register('title')}
              className="bg-black/50 border-white/10 focus:border-primary/50 text-white rounded-xl h-12"
              placeholder="e.g. Neon Animated Button"
            />
            {errors.title && <p className="text-red-500 text-xs font-medium">{errors.title.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="block text-[10px] font-black uppercase tracking-widest text-neutral-400">
              Framework <span className="text-primary">*</span>
            </label>
            <select
              {...register('framework')}
              className="w-full bg-black/50 border border-white/10 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 h-12"
            >
              <option value="React Native">React Native</option>
              <option value="Expo">Expo</option>
              <option value="Flutter">Flutter</option>
            </select>
            {errors.framework && <p className="text-red-500 text-xs font-medium">{errors.framework.message}</p>}
          </div>
        </div>

        {/* Descriptions */}
        <div className="space-y-2">
          <label className="block text-[10px] font-black uppercase tracking-widest text-neutral-400">
            Short Description <span className="text-primary">*</span>
          </label>
          <Input
            {...register('description')}
            className="bg-black/50 border-white/10 focus:border-primary/50 text-white rounded-xl h-12"
            placeholder="A short summary of what this component does."
          />
          {errors.description && <p className="text-red-500 text-xs font-medium">{errors.description.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="block text-[10px] font-black uppercase tracking-widest text-neutral-400">
            Long Description
          </label>
          <textarea
            {...register('long_description')}
            className="w-full bg-black/50 border border-white/10 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 min-h-[120px]"
            placeholder="Detailed description, setup instructions, etc."
          />
        </div>

        {/* Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-[10px] font-black uppercase tracking-widest text-neutral-400">
              GitHub URL
            </label>
            <Input
              {...register('github_url')}
              className="bg-black/50 border-white/10 focus:border-primary/50 text-white rounded-xl h-12"
              placeholder="https://github.com/your-repo"
            />
            {errors.github_url && <p className="text-red-500 text-xs font-medium">{errors.github_url.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="block text-[10px] font-black uppercase tracking-widest text-neutral-400">
              Live Project URL
            </label>
            <Input
              {...register('project_url')}
              className="bg-black/50 border-white/10 focus:border-primary/50 text-white rounded-xl h-12"
              placeholder="https://your-demo.com"
            />
            {errors.project_url && <p className="text-red-500 text-xs font-medium">{errors.project_url.message}</p>}
          </div>
        </div>

        {/* Tags */}
        <div className="space-y-3">
          <label className="block text-[10px] font-black uppercase tracking-widest text-neutral-400">
            Tags (Max 5)
          </label>
          <div className="flex flex-wrap gap-2 mb-3">
            {tags.map((tag) => (
              <span
                key={tag}
                className="flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs font-bold text-neutral-300"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="text-neutral-500 hover:text-white transition-colors"
                >
                  <X size={12} />
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
              disabled={tags.length >= 5}
              className="flex-1 bg-black/50 border-white/10 focus:border-primary/50 text-white rounded-xl h-12"
              placeholder="Add a tag (e.g. animation, button)"
            />
            <Button
              type="button"
              onClick={handleAddTag}
              disabled={tags.length >= 5 || !tagInput.trim()}
              className="h-12 px-6 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold"
            >
              <Plus size={16} />
            </Button>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-6 border-t border-white/10">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-14 rounded-xl bg-primary hover:bg-primary/90 text-black font-black uppercase tracking-widest text-sm"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <Loader2 size={18} className="animate-spin" /> Submitting...
              </span>
            ) : (
              'Submit Component to Marketplace'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}