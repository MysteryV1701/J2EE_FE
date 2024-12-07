import { useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { Campaign } from '@/types/api';
import { CAMPAIGNSTATUS } from '@/types/enum';

export const getCampaigns = (
  categoryId = 0,
  status = CAMPAIGNSTATUS.APPROVED,
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
    status,
    startDate,
    endDate
  };
  if (categoryId !== 0) {
    params.categoryId = categoryId;
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
}: { categoryId?: number, page?: number; size?: number, status?: CAMPAIGNSTATUS, startDate?:string, endDate?:string } = {}) => {
  return {
    queryKey: ['campaigns', { categoryId, status, startDate, endDate, page, size }],
    queryFn: () => getCampaigns(categoryId, status,startDate, endDate ,page, size),
  };
};

type UseCampaignsOptions = {
  categoryId?: number;
  status?: CAMPAIGNSTATUS;
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
