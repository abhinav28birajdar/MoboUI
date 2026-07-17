import React from 'react'
import { PropDefinition } from '@/types'

export function PropsTable({ props }: { props: PropDefinition[] }) {
  if (!props || props.length === 0) return null

  return (
    <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
      <table className="w-full text-left text-sm">
        <thead className="bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400">
          <tr>
            <th className="px-6 py-4 font-medium">Prop</th>
            <th className="px-6 py-4 font-medium">Type</th>
            <th className="px-6 py-4 font-medium">Default</th>
            <th className="px-6 py-4 font-medium">Description</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-800 text-zinc-700 dark:text-zinc-300">
          {props.map((prop, idx) => (
            <tr key={idx} className="hover:bg-zinc-50 dark:bg-zinc-900/30 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-zinc-900 dark:text-white">{prop.name}</span>
                  {prop.required && <span className="text-[10px] uppercase font-bold text-error bg-error/10 px-1.5 py-0.5 rounded-sm">Required</span>}
                </div>
              </td>
              <td className="px-6 py-4 font-mono text-accent whitespace-nowrap">{prop.type}</td>
              <td className="px-6 py-4 font-mono text-zinc-500 dark:text-zinc-400 whitespace-nowrap">{prop.default || '-'}</td>
              <td className="px-6 py-4">{prop.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
