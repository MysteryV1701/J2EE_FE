import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';

import { getRecipientsQueryOptions } from './get-recipients';

export const deleteRecipients = async ( recipientIds: number[]) => {
  const accessToken = sessionStorage.getItem('access_token');
  await api.delete(`/recipients`, {
    data: recipientIds,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });
};

type UseDeleteRecipientOptions = {
  mutationConfig?: MutationConfig<typeof deleteRecipients>;
};

export const useDeleteRecipients = ({
  mutationConfig,
}: UseDeleteRecipientOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getRecipientsQueryOptions().queryKey,
      });
      if (onSuccess) {
        onSuccess(...args);
      }
    },
    mutationFn: deleteRecipients,
    ...restConfig,
  });
};