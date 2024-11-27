import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';

import { getRecipientsQueryOptions } from '../api/get-recipients';

export const deleteRecipient = async ( recipientIds: string[]) => {
  return api.delete(`/recipients`, { data: recipientIds  });
};

type UseDeleteRecipientsOptions = {
  mutationConfig?: MutationConfig<typeof deleteRecipient>;
};

export const useDeleteRecipients = ({
  mutationConfig,
}: UseDeleteRecipientsOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getRecipientsQueryOptions().queryKey,
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: deleteRecipient,
  });
};