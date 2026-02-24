'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils/cn';

const docRoutes = [
    {
        title: 'Getting Started',
        items: [
            { title: 'Introduction', href: '/docs' },
            { title: 'Quick Start', href: '/docs/getting-started' },
            { title: 'Installation', href: '/docs/installation' },
        ],
    },
    {
        title: 'Platforms',
        items: [
            { title: 'React Native', href: '/docs/react-native' },
            { title: 'Expo', href: '/docs/expo' },
            { title: 'Flutter', href: '/docs/flutter' },
        ],
    },
    {
        title: 'Customization',
        items: [
            { title: 'Theming', href: '/docs/theming' },
            { title: 'Dark Mode', href: '/docs/dark-mode' },
        ],
    },
    {
        title: 'Contributing',
        items: [
            { title: 'Add Components', href: '/docs/contributing/add-components' },
            { title: 'Code Style', href: '/docs/contributing/code-style' },
            { title: 'Submit PR', href: '/docs/contributing/submit-pr' },
        ],
    },
];

export function DocsSidebar() {
    const pathname = usePathname();

    return (
        <div className="w-full">
            {docRoutes.map((group, i) => (
                <div key={i} className="pb-4">
                    <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-semibold">
                        {group.title}
                    </h4>
                    <div className="grid grid-flow-row auto-rows-max text-sm">
                        {group.items.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    'group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:underline',
                                    pathname === item.href
                                        ? 'font-medium text-foreground'
                                        : 'text-muted-foreground'
                                )}
                            >
                                {item.title}
                            </Link>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
