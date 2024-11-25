import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { VNPResponse } from '@/types/api';
import { queryOptions, useQuery } from '@tanstack/react-query';

export const getVNPUrl = ({
  amount,
  donationId,
}: {
  amount: number;
  donationId: number;
}): Promise<{ data: VNPResponse }> => {
  return api.get(`/payment/vnp?amount=${amount}&donationId=${donationId}`);
};

export const getVNPUrlQueryOptions = (amount: number, donationId: number) => {
  return queryOptions({
    queryKey: ['vnp', { amount, donationId }],
    queryFn: () => getVNPUrl({ amount, donationId }),
  });
};

type UseVNPUrlOptions = {
  amount: number;
  donationId: number;
  queryConfig?: QueryConfig<typeof getVNPUrlQueryOptions>;
};

export const useVNPUrl = ({
  amount,
  donationId,
  queryConfig,
}: UseVNPUrlOptions) => {
  return useQuery({
    ...getVNPUrlQueryOptions(amount, donationId),
    ...queryConfig,
  });
};
