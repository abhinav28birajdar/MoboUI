import { ComponentCategory } from "@/types/component";

export const categories: Omit<ComponentCategory, 'created_at' | 'component_count'>[] = [
  { id: '11111111-1111-1111-1111-111111111111', slug: 'buttons', name: 'Buttons', description: 'Interactive button styles and micro-animations', icon_name: 'button', color: '#c026d3', sort_order: 1 },
  { id: '22222222-2222-2222-2222-222222222222', slug: 'cards', name: 'Cards', description: 'Content containers, grids, and dashboard card layouts', icon_name: 'card', color: '#a1a1aa', sort_order: 2 },
  { id: '33333333-3333-3333-3333-333333333333', slug: 'forms', name: 'Forms', description: 'Text fields, sliders, toggles, and input systems', icon_name: 'form', color: '#c026d3', sort_order: 3 },
  { id: '44444444-4444-4444-4444-444444444444', slug: 'navigation', name: 'Navigation', description: 'App headers, bottom bars, drawer menus, and tabs', icon_name: 'navigation', color: '#a1a1aa', sort_order: 4 },
  { id: '55555555-5555-5555-5555-555555555555', slug: 'modals', name: 'Modals', description: 'Overlays, popup dialogues, and bottom sheets', icon_name: 'modal', color: '#c026d3', sort_order: 5 },
  { id: '66666666-6666-6666-6666-666666666666', slug: 'lists', name: 'Lists', description: 'High-performance tables, grids, and scrollable feeds', icon_name: 'list', color: '#a1a1aa', sort_order: 6 },
  { id: '77777777-7777-7777-7777-777777777777', slug: 'data-display', name: 'Data Display', description: 'Charts, visual statistics, and data badges', icon_name: 'chart', color: '#c026d3', sort_order: 7 },
  { id: '88888888-8888-8888-8888-888888888888', slug: 'feedback', name: 'Feedback', description: 'Toasts, notifications, alerts, and loading spinners', icon_name: 'feedback', color: '#a1a1aa', sort_order: 8 },
  { id: '99999999-9999-9999-9999-999999999999', slug: 'media', name: 'Media', description: 'Image carousels, video players, and avatars', icon_name: 'media', color: '#c026d3', sort_order: 9 },
  { id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', slug: 'charts', name: 'Charts', description: 'Bar, line, pie and complex data visualisations', icon_name: 'charts', color: '#a1a1aa', sort_order: 10 },
  { id: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', slug: 'authentication', name: 'Authentication', description: 'Login screens, social sign-ins, and OTP forms', icon_name: 'auth', color: '#c026d3', sort_order: 11 },
  { id: 'cccccccc-cccc-cccc-cccc-cccccccccccc', slug: 'onboarding', name: 'Onboarding', description: 'Walkthroughs, welcome screens, and intro carousels', icon_name: 'onboarding', color: '#a1a1aa', sort_order: 12 },
  { id: 'dddddddd-dddd-dddd-dddd-dddddddddddd', slug: 'settings', name: 'Settings', description: 'Preferences panels, switch arrays, and user controls', icon_name: 'settings', color: '#c026d3', sort_order: 13 },
  { id: 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', slug: 'profile', name: 'Profile', description: 'User showcases, stat grids, and avatar headers', icon_name: 'profile', color: '#a1a1aa', sort_order: 14 },
  { id: 'ffffffff-ffff-ffff-ffff-ffffffffffff', slug: 'utilities', name: 'Utilities', description: 'Dividers, spacers, headers, and structural elements', icon_name: 'utility', color: '#c026d3', sort_order: 15 },
];
