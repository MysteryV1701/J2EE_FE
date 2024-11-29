import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';

import { getCategoriesQueryOptions } from '../api/get-categories';

export const deleteCategories =  ( categoryIds: number[]) => {
  const accessToken = sessionStorage.getItem('access_token');
  return api.delete(`/categories`, {
    data: categoryIds,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });
};

type UseDeleteCategoriesOptions = {
  mutationConfig?: MutationConfig<typeof deleteCategories>;
};

export const useDeleteCategories = ({
  mutationConfig,
}: UseDeleteCategoriesOptions = {}) => {
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
    mutationFn: deleteCategories,
  });
};