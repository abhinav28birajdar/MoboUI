import React from 'react'
import { cn } from '@/lib/utils'

interface EmulatorFrameProps extends React.HTMLAttributes<HTMLDivElement> {
  device?: 'iphone' | 'android'
  theme?: 'dark' | 'light'
}

export function EmulatorFrame({ children, device = 'iphone', theme = 'dark', className, ...props }: EmulatorFrameProps) {
  const isIphone = device === 'iphone'
  
  return (
    <div
      className={cn(
        "relative mx-auto border-zinc-800 bg-zinc-950 shadow-2xl overflow-hidden",
        isIphone ? "w-[320px] h-[650px] rounded-[48px] border-[8px]" : "w-[320px] h-[650px] rounded-[24px] border-[6px]",
        className
      )}
      {...props}
    >
      {/* Notch / Camera area */}
      <div className="absolute top-0 inset-x-0 h-6 flex justify-center z-20">
        {isIphone ? (
          <div className="w-24 h-5 bg-black rounded-b-2xl" />
        ) : (
          <div className="w-4 h-4 bg-black rounded-full mt-2" />
        )}
      </div>
      
      {/* Screen Area */}
      <div className={cn("absolute inset-0 z-10 overflow-hidden", theme === 'dark' ? 'bg-[#111113]' : 'bg-white')}>
        {children}
      </div>
    </div>
  )
}
