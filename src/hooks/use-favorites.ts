import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getUserFavorites, toggleFavorite, isFavorited } from '@/lib/api/favorites';
import { useAuth } from './use-auth';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useLoginPromptStore } from '@/store/login-prompt-store';

export function useFavorites() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [isToggling, setIsToggling] = useState(false);
  const openModal = useLoginPromptStore((state) => state.openModal);

  const { data: favorites = [], isLoading } = useQuery({
    queryKey: ['favorites', user?.id],
    queryFn: () => (user ? getUserFavorites(user.id) : Promise.resolve([])),
    enabled: !!user,
  });

  const toggle = async (componentId: string) => {
    if (!user) {
      openModal(
        'Save to Favorites',
        'Sign in to save this component to your library and keep track of your favorites.'
      );
      return;
    }
    setIsToggling(true);
    try {
      const added = await toggleFavorite(user.id, componentId);
      toast.success(added ? 'Added to favorites' : 'Removed from favorites');
      queryClient.invalidateQueries({ queryKey: ['favorites', user.id] });
    } catch (e: any) {
      toast.error('Failed to toggle favorite');
    } finally {
      setIsToggling(false);
    }
  };

  const checkIsFavorited = (componentId: string) => {
    return favorites.some((fav: any) => fav.component_id === componentId);
  };

  return {
    favorites,
    isLoading,
    isToggling,
    toggle,
    isFavorited: checkIsFavorited,
  };
}
