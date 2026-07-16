import { useQuery } from '@tanstack/react-query';
import { getComponents } from '@/lib/api/components';
import { ComponentFilter } from '@/types/component';

export function useComponents(filters: ComponentFilter = {}, page = 1, limit = 24) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['components', filters, page, limit],
    queryFn: () => getComponents(filters, { page, limit }),
    staleTime: 5 * 60 * 1000,
  });

  return {
    components: data?.data || [],
    total: data?.count || 0,
    isLoading,
    error,
    refetch,
    hasMore: data ? (page * limit) < data.count : false,
  };
}
