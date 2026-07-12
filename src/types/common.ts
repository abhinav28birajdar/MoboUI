export type SortDirection = 'asc' | 'desc';

export interface BaseEntity {
  id: string;
  created_at: string;
  updated_at?: string;
}

export interface SEOMetadata {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
}
