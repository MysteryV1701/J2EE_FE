import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';
import { Campaign } from '@/types/api';

import { getCampaignQueryOptions } from './get-campaign';

export const updateCampaignInputSchema = z.object({
  name: z.string().min(1, 'Required'),
  description: z.string().min(1, 'Required'),
  startDate: z.string().min(1, 'Required'),
  endDate: z.string().min(1, 'Required'),
  targetAmount: z.number().min(1, 'Required'),
  currentAmount: z.number().min(0, 'Required'),
  categoryId: z.number().min(1, 'Required'),
  educationId: z.number().min(1, 'Required'),
  createdId: z.number().min(1, 'Required'),
  accountNumber: z.string().min(1, 'Required'),
  bankName: z.string().min(1, 'Required'),
  thumbnail: z
    .any()
    .refine(
      (value) => {
        return value[0] && typeof value[0].name === 'string' && value[0].name.match(/\.(jpg|jpeg|png|gif)$/i);
      },
      { message: 'Thumbnail must be an image file' }
    ),
});

export type UpdateCampaignInput = z.infer<typeof updateCampaignInputSchema>;

export const updateCampaign = ({
  data,
  code,
}: {
  data: UpdateCampaignInput;
  code: string;
}): Promise<Campaign> => {
  return api.patch(`/campaign/${code}`, data);
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
