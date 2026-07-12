import React from 'react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <div className="flex-1 w-full bg-bg-base">{children}</div>;
}