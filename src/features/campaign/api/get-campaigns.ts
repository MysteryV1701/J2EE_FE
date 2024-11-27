import { useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { Campaign } from '@/types/api';

export const getCampaigns = (
  categoryId = 0,
  page = 0,
  size = 10,
): Promise<{
  data: Campaign[];
  total: number;
  size: number;
  totalPages: number;
}> => {
  const params: { page: number; size: number; categoryId?: number } = { page, size };
  if (categoryId !== 0) {
    params.categoryId = categoryId;
  }
  return api.get(`/campaigns`, { params });
};

export const getCampaignsQueryOptions = ({
  categoryId,
  page,
  size,
}: { categoryId?: number,page?: number; size?: number } = {}) => {
  return {
    queryKey: ['campaigns', { categoryId ,page, size }],
    queryFn: () => getCampaigns(categoryId, page, size),
  };
};

type UseCampaignsOptions = {
  categoryId?: number;
  page?: number;
  size?: number;
  queryConfig?: QueryConfig<typeof getCampaignsQueryOptions>;
};

export const useCampaigns = ({
  queryConfig,
  categoryId,
  page,
  size,
}: UseCampaignsOptions) => {
  return useQuery({
    ...getCampaignsQueryOptions({categoryId, page, size }),
    ...queryConfig,
  });
};
