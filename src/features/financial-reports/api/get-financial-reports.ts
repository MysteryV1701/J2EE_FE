import { useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { FinancialReport } from '@/types/api';

export const getFinancialReports = (
  page = 1,
  size = 10,
): Promise<{
  data: FinancialReport[];
  total: number;
  size: number;
  totalPages: number;
}> => {
  return api.get(`/financial-reports`, {
    params: {
      page,
      size,
    },
  });
};

export const getFinancialReportsQueryOptions = ({
  page,
  size,
}: { page?: number; size?: number } = {}) => {
  return {
    queryKey: ['financial-reports', { page, size }],
    queryFn: () => getFinancialReports(page, size),
  };
};

type UseFinancialReportsOptions = {
  page?: number;
  size?: number;
  queryConfig?: QueryConfig<typeof getFinancialReportsQueryOptions>;
};

export const useFinancialReports = ({
  queryConfig,
  page,
  size,
}: UseFinancialReportsOptions) => {
  return useQuery({
    ...getFinancialReportsQueryOptions({ page, size }),
    ...queryConfig,
  });
};
