import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { ProjectSubmitForm } from '@/components/projects/project-submit-form';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Submit Component | MoboUI',
  description: 'Submit your component to the MoboUI marketplace.',
};

export default async function SubmitProjectPage() {
  const db = await createClient();
  const { data: { session } } = await db.auth.getSession();

  if (!session) {
    redirect('/login');
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <Link href="/dashboard/my-projects" className="inline-flex items-center gap-2 text-neutral-400 hover:text-white font-bold uppercase text-[10px] tracking-widest transition-colors mb-8">
        <ArrowLeft size={14} />
        Back to My Components
      </Link>
      
      <ProjectSubmitForm />
    </div>
  );
}
