import React from 'react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { CommandSearchModal } from '@/components/layout/CommandSearchModal'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 mt-16">{children}</main>
      <Footer />
      <CommandSearchModal />
    </div>
  )
}
