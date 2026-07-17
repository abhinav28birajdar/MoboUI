'use client'
import React from 'react'
import Link from 'next/link'

import { Button } from '../ui/Button'
import { Badge } from '../ui/Badge'
import { FrameworkBadge } from '../ui/FrameworkBadge'
import { GradientText } from '../ui/GradientText'
import { motion } from 'framer-motion'

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden pt-20 pb-16">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent-subtle/40 via-bg-dark to-bg-dark -z-10" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wMykiLz48L3N2Zz4=')] opacity-50 -z-10" />
      
      <motion.div 
        className="absolute w-[600px] h-[600px] bg-accent/20 rounded-full blur-[120px] -z-10"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="mx-auto max-w-7xl px-6 flex flex-col items-center text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="mb-6 inline-flex items-center rounded-full border border-accent bg-accent/10 px-3 py-1 text-sm text-accent">
            <span className="mr-2">✦</span> Open Source Mobile UI Library
          </div>
        </motion.div>

        <motion.h1 
          className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-6 max-w-4xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
        >
          Build Mobile Apps<br />That Feel <GradientText>Premium</GradientText>
        </motion.h1>

        <motion.p 
          className="text-lg md:text-xl text-zinc-400 max-w-2xl mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          50+ production-ready components for Flutter, React Native, and Expo. Copy, paste, ship.
        </motion.p>

        <motion.div 
          className="flex flex-col sm:flex-row gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link href="/components">
            <Button size="lg" className="w-full sm:w-auto" rightIcon={<i className="fi fi-rr-arrow-right w-4 h-4"  ></i>}>
              Browse Components
            </Button>
          </Link>
          <Link href="/playground">
            <Button variant="secondary" size="lg" className="w-full sm:w-auto" leftIcon={<i className="fi fi-rr-terminal w-4 h-4"  ></i>}>
              Open Playground
            </Button>
          </Link>
        </motion.div>

        <motion.div 
          className="flex items-center gap-8 opacity-70 grayscale hover:grayscale-0 transition-all"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <FrameworkBadge framework="flutter" />
          <FrameworkBadge framework="react-native" />
          <FrameworkBadge framework="expo" />
        </motion.div>
      </div>
      
      {/* 3D Component Strip Preview Placeholder */}
      <motion.div 
        className="mt-16 w-full max-w-5xl px-6 hidden md:block perspective-1200"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <div className="w-full h-48 bg-zinc-900 border border-zinc-800 rounded-2xl rotate-x-10 shadow-2xl flex items-center justify-center relative overflow-hidden">
           <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent z-10" />
           <p className="text-zinc-600 font-mono z-0">Interactive components strip goes here</p>
        </div>
      </motion.div>
    </section>
  )
}
