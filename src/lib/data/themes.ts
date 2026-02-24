export interface Theme {
    id: string;
    name: string;
    description: string;
    colors: {
        primary: string;
        secondary: string;
        background: string;
        surface: string;
        text: string;
    };
    borderRadius: number;
}

export const themes: Theme[] = [
    {
        id: 'dark-elegant',
        name: 'Dark Elegant',
        description: 'Premium dark mode with vibrant purple accents.',
        colors: {
            primary: '#8b5cf6',
            secondary: '#3b82f6',
            background: '#0a0a0a',
            surface: '#1a1a1a',
            text: '#ffffff'
        },
        borderRadius: 12
    },
    {
        id: 'light-clean',
        name: 'Light Clean',
        description: 'Minimalist light theme with soft shadows.',
        colors: {
            primary: '#2563eb',
            secondary: '#4b5563',
            background: '#ffffff',
            surface: '#f3f4f6',
            text: '#111827'
        },
        borderRadius: 8
    }
];
