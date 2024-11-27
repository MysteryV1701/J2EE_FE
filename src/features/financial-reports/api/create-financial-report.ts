import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';
import { FinancialReport } from '@/types/api';

import { getFinancialReportsQueryOptions } from './get-financial-reports';

export const createFinancialReportInputSchema = z.object({
    totalReceived: z.number().min(1, 'Required'),
    totalRemain: z.number().min(1, 'Required'),
    campaignId: z.number().min(1, 'Required'),
    recipientId: z.number().min(1, 'Required'),
});

export type CreateFinancialReportInput = z.infer<typeof createFinancialReportInputSchema>;

export const createFinancialReport = ({
  data,
}: {
  data: CreateFinancialReportInput;
}): Promise<FinancialReport> => {
  return api.post(`/financial-reports`, data);
};

type UseCreateFinancialReportOptions = {
  mutationConfig?: MutationConfig<typeof createFinancialReport>;
};

export const useCreateFinancialReport = ({
  mutationConfig,
}: UseCreateFinancialReportOptions = {}) => {
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
    mutationFn: createFinancialReport,
  });
};
