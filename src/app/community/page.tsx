import React from "react";
import { PageHeader } from "@/components/shared/PageHeader";
import { GlowEffect } from "@/components/shared/GlowEffect";
import { Button } from "@/components/ui/button";
import { Plus, MessageSquare, LayoutGrid, HelpCircle, Star, Sparkles } from "lucide-react";
import Link from "next/link";
import { PostList } from "@/components/community/post-list";

export const metadata = {
  title: "Community Forum | MoboUI",
  description: "Join the discussion with other mobile developers.",
};

export default function CommunityPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const currentCategory = searchParams.category || 'All';

  const categories = [
    { name: 'All', icon: LayoutGrid },
    { name: 'Discussion', icon: MessageSquare },
    { name: 'Help', icon: HelpCircle },
    { name: 'Showcase', icon: Star },
    { name: 'Feedback', icon: Sparkles },
  ];

  return (
    <div className="pt-32 pb-24 min-h-screen bg-black relative">
      <GlowEffect className="top-1/4 -right-20 opacity-10" size="xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <PageHeader
            badge="Forum"
            title="Community"
            description="Discuss mobile development, ask for help, or showcase your latest creations."
          />
          <Link href="/community/create">
            <Button className="h-12 px-6 rounded-xl bg-primary hover:bg-primary/90 text-black font-black uppercase tracking-widest text-xs flex items-center gap-2">
              <Plus size={16} />
              New Discussion
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Sidebar */}
          <div className="space-y-8">
            <div className="bg-neutral-900/40 border border-white/5 p-6 rounded-[2rem]">
              <h3 className="text-sm font-black uppercase tracking-widest mb-6 text-white">Categories</h3>
              <div className="space-y-2">
                {categories.map((cat) => {
                  const Icon = cat.icon;
                  const isActive = currentCategory === cat.name;
                  return (
                    <Link
                      key={cat.name}
                      href={`/community${cat.name !== 'All' ? `?category=${cat.name}` : ''}`}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold text-sm ${
                        isActive 
                          ? 'bg-primary/10 text-primary' 
                          : 'text-neutral-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <Icon size={16} />
                      {cat.name}
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 p-6 rounded-[2rem]">
              <h3 className="text-lg font-black text-white mb-2">Build something awesome?</h3>
              <p className="text-neutral-400 text-sm mb-6">Share your components in the marketplace and get feedback from the community.</p>
              <Link href="/dashboard/my-projects/new">
                <Button variant="outline" className="w-full h-12 rounded-xl border-primary/30 hover:bg-primary hover:text-black hover:border-primary transition-all font-bold uppercase tracking-widest text-xs">
                  Submit Component
                </Button>
              </Link>
            </div>
          </div>

          {/* Main Feed */}
          <div className="lg:col-span-3">
            <PostList initialCategory={currentCategory} />
          </div>
        </div>
      </div>
    </div>
  );
}
