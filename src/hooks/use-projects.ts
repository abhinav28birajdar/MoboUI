import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getProjects, submitProject, likeProject } from '@/lib/api/projects';
import { ProjectFilter, Project } from '@/types/project';
import { useAuth } from './use-auth';
import { toast } from 'react-hot-toast';

export function useProjects(filters: ProjectFilter = {}, page = 1, limit = 12) {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['projects', filters, page, limit],
    queryFn: () => getProjects(filters, { page, limit }),
  });

  const submit = useMutation({
    mutationFn: (dataObj: Omit<Project, 'id' | 'author_id' | 'status' | 'view_count' | 'like_count' | 'created_at' | 'updated_at'>) => {
      if (!user) throw new Error('Not authenticated');
      return submitProject(user.id, dataObj);
    },
    onSuccess: () => {
      toast.success('Project submitted successfully for admin review!');
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
    onError: () => {
      toast.error('Failed to submit project');
    },
  });

  const like = useMutation({
    mutationFn: (projectId: string) => {
      if (!user) throw new Error('Not authenticated');
      return likeProject(user.id, projectId);
    },
    onSuccess: (_, projectId) => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      queryClient.invalidateQueries({ queryKey: ['project', projectId] });
    },
  });

  return {
    projects: data?.data || [],
    total: data?.count || 0,
    isLoading,
    error,
    refetch,
    submitProject: submit.mutateAsync,
    likeProject: like.mutateAsync,
  };
}
