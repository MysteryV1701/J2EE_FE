import { useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { Donation } from '@/types/api';

export const getDonations = (
  campaignId: number,
  page = 1,
  size = 10,
): Promise<{
  data: Donation[];
  total: number;
  size: number;
  totalPages: number;
}> => {
  return api.get(`/donations`, {
    params: {
      campaignId,
      page,
      size,
    },
  });
};

export const getDonationsQueryOptions = ({
  page,
  size,
  campaignId = 0,
}: { page?: number; size?: number; campaignId?: number } = {}) => {
  return {
    queryKey: ['donations', { page, size, campaignId }],
    queryFn: () => getDonations(campaignId, page, size),
  };
};

type UseDonationsOptions = {
  campaignId: number;
  page?: number;
  size?: number;
  queryConfig?: QueryConfig<typeof getDonationsQueryOptions>;
};

export const useDonations = ({
  queryConfig,
  campaignId,
  page,
  size,
}: UseDonationsOptions) => {
  return useQuery({
    ...getDonationsQueryOptions({ campaignId, page, size }),
    ...queryConfig,
  });
};
