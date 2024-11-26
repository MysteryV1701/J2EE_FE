import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';

import { getFinancialReportsQueryOptions } from '../api/get-financial-reports';

export const deleteFinancialReports = async ( financialReportIds: string[]) => {
  return api.delete(`/financial-reports`, { data: financialReportIds  });
};

type UseDeleteFinancialReportOptions = {
  mutationConfig?: MutationConfig<typeof deleteFinancialReports>;
};

export const useDeleteFinancialReports = ({
  mutationConfig,
}: UseDeleteFinancialReportOptions = {}) => {
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
    mutationFn: deleteFinancialReports,
  });
};