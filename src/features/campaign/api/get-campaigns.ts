import { useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { Campaign } from '@/types/api';

export const getCampaigns = (
  categoryId = 0,
  status = 'all',
  startDate = '',
  endDate = '',
  page = 0,
  size = 9,
): Promise<{
  data: Campaign[];
  total: number;
  size: number;
  totalPages: number;
}> => {
  const params: { page: number; size: number; categoryId?: number; status?:string; startDate:string; endDate:string } = {
    page, size,
    startDate: startDate,
    endDate: endDate
  };
  if (categoryId !== 0) {
    params.categoryId = categoryId;
  }
  if (status !== 'all') {
    params.status = status;
  }
  return api.get(`/campaigns`, { params });
};

export const getCampaignsQueryOptions = ({
  categoryId,
  status,
  startDate,
  endDate,
  page,
  size,
}: { categoryId?: number, page?: number; size?: number, status?:string, startDate?:string, endDate?:string } = {}) => {
  return {
    queryKey: ['campaigns', { categoryId, status, startDate, endDate, page, size }],
    queryFn: () => getCampaigns(categoryId, status,startDate, endDate ,page, size),
  };
};

type UseCampaignsOptions = {
  categoryId?: number;
  status?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  size?: number;
  queryConfig?: QueryConfig<typeof getCampaignsQueryOptions>;
};

export const useCampaigns = ({
  queryConfig,
  categoryId,
  status,
  startDate,
  endDate,
  page,
  size,
}: UseCampaignsOptions) => {
  return useQuery({
    ...getCampaignsQueryOptions({categoryId, status, startDate, endDate, page, size }),
    ...queryConfig,
  });
};
