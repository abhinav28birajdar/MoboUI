import React from 'react';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { UserCircle } from 'lucide-react';
import { ProfileForm } from '@/components/dashboard/profile-form';
import { BadgesShowcase } from '@/components/dashboard/badges-showcase';

export const metadata = {
  title: 'Profile Settings | MoboUI',
  description: 'Manage your public developer profile.',
};

export default async function ProfilePage() {
  const db = await createClient();
  const { data: { session } } = await db.auth.getSession();

  if (!session) {
    redirect('/login');
  }

  // Fetch existing profile data
  const { data: profile } = await db
    .from('profiles')
    .select('*')
    .eq('id', session.user.id)
    .single();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center gap-6 bg-neutral-900/40 p-8 rounded-[2rem] border border-white/5">
        <UserCircle className="text-primary" size={48} />
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tighter mb-1">
            Profile Settings
          </h1>
          <p className="text-neutral-500 font-medium text-sm">
            Manage your public developer presence and linked accounts.
          </p>
        </div>
      </div>

      <ProfileForm initialData={profile || {}} />

      {/* Badges Showcase Section */}
      <BadgesShowcase userId={session.user.id} />
    </div>
  );
}