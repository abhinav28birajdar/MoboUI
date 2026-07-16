import React from 'react'
import Link from 'next/link'
import { BlogPost } from '@/types'
import { Card, CardContent } from '../ui/Card'
import { Badge } from '../ui/Badge'
import { formatDate } from '@/lib/utils'
import { ArrowRight } from 'lucide-react'

export function BlogPostCard({ post, featured = false }: { post: BlogPost, featured?: boolean }) {
  if (featured) {
    return (
      <Link href={`/blog/${post.slug}`}>
        <Card className="group overflow-hidden bg-zinc-900 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/80 transition-colors">
          <CardContent className="p-0 flex flex-col md:flex-row h-full">
            <div className="w-full md:w-1/2 h-64 md:h-auto bg-gradient-to-br from-accent/20 to-accent-subtle/50 flex items-center justify-center relative">
              <span className="text-accent/50 font-bold tracking-widest uppercase">Featured Article</span>
            </div>
            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
              <div className="flex gap-2 mb-4">
                {post.tags.map(tag => (
                  <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                ))}
              </div>
              <h2 className="text-3xl font-bold text-white mb-4 group-hover:text-accent transition-colors">{post.title}</h2>
              <p className="text-zinc-400 mb-6 text-lg">{post.excerpt}</p>
              <div className="mt-auto flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center font-bold text-white">
                    {post.author.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{post.author.name}</p>
                    <p className="text-xs text-zinc-500">{formatDate(post.publishedAt)} · {post.readingTime} min read</p>
                  </div>
                </div>
                <div className="hidden md:flex text-accent group-hover:translate-x-2 transition-transform">
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    )
  }

  return (
    <Link href={`/blog/${post.slug}`}>
      <Card className="group h-full flex flex-col bg-zinc-900 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/80 transition-colors overflow-hidden">
        <CardContent className="p-0 flex-1 flex flex-col">
          <div className="h-48 w-full bg-zinc-800 flex items-center justify-center">
             <span className="text-zinc-600 font-bold uppercase text-xs tracking-widest">Image Placeholder</span>
          </div>
          <div className="p-6 flex-1 flex flex-col">
            <div className="flex gap-2 mb-3">
              {post.tags.slice(0, 2).map(tag => (
                <Badge key={tag} variant="outline" className="text-[10px]">{tag}</Badge>
              ))}
            </div>
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-accent transition-colors">{post.title}</h3>
            <p className="text-zinc-400 text-sm mb-6 line-clamp-2">{post.excerpt}</p>
            <div className="mt-auto flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center font-bold text-white text-xs">
                {post.author.name[0]}
              </div>
              <div>
                <p className="text-xs font-medium text-white">{post.author.name}</p>
                <p className="text-[10px] text-zinc-500">{formatDate(post.publishedAt)}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
