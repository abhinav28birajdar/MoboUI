export type ProjectStatus = 'pending' | 'approved' | 'rejected' | 'featured';

export interface Project {
  id: string;
  author_id: string;
  title: string;
  description: string;
  long_description?: string;
  cover_image_url?: string;
  project_url?: string;
  github_url?: string;
  tags: string[];
  framework: 'flutter' | 'react_native' | 'expo' | 'web';
  status: ProjectStatus;
  view_count: number;
  like_count: number;
  created_at: string;
  updated_at: string;
}

export interface ProjectFilter {
  framework?: string;
  status?: ProjectStatus;
  search?: string;
  author_id?: string;
}
