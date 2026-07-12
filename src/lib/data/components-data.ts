import { components as mockComponents } from './components';
import { ComponentCategory as MockCategory } from '@/lib/types/component';

export const components = mockComponents;

// Helper to retrieve category list matching active items
export const categories: MockCategory[] = [
  { id: 'buttons', name: 'Buttons', slug: 'buttons', description: 'Core interactive buttons', icon: '🔘', count: 8 },
  { id: 'cards', name: 'Cards', slug: 'cards', description: 'Visual presentation containers', icon: '🎴', count: 6 },
  { id: 'forms', name: 'Forms', slug: 'forms', description: 'Inputs, switches, and pickers', icon: '📋', count: 4 },
  { id: 'navigation', name: 'Navigation', slug: 'navigation', description: 'App bars, tabs, and pagination', icon: '🧭', count: 4 },
  { id: 'modals', name: 'Modals', slug: 'modals', description: 'Overlays, dialogues, and sheets', icon: '📢', count: 3 },
  { id: 'lists', name: 'Lists', slug: 'lists', description: 'Scrollable collections and data grids', icon: '📝', count: 5 },
  { id: 'data-display', name: 'Data Display', slug: 'data-display', description: 'Charts, status metrics, and gauges', icon: '📊', count: 6 },
  { id: 'feedback', name: 'Feedback', slug: 'feedback', description: 'Toasts, skeletons, and loaders', icon: '🔔', count: 3 }
];
