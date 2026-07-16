import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getUserCollections,
  createCollection,
  updateCollection,
  deleteCollection,
  addToCollection,
  removeFromCollection,
} from '@/lib/api/collections';
import { useAuth } from './use-auth';
import { toast } from 'react-hot-toast';

export function useCollections() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: collections = [], isLoading } = useQuery({
    queryKey: ['collections', user?.id],
    queryFn: () => (user ? getUserCollections(user.id) : Promise.resolve([])),
    enabled: !!user,
  });

  const create = useMutation({
    mutationFn: (data: { name: string; description?: string; is_public?: boolean; slug: string }) => {
      if (!user) throw new Error('Not authenticated');
      return createCollection(user.id, {
        name: data.name,
        description: data.description,
        is_public: data.is_public ?? false
      });
    },
    onSuccess: () => {
      toast.success('Collection created successfully');
      queryClient.invalidateQueries({ queryKey: ['collections', user?.id] });
    },
    onError: () => {
      toast.error('Failed to create collection');
    },
  });

  const addComponent = useMutation({
    mutationFn: (data: { collectionId: string; componentId: string }) =>
      addToCollection(data.collectionId, data.componentId),
    onSuccess: () => {
      toast.success('Component added to collection');
      queryClient.invalidateQueries({ queryKey: ['collections', user?.id] });
    },
    onError: () => {
      toast.error('Failed to add to collection');
    },
  });

  const removeComponent = useMutation({
    mutationFn: (data: { collectionId: string; componentId: string }) =>
      removeFromCollection(data.collectionId, data.componentId),
    onSuccess: () => {
      toast.success('Component removed from collection');
      queryClient.invalidateQueries({ queryKey: ['collections', user?.id] });
    },
    onError: () => {
      toast.error('Failed to remove from collection');
    },
  });

  return {
    collections,
    isLoading,
    createCollection: create.mutateAsync,
    addToCollection: addComponent.mutateAsync,
    removeFromCollection: removeComponent.mutateAsync,
  };
}
