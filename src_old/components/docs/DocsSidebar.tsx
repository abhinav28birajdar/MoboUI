'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils/cn';
import { docsData } from '@/lib/data/docs';

export function DocsSidebar() {
    const pathname = usePathname();

    return (
        <div className="w-full">
            {docsData.map((group, i) => (
                <div key={i} className="pb-6">
                    <h4 className="mb-2 rounded-md px-2 py-1 text-sm font-bold text-white uppercase tracking-wider font-heading">
                        {group.title}
                    </h4>
                    <div className="grid grid-flow-row auto-rows-max text-sm gap-1">
                        {group.items?.map((item) => {
                            const href = `/docs/${group.slug}/${item.slug}`;
                            const isActive = pathname === href;
                            
                            return (
                                <Link
                                    key={href}
                                    href={href}
                                    className={cn(
                                        'group flex w-full items-center rounded-md border border-transparent px-3 py-2 transition-all duration-200',
                                        isActive
                                            ? 'font-bold text-fuchsia-600 bg-fuchsia-600/10'
                                            : 'text-slate-400 hover:text-white hover:bg-[#2a2a38]/50'
                                    )}
                                >
                                    {item.title}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            ))}
            
            <div className="pb-6 pt-4 border-t border-[#2a2a38]">
                 <h4 className="mb-2 rounded-md px-2 py-1 text-sm font-bold text-white uppercase tracking-wider font-heading">
                    Resources
                </h4>
                <div className="grid grid-flow-row auto-rows-max text-sm gap-1">
                    <Link
                        href="/components"
                        className="group flex w-full items-center rounded-md border border-transparent px-3 py-2 transition-all duration-200 text-slate-400 hover:text-white hover:bg-[#2a2a38]/50"
                    >
                        Component Library
                    </Link>
                    <Link
                        href="/playground"
                        className="group flex w-full items-center rounded-md border border-transparent px-3 py-2 transition-all duration-200 text-slate-400 hover:text-white hover:bg-[#2a2a38]/50"
                    >
                        Interactive Playground
                    </Link>
                </div>
            </div>
        </div>
    );
}
