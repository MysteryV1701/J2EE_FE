import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { FinancialReport } from '@/types/api';
import { queryOptions, useQuery } from '@tanstack/react-query';

export const getFinancialReport = ({
  id,
}: {
  id: number;
}): Promise<FinancialReport> => {
  return api.get(`/financial-report/${id}`);
};

export const getFinancialReportQueryOptions = (id: number) => {
  return queryOptions({
    queryKey: ['financial-reports', id],
    queryFn: () => getFinancialReport({ id }),
  });
};

type UseFinancialReportOptions = {
  id: number;
  queryConfig?: QueryConfig<typeof getFinancialReportQueryOptions>;
};

export const useFinancialReport = ({ id, queryConfig }: UseFinancialReportOptions) => {
  return useQuery({
    ...getFinancialReportQueryOptions(id),
    ...queryConfig,
  });
};
