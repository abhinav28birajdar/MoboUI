import React from 'react'
import { Card, CardContent } from '@/components/ui/Card'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About — MOBOUI',
  description: 'Learn about the MOBOUI project and team.',
}

export default function AboutPage() {
  const milestones = [
    { date: 'Jan 2024', title: 'Project started', desc: 'Initial commit and core architecture design.' },
    { date: 'Mar 2024', title: 'First 10 components', desc: 'Released buttons, cards, and basic forms.' },
    { date: 'Jun 2024', title: 'Community launch', desc: 'Opened Discord server and GitHub discussions.' },
    { date: 'Sep 2024', title: '50 components milestone', desc: 'Reached comprehensive coverage of mobile UI patterns.' },
    { date: 'Jan 2025', title: 'v2.0 with Playground', desc: 'Launched integrated code editor and live preview.' },
  ]

  const team = [
    { name: 'Alex Johnson', role: 'Creator & Lead Developer' },
    { name: 'Sarah Lee', role: 'Design Director' },
    { name: 'David Smith', role: 'Accessibility Lead' },
    { name: 'Emily Chen', role: 'Community Manager' },
    { name: 'Michael Brown', role: 'Flutter Specialist' },
    { name: 'Jessica Taylor', role: 'React Native Expert' },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-zinc-950 pb-24">
      {/* Hero */}
      <section className="py-24 border-b border-zinc-900 text-center">
        <div className="mx-auto max-w-3xl px-6">
          <h1 className="text-5xl font-black text-white mb-6 tracking-tight">What is MOBOUI?</h1>
          <p className="text-xl text-zinc-400 mb-6">
            MOBOUI is an open-source initiative to standardize high-quality mobile UI components across different frameworks. We believe that whether you use Flutter, React Native, or Expo, you shouldn't have to start from scratch.
          </p>
          <p className="text-lg text-zinc-500">
            Our mission is to provide beautiful, accessible, and highly customizable components that you can copy and paste directly into your projects, entirely for free.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Our Journey</h2>
          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-zinc-800">
            {milestones.map((item, idx) => (
              <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-zinc-950 bg-accent text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2"></div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-zinc-800 bg-zinc-900/50 shadow">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-bold text-white text-lg">{item.title}</h3>
                    <time className="text-sm font-medium text-accent">{item.date}</time>
                  </div>
                  <p className="text-zinc-400 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-zinc-900/20 border-y border-zinc-900">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">The Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {team.map((member, idx) => (
              <Card key={idx} className="bg-zinc-900 border-zinc-800 text-center flex flex-col items-center p-6">
                <div className="w-20 h-20 rounded-full bg-zinc-800 flex items-center justify-center font-bold text-white text-2xl mb-4">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h3 className="font-bold text-white mb-1">{member.name}</h3>
                <p className="text-sm text-zinc-400 mb-4">{member.role}</p>
                <div className="flex gap-3">
                  <a href="#" className="text-zinc-500 hover:text-white"><i className="fi fi-brands-twitter-alt w-4 h-4" ></i></a>
                  <a href="#" className="text-zinc-500 hover:text-white"><i className="fi fi-brands-github w-4 h-4" ></i></a>
                  <a href="#" className="text-zinc-500 hover:text-white"><i className="fi fi-brands-linkedin w-4 h-4" ></i></a>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Open Source & Stack */}
      <section className="py-24">
        <div className="mx-auto max-w-4xl px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Open Source</h2>
            <p className="text-zinc-400 mb-4">
              MOBOUI is released under the MIT License. You can use it freely in your personal and commercial projects without attribution.
            </p>
            <p className="text-zinc-400">
              We welcome contributions! Check out our GitHub repository to learn how you can add new components or improve existing ones.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Tech Stack</h2>
            <div className="flex flex-wrap gap-2">
              {['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Zustand', 'Radix UI', 'Monaco Editor', 'Fuse.js'].map(tech => (
                <span key={tech} className="bg-zinc-900 border border-zinc-800 text-zinc-300 px-3 py-1.5 rounded-lg text-sm font-medium">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
