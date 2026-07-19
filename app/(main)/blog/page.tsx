import React from 'react'
import { blogPosts } from '@/data/blog-posts'
import { BlogPostCard } from '@/components/blog/BlogPostCard'
import { BlogGrid } from '@/components/blog/BlogGrid'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog — MOBOUI',
  description: 'Latest insights for mobile developers.',
}

export default function BlogPage() {
  const featuredPost = blogPosts[0]

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-zinc-950">
      <div className="py-24 border-b border-zinc-200 dark:border-zinc-900">
        <div className="mx-auto max-w-7xl px-6">
          <h1 className="text-5xl md:text-6xl font-black text-zinc-900 dark:text-white mb-6 tracking-tight">Blog</h1>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl">Latest insights for mobile developers. Tutorials, design systems, and updates from the MOBOUI team.</p>
        </div>
      </div>

      <div className="py-12 bg-white dark:bg-zinc-950">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-6">Featured Article</h2>
          <BlogPostCard post={featuredPost} featured={true} />
        </div>
      </div>

      <BlogGrid />
    </div>
  )
}
