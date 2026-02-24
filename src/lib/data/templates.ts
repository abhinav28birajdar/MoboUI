export interface Template {
    id: string;
    name: string;
    description: string;
    category: string;
    image: string;
    frameworks: ('react-native' | 'flutter' | 'expo')[];
    isPro: boolean;
}

export const templates: Template[] = [
    {
        id: 'social-feed',
        name: 'Social Media Feed',
        description: 'A complete Instagram-style feed with stories, posts, and like animations.',
        category: 'Social',
        image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=300&h=400&fit=crop',
        frameworks: ['react-native', 'flutter'],
        isPro: false,
    },
    {
        id: 'ecommerce-product',
        name: 'E-commerce Detail',
        description: 'Product page with image gallery, size selector, and reviews.',
        category: 'E-commerce',
        image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=300&h=400&fit=crop',
        frameworks: ['react-native', 'flutter', 'expo'],
        isPro: true,
    },
    {
        id: 'banking-dashboard',
        name: 'Banking Dashboard',
        description: 'Financial overview with charts, card switcher, and recent transactions.',
        category: 'Finance',
        image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=300&h=400&fit=crop',
        frameworks: ['react-native', 'flutter'],
        isPro: true,
    },
    {
        id: 'ride-sharing',
        name: 'Ride Sharing Home',
        description: 'Map-based home screen with pickup location and vehicle types.',
        category: 'Travel',
        image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=300&h=400&fit=crop',
        frameworks: ['react-native', 'flutter'],
        isPro: true,
    },
    {
        id: 'fitness-tracker',
        name: 'Fitness Dashboard',
        description: 'Activity rings, step counter, and heart rate graphs.',
        category: 'Health',
        image: 'https://images.unsplash.com/photo-1510017803434-a899398421b3?q=80&w=300&h=400&fit=crop',
        frameworks: ['react-native', 'expo'],
        isPro: false,
    },
    {
        id: 'chat-interface',
        name: 'Messaging App',
        description: 'Threaded conversations with attachment support and typing indicators.',
        category: 'Social',
        image: 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?q=80&w=300&h=400&fit=crop',
        frameworks: ['react-native', 'flutter'],
        isPro: false,
    },
];
