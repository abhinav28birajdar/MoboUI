import React from 'react';
import { CreatePostForm } from '@/components/community/create-post-form';
import { GlowEffect } from '@/components/shared/GlowEffect';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Create Post | MoboUI Community',
  description: 'Start a new discussion in the MoboUI community.',
};

export default function CreatePostPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-black relative">
      <GlowEffect className="top-0 right-0 opacity-10" size="lg" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto mb-8">
          <Link href="/community" className="inline-flex items-center gap-2 text-neutral-400 hover:text-white font-bold uppercase text-[10px] tracking-widest transition-colors">
            <ArrowLeft size={14} />
            Back to Community
          </Link>
        </div>

        <CreatePostForm />
      </div>
    </div>
  );
}
