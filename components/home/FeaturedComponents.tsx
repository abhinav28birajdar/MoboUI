'use client'
import React from 'react'
import Link from 'next/link'

import { SectionLabel } from '../ui/SectionLabel'
import { Button } from '../ui/Button'
import { components } from '../../data/components'
import { FrameworkBadge } from '../ui/FrameworkBadge'
import { Badge } from '../ui/Badge'
import { Card, CardContent } from '../ui/Card'
import { motion } from 'framer-motion'

export function FeaturedComponents() {
  const featured = components.filter(c => c.isPopular).slice(0, 6)

  return (
    <section className="py-24 bg-white dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-16">
          <SectionLabel className="mb-4 inline-block">COMPONENTS</SectionLabel>
          <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-6">Everything you need to ship</h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Professionally crafted, accessible, and endlessly customisable. Drop any component into your app and it works.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
          {featured.map((comp, idx) => (
            <motion.div
              key={comp.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <Link href={`/components/${comp.slug}`}>
                <Card className="h-full flex flex-col group cursor-pointer relative overflow-hidden">
                  <CardContent className="p-0 flex-1 flex flex-col">
                    <div className="h-48 bg-zinc-200 dark:bg-zinc-800/60 p-4 m-2 rounded-xl flex items-center justify-center relative overflow-hidden">
                       <span className="text-zinc-600 font-mono text-sm">{comp.name} Preview</span>
                    </div>
                    <div className="p-6 pt-4 flex-1 flex flex-col">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline" className="text-[10px]">{comp.category}</Badge>
                        {comp.isNew && <Badge variant="new" className="text-[10px]">New</Badge>}
                      </div>
                      <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2 group-hover:text-accent transition-colors">{comp.name}</h3>
                      <div className="mt-auto flex items-center gap-2">
                        {comp.frameworks.map(fw => <FrameworkBadge key={fw} framework={fw} showLabel={false} />)}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/components">
            <Button variant="outline" size="lg" rightIcon={<i className="fi fi-rr-arrow-right w-4 h-4" ></i>}>
              View all {components.length} components
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
