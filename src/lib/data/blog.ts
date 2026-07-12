export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImageUrl: string;
  tags: string[];
  category: string;
  isPublished: boolean;
  isFeatured: boolean;
  viewCount: number;
  readTimeMinutes: number;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  author?: {
    name: string;
    avatarUrl?: string;
  };
}

export const mockBlogPosts: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'Modern Mobile Theming: Beyond Light and Dark Mode',
    slug: 'modern-mobile-theming',
    excerpt: 'Discover how to implement advanced design token systems that scale across Flutter and React Native.',
    coverImageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&h=400&fit=crop',
    tags: ['Design Systems', 'Flutter', 'React Native'],
    category: 'Design Systems',
    isPublished: true,
    isFeatured: true,
    viewCount: 342,
    readTimeMinutes: 8,
    publishedAt: '2026-02-15T00:00:00Z',
    createdAt: '2026-02-15T00:00:00Z',
    updatedAt: '2026-02-15T00:00:00Z',
    author: {
      name: 'Julian Howard',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&h=200&fit=crop'
    },
    content: `
# Modern Mobile Theming: Beyond Light and Dark Mode

Design token pipelines are a critical architectural component of modern product design. When scaling styling languages across teams, maintaining manual stylesheets or basic conditional code quickly degrades into a maintenance bottleneck.

Here is how you can set up a unified, single source of truth using design tokens, dynamic style injection, and robust theme modeling.

## The Problem with Static Themes
Historically, mobile developers wrote themes directly into platform structures:

\`\`\`typescript
// React Native static color map
const colors = {
  light: { primary: '#C026D3', background: '#FFFFFF' },
  dark: { primary: '#C026D3', background: '#0A0A0B' }
};
\`\`\`

If your design team introduces a new brand color, or wants to add custom dynamic modes like "High Contrast" or themed branding, you're forced to perform search-and-replace edits across multiple files.

## The Solution: Design Tokens
Design tokens are platform-agnostic key-value pairs (stored as JSON) that define styling parameters.

### 1. Structure Design Tokens
A typical design token definitions JSON file looks like this:

\`\`\`json
{
  "color": {
    "brand": {
      "primary": { "value": "#C026D3", "type": "color" },
      "dark": { "value": "#E6B400", "type": "color" }
    },
    "background": {
      "surface": { "value": "#18181B", "type": "color" }
    }
  }
}
\`\`\`

### 2. Formulating Theme Models
We map these tokens to generic type systems in Dart and TypeScript. This decouples the design definitions from the UI code, allowing developers to switch visual schemes dynamically at runtime.

### 3. Dynamic Rendering Examples
By wrapping components in dynamic React Context providers or using Flutter's InheritedWidget patterns, themes can change dynamically.

- Fully customizable branding presets.
- Real-time updates pushed directly from your Figma system.
- Simplified styling hooks and clean interfaces.
`
  },
  {
    id: 'blog-2',
    title: 'Optimizing Flutter Animations for 120Hz Displays',
    slug: 'optimizing-flutter-animations',
    excerpt: 'Learn the secrets of the RepaintBoundary and how to achieve buttery smooth 120 FPS in complex UIs.',
    coverImageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=600&h=400&fit=crop',
    tags: ['Performance', 'Flutter', 'Animations'],
    category: 'Performance',
    isPublished: true,
    isFeatured: false,
    viewCount: 512,
    readTimeMinutes: 12,
    publishedAt: '2026-02-10T00:00:00Z',
    createdAt: '2026-02-10T00:00:00Z',
    updatedAt: '2026-02-10T00:00:00Z',
    author: {
      name: 'Elena Vance',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&h=200&fit=crop'
    },
    content: `
# Optimizing Flutter Animations for 120Hz Displays

Modern displays are standardizing on 120Hz refresh rates, doubling the frame budget down to a tight 8.3 milliseconds. If your animations perform heavy computations or cause unnecessary layout passes, they will drop frames, creating lag.

In this guide, we dive deep into Flutter rendering mechanisms to squeeze maximum framerate out of your custom animated layouts.

## The RepaintBoundary Solution
By default, when a widget in Flutter requests a paint update, the entire rendering subtree is repainted. A complex UI grid with many icons or shapes will re-draw all of them on every tick of an animation.

You can fix this by introducing a \`RepaintBoundary\`. This widget separates its child from the rest of the render tree, caching the paint state:

\`\`\`dart
RepaintBoundary(
  child: MyComplexAnimatedWidget(),
)
\`\`\`

## Minimizing Rebuild Cycles
Avoid putting animations inside the base build method. Instead, isolate the animation logic inside custom animation widgets like \`AnimatedBuilder\` or use value listening:

\`\`\`dart
// Recommended builder pattern
AnimatedBuilder(
  animation: _controller,
  builder: (context, child) {
    return Transform.scale(
      scale: _controller.value,
      child: child, // Cached child is not rebuilt
    );
  },
  child: const HeavyLayoutWidget(),
)
\`\`\`

## Monitoring Performance
Use the DevTools Performance overlay in profile mode to identify frame times. Make sure to profile on actual mobile hardware rather than simulator setups, as rendering behaves differently on physical devices.
`
  },
  {
    id: 'blog-3',
    title: 'Mastering Reanimated 3: Layout Animations and Beyond',
    slug: 'react-native-reanimated-3',
    excerpt: 'Explore the new possibilities of declarative layout animations in the latest Reanimated release.',
    coverImageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=600&h=400&fit=crop',
    tags: ['React Native', 'Reanimated', 'Animations'],
    category: 'React Native',
    isPublished: true,
    isFeatured: false,
    viewCount: 421,
    readTimeMinutes: 10,
    publishedAt: '2026-02-05T00:00:00Z',
    createdAt: '2026-02-05T00:00:00Z',
    updatedAt: '2026-02-05T00:00:00Z',
    author: {
      name: 'Marcus Aurelius',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&fit=crop'
    },
    content: `
# Mastering Reanimated 3: Layout Animations and Beyond

React Native Reanimated 3 introduces native-performance declarative layout animations, letting developers implement complex card movements, element slides, and custom modal pops without dropping a single frame.

Let's examine how to structure transitions and optimize worklet computations.

## Layout Transitions
Reanimated 3 simplifies elements shifting positions when the layout list updates. For example, sorting a flat list or filtering component cards can animate smoothly:

\`\`\`typescript
import Animated, { Layout, FadeInLeft, FadeOutRight } from 'react-native-reanimated';

function ListItem({ item }) {
  return (
    <Animated.View
      entering={FadeInLeft}
      exiting={FadeOutRight}
      layout={Layout.springify().damping(15)}
    >
      <Text>{item.title}</Text>
    </Animated.View>
  );
}
\`\`\`

## Optimizing Worklets
Worklets are small Javascript functions compiled and executed directly on the UI thread. To keep worklets fast, avoid calling non-worklet functions (like state setters or side-effect handlers) inside them unless using \`runOnJS\`:

\`\`\`typescript
import { runOnJS } from 'react-native-reanimated';

const gestureHandler = useAnimatedGestureHandler({
  onActive: (event) => {
    // UI thread processing
  },
  onEnd: () => {
    runOnJS(notifyReactState)();
  }
});
\`\`\`

## Summary
Declaring animations natively avoids the communication overhead between JS and the native modules, securing high-performance experiences even under complex gestures.
`
  }
];
