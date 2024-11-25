import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';

import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';
import { Donation } from '@/types/api';

export const createDonationInputSchema = z.object({
  amount: z.string().min(1, 'Required'),
  name: z.string(),
  isAnonymous: z.boolean(),
});

export type CreateDonationInput = z.infer<typeof createDonationInputSchema>;

export const createDonation = async ({
  data,
  campaignId,
  userId,
}: {
  data: CreateDonationInput;
  campaignId: number;
  userId?: string;
}): Promise<Donation> => {
  const response = await api
    .post(`/donations`, { ...data, campaignId, userId })
    .catch((error) => {
      return error;
    });
  return api.get(
    `/payment/vnp?amount=${response.amount}&donationId=${response.id}`,
  );
};

type UseCreateDonationOptions = {
  mutationConfig?: MutationConfig<typeof createDonation>;
};

export const useCreateDonation = ({
  mutationConfig,
}: UseCreateDonationOptions = {}) => {
  const { onSuccess, ...restConfig } = mutationConfig || {};
  return useMutation({
    onSuccess: (...args) => {
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: createDonation,
  });
};
