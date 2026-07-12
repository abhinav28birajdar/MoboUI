'use client';

import React, { useState, useEffect, useMemo, use } from 'react';
import Link from 'next/link';
import { notFound, useRouter } from 'next/navigation';
import { getDocBySlug, docsData } from '@/lib/data/docs';
import { ChevronRight, ThumbsUp, ThumbsDown, Check, Copy, Sparkles, Hash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { toast } from 'sonner';
import { cn } from '@/lib/utils/cn';

interface PageProps {
  params: Promise<{
    slug: string[];
  }>;
}

export default function DocPage({ params }: PageProps) {
  const router = useRouter();
  const { slug } = use(params);
  const doc = getDocBySlug(slug);

  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (!doc) {
    notFound();
  }

  // Parse markdown headings (h2/h3) and content blocks
  const { parsedContent, headings } = useMemo(() => {
    const lines = doc.content.split('\n');
    const tempHeadings: { id: string; text: string; depth: number }[] = [];
    let insideCodeBlock = false;
    let codeContent: string[] = [];
    let codeLanguage = '';

    const blocks = lines.map((line, idx) => {
      // Code Block Start/End
      if (line.trim().startsWith('```')) {
        if (insideCodeBlock) {
          insideCodeBlock = false;
          const code = codeContent.join('\n');
          codeContent = [];
          const lang = codeLanguage || 'javascript';
          return { type: 'code', code, language: lang, id: `code-${idx}` };
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

      // H2 Headings
      if (line.startsWith('## ')) {
        const text = line.replace('## ', '').trim();
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        tempHeadings.push({ id, text, depth: 2 });
        return { type: 'h2', text, id };
      }

      // H3 Headings
      if (line.startsWith('### ')) {
        const text = line.replace('### ', '').trim();
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        tempHeadings.push({ id, text, depth: 3 });
        return { type: 'h3', text, id };
      }

      // Blockquote
      if (line.startsWith('> ')) {
        const text = line.replace('> ', '').trim();
        return { type: 'blockquote', text, id: `quote-${idx}` };
      }

      // Lists
      if (line.trim().startsWith('- ')) {
        const text = line.trim().replace('- ', '').trim();
        return { type: 'li', text, id: `li-${idx}` };
      }

      // Empty Lines
      if (line.trim() === '') {
        return { type: 'spacer', id: `space-${idx}` };
      }

      // Standard text paragraph
      return { type: 'p', text: line, id: `p-${idx}` };
    }).filter(Boolean) as any[];

    return { parsedContent: blocks, headings: tempHeadings };
  }, [doc.content]);

  // Track active heading scroll highlights using Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) {
          setActiveSection(visible.target.id);
        }
      },
      { rootMargin: '-80px 0px -60% 0px' }
    );

    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  const handleCopyCode = (code: string, idx: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(idx);
    toast.success('Code copied!');
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const submitFeedback = (type: 'yes' | 'no') => {
    setFeedbackSubmitted(true);
    toast.success('Thank you for your feedback!');
  };

  // Find previous/next links
  const { prevDoc, nextDoc } = useMemo(() => {
    const allItems: { title: string; href: string }[] = [];
    docsData.forEach((section) => {
      section.items?.forEach((item) => {
        allItems.push({
          title: item.title,
          href: `/docs/${section.slug}/${item.slug}`,
        });
      });
    });

    const currentHref = `/docs/${slug.join('/')}`;
    const currentIndex = allItems.findIndex((item) => item.href === currentHref);

    return {
      prevDoc: currentIndex > 0 ? allItems[currentIndex - 1] : null,
      nextDoc: currentIndex < allItems.length - 1 ? allItems[currentIndex + 1] : null,
    };
  }, [slug]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
      
      {/* MAIN DOCUMENTATION CONTENT */}
      <div className="lg:col-span-9 space-y-12 min-w-0">
        
        {/* Breadcrumb row */}
        <div className="flex items-center text-xs font-bold text-[#52525B] uppercase tracking-wider">
          <Link href="/docs" className="hover:text-white transition-colors">Docs</Link>
          {slug.map((s, i) => (
            <div key={s} className="flex items-center">
              <ChevronRight size={14} className="mx-1.5" />
              <span className={i === slug.length - 1 ? "text-white capitalize" : "capitalize"}>
                {s.replace(/-/g, ' ')}
              </span>
            </div>
          ))}
        </div>

        {/* Doc Header */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-display font-black text-white tracking-tighter uppercase leading-[0.95]">
            {doc.title}
          </h1>
          <p className="text-lg text-[#A1A1AA] font-medium leading-relaxed max-w-2xl">
            {doc.description}
          </p>
        </div>

        {/* Formatted body parsed layout */}
        <div className="prose prose-invert max-w-none space-y-6">
          {parsedContent.map((block, index) => {
            switch (block.type) {
              case 'h2':
                return (
                  <h2
                    key={block.id}
                    id={block.id}
                    className="group flex items-center gap-2 text-2xl md:text-3xl font-display font-black text-white uppercase tracking-tight pt-10 border-t border-[#27272A]/40 scroll-m-20"
                  >
                    {block.text}
                    <a href={`#${block.id}`} className="opacity-0 group-hover:opacity-100 text-[#C026D3] transition-opacity">
                      <Hash size={16} />
                    </a>
                  </h2>
                );
              case 'h3':
                return (
                  <h3
                    key={block.id}
                    id={block.id}
                    className="group flex items-center gap-2 text-xl font-bold text-white uppercase tracking-tight pt-6 scroll-m-20"
                  >
                    {block.text}
                    <a href={`#${block.id}`} className="opacity-0 group-hover:opacity-100 text-[#C026D3] transition-opacity">
                      <Hash size={14} />
                    </a>
                  </h3>
                );
              case 'p':
                return (
                  <p key={block.id} className="text-[#A1A1AA] text-base font-medium leading-relaxed">
                    {block.text}
                  </p>
                );
              case 'blockquote':
                return (
                  <blockquote key={block.id} className="pl-6 border-l-2 border-[#C026D3] py-2 bg-[#18181B]/40 rounded-r-lg text-sm text-[#FAFAFA] font-medium italic">
                    {block.text}
                  </blockquote>
                );
              case 'li':
                return (
                  <li key={block.id} className="ml-6 list-disc text-sm text-[#A1A1AA] font-medium leading-relaxed mb-2">
                    {block.text}
                  </li>
                );
              case 'code':
                return (
                  <div key={block.id} className="relative group rounded-xl overflow-hidden border border-[#27272A]/50 bg-black/60 font-mono text-sm leading-relaxed my-6">
                    <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#27272A]/50 bg-[#111113]">
                      <div className="flex gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E]" />
                      </div>
                      <span className="text-[10px] font-black uppercase text-[#52525B] tracking-wider">{block.language}</span>
                      <button
                        onClick={() => handleCopyCode(block.code, index)}
                        className="text-[10px] font-black uppercase text-[#A1A1AA] hover:text-[#C026D3] transition-colors flex items-center gap-1.5"
                      >
                        {copiedIndex === index ? <Check size={11} className="text-[#22C55E]" /> : <Copy size={11} />}
                        <span>{copiedIndex === index ? 'Copied!' : 'Copy'}</span>
                      </button>
                    </div>
                    <div className="overflow-x-auto max-h-[400px]">
                      <SyntaxHighlighter
                        language={block.language}
                        style={tomorrow}
                        customStyle={{
                          margin: 0,
                          padding: '1.25rem',
                          background: 'transparent',
                          fontSize: '13px',
                          fontFamily: 'var(--font-code), monospace',
                        }}
                      >
                        {block.code}
                      </SyntaxHighlighter>
                    </div>
                  </div>
                );
              case 'spacer':
                return <div key={block.id} className="h-2" />;
              default:
                return null;
            }
          })}
        </div>

        {/* FEEDBACK POLL SECTION */}
        <div className="bg-[#111113]/55 border border-[#27272A]/50 p-6 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs font-bold text-[#A1A1AA] uppercase tracking-wider">Was this helpful?</span>
          {feedbackSubmitted ? (
            <span className="text-xs font-black text-[#C026D3] uppercase tracking-wider flex items-center gap-2">
              <Check size={14} /> Feedback submitted successfully!
            </span>
          ) : (
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => submitFeedback('yes')}
                className="h-10 px-4 rounded-lg bg-[#18181B] border border-[#27272A] text-xs font-bold uppercase tracking-wider text-[#A1A1AA] hover:text-white hover:border-[#C026D3]/40 transition-all flex items-center gap-1.5"
              >
                <ThumbsUp size={14} /> Yes
              </button>
              <button
                onClick={() => submitFeedback('no')}
                className="h-10 px-4 rounded-lg bg-[#18181B] border border-[#27272A] text-xs font-bold uppercase tracking-wider text-[#A1A1AA] hover:text-white hover:border-[#C026D3]/40 transition-all flex items-center gap-1.5"
              >
                <ThumbsDown size={14} /> No
              </button>
            </div>
          )}
        </div>

        {/* PREVIOUS / NEXT COMPONENT LINKS */}
        <div className="flex justify-between items-center pt-8 border-t border-[#27272A]/40">
          {prevDoc ? (
            <Link href={prevDoc.href} className="group text-left space-y-1">
              <span className="text-[9px] font-black text-[#52525B] uppercase tracking-widest block">Previous</span>
              <span className="text-sm font-bold text-[#A1A1AA] group-hover:text-[#C026D3] transition-colors flex items-center gap-1.5">
                ← {prevDoc.title}
              </span>
            </Link>
          ) : <div />}

          {nextDoc ? (
            <Link href={nextDoc.href} className="group text-right space-y-1 ml-auto">
              <span className="text-[9px] font-black text-[#52525B] uppercase tracking-widest block">Next</span>
              <span className="text-sm font-bold text-[#A1A1AA] group-hover:text-[#C026D3] transition-colors flex items-center gap-1.5">
                {nextDoc.title} →
              </span>
            </Link>
          ) : <div />}
        </div>
      </div>

      {/* RIGHT TOC SIDEBAR: STICKY AUTO HIGHLIGHT */}
      {headings.length > 0 && (
        <aside className="lg:col-span-3 lg:sticky lg:top-28 pr-2 hidden lg:block space-y-6">
          <div className="border-l border-[#27272A] pl-5 py-2 space-y-5">
            <h4 className="text-[10px] font-black text-[#52525B] uppercase tracking-widest pl-1">On This Page</h4>
            <div className="flex flex-col gap-3.5">
              {headings.map((h) => (
                <a
                  key={h.id}
                  href={`#${h.id}`}
                  className={cn(
                    "text-xs font-medium transition-all hover:text-white block",
                    h.depth === 3 ? "pl-3 text-[#52525B] text-[11px]" : "",
                    activeSection === h.id ? "text-[#C026D3] font-bold" : "text-[#A1A1AA]"
                  )}
                >
                  {h.text}
                </a>
              ))}
            </div>
          </div>
        </aside>
      )}
    </div>
  );
}
