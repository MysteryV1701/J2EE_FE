import { queryOptions, useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { Campaign } from '@/types/api';

export const getCampaigns = (): Promise<{ data: Campaign[] }> => {
  return api.get(`/campaigns`);
};

export const getCampaignsQueryOptions = () => {
  return queryOptions({
    queryKey: ['campaigns'],
    queryFn: getCampaigns,
  });
};

type UseCampaignsOptions = {
  queryConfig?: QueryConfig<typeof getCampaignsQueryOptions>;
};

export const useCampaigns = ({ queryConfig }: UseCampaignsOptions = {}) => {
  return useQuery({
    ...getCampaignsQueryOptions(),
    ...queryConfig,
  });
};