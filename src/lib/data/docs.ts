export interface DocSection {
    title: string;
    slug: string;
    items?: DocItem[];
}

export interface DocItem {
    title: string;
    slug: string; // e.g., 'installation' or 'getting-started/installation'
    description: string;
    content: string;
}

export const docsData: DocSection[] = [
    {
        title: "Getting Started",
        slug: "getting-started",
        items: [
            { title: "Introduction", slug: "introduction", description: "Welcome to MobileUI", content: "MobileUI is a production-ready component library..." },
            { title: "Installation", slug: "installation", description: "How to install MobileUI", content: "## Installation\n\nRun the following command..." },
            { title: "Quick Start", slug: "quick-start", description: "Start building in minutes", content: "## Quick Start\n\nImport components and start using them..." },
            { title: "Project Structure", slug: "project-structure", description: "Understanding the folder layout", content: "## Structure\n\nThe project is organized as follows..." }
        ]
    },
    {
        title: "React Native",
        slug: "react-native",
        items: [
            { title: "Setup", slug: "setup", description: "Setting up React Native", content: "## React Native Setup\n\nEnsure you have the environment set up..." },
            { title: "Styling", slug: "styling", description: "Styling pattern in MobileUI", content: "## Styling\n\nWe use a modified version of NativeWind..." },
            { title: "Navigation", slug: "navigation", description: "Routing and Navigation", content: "## Navigation\n\nMobileUI works seamlessly with Expo Router..." }
        ]
    },
    {
        title: "Expo",
        slug: "expo",
        items: [
            { title: "Setup", slug: "setup", description: "Using with Expo", content: "## Expo Setup\n\nThe easiest way to get started..." },
            { title: "EAS Build", slug: "eas-build", description: "Building for production", content: "## EAS Build\n\nConfigure your eas.json..." }
        ]
    },
    {
        title: "Theming",
        slug: "theming",
        items: [
            { title: "Colors", slug: "colors", description: "Color palette and customization", content: "## Colors\n\nMobileUI uses a semantic color system..." },
            { title: "Dark Mode", slug: "dark-mode", description: "Implementing Dark Mode", content: "## Dark Mode\n\nNative dark mode support is built-in..." }
        ]
    }
];

export function getDocBySlug(slugs: string[]) {
    // Flatten logic or search logic
    // url: /docs/getting-started/installation -> slugs: ['getting-started', 'installation']

    if (slugs.length === 0) return null;

    const sectionSlug = slugs[0];
    const section = docsData.find(s => s.slug === sectionSlug);

    if (!section) return null;

    if (slugs.length === 1) {
        // Returned the section main page (if we want one) or the first item
        return { title: section.title, content: `Welcome to ${section.title}`, description: `Documentation for ${section.title}` };
    }

    const itemSlug = slugs[1];
    const item = section.items?.find(i => i.slug === itemSlug);

    return item || null;
}
