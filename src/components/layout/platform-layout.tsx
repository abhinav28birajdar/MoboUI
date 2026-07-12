'use client';

import * as React from 'react';
import { Sidebar } from './Sidebar';

interface PlatformLayoutProps {
  children: React.ReactNode;
}

export function PlatformLayout({ children }: PlatformLayoutProps) {
  return (
    <div className="flex w-full min-h-[calc(100vh-5rem)] bg-[#0f0f14]">
      {/* Platform Sidebar */}
      <Sidebar className="hidden md:flex shrink-0" />

      {/* Main viewport */}
      <main className="flex-1 min-w-0 p-6 md:p-10">{children}</main>
    </div>
  );
}
export default PlatformLayout;
