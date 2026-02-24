export interface Category {
    id: string;
    name: string;
    description: string;
    count: number;
}

export const categories: Category[] = [
    { id: 'foundation', name: 'Basic / Foundation', description: 'Core building blocks like buttons, typography, and badges.', count: 13 },
    { id: 'layout', name: 'Layout', description: 'Flexible containers and spacing components for structural design.', count: 16 },
    { id: 'navigation', name: 'Navigation', description: 'App bars, tab bars, drawers, and pagination systems.', count: 13 },
    { id: 'inputs', name: 'Input / Forms', description: 'Comprehensive form elements from text fields to signature pads.', count: 28 },
    { id: 'data-display', name: 'Data Display', description: 'Lists, grids, charts, and complex data visualization.', count: 31 },
    { id: 'feedback', name: 'Feedback / Overlay', description: 'Alerts, modals, toasts, and loading states.', count: 17 },
    { id: 'media', name: 'Media & Content', description: 'Image galleries, video players, and rich content cards.', count: 18 },
    { id: 'animation', name: 'Animation & Gesture', description: 'Fluid transitions, gestures, and Lottie animations.', count: 23 },
    { id: 'social', name: 'Social & Communication', description: 'Chat bubbles, reaction bars, and social post cards.', count: 20 },
    { id: 'ecommerce', name: 'E-commerce', description: 'Price tags, product cards, and cart components.', count: 20 },
    { id: 'dashboard', name: 'Dashboard & Analytics', description: 'KPI cards, heatmaps, and performance charts.', count: 20 },
    { id: 'auth', name: 'Authentication & Security', description: 'Login forms, biometric prompts, and security setup.', count: 10 },
    { id: 'maps', name: 'Maps & Location', description: 'Interactive markers, routes, and address pickers.', count: 10 },
    { id: 'gaming', name: 'Gaming & Gamification', description: 'XP bars, leaderboards, and achievement badges.', count: 10 },
    { id: 'health', name: 'Health & Fitness', description: 'Heart rate graphs, step counters, and workout cards.', count: 10 },
    { id: 'finance', name: 'Finance & Banking', description: 'Bank card displays, transaction lists, and budget rings.', count: 10 },
    { id: 'education', name: 'Education', description: 'Lesson progress, quiz cards, and flashcards.', count: 10 },
    { id: 'food', name: 'Food & Delivery', description: 'Restaurant cards, menu items, and order trackers.', count: 10 },
    { id: 'travel', name: 'Travel & Booking', description: 'Boarding passes, itinerary timelines, and flight cards.', count: 10 },
    { id: 'templates', name: 'Screen Templates', description: 'Full-screen app layouts for various industries.', count: 70 },
];

