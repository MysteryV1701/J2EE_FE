import { queryOptions, useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { Campaign, Meta } from '@/types/api';

export const getCampaigns = (
  page = 1,
): Promise<{
  data: Campaign[];
  meta: Meta;
}> => {
  return api.get(`/campaigns`, {
    params: {
      page,
    },
  });
};

export const getCampaignsQueryOptions = ({ page }: { page?: number } = {}) => {
  return queryOptions({
    queryKey: page ? ['campaigns', { page }] : ['campaigns'],
    queryFn: () => getCampaigns(page),
  });
};

type UseCampaignsOptions = {
  page?: number;
  queryConfig?: QueryConfig<typeof getCampaignsQueryOptions>;
};

export const useCampaigns = ({ queryConfig, page }: UseCampaignsOptions) => {
  return useQuery({
    ...getCampaignsQueryOptions({ page }),
    ...queryConfig,
  });
};
