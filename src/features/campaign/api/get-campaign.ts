import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { CampaignView } from '@/types/api';
import { queryOptions, useQuery } from '@tanstack/react-query';

export const getCampaign = ({
  code,
}: {
  code: string;
}): Promise<CampaignView> => {
  return api.get(`/campaigns/${code}`);
};

export const getCampaignQueryOptions = (code: string) => {
  return queryOptions({
    queryKey: ['campaigns', code],
    queryFn: () => getCampaign({ code }),
  });
};

type UseCampaignOptions = {
  code: string;
  queryConfig?: QueryConfig<typeof getCampaignQueryOptions>;
};

export const useCampaign = ({ code, queryConfig }: UseCampaignOptions) => {
  return useQuery({
    ...getCampaignQueryOptions(code),
    ...queryConfig,
  });
};
