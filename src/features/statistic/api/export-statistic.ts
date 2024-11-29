import { api } from "@/lib/api-client";
import { StatisticRequest } from "./get-campaign-statistic";

export const exportStatistic = async (request: StatisticRequest): Promise<Blob> => {
    const accessToken = sessionStorage.getItem('access_token');
    return api.get('/statistic/export', {
      params: request,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      responseType: 'blob',
    });
  };