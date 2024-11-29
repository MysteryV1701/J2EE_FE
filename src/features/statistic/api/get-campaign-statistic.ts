import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { Statistic, StatisticRequest } from '@/types/api';
import { useQuery } from '@tanstack/react-query';

export const getCampaignStatistic = async (request: StatisticRequest): Promise<Statistic> => {
  const accessToken = sessionStorage.getItem('access_token');
  return api.get('/statistics/campaign', {
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