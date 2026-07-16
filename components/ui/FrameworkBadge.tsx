import React from 'react'
import { Framework } from '@/types'
import { cn } from '@/lib/utils'

export function FrameworkBadge({ framework, className, showLabel = true }: { framework: Framework, className?: string, showLabel?: boolean }) {
  const config = {
    flutter: { color: 'bg-[#54C5F8]', label: 'Flutter' },
    'react-native': { color: 'bg-[#61DAFB]', label: 'React Native' },
    expo: { color: 'bg-white', label: 'Expo' },
    web: { color: 'bg-warning', label: 'Web' }
  }

  const { color, label } = config[framework]

  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <div className={cn("h-2.5 w-2.5 rounded-full", color)} />
      {showLabel && <span className="text-xs font-medium text-zinc-400">{label}</span>}
    </div>
  )
}
