import React from 'react'

import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card'
import { SectionLabel } from '../ui/SectionLabel'

export function FrameworkSection() {
  const frameworks = [
    {
      name: 'Flutter',
      color: '#54C5F8',
      features: ['Material 3 support', 'Dart null safety', 'Platform adaptive', 'Cupertino widgets'],
      snippet: `Widget build(BuildContext context) {\n  return PrimaryButton(\n    label: 'Submit',\n    onPressed: () {},\n  );\n}`
    },
    {
      name: 'React Native',
      color: '#61DAFB',
      features: ['Expo Go compatible', 'TypeScript', 'Platform-specific APIs', 'NativeWind support'],
      snippet: `export const App = () => (\n  <PrimaryButton\n    label="Submit"\n    onPress={() => {}}\n  />\n);`
    },
    {
      name: 'Expo',
      color: '#FFFFFF',
      features: ['EAS Build ready', 'Expo Router', 'SDK 50+', 'OTA Updates'],
      snippet: `export default function Index() {\n  return (\n    <PrimaryButton label="Submit" />\n  );\n}`
    }
  ]

  return (
    <section className="py-24 bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-900">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-16">
          <SectionLabel className="mb-4 inline-block">UNIVERSAL</SectionLabel>
          <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-6">Write once, use anywhere.</h2>
          <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">Copy and paste code directly into your favorite mobile framework.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {frameworks.map(fw => (
            <Card key={fw.name} className="overflow-hidden group" style={{ borderColor: 'var(--color-border)' }}>
              <div className="h-1 w-full" style={{ backgroundColor: fw.color }} />
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: fw.color }} />
                  {fw.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-white dark:bg-zinc-950 rounded-lg p-4 mb-6 border border-zinc-200 dark:border-zinc-800">
                  <pre className="text-xs text-zinc-700 dark:text-zinc-300 font-mono overflow-x-auto">
                    <code>{fw.snippet}</code>
                  </pre>
                </div>
                <ul className="space-y-3">
                  {fw.features.map(feat => (
                    <li key={feat} className="flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-400">
                      <i className="fi fi-rr-check w-4 h-4 text-success"  ></i> {feat}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
