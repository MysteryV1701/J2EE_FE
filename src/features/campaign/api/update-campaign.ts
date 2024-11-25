import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';
import { Campaign } from '@/types/api';

import { getCampaignQueryOptions } from './get-campaign';

export const updateCampaignInputSchema = z.object({
  title: z.string().min(1, 'Required'),
  body: z.string().min(1, 'Required'),
});

export type UpdateCampaignInput = z.infer<typeof updateCampaignInputSchema>;

export const updateCampaign = ({
  data,
  campaignId,
}: {
  data: UpdateCampaignInput;
  campaignId: number;
}): Promise<Campaign> => {
  return api.patch(`/campaign/${campaignId}`, data);
};

type UseUpdateCampaignOptions = {
  mutationConfig?: MutationConfig<typeof updateCampaign>;
};

export const useUpdateCampaign = ({
  mutationConfig,
}: UseUpdateCampaignOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (data, ...args) => {
      queryClient.refetchQueries({
        queryKey: getCampaignQueryOptions(Number(data.id)).queryKey,
      });
      onSuccess?.(data, ...args);
    },
    ...restConfig,
    mutationFn: updateCampaign,
  });
};
