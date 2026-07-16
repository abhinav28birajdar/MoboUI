'use client'

import React, { useState, useEffect } from 'react'
import { useAppStore } from '@/store/useAppStore'
import { components } from '@/data/components'
import { Framework } from '@/types'
import { FrameworkBadge } from '@/components/ui/FrameworkBadge'
import { ExpoSnackEmbed } from '@/components/playground/ExpoSnackEmbed'
import { FlutterEditor } from '@/components/playground/FlutterEditor'
import { EmulatorFrame } from '@/components/ui/EmulatorFrame'
import Editor from '@monaco-editor/react'

export default function PlaygroundPage() {
  const { activeFramework, setActiveFramework, playgroundCode, setPlaygroundCode, activeDevice, setActiveDevice } = useAppStore()
  const [selectedComponent, setSelectedComponent] = useState(components[0].slug)
  const fw = activeFramework === 'all' ? 'expo' : activeFramework

  const comp = components.find(c => c.slug === selectedComponent) || components[0]
  
  // Set default code when component changes
  useEffect(() => {
    if (fw === 'expo' && comp.code.expo) {
      setPlaygroundCode('expo', comp.code.expo)
    } else if (fw === 'react-native' && comp.code.reactNative) {
      setPlaygroundCode('react-native', comp.code.reactNative)
    } else if (fw === 'flutter' && comp.code.flutter) {
      setPlaygroundCode('flutter', comp.code.flutter)
    }
  }, [selectedComponent, fw, setPlaygroundCode, comp])

  return (
    <div className="flex h-full w-full overflow-hidden">
      {/* Panel 1: Sidebar */}
      <div className="w-64 border-r border-zinc-800 bg-zinc-950 flex flex-col h-full hidden md:flex">
        <div className="p-4 border-b border-zinc-800 flex flex-col gap-2">
          {['expo', 'react-native', 'flutter'].map(f => (
            <button
              key={f}
              onClick={() => setActiveFramework(f as Framework)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${fw === f ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-white hover:bg-zinc-900/50'}`}
            >
              <FrameworkBadge framework={f as Framework} showLabel={false} />
              <span className="capitalize">{f.replace('-', ' ')}</span>
            </button>
          ))}
        </div>
        <div className="flex-1 overflow-y-auto p-2">
          {components.map(c => (
            <button
              key={c.slug}
              onClick={() => setSelectedComponent(c.slug)}
              className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${selectedComponent === c.slug ? 'bg-accent/10 text-accent font-medium' : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'}`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      {/* Panel 2: Editor */}
      <div className="flex-1 flex flex-col h-full border-r border-zinc-800 bg-[#1E1E1E]">
        <div className="h-10 border-b border-zinc-800 bg-zinc-900 flex items-center px-4">
          <span className="text-sm font-medium text-zinc-400">{fw === 'flutter' ? 'main.dart' : 'App.tsx'}</span>
        </div>
        <div className="flex-1 overflow-hidden relative">
           {(fw === 'expo' || fw === 'react-native') && (
             <Editor
               height="100%"
               defaultLanguage="typescript"
               theme="vs-dark"
               value={playgroundCode[fw]}
               onChange={(val) => setPlaygroundCode(fw, val || '')}
               options={{ minimap: { enabled: false }, fontSize: 14 }}
             />
           )}
           {fw === 'flutter' && (
             <FlutterEditor code={playgroundCode.flutter} />
           )}
        </div>
      </div>

      {/* Panel 3: Preview */}
      <div className="w-[400px] h-full bg-zinc-950 flex flex-col hidden lg:flex">
        <div className="h-10 border-b border-zinc-800 bg-zinc-900 flex justify-between items-center px-4">
           <span className="text-sm font-medium text-zinc-400">Preview</span>
           <select 
             className="bg-transparent text-sm text-zinc-400 outline-none"
             value={activeDevice}
             onChange={e => setActiveDevice(e.target.value as any)}
           >
             <option value="iphone">iPhone 15 Pro</option>
             <option value="android">Pixel 8</option>
           </select>
        </div>
        <div className="flex-1 flex items-center justify-center p-4 bg-zinc-900/30 overflow-y-auto">
          {fw === 'flutter' ? (
            <EmulatorFrame device={activeDevice} className="scale-90">
               <div className="w-full h-full flex items-center justify-center bg-zinc-900 text-zinc-500 flex-col gap-2">
                 <span>Flutter Preview</span>
                 <span className="text-xs">Run in DartPad</span>
               </div>
            </EmulatorFrame>
          ) : (
            <div className="w-[320px] h-[650px]">
               <ExpoSnackEmbed code={playgroundCode[fw]} platform="web" />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
