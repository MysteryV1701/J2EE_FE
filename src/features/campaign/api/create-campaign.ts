import { useMutation, useQueryClient } from '@tanstack/react-query';
import { string, z } from 'zod';

import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';
import { Campaign } from '@/types/api';

import { getCampaignsQueryOptions } from './get-campaigns';

export const createCampaignInputSchema = z.object({
  name: z.string().min(1, 'Required'),
  description: string().min(1, 'Required'),
  startDate: z.string().min(1, 'Required'),
  endDate: z.string().min(1, 'Required'),
  targetAmount: z.string().min(1, 'Required'),
  currentAmount: z.number().min(0, 'Required'),
  categoryId: z.number().min(1, 'Required'),
  educationId: z.number().min(1, 'Required'),
  createdId: z.number().min(1, 'Required'),
  accountNumber: z.string().min(1, 'Required'),
  bankName: z.string().min(1, 'Required'),
  // thumbnail: z.string().min(1, 'Required'),
}
)

export type CreateCampaignInput = z.infer<typeof createCampaignInputSchema>;

export const createCampaign = ({
  data,
}: {
  data: CreateCampaignInput;
}): Promise<Campaign> => { 
  return api.post(`/campaigns`, data);
};

type UseCreateCampaignOptions = {
  mutationConfig?: MutationConfig<typeof createCampaign>;
};

export const useCreateCampaign = ({
  mutationConfig,
}: UseCreateCampaignOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getCampaignsQueryOptions().queryKey,
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: createCampaign,
  });
};
