import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';

import { getCategoriesQueryOptions } from '../api/get-categories';

export const deleteCategory = async ( categoryIds: string[]) => {
  return api.delete(`/categories`, { data: categoryIds  });
};

type UseDeleteCategorysOptions = {
  mutationConfig?: MutationConfig<typeof deleteCategory>;
};

export const useDeleteCategorys = ({
  mutationConfig,
}: UseDeleteCategorysOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getCategoriesQueryOptions().queryKey,
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: deleteCategory,
  });
};