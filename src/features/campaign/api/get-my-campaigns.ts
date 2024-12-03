import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { Campaign } from '@/types/api';
import { queryOptions, useQuery } from '@tanstack/react-query';

export const getMyCampaigns = ({
  id,
  page,
  size,
}: {
  id: number;
  page: number;
  size: number;
}): Promise<{
     data: Campaign[];
  total: number;
  size: number;
  totalPages: number;
}> => {
  return api.get(`/campaigns/users/${id}`, { params: { page, size } });
};

export const getMyCampaignsQueryOptions = (id: number) => {
  return queryOptions({
    queryKey: ['campaigns', id],
    queryFn: () => getMyCampaigns({ id, page: 0, size: 10 }),
  });
};

type UseMyCampaignsOptions = {
  id: number;
  queryConfig?: QueryConfig<typeof getMyCampaignsQueryOptions>;
};

export const useMyCampaigns = ({ id, queryConfig }: UseMyCampaignsOptions) => {
  return useQuery({
    ...getMyCampaignsQueryOptions(id),
    ...queryConfig,
  });
};
