import React from 'react'
import { Metadata } from 'next'
import { ExpoSnackEmbed } from '@/components/ui/ExpoSnackEmbed'
import { DartpadEmbed } from '@/components/ui/DartpadEmbed'

export const metadata: Metadata = {
  title: 'Playground — MOBOUI',
  description: 'Try out mobile UI components in real-time with Expo Snack and DartPad.',
}

export default function PlaygroundPage() {
  return (
    <div className="min-h-screen py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Real-Time Playground</h1>
          <p className="text-xl text-[var(--color-text-secondary)] max-w-3xl">
            Experiment with MOBOUI components directly in your browser. We support both Expo Snack for React Native and DartPad for Flutter.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Expo Snack Section */}
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-3 mb-2">
                <i className="fi fi-rr-globe text-accent"></i> Expo Snack Preview
              </h2>
              <p className="text-[var(--color-text-secondary)] text-sm">
                Live React Native emulator. Edit the code and see changes instantly.
              </p>
            </div>
            
            <ExpoSnackEmbed 
              snackId="@expo/snack" 
              theme="dark"
              height={650}
            />
          </div>

          {/* Dartpad Section */}
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-3 mb-2">
                <i className="fi fi-rr-globe text-flutter"></i> DartPad Preview
              </h2>
              <p className="text-[var(--color-text-secondary)] text-sm">
                Live Flutter emulator. Test Flutter layouts in real-time.
              </p>
            </div>
            
            <DartpadEmbed 
              theme="dark"
              height={650}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
