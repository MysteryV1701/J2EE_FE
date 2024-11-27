import { useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { Donation } from '@/types/api';

export const getDonations = (
  userId: number,
  page = 0,
  size = 10,
): Promise<{
  data: Donation[];
  total: number;
  size: number;
  totalPages: number;
}> => {
  return api.get(`/donations`, {
    params: {
      userId,
      page,
      size,
    },
  });
};

export const getDonationsQueryOptions = ({
  page,
  size,
  userId = 0,
}: { page?: number; size?: number; userId?: number } = {}) => {
  return {
    queryKey: ['donations', { page, size, userId }],
    queryFn: () => getDonations(userId, page, size),
  };
};

type UseDonationsOptions = {
  userId: number;
  page?: number;
  size?: number;
  queryConfig?: QueryConfig<typeof getDonationsQueryOptions>;
};

export const useDonations = ({
  queryConfig,
  userId,
  page,
  size,
}: UseDonationsOptions) => {
  return useQuery({
    ...getDonationsQueryOptions({ userId, page, size }),
    ...queryConfig,
  });
};
