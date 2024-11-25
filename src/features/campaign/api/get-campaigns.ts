import { useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { Campaign } from '@/types/api';

export const getCampaigns = (
  page = 1,
  size = 10,
): Promise<{
  data: Campaign[];
  total: number;
  size: number;
  totalPages: number;
}> => {
  return api.get(`/campaigns`, {
    params: {
      page,
      size,
    },
  });
};

export const getCampaignsQueryOptions = ({
  page,
  size,
}: { page?: number; size?: number } = {}) => {
  return {
    queryKey: ['campaigns', { page, size }],
    queryFn: () => getCampaigns(page, size),
  };
};

type UseCampaignsOptions = {
  page?: number;
  size?: number;
  queryConfig?: QueryConfig<typeof getCampaignsQueryOptions>;
};

export const useCampaigns = ({
  queryConfig,
  page,
  size,
}: UseCampaignsOptions) => {
  return useQuery({
    ...getCampaignsQueryOptions({ page, size }),
    ...queryConfig,
  });
};
