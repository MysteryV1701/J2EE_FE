import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { Category } from '@/types/api';
import { queryOptions, useQuery } from '@tanstack/react-query';

export const getCategory = ({
  id,
}: {
  id: number;
}): Promise<Category> => {
  return api.get(`/categories/${id}`);
};

export const getCategoryQueryOptions = (id: number) => {
  return queryOptions({
    queryKey: ['categories', id],
    queryFn: () => getCategory({ id }),
  });
};

type UseCategoryOptions = {
  id: number;
  queryConfig?: QueryConfig<typeof getCategoryQueryOptions>;
};

export const useCategory = ({ id, queryConfig }: UseCategoryOptions) => {
  return useQuery({
    ...getCategoryQueryOptions(id),
    ...queryConfig,
  });
};
