import React from 'react';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Plus, LayoutGrid, PackageOpen } from 'lucide-react';
import { ProjectCard } from '@/components/projects/project-card';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'My Components | MoboUI',
  description: 'Manage your submitted components and projects.',
};

export default async function MyProjectsPage() {
  const db = await createClient();
  const { data: { session } } = await db.auth.getSession();

  if (!session) {
    redirect('/login');
  }

  // Fetch user's projects
  const { data: projects, error } = await db
    .from('projects')
    .select('*')
    .eq('author_id', session.user.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching user projects:', error);
  }

  const userProjects = projects || [];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-neutral-900/40 p-8 rounded-[2rem] border border-white/5">
        <div>
          <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-2 flex items-center gap-3">
            <LayoutGrid className="text-primary" size={32} />
            My Components
          </h1>
          <p className="text-neutral-500 font-medium text-sm max-w-xl">
            Manage your submitted React Native and Flutter UI components. Track their approval status, view counts, and community reception.
          </p>
        </div>
        <Link href="/dashboard/my-projects/new">
          <Button className="h-12 px-6 rounded-xl bg-primary hover:bg-primary/90 text-black font-black uppercase tracking-widest text-xs flex items-center gap-2 w-full md:w-auto">
            <Plus size={16} />
            Submit New Component
          </Button>
        </Link>
      </div>

      {/* Projects Grid */}
      {userProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userProjects.map((project) => (
            <ProjectCard key={project.id} project={project as any} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center bg-neutral-900/20 border border-dashed border-white/10 rounded-[2rem] p-16 text-center">
          <PackageOpen size={48} className="text-neutral-700 mb-6" />
          <h3 className="text-xl font-black uppercase tracking-widest mb-2">No Components Yet</h3>
          <p className="text-neutral-500 text-sm max-w-sm font-medium leading-relaxed mb-8">
            You haven't submitted any UI components to the marketplace yet. Share your best creations with the community!
          </p>
          <Link href="/dashboard/my-projects/new">
            <Button className="h-12 px-6 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold tracking-widest uppercase text-xs">
              Create Your First Component
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}