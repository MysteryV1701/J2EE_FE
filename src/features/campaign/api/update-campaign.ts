import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';
import { Campaign } from '@/types/api';

import { getCampaignQueryOptions } from './get-campaign';

export const updateCampaignInputSchema = z.object({
  name: z.string().nonempty("Tên chiến dịch không được để trống"),
  description: z.string().optional(),
  targetAmount: z.number().min(0, "Số tiền mục tiêu phải lớn hơn hoặc bằng 0"),
  currentAmount: z.number().min(0, "Số tiền hiện tại phải lớn hơn hoặc bằng 0"),
  startDate: z.string(),
  endDate: z.string(),
  bankname: z.string().optional(),
  accountNumber: z.string().optional(),
  categoryName: z.string().optional(),
  educationId: z.number().int().optional(),
  educationName: z.string().optional(),
  educationEmail: z.string().email().optional(),
  thumbnail: z.string().optional(),
  ownerId: z.number().int().optional(),
  ownerName: z.string().optional(),
  ownerEmail: z.string().email().optional(),
});

export const updateCampaignUpdateSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  targetAmount: z
    .number()
    .min(0, "Số tiền mục tiêu phải lớn hơn hoặc bằng 0")
    .default(0),
  currentAmount: z
    .number()
    .min(0, "Số tiền hiện tại phải lớn hơn hoặc bằng 0")
    .default(0),
  startDate: z
    .string(),
  endDate: z
    .string(),
  bankName: z.string().optional(),
  accountNumber: z.string().optional(),
  categoryId: z.number().optional(),
  categoryName: z.string().optional(),
  educationId: z.number().int().optional(),
  thumbnail: z.string().optional(),
  createdId: z.number().int().optional(),
});
export type UpdateCampaignInput = z.infer<typeof updateCampaignUpdateSchema>;

export const updateCampaign = ({
  data,
  id,
}: {
  data: UpdateCampaignInput;
  id: number;
}): Promise<Campaign> => {
  return api.put(`/campaigns/${id}`, data);
};

type UseUpdateCampaignOptions = {
  mutationConfig?: MutationConfig<typeof updateCampaign>;
};

export const useUpdateCampaign = ({
  mutationConfig,
}: UseUpdateCampaignOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (data, ...args) => {
      queryClient.refetchQueries({
        queryKey: getCampaignQueryOptions(data.code).queryKey,
      });
      onSuccess?.(data, ...args);
    },
    ...restConfig,
    mutationFn: updateCampaign,
  });
};
