import { api } from "@/lib/api-client";
import { StatisticRequest } from "@/types/api";

export const exportStatistic = async (request: StatisticRequest): Promise<void> => {
  const response = await api.get('/statistics/export', {
    params: request,
    responseType: 'blob',
  });

  const blob = new Blob([response.data]);
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'statistic.xlsx';
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
};