import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { useQuery } from '@tanstack/react-query';

export type StatisticRequest = {
  campaignId: number;
  startDate: string;
  endDate: string;
};

export type CampaignStatistic = {
  totalDonations: number;
  totalAmount: number;
};

export const getCampaignStatistic = async (request: StatisticRequest): Promise<CampaignStatistic> => {
  const accessToken = sessionStorage.getItem('access_token');
  return api.get('/statistic/campaign', {
    params: request,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};


export const getCampaignStatisticQueryOptions = (request: StatisticRequest) => {
  return {
    queryKey: ['campaignStatistic', request],
    queryFn: () => getCampaignStatistic(request),
  };
};

type UseCampaignStatisticOptions = {
  request: StatisticRequest;
  queryConfig?: QueryConfig<typeof getCampaignStatisticQueryOptions>;
};

export const useCampaignStatistic = ({ request, queryConfig }: UseCampaignStatisticOptions) => {
  return useQuery({
    ...getCampaignStatisticQueryOptions(request),
    ...queryConfig,
  });
};