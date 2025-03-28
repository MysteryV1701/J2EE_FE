import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';

import { getFinancialReportsQueryOptions } from './get-financial-reports';

export const deleteFinancialReport = async ( financialReportIds: number[]) => {
  const accessToken = sessionStorage.getItem('access_token');
  return api.delete(`/financial-report`, { data: financialReportIds, headers: {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  },  }, );
};

type UseDeleteFinancialReportsOptions = {
  mutationConfig?: MutationConfig<typeof deleteFinancialReport>;
};

export const useDeleteFinancialReports = ({
  mutationConfig,
}: UseDeleteFinancialReportsOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getFinancialReportsQueryOptions().queryKey,
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: deleteFinancialReport,
  });
};