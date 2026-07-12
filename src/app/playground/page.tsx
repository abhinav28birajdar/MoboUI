'use client';

import React from 'react';
import { PlaygroundIDE } from '@/components/playground/PlaygroundIDE';

export default function PlaygroundPage() {
  return (
    <div className="w-screen h-screen flex flex-col bg-[#050506] pt-20 overflow-hidden">
      <PlaygroundIDE />
    </div>
  );
}

