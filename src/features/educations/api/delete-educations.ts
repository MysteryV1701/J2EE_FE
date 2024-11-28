import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';

import { getEducationsQueryOptions } from '../api/get-educations';

export const deleteEducations = async ( educationIds: number[]) => {
  const accessToken = sessionStorage.getItem('access_token');
  await api.delete(`/educations`, {
    data: educationIds,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });
};

type UseDeleteEducationsOptions = {
  mutationConfig?: MutationConfig<typeof deleteEducations>;
};

export const useDeleteEducations = ({
  mutationConfig,
}: UseDeleteEducationsOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getEducationsQueryOptions().queryKey,
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: deleteEducations,
  });
};