'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function ComponentPreview({ children }: { children: React.ReactNode }) {
    return (
        <div className="border rounded-xl p-8 bg-slate-50 dark:bg-slate-900/50 min-h-[400px] flex items-center justify-center">
            {children}
        </div>
    );
}
