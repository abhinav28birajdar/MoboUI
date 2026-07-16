"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'react-hot-toast';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ImageUpload } from '@/components/shared/ImageUpload';
import { updateProfile } from '@/app/dashboard/profile/actions';

const profileSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters").max(30),
  full_name: z.string().min(2, "Name must be at least 2 characters").max(50).optional().or(z.literal('')),
  biography: z.string().max(200).optional().or(z.literal('')),
  github_url: z.string().url("Must be a valid URL").optional().or(z.literal('')),
  twitter_url: z.string().url("Must be a valid URL").optional().or(z.literal('')),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export function ProfileForm({ initialData }: { initialData: any }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string>(initialData?.avatar_url || '');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: initialData?.username || '',
      full_name: initialData?.full_name || '',
      biography: initialData?.biography || '',
      github_url: initialData?.github_url || '',
      twitter_url: initialData?.twitter_url || '',
    },
  });

  const onSubmit = async (data: ProfileFormValues) => {
    setIsSubmitting(true);
    try {
      const res = await updateProfile({
        ...data,
        avatar_url: avatarUrl,
      });

      if (res.error) {
        toast.error(res.error);
      } else {
        toast.success("Profile updated successfully!");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to update profile.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 bg-neutral-900/40 p-8 rounded-[2rem] border border-white/5">
      
      {/* Avatar Upload */}
      <div className="flex items-center gap-8 border-b border-white/10 pb-8">
        <div className="w-24 h-24 rounded-full overflow-hidden border border-white/10 bg-black/50 shrink-0">
          {avatarUrl ? (
            <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center">
              <span className="text-neutral-600 font-bold uppercase text-[10px]">No Avatar</span>
            </div>
          )}
        </div>
        <div className="flex-1">
          <label className="block text-[10px] font-black uppercase tracking-widest text-neutral-400 mb-3">
            Profile Picture
          </label>
          <ImageUpload
            onUploadSuccess={setAvatarUrl}
            className="w-48"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-[10px] font-black uppercase tracking-widest text-neutral-400">
            Username <span className="text-primary">*</span>
          </label>
          <Input
            {...register('username')}
            className="bg-black/50 border-white/10 focus:border-primary/50 text-white rounded-xl h-12"
            placeholder="johndoe"
          />
          {errors.username && <p className="text-red-500 text-xs font-medium">{errors.username.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="block text-[10px] font-black uppercase tracking-widest text-neutral-400">
            Full Name
          </label>
          <Input
            {...register('full_name')}
            className="bg-black/50 border-white/10 focus:border-primary/50 text-white rounded-xl h-12"
            placeholder="John Doe"
          />
          {errors.full_name && <p className="text-red-500 text-xs font-medium">{errors.full_name.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-[10px] font-black uppercase tracking-widest text-neutral-400">
          Biography
        </label>
        <textarea
          {...register('biography')}
          className="w-full bg-black/50 border border-white/10 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 min-h-[100px]"
          placeholder="Tell the community a little about yourself."
        />
        {errors.biography && <p className="text-red-500 text-xs font-medium">{errors.biography.message}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-[10px] font-black uppercase tracking-widest text-neutral-400">
            GitHub Profile
          </label>
          <Input
            {...register('github_url')}
            className="bg-black/50 border-white/10 focus:border-primary/50 text-white rounded-xl h-12"
            placeholder="https://github.com/johndoe"
          />
          {errors.github_url && <p className="text-red-500 text-xs font-medium">{errors.github_url.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="block text-[10px] font-black uppercase tracking-widest text-neutral-400">
            Twitter Profile
          </label>
          <Input
            {...register('twitter_url')}
            className="bg-black/50 border-white/10 focus:border-primary/50 text-white rounded-xl h-12"
            placeholder="https://twitter.com/johndoe"
          />
          {errors.twitter_url && <p className="text-red-500 text-xs font-medium">{errors.twitter_url.message}</p>}
        </div>
      </div>

      <div className="pt-6 border-t border-white/10">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full md:w-auto px-8 h-12 rounded-xl bg-primary hover:bg-primary/90 text-black font-black uppercase tracking-widest text-xs"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <Loader2 size={16} className="animate-spin" /> Saving...
            </span>
          ) : (
            'Save Changes'
          )}
        </Button>
      </div>
    </form>
  );
}
