import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { Campaign } from '@/types/api';
import { queryOptions, useQuery } from '@tanstack/react-query';

export const getCampaign = ({
  campaignId,
}: {
  campaignId: number;
}): Promise<{ data: Campaign }> => {
  return api.get(`/camp/${campaignId}`);
};

export const getCampaignQueryOptions = (campaignId: number) => {
  return queryOptions({
    queryKey: ['id', campaignId],
    queryFn: () => getCampaign({ campaignId }),
  });
};

type UseCampaignOptions = {
  campaignId: number;
  queryConfig?: QueryConfig<typeof getCampaignQueryOptions>;
};

export const useCampaign = ({
  campaignId,
  queryConfig,
}: UseCampaignOptions) => {
  return useQuery({
    ...getCampaignQueryOptions(campaignId),
    ...queryConfig,
  });
};
