export type ComponentFramework = 'flutter' | 'react_native' | 'expo' | 'web';

export type CodeLanguage = 'dart' | 'typescript' | 'javascript' | 'css' | 'html';

export interface ComponentCategory {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon_name: string;
  color: string;
  sort_order: number;
  component_count: number;
  created_at: string;
}

export interface ComponentVariant {
  id: string;
  component_id: string;
  name: string;
  description: string | null;
  code_flutter: string | null;
  code_react_native: string | null;
  code_expo: string | null;
  code_web: string | null;
  preview_config: Record<string, any> | null;
  sort_order: number;
  created_at: string;
}

export interface Component {
  id: string;
  slug: string;
  name: string;
  description: string;
  long_description: string | null;
  category_id: string;
  framework: ComponentFramework;
  tags: string[];
  preview_image_url: string | null;
  thumbnail_url: string | null;
  is_featured: boolean;
  is_new: boolean;
  is_pro: boolean;
  view_count: number;
  like_count: number;
  copy_count: number;
  author_id: string;
  status: 'draft' | 'published' | 'archived';
  created_at: string;
  updated_at: string;
  category?: ComponentCategory;
  variants?: ComponentVariant[];
}

export interface ComponentFilter {
  framework?: ComponentFramework[];
  category?: string[];
  tags?: string[];
  is_pro?: boolean;
  is_new?: boolean;
  search?: string;
}

export type ComponentSortOption = 'newest' | 'popular' | 'most_copied' | 'alphabetical';
