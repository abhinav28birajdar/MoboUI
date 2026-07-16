'use client'

import React, { useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { RotateCcw } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6">
      <div className="w-16 h-16 rounded-full bg-error/10 flex items-center justify-center mb-6 text-error">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" x2="12" y1="9" y2="13"/><line x1="12" x2="12.01" y1="17" y2="17"/></svg>
      </div>
      <h2 className="text-3xl font-bold text-white mb-4">Something went wrong</h2>
      <p className="text-zinc-400 mb-8 max-w-md">
        An unexpected error occurred. We've been notified and are looking into it.
      </p>
      <Button onClick={() => reset()} leftIcon={<RotateCcw className="w-4 h-4" />}>
        Try again
      </Button>
    </div>
  )
}
