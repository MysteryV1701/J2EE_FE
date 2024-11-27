import { useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { Category } from '@/types/api';

export const getCategories = (
  page = 1,
  size = 10,
): Promise<{
  data: Category[];
  total: number;
  size: number;
  totalPages: number;
}> => {
  return api.get(`/categories`, {
    params: {
      page,
      size,
    },
  });
};

export const getCategoriesQueryOptions = ({
  page,
  size,
}: { page?: number; size?: number } = {}) => {
  return {
    queryKey: ['categories', { page, size }],
    queryFn: () => getCategories(page, size),
  };
};

type UseCategoriesOptions = {
  page?: number;
  size?: number;
  queryConfig?: QueryConfig<typeof getCategoriesQueryOptions>;
};

export const useCategories = ({
  queryConfig,
  page,
  size,
}: UseCategoriesOptions) => {
  return useQuery({
    ...getCategoriesQueryOptions({ page, size }),
    ...queryConfig,
  });
};
