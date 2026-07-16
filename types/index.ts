export type Framework = 'flutter' | 'react-native' | 'expo' | 'web'

export type ComponentCategory =
  | 'buttons'
  | 'cards'
  | 'forms'
  | 'navigation'
  | 'modals'
  | 'typography'
  | 'layout'
  | 'feedback'
  | 'data-display'
  | 'media'
  | 'overlays'
  | 'gestures'

export interface ComponentDefinition {
  slug: string
  name: string
  description: string
  category: ComponentCategory
  frameworks: Framework[]
  isNew?: boolean
  isPopular?: boolean
  isFeatured?: boolean
  tags: string[]
  previewImage?: string
  code: {
    flutter?: string
    reactNative?: string
    expo?: string
  }
  props: PropDefinition[]
  relatedSlugs: string[]
}

export interface PropDefinition {
  name: string
  type: string
  default?: string
  required: boolean
  description: string
}

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  author: Author
  publishedAt: string
  readingTime: number
  tags: string[]
  content: string
  coverImage?: string
}

export interface Author {
  name: string
  avatar?: string
  role: string
}

export interface CommunityProject {
  id: string
  title: string
  description: string
  author: string
  githubUrl?: string
  previewUrl?: string
  framework: Framework
  tags: string[]
  likes: number
  image?: string
}

export interface Contributor {
  name: string
  avatar?: string
  role: string
  contributions: number
  githubUrl?: string
  twitterUrl?: string
}
