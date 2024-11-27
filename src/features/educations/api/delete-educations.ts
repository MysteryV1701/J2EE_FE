import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';

import { getEducationsQueryOptions } from '../api/get-educations';

export const deleteEducation = async ( educationIds: string[]) => {
  return api.delete(`/educations`, { data: educationIds  });
};

type UseDeleteEducationsOptions = {
  mutationConfig?: MutationConfig<typeof deleteEducation>;
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
    mutationFn: deleteEducation,
  });
};