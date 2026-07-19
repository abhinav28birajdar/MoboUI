'use client'
import React, { useState } from 'react'
import { blogPosts } from '@/data/blog-posts'
import { BlogPostCard } from './BlogPostCard'

export function BlogGrid() {
  const [filter, setFilter] = useState('All')
  
  const tags = ['All', 'Tutorial', 'Design', 'Release', 'Community', 'Architecture', 'React Native', 'Flutter']

  const filtered = filter === 'All' 
    ? blogPosts.slice(1) 
    : blogPosts.slice(1).filter(p => p.tags.includes(filter))

  return (
    <section className="py-12 bg-white dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap gap-2 mb-12">
          {tags.map(tag => (
            <button
              key={tag}
              onClick={() => setFilter(tag)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${filter === tag ? 'bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-white' : 'border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:text-white hover:bg-zinc-50 dark:bg-zinc-900'}`}
            >
              {tag}
            </button>
          ))}
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(post => (
              <BlogPostCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-zinc-50 dark:bg-zinc-900/30 rounded-2xl border border-zinc-200 dark:border-zinc-800 border-dashed">
            <p className="text-zinc-500 dark:text-zinc-400 mb-2">No posts found</p>
            <p className="text-sm text-zinc-600">Try selecting a different tag</p>
          </div>
        )}
      </div>
    </section>
  )
}
