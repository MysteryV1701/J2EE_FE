import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';
import { Campaign } from '@/types/api';

import { getCampaignsQueryOptions } from './get-campaigns';

export const createCampaignInputSchema = z.object({
  title: z.string().min(1, 'Required'),
  body: z.string().min(1, 'Required'),
});

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
