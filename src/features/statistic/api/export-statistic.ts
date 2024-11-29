import { api } from "@/lib/api-client";
import { StatisticRequest } from "@/types/api";

export const exportStatistic = async (request: StatisticRequest): Promise<void> => {
  const response = await fetch('http://localhost:8090/api/statistics/export', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('access_token')}`,
      'Content-Type': 'application/octet-stream',
    },
  });

  console.log(response);
  
  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'statistic.xlsx';
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.URL.revokeObjectURL(url);

  // const response = await api.get('statistics/export', {
  //   headers: {
  //     'Content-Type': 'application/octet-stream',
  //   },
  //   responseType: 'blob',
  // });

  // console.log(response);
  
  
  // const blob = await response.data.blob();
  // const url = window.URL.createObjectURL(blob);
  // const a = document.createElement('a');
  // a.href = url;
  // a.download = 'statistic.xlsx';
  // document.body.appendChild(a);
  // a.click();
  // a.remove();
  // window.URL.revokeObjectURL(url);
};