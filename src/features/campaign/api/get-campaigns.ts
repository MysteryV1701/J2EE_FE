import { useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { Campaign } from '@/types/api';

export const getCampaigns = (
  categoryId = 0,
  userId = 0,
  status = "",
  page = 0,
  size = 9,
): Promise<{
  data: Campaign[];
  total: number;
  size: number;
  totalPages: number;
}> => {
  const params: { page: number; size: number; categoryId?: number, userId?:number, status?:string } = { page, size };
  if (categoryId !== 0) {
    params.categoryId = categoryId;
  }
   if (userId !== 0) {
    params.userId = userId;
  }
  if (status !== "") {
    params.status = status;
  }
  return api.get(`/campaigns`, { params });
};

export const getCampaignsQueryOptions = ({
  categoryId,
  userId,
  status,
  page,
  size,
}: { categoryId?: number, userId?: number, status?:string, page?: number; size?: number } = {}) => {
  return {
    queryKey: ['campaigns', { categoryId, userId, status ,page, size }],
    queryFn: () => getCampaigns(categoryId,userId,status, page, size),
  };
};

type UseCampaignsOptions = {
  categoryId?: number;
  userId?: number;
  status?: string;
  page?: number;
  size?: number;
  queryConfig?: QueryConfig<typeof getCampaignsQueryOptions>;
};

export const useCampaigns = ({
  queryConfig,
  categoryId,
  userId,
  page,
  status,
  size,
}: UseCampaignsOptions) => {
  return useQuery({
    ...getCampaignsQueryOptions({categoryId, userId, status, page, size }),
    ...queryConfig,
  });
};
