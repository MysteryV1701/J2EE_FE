import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';
import { Recipient } from '@/types/api';

import { getRecipientsQueryOptions } from './get-recipients';

export const createRecipientInputSchema = z.object({
    code: z.string().min(1, 'Required'),
    name: z.string().min(1, 'Required'),
    phone: z.string().min(1, 'Required').regex(/^0\d{1,11}$/, 'Invalid phone number'),
});

export type CreateRecipientInput = z.infer<typeof createRecipientInputSchema>;

export const createRecipient = ({
  data,
}: {
  data: CreateRecipientInput;
}): Promise<Recipient> => {
  return api.post(`/recipients`, data);
};

type UseCreateRecipientOptions = {
  mutationConfig?: MutationConfig<typeof createRecipient>;
};

export const useCreateRecipient = ({
  mutationConfig,
}: UseCreateRecipientOptions = {}) => {
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
    mutationFn: createRecipient,
  });
};
