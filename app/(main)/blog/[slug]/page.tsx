import React from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { blogPosts } from '@/data/blog-posts'
import { formatDate } from '@/lib/utils'
import { Badge } from '@/components/ui/Badge'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { CodeBlock } from '@/components/ui/CodeBlock'
import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = blogPosts.find(p => p.slug === slug)
  if (!post) return {}
  return {
    title: `${post.title} — MOBOUI Blog`,
    description: post.excerpt,
  }
}

export function generateStaticParams() {
  return blogPosts.map(p => ({ slug: p.slug }))
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = blogPosts.find(p => p.slug === slug)
  
  if (!post) notFound()

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <div className="pt-24 pb-12 border-b border-zinc-900 bg-zinc-900/30">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <div className="flex gap-2 justify-center mb-6">
            {post.tags.map(tag => (
              <Badge key={tag} variant="outline">{tag}</Badge>
            ))}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">{post.title}</h1>
          <p className="text-xl text-zinc-400 mb-8">{post.excerpt}</p>
          
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center font-bold text-white text-lg">
              {post.author.name[0]}
            </div>
            <div className="text-left">
              <p className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-purple-600 text-lg">{post.author.name}</p>
              <p className="text-sm text-zinc-500">{post.author.role}</p>
            </div>
            <div className="w-px h-8 bg-zinc-800 mx-2" />
            <div className="text-left">
              <p className="text-sm text-zinc-300">{formatDate(post.publishedAt)}</p>
              <p className="text-sm text-zinc-500">{post.readingTime} min read</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-3xl px-6 py-12">
        <div className="prose prose-invert prose-zinc max-w-none prose-headings:font-bold prose-a:text-accent hover:prose-a:text-accent-glow prose-p:leading-relaxed prose-pre:p-0 prose-pre:bg-transparent">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              code({ node, inline, className, children, ...props }: any) {
                const match = /language-(w+)/.exec(className || '')
                return !inline && match ? (
                  <CodeBlock
                    code={String(children).replace(/\n$/, '')}
                    language={match[1]}
                    className="my-6"
                  />
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                )
              }
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>

        <div className="mt-16 pt-8 border-t border-zinc-800 flex justify-between items-center">
          <Link href="/blog" className="text-zinc-400 hover:text-white transition-colors flex items-center gap-2">
            ← Back to Blog
          </Link>
        </div>
      </div>
    </div>
  )
}
