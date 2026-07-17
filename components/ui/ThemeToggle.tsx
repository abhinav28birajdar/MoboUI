'use client'
import React from 'react'
import { useTheme } from 'next-themes'

import { Button } from './Button'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => setMounted(true), [])
  if (!mounted) return <Button variant="ghost" size="icon" className="w-9 h-9" />

  return (
    <Button
      variant="ghost"
      size="icon"
      className="w-9 h-9"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      aria-label="Toggle theme"
    >
      <i className="fi fi-rr-sun h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"  ></i>
      <i className="fi fi-rr-moon absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"  ></i>
    </Button>
  )
}
