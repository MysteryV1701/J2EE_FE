import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';
import { Education } from '@/types/api';

import { getEducationQueryOptions } from './get-education';

export const updateEducationInputSchema = z.object({
  title: z.string().min(1, 'Required'),
  body: z.string().min(1, 'Required'),
});

export type UpdateEducationInput = z.infer<typeof updateEducationInputSchema>;

export const updateEducation = ({
  data,
  id,
}: {
  data: UpdateEducationInput;
  id: number;
}): Promise<Education> => {
  return api.patch(`/education/${id}`, data);
};

type UseUpdateEducationOptions = {
  mutationConfig?: MutationConfig<typeof updateEducation>;
};

export const useUpdateEducation = ({
  mutationConfig,
}: UseUpdateEducationOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (data, ...args) => {
      queryClient.refetchQueries({
        queryKey: getEducationQueryOptions(data.id).queryKey,
      });
      onSuccess?.(data, ...args);
    },
    ...restConfig,
    mutationFn: updateEducation,
  });
};
