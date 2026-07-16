import React from 'react'
import { Card, CardContent } from '../ui/Card'

export function StatsSection() {
  const stats = [
    { value: '50+', label: 'Components' },
    { value: '3', label: 'Frameworks' },
    { value: '100%', label: 'TypeScript' },
    { value: 'MIT', label: 'License' },
  ]

  return (
    <section className="py-12 bg-zinc-950">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Card key={stat.label} className="border-zinc-800 bg-zinc-900/50">
              <CardContent className="p-8 text-center flex flex-col items-center justify-center">
                <span className="text-4xl md:text-5xl font-black text-white mb-2">{stat.value}</span>
                <span className="text-sm font-medium text-zinc-400 uppercase tracking-widest">{stat.label}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
