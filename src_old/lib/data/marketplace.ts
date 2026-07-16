export interface MarketplaceReview {
  id: string;
  rating: number;
  review: string;
  reviewerName: string;
  reviewerAvatarUrl?: string;
  createdAt: string;
}

export interface MarketplaceItem {
  id: string;
  title: string;
  description: string;
  priceCents: number; // 0 = free
  currency: string;
  downloads: number;
  ratingAverage: number;
  ratingCount: number;
  isActive: boolean;
  imageUrl: string;
  frameworks: string[];
  category: string;
  createdAt: string;
  updatedAt: string;
  seller?: {
    name: string;
    avatarUrl?: string;
    isVerified: boolean;
  };
  features?: string[];
  reviews?: MarketplaceReview[];
}

export const mockMarketplaceItems: MarketplaceItem[] = [
  {
    id: 'market-1',
    title: 'Premium Fintech Dashboard Pack',
    description: 'A collection of 15+ ready-to-use banking, transactions, and analytics cards built for Flutter and React Native. Fully optimized for responsive charts and dark themes.',
    priceCents: 2900,
    currency: 'USD',
    downloads: 248,
    ratingAverage: 4.8,
    ratingCount: 19,
    isActive: true,
    imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=600&h=400&fit=crop',
    frameworks: ['React Native', 'Flutter'],
    category: 'Finance & Banking',
    createdAt: '2026-02-01T00:00:00Z',
    updatedAt: '2026-02-01T00:00:00Z',
    seller: {
      name: 'MOBOUI Team',
      avatarUrl: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=200&h=200&fit=crop',
      isVerified: true
    },
    features: [
      '15+ Premium Card components',
      'Fully responsive dynamic layouts',
      'Ready-to-use Chart integration (Reanimated + Victory Charts)',
      'Clean typography scaling guidelines',
      'Dark mode primary optimization'
    ],
    reviews: [
      {
        id: 'rev-1',
        rating: 5,
        review: 'Saved me at least a week of work. The layouts are incredibly clean and easy to customize!',
        reviewerName: 'John Doe',
        reviewerAvatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&h=100&fit=crop',
        createdAt: '2026-02-14T00:00:00Z'
      },
      {
        id: 'rev-2',
        rating: 4,
        review: 'Great dashboard blocks. Would love to see more variations for analytics charts.',
        reviewerName: 'Sarah Jenkins',
        reviewerAvatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&h=100&fit=crop',
        createdAt: '2026-02-10T00:00:00Z'
      }
    ]
  },
  {
    id: 'market-2',
    title: 'Neo-Brutalist Auth Screen Suite',
    description: 'Make your apps stand out with high-contrast, beautiful neo-brutalist layouts for login, onboarding, and OTP inputs. Optimized for rapid styling adjustments.',
    priceCents: 0,
    currency: 'USD',
    downloads: 1420,
    ratingAverage: 4.5,
    ratingCount: 34,
    isActive: true,
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&h=400&fit=crop',
    frameworks: ['React Native', 'Expo'],
    category: 'Authentication & Security',
    createdAt: '2026-02-05T00:00:00Z',
    updatedAt: '2026-02-05T00:00:00Z',
    seller: {
      name: 'CreativePixel',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&fit=crop',
      isVerified: false
    },
    features: [
      'Login & Signup screen templates',
      'Interactive 6-digit OTP input grid',
      'Stunning high-contrast borders and dropshadow style',
      'Configurable spacing tokens'
    ],
    reviews: [
      {
        id: 'rev-3',
        rating: 5,
        review: 'Super unique style. Extremely clean and fast implementation.',
        reviewerName: 'Alex Mercer',
        reviewerAvatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&h=100&fit=crop',
        createdAt: '2026-02-11T00:00:00Z'
      }
    ]
  },
  {
    id: 'market-3',
    title: '3D Fitness Tracker Visualizer',
    description: 'Beautiful workout tracker layout with custom animated 3D visualizers, circular rings, and detailed graphs. Integrates directly into common workout API schemas.',
    priceCents: 1900,
    currency: 'USD',
    downloads: 89,
    ratingAverage: 4.9,
    ratingCount: 12,
    isActive: true,
    imageUrl: 'https://images.unsplash.com/photo-1510017803434-a899398421b3?q=80&w=600&h=400&fit=crop',
    frameworks: ['Flutter'],
    category: 'Health & Fitness',
    createdAt: '2026-02-10T00:00:00Z',
    updatedAt: '2026-02-10T00:00:00Z',
    seller: {
      name: 'FitCode Lab',
      avatarUrl: 'https://images.unsplash.com/photo-1628157582853-a796fa650a6a?q=80&w=200&h=200&fit=crop',
      isVerified: true
    },
    features: [
      'Interactive 3D dynamic visualizers',
      'Smooth step counter ring animation',
      'Custom workout timeline layout',
      'Dynamic health graphs'
    ],
    reviews: [
      {
        id: 'rev-4',
        rating: 5,
        review: 'Absolutely stunning animations. Exceeded all expectations!',
        reviewerName: 'Mike Tyson',
        reviewerAvatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&h=100&fit=crop',
        createdAt: '2026-02-12T00:00:00Z'
      }
    ]
  },
  {
    id: 'market-4',
    title: 'Swipe-to-Action Grid Kit',
    description: 'High-performance list elements supporting smooth swipe gesture commands, multi-selection, search filters, and quick archiving.',
    priceCents: 900,
    currency: 'USD',
    downloads: 312,
    ratingAverage: 4.7,
    ratingCount: 21,
    isActive: true,
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=600&h=400&fit=crop',
    frameworks: ['React Native', 'Expo', 'Flutter'],
    category: 'Lists',
    createdAt: '2026-02-08T00:00:00Z',
    updatedAt: '2026-02-08T00:00:00Z',
    seller: {
      name: 'MOBOUI Team',
      avatarUrl: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=200&h=200&fit=crop',
      isVerified: true
    },
    features: [
      'Smooth 60FPS list animations',
      'Configurable swipe thresholds',
      'Drag-and-drop support',
      'Multi-selection toolbar'
    ],
    reviews: [
      {
        id: 'rev-5',
        rating: 5,
        review: 'Brilliant performance on low-end Android devices. High code quality.',
        reviewerName: 'Julia Roberts',
        reviewerAvatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100&h=100&fit=crop',
        createdAt: '2026-02-09T00:00:00Z'
      }
    ]
  }
];
