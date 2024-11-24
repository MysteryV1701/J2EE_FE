import { infiniteQueryOptions, useInfiniteQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { Donation, Meta } from '@/types/api';

export const getDonations = ({
  campaignId,
  page = 1,
}: {
  campaignId: number;
  page?: number;
}): Promise<{ data: Donation[]; meta: Meta }> => {
  return api.get(`/donations`, {
    params: {
      campaignId,
      page,
    },
  });
};

export const getListDonationOfCampaignQueryOptions = (campaignId: number) => {
  return infiniteQueryOptions({
    queryKey: ['donations', campaignId],
    queryFn: ({ pageParam = 0 }) => {
      return getDonations({ campaignId, page: pageParam as number });
    },
    getNextPageParam: (lastPage) => {
      if (lastPage?.meta?.page === lastPage?.meta?.totalPages) return undefined;
      const nextPage = lastPage.meta.page + 1;
      return nextPage;
    },
    initialPageParam: 0,
  });
};

type UseCommentsOptions = {
  campaignId: number;
  page?: number;
  queryConfig?: QueryConfig<typeof getDonations>;
};

export const useInfiniteComments = ({ campaignId }: UseCommentsOptions) => {
  return useInfiniteQuery({
    ...getListDonationOfCampaignQueryOptions(campaignId),
  });
};
