import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';
import { Category } from '@/types/api';

import { getCategoryQueryOptions } from './get-category';

export const updateCategoryInputSchema = z.object({
  name: z.string().min(1, 'Required'),
  description: z.string().min(1, 'Required'),
});

export type UpdateCategoryInput = z.infer<typeof updateCategoryInputSchema>;

export const updateCategory = ({
  data,
  id,
}: {
  data: UpdateCategoryInput;
  id: number;
}): Promise<Category> => {
  return api.patch(`/Category/${id}`, data);
};

type UseUpdateCategoryOptions = {
  mutationConfig?: MutationConfig<typeof updateCategory>;
};

export const useUpdateCategory = ({
  mutationConfig,
}: UseUpdateCategoryOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (data, ...args) => {
      queryClient.refetchQueries({
        queryKey: getCategoryQueryOptions(data.id).queryKey,
      });
      onSuccess?.(data, ...args);
    },
    ...restConfig,
    mutationFn: updateCategory,
  });
};
