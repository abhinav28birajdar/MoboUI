import { ComponentCategory } from '@/types'

export const categories: { id: ComponentCategory; name: string; icon: string; count: number }[] = [
  { id: 'buttons', name: 'Buttons', icon: '🔘', count: 7 },
  { id: 'cards', name: 'Cards', icon: '🃏', count: 7 },
  { id: 'forms', name: 'Forms', icon: '📝', count: 10 },
  { id: 'navigation', name: 'Navigation', icon: '🧭', count: 6 },
  { id: 'modals', name: 'Modals', icon: '💬', count: 5 },
  { id: 'typography', name: 'Typography', icon: '🔤', count: 7 },
  { id: 'feedback', name: 'Feedback', icon: '💬', count: 7 },
  { id: 'data-display', name: 'Data Display', icon: '📊', count: 8 },
  { id: 'media', name: 'Media', icon: '🖼', count: 5 },
  { id: 'overlays', name: 'Overlays', icon: '🔲', count: 4 },
  { id: 'gestures', name: 'Gestures', icon: '👆', count: 4 },
  { id: 'layout', name: 'Layout', icon: '📐', count: 5 },
]
