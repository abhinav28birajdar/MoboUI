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
import { createPost } from '@/app/community/actions';

const postSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").max(150),
  category: z.string().min(1, "Please select a category"),
  content: z.string().min(20, "Content must be at least 20 characters").max(10000),
});

type PostFormValues = z.infer<typeof postSchema>;

export function CreatePostForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: '',
      category: 'Discussion',
      content: '',
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

  const onSubmit = async (data: PostFormValues) => {
    try {
      setIsSubmitting(true);
      const res = await createPost({
        ...data,
        tags,
      });

      if (res.error) {
        throw new Error(res.error);
      }

      toast.success('Post created successfully!');
      router.push(`/community/${res.data.id}`);
      router.refresh();
    } catch (error: any) {
      console.error('Submission error:', error);
      toast.error(error.message || 'An error occurred while creating the post.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-neutral-900/40 border border-white/10 rounded-[2rem] p-8 max-w-4xl mx-auto backdrop-blur-md">
      <div className="mb-8">
        <h2 className="text-3xl font-black uppercase tracking-tighter mb-2">Create a Post</h2>
        <p className="text-neutral-500 font-medium text-sm">Ask a question, share an idea, or start a discussion.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2 md:col-span-2">
            <label className="block text-[10px] font-black uppercase tracking-widest text-neutral-400">
              Title <span className="text-primary">*</span>
            </label>
            <Input
              {...register('title')}
              className="bg-black/50 border-white/10 focus:border-primary/50 text-white rounded-xl h-12"
              placeholder="e.g. How to implement the glassmorphism effect in React Native?"
            />
            {errors.title && <p className="text-red-500 text-xs font-medium">{errors.title.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="block text-[10px] font-black uppercase tracking-widest text-neutral-400">
              Category <span className="text-primary">*</span>
            </label>
            <select
              {...register('category')}
              className="w-full bg-black/50 border border-white/10 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 h-12"
            >
              <option value="Discussion">Discussion</option>
              <option value="Help">Help / Question</option>
              <option value="Showcase">Showcase</option>
              <option value="Feedback">Feedback</option>
            </select>
            {errors.category && <p className="text-red-500 text-xs font-medium">{errors.category.message}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-[10px] font-black uppercase tracking-widest text-neutral-400">
            Content <span className="text-primary">*</span>
          </label>
          <textarea
            {...register('content')}
            className="w-full bg-black/50 border border-white/10 text-white rounded-xl px-4 py-4 text-sm focus:outline-none focus:border-primary/50 min-h-[200px]"
            placeholder="Write your post content here. Markdown is supported."
          />
          {errors.content && <p className="text-red-500 text-xs font-medium">{errors.content.message}</p>}
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
          <div className="flex gap-2 max-w-sm">
            <Input
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddTag();
                }
              }}
              disabled={tags.length >= 5}
              className="flex-1 bg-black/50 border-white/10 focus:border-primary/50 text-white rounded-xl h-12"
              placeholder="Add a tag..."
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
                <Loader2 size={18} className="animate-spin" /> Publishing...
              </span>
            ) : (
              'Publish Post'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
