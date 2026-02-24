'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-dart';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import { Button } from '@/components/ui/button'; // Re-using button from ui
import Link from 'next/link';

export function PlatformTabs() {
    const [activeTab, setActiveTab] = useState('react-native');

    const codeSnippets = {
        'react-native': `
// React Native
import React from 'react';
import { View, Text } from 'react-native';

export function Greeting() {
  return (
    <View style={styles.container}>
      <Text>Hello Native!</Text>
    </View>
  );
}`,
        'expo': `
// Expo
import { StatusBar } from 'expo-status-bar';
import { View, Text } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Built with Expo 🚀</Text>
      <StatusBar style="auto" />
    </View>
  );
}`,
        'flutter': `
// Flutter
import 'package:flutter/material.dart';

class Greeting extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      child: Text('Hello Flutter!'),
    );
  }
}`
    };

    return (
        <section className="py-20 bg-slate-50 dark:bg-slate-900/50">
            <div className="container px-4 md:px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                        One Library, All Platforms
                    </h2>
                    <p className="mt-4 text-gray-500 dark:text-gray-400">
                        Click a platform to see how it works
                    </p>
                </div>

                <Tabs defaultValue="react-native" className="w-full max-w-4xl mx-auto" onValueChange={setActiveTab}>
                    <TabsList className="grid w-full grid-cols-3 mb-8">
                        <TabsTrigger value="flutter">Flutter</TabsTrigger>
                        <TabsTrigger value="react-native">React Native</TabsTrigger>
                        <TabsTrigger value="expo">Expo</TabsTrigger>
                    </TabsList>

                    {Object.entries(codeSnippets).map(([platform, code]) => (
                        <TabsContent key={platform} value={platform} className="mt-0">
                            <div className="grid md:grid-cols-2 gap-8 items-center">
                                <Card className="p-0 overflow-hidden bg-[#1e1e1e] border-slate-800">
                                    <div className="flex items-center px-4 py-2 border-b border-slate-700 bg-[#252526]">
                                        <div className="flex space-x-1.5">
                                            <div className="w-3 h-3 rounded-full bg-red-500" />
                                            <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                            <div className="w-3 h-3 rounded-full bg-green-500" />
                                        </div>
                                        <span className="ml-4 text-xs text-slate-400 font-mono">
                                            component.{platform === 'flutter' ? 'dart' : 'tsx'}
                                        </span>
                                    </div>
                                    <pre className="p-4 text-sm font-mono text-gray-300 overflow-x-auto">
                                        <code>{code.trim()}</code>
                                    </pre>
                                </Card>

                                <div className="flex flex-col justify-center space-y-4">
                                    <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-xl">
                                        <div className="w-[148px] h-[18px] bg-gray-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute"></div>
                                        <div className="h-[32px] w-[3px] bg-gray-800 absolute -left-[17px] top-[72px] rounded-l-lg"></div>
                                        <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[124px] rounded-l-lg"></div>
                                        <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[178px] rounded-l-lg"></div>
                                        <div className="h-[64px] w-[3px] bg-gray-800 absolute -right-[17px] top-[142px] rounded-r-lg"></div>
                                        <div className="rounded-[2rem] overflow-hidden w-[272px] h-[572px] bg-white dark:bg-gray-800 text-center flex items-center justify-center relative">
                                            {/* Animated content placeholder */}
                                            <motion.div
                                                key={platform}
                                                initial={{ scale: 0.8, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                className="p-6"
                                            >
                                                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4 text-2xl">
                                                    {platform === 'flutter' ? '💙' : platform === 'expo' ? '🚀' : '⚛️'}
                                                </div>
                                                <h3 className="font-bold text-lg mb-2 capitalize">{platform.replace('-', ' ')}</h3>
                                                <p className="text-sm text-muted-foreground">Native performance, clean code.</p>
                                                <Button className="mt-4" size="sm">Demo Action</Button>
                                            </motion.div>
                                        </div>
                                    </div>
                                    <div className="text-center mt-4">
                                        <Link href={`/docs/${platform}`} className="text-primary hover:underline">
                                            Learn more about {platform} →
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </TabsContent>
                    ))}
                </Tabs>
            </div>
        </section>
    );
}
