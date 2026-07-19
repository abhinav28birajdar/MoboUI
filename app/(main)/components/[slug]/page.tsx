import React from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { components } from '@/data/components'
import { ComponentPreview } from '@/components/component-detail/ComponentPreview'
import { CodeTabs } from '@/components/component-detail/CodeTabs'
import { PropsTable } from '@/components/component-detail/PropsTable'
import { RelatedComponents } from '@/components/component-detail/RelatedComponents'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { FrameworkBadge } from '@/components/ui/FrameworkBadge'

import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const component = components.find(c => c.slug === slug)
  if (!component) return {}
  return {
    title: `${component.name} — MOBOUI`,
    description: component.description,
  }
}

export function generateStaticParams() {
  return components.map(c => ({ slug: c.slug }))
}

export default async function ComponentDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const component = components.find(c => c.slug === slug)
  
  if (!component) {
    notFound()
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-8 flex items-center text-sm text-zinc-500 dark:text-zinc-400 gap-2">
        <Link href="/" className="hover:text-zinc-900 dark:text-white transition-colors">Home</Link>
        <span>/</span>
        <Link href="/components" className="hover:text-zinc-900 dark:text-white transition-colors">Components</Link>
        <span>/</span>
        <Link href={`/components?category=${component.category}`} className="capitalize hover:text-zinc-900 dark:text-white transition-colors">{component.category}</Link>
        <span>/</span>
        <span className="text-zinc-700 dark:text-zinc-300">{component.name}</span>
      </div>

      <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 mb-12">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-4">{component.name}</h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-6 max-w-2xl">{component.description}</p>
          <div className="flex items-center gap-3">
            <Badge className="uppercase tracking-wider">{component.category}</Badge>
            {component.isNew && <Badge variant="new">New</Badge>}
            {component.isPopular && <Badge variant="popular">Popular</Badge>}
            <div className="h-4 w-px bg-zinc-200 dark:bg-zinc-800 mx-2" />
            <div className="flex gap-2">
              {component.frameworks.map(fw => <FrameworkBadge key={fw} framework={fw} />)}
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link href="/playground">
            <Button variant="outline" leftIcon={<i className="fi fi-rr-terminal w-4 h-4"  ></i>}>
              Open in Playground
            </Button>
          </Link>
        </div>
      </div>

      <div className="space-y-16">
        <section>
          <ComponentPreview component={component} />
        </section>

        <section>
          <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">Implementation</h3>
          <CodeTabs component={component} />
        </section>

        {component.props && component.props.length > 0 && (
          <section>
            <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">Props</h3>
            <PropsTable props={component.props} />
          </section>
        )}

        <section>
          <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">Related Components</h3>
          <RelatedComponents slugs={component.relatedSlugs} />
        </section>
      </div>

      {/* Floating Action Button for mobile */}
      <div className="fixed bottom-6 right-6 md:hidden z-50">
        <Link href="/playground">
          <Button shape="pill" className="shadow-lg" leftIcon={<i className="fi fi-rr-terminal w-4 h-4" ></i>}>
            Playground
          </Button>
        </Link>
      </div>
    </div>
  )
}
