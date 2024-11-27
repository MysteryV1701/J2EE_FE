import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';

import { getRecipientsQueryOptions } from './get-recipients';

export type DeleteRecipientDTO = {
  recipientId: string;
};

export const deleteRecipient = ({ recipientId }: DeleteRecipientDTO) => {
  return api.delete(`/recipients/${recipientId}`);
};

type UseDeleteRecipientOptions = {
  mutationConfig?: MutationConfig<typeof deleteRecipient>;
};

export const useDeleteRecipient = ({
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
    mutationFn: deleteRecipient,
    ...restConfig,
  });
};