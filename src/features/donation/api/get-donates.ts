import { useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { Donation } from '@/types/api';

export const getDonations = (
  campaignId: number,
  userId: number,
  page = 0,
  size = 10,
): Promise<{
  data: Donation[];
  total: number;
  size: number;
  totalPages: number;
}> => {
  const params: { page: number; size: number; campaignId?: number; userId?: number } = { page, size };
  if(campaignId !== 0) {
    params.campaignId = campaignId;
  }
  if(userId !== 0) {
    params.userId = userId;
  }
  return api.get(`/donations`, {params});
};

export const getDonationsQueryOptions = ({
  page,
  size,
  campaignId = 0,
  userId = 0,
}: { page?: number; size?: number; campaignId?: number, userId?:number } = {}) => {
  return {
    queryKey: ['donations', { page, size, campaignId , userId}],
    queryFn: () => getDonations(campaignId, userId, page, size),
  };
};

type UseDonationsOptions = {
  campaignId?: number;
  userId?: number;
  page?: number;
  size?: number;
  queryConfig?: QueryConfig<typeof getDonationsQueryOptions>;
};

export const useDonations = ({
  queryConfig,
  campaignId,
  userId,
  page,
  size,
}: UseDonationsOptions) => {
  return useQuery({
    ...getDonationsQueryOptions({ campaignId, userId, page, size }),
    ...queryConfig,
  });
};
