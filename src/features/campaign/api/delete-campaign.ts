import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';

import { getCampaignsQueryOptions } from './get-campaigns';

export const deleteCampaign = ({ campaignId }: { campaignId: string }) => {
  return api.delete(`/campaigns/${campaignId}`);
};

type UseDeleteCampaignOptions = {
  mutationConfig?: MutationConfig<typeof deleteCampaign>;
};

export const useDeleteCampaign = ({
  mutationConfig,
}: UseDeleteCampaignOptions = {}) => {
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
    mutationFn: deleteCampaign,
  });
};
