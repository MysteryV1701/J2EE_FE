import { useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { Donation } from '@/types/api';

export const getCampaignDonations = (
  campaignId: number,
): Promise<{
  data: Donation[];
  total: number;
  size: number;
  totalPages: number;
}> => {
  return api.get(`/donations/campaign/${campaignId}`);
};

export const getCampaignDonationsQueryOptions = ({
  campaignId = 0,
}: { campaignId?: number } = {}) => {
  return {
    queryKey: ['donations', { campaignId }],
    queryFn: () => getCampaignDonations(campaignId),
  };
};

type UseCampaignDonationsOptions = {
  campaignId?: number;
  queryConfig?: QueryConfig<typeof getCampaignDonationsQueryOptions>;
};

export const useCampaignDonations = ({
  queryConfig,
  campaignId,
}: UseCampaignDonationsOptions) => {
  return useQuery({
    ...getCampaignDonationsQueryOptions({ campaignId }),
    ...queryConfig,
  });
};
