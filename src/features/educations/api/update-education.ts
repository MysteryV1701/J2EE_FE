import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';
import { Education } from '@/types/api';

import { getEducationQueryOptions } from './get-education';

export const updateEducationInputSchema = z.object({
    name: z.string().min(1, 'Required'),
    email: z.string().min(1, 'Required').email(),
    phone: z.string().min(1, 'Required').regex(/^0\d{1,11}$/, 'Invalid phone number'),
    address: z.string().min(1, 'Required'), 
    status: z.number().min(0, 'Status must be a positive number'),
});

export type UpdateEducationInput = z.infer<typeof updateEducationInputSchema>;

export const updateEducation = ({
  data,
  id,
}: {
  data: UpdateEducationInput;
  id: number;
}): Promise<Education> => {
  const accessToken = sessionStorage.getItem('access_token');
  return api.put(`/educations/${id}`, data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });
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
