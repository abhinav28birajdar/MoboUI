'use client';

import React, { useEffect, useState, use } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowLeft, Twitter, Linkedin, Link2, Check, Send, Sparkles, RefreshCw, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { toast } from 'sonner';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImageUrl: string;
  tags: string[];
  category: string;
  isPublished: boolean;
  isFeatured: boolean;
  viewCount: number;
  readTimeMinutes: number;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  author?: {
    name: string;
    avatarUrl?: string;
  };
}

export default function BlogPostDetail() {
  const params = useParams();
  const router = useRouter();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);

  const slug = params.slug as string;

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/blog/${slug}`);
        if (!res.ok) {
          throw new Error('Failed to fetch blog post');
        }
        const data = await res.json();
        setPost(data);

        // Fetch related posts (excluding current post)
        const listRes = await fetch('/api/blog?limit=4');
        if (listRes.ok) {
          const listData = await listRes.json();
          const filtered = (listData.posts || []).filter((p: BlogPost) => p.slug !== slug).slice(0, 2);
          setRelatedPosts(filtered);
        }
      } catch (err) {
        console.error(err);
        toast.error('Could not load blog post');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPostData();
    }
  }, [slug]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    toast.success('Link copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    toast.success('Thanks for subscribing!');
    setEmail('');
  };

  const handleCopyCodeBlock = (code: string, idx: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(idx);
    toast.success('Code block copied!');
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  // Parses markdown syntax in the blog post body text
  const renderMarkdown = (text: string) => {
    if (!text) return null;
    const lines = text.split('\n');
    let insideCodeBlock = false;
    let codeContent: string[] = [];
    let codeLanguage = '';

    return lines.map((line, idx) => {
      // Code block parsing boundaries
      if (line.trim().startsWith('```')) {
        if (insideCodeBlock) {
          insideCodeBlock = false;
          const content = codeContent.join('\n');
          codeContent = [];
          const lang = codeLanguage || 'javascript';
          const blockIndex = idx;
          return (
            <div key={idx} className="relative group rounded-xl overflow-hidden border border-[#27272A]/50 bg-black/60 font-mono text-sm leading-relaxed my-6">
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#27272A]/50 bg-[#111113]">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E]" />
                </div>
                <span className="text-[10px] font-black uppercase text-[#52525B] tracking-wider">{lang}</span>
                <button
                  onClick={() => handleCopyCodeBlock(content, blockIndex)}
                  className="text-[10px] font-black uppercase text-[#A1A1AA] hover:text-[#C026D3] transition-colors flex items-center gap-1.5"
                >
                  {copiedIndex === blockIndex ? <Check size={11} className="text-[#22C55E]" /> : <Link2 size={11} />}
                  <span>{copiedIndex === blockIndex ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
              <div className="overflow-x-auto max-h-[400px]">
                <SyntaxHighlighter
                  language={lang}
                  style={tomorrow}
                  customStyle={{
                    margin: 0,
                    padding: '1.25rem',
                    background: 'transparent',
                    fontSize: '13px',
                    fontFamily: 'var(--font-code), monospace',
                  }}
                >
                  {content}
                </SyntaxHighlighter>
              </div>
            </div>
          );
        } else {
          insideCodeBlock = true;
          codeLanguage = line.replace('```', '').trim();
          return null;
        }
      }

      if (insideCodeBlock) {
        codeContent.push(line);
        return null;
      }

      // Headers
      if (line.startsWith('# ')) {
        return <h1 key={idx} className="text-3xl md:text-4xl font-display font-black text-white mt-12 mb-6 tracking-tight uppercase leading-[0.95]">{line.replace('# ', '')}</h1>;
      }
      if (line.startsWith('## ')) {
        return <h2 key={idx} className="text-2xl md:text-3xl font-display font-black text-white mt-10 mb-4 tracking-tight uppercase leading-none">{line.replace('## ', '')}</h2>;
      }
      if (line.startsWith('### ')) {
        return <h3 key={idx} className="text-xl font-bold text-white mt-8 mb-3 tracking-tight uppercase">{line.replace('### ', '')}</h3>;
      }

      // Bullet points
      if (line.trim().startsWith('- ')) {
        return (
          <li key={idx} className="ml-6 list-disc text-[#A1A1AA] text-sm mb-2 font-medium">
            {line.trim().replace('- ', '')}
          </li>
        );
      }

      // Blockquotes
      if (line.startsWith('> ')) {
        return (
          <blockquote key={idx} className="pl-6 border-l-2 border-[#C026D3] py-2 bg-[#18181B]/40 rounded-r-lg text-sm text-[#FAFAFA] font-medium italic my-4">
            {line.replace('> ', '').trim()}
          </blockquote>
        );
      }

      // Standard text paragraphs
      if (line.trim() !== '') {
        return (
          <p key={idx} className="text-[#A1A1AA] text-base leading-relaxed mb-6 font-medium">
            {line}
          </p>
        );
      }

      return <div key={idx} className="h-4" />;
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0B] flex flex-col items-center justify-center space-y-6">
        <RefreshCw className="w-12 h-12 text-[#C026D3] animate-spin" />
        <p className="text-[10px] font-black uppercase text-[#52525B] tracking-[0.3em]">Loading Article Details...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-[#0A0A0B] text-[#FAFAFA] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 bg-red-950/20 border border-red-900/40 rounded-full flex items-center justify-center text-red-500 mb-6">
          <AlertCircle size={28} />
        </div>
        <h2 className="text-3xl font-display font-black mb-4 uppercase">Article Not Found</h2>
        <Button onClick={() => router.push('/blog')} className="btn-primary border-0 font-bold uppercase tracking-widest text-xs rounded-xl h-12 px-6">
          Back to Blog
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-[#FAFAFA] pt-24 pb-32">
      <div className="container px-6 mx-auto">
        {/* Back Button */}
        <div className="mb-10">
          <Link href="/blog" className="inline-flex items-center gap-2 text-[#52525B] hover:text-white transition-colors text-xs font-black uppercase tracking-widest">
            <ArrowLeft size={14} /> Back to Articles
          </Link>
        </div>

        {/* Hero Header Article Info */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="inline-block px-3 py-1 rounded bg-[#C026D3]/10 border border-[#C026D3]/20 text-[#C026D3] text-[9px] font-black uppercase tracking-widest mb-6">
            {post.category}
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-black tracking-tighter mb-8 uppercase leading-[0.95] text-white">
            {post.title}
          </h1>

          <p className="text-base text-[#A1A1AA] font-medium mb-10 border-l-2 border-primary pl-6 py-1 italic">
            {post.excerpt}
          </p>

          {/* Writer & Stats block */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 border-b border-[#27272A]/50">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#C026D3] flex items-center justify-center text-black font-black text-sm border border-[#C026D3]/30">
                {post.author?.name?.charAt(0) || 'M'}
              </div>
              <div>
                <p className="font-bold text-white text-sm leading-none mb-1">{post.author?.name || 'MoboUI Author'}</p>
                <p className="text-[#52525B] text-[10px] font-black uppercase tracking-wider">Writer</p>
              </div>
            </div>

            <div className="flex items-center gap-6 text-[10px] font-black text-[#52525B] uppercase tracking-widest">
              <div className="flex items-center gap-1.5">
                <Calendar size={12} />
                <span>{new Date(post.publishedAt || post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock size={12} />
                <span>{post.readTimeMinutes} min read</span>
              </div>
            </div>
          </div>
        </div>

        {/* Cover Image container */}
        <div className="max-w-4xl mx-auto aspect-video rounded-xl overflow-hidden border border-[#27272A]/50 mb-16 relative">
          <img
            src={post.coverImageUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&fit=crop'}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Render markdown processed text */}
        <div className="max-w-3xl mx-auto space-y-6">
          <article className="pb-16 border-b border-[#27272A]/30">
            {renderMarkdown(post.content)}
          </article>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-16 pt-8">
              {post.tags.map((tag) => (
                <span key={tag} className="px-3 py-1.5 rounded bg-[#18181B] border border-[#27272A]/50 text-[9px] font-black text-[#52525B] uppercase tracking-widest">
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Share Action Row */}
          <div className="bg-[#111113]/40 border border-[#27272A]/50 p-6 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-6 mb-24 backdrop-blur-xl">
            <p className="text-xs font-black text-[#A1A1AA] uppercase tracking-wider">Share this article</p>
            <div className="flex items-center gap-3">
              <Button onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`)} variant="ghost" size="icon" className="h-10 w-10 rounded-full border border-[#27272A] bg-black text-[#A1A1AA] hover:text-[#C026D3] hover:border-[#C026D3]/40">
                <Twitter size={14} />
              </Button>
              <Button onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`)} variant="ghost" size="icon" className="h-10 w-10 rounded-full border border-[#27272A] bg-black text-[#A1A1AA] hover:text-[#C026D3] hover:border-[#C026D3]/40">
                <Linkedin size={14} />
              </Button>
              <Button onClick={handleCopyLink} variant="ghost" size="icon" className="h-10 w-10 rounded-full border border-[#27272A] bg-black text-[#A1A1AA] hover:text-[#C026D3] hover:border-[#C026D3]/40">
                {copied ? <Check size={14} className="text-success" /> : <Link2 size={14} />}
              </Button>
            </div>
          </div>

          {/* Newsletter subscription form */}
          <div className="p-10 md:p-16 bg-[#111113]/55 rounded-xl border border-[#27272A]/50 text-center relative overflow-hidden group shadow-sm mb-24 glass-card">
            <h3 className="text-3xl font-display font-black text-white tracking-tighter mb-4 uppercase">
              Join the <span className="text-primary">Dev Loop.</span>
            </h3>
            <p className="text-sm text-[#A1A1AA] max-w-md mx-auto mb-8 font-medium leading-relaxed">
              Subscribe to get the latest custom components, design frameworks, and mobile animation tutorials straight to your inbox.
            </p>
            {subscribed ? (
              <div className="flex items-center justify-center gap-2 text-[#C026D3] font-black text-xs uppercase tracking-widest">
                <Check size={16} /> Subscribed successfully!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="name@domain.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-black border border-[#27272A] rounded-lg px-4 py-3 text-xs focus:border-[#C026D3]/50 outline-none transition-all text-white font-medium placeholder-[#52525B]"
                />
                <Button type="submit" className="bg-primary hover:bg-primary/90 text-black font-black uppercase tracking-widest text-xs h-12 px-6 rounded-lg flex items-center justify-center gap-2 border-0 btn-primary">
                  Subscribe <Send size={12} />
                </Button>
              </form>
            )}
          </div>

          {/* Related Articles list */}
          {relatedPosts.length > 0 && (
            <div className="space-y-8">
              <h3 className="text-xl font-display font-black text-white tracking-tighter uppercase flex items-center gap-2">
                <Sparkles size={16} className="text-[#C026D3]" />
                Keep Reading
              </h3>
              <div className="grid md:grid-cols-2 gap-8">
                {relatedPosts.map((rPost) => (
                  <Link key={rPost.slug} href={`/blog/${rPost.slug}`} className="group">
                    <div className="bg-[#111113]/40 border border-[#27272A]/50 rounded-xl overflow-hidden hover:border-[#C026D3]/30 transition-all duration-300">
                      <div className="aspect-video overflow-hidden bg-zinc-900">
                        <img
                          src={rPost.coverImageUrl || 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=600&fit=crop'}
                          alt={rPost.title}
                          className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-6 space-y-2">
                        <span className="text-[#C026D3] text-[9px] font-black uppercase tracking-widest">{rPost.category}</span>
                        <h4 className="text-base font-display font-black text-white tracking-tight leading-snug group-hover:text-primary transition-colors line-clamp-2 uppercase">
                          {rPost.title}
                        </h4>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
