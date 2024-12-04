/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { string, z } from 'zod';

import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';
import { Campaign } from '@/types/api';

import { getCampaignsQueryOptions } from './get-campaigns';


export const createCampaignInputSchema = z.object({
  name: z.string().min(1, 'Required'),
  description: z.string().min(1, 'Required'),
  startDate: z.date().min(new Date(), 'Required'),
  endDate: z.date().min(new Date(), 'Required'),
  targetAmount: z
    .string()
    .refine(
      (value) => !isNaN(Number(value)) && Number(value) >= 1000000,
      {
        message: 'Tối thiểu 1,000,000đ',
      }
    ),
  categoryId: z.number().min(1, 'Required'),
  educationId: z.number().min(1, 'Required'),
  accountNumber: z
    .string()
    .refine(
      (value) => !isNaN(Number(value)) && Number(value).toString().length >= 6 && Number(value).toString().length <= 20,
      {
        message: 'Tài khoản ngân hàng không hợp lệ',
      }
    ),
  bankName: z.string().min(1, 'Required'),
  thumbnail: z
    .any()
    .refine(
      (value) => {
        if ( value.length === 0) {
          return false;
        }
        const file = value[0];
        return typeof file.name === 'string' && file.name.match(/\.(jpg|jpeg|png|gif)$/i);
      },
      { message: 'Thumbnail must be an image file' }
    ),
});

const createCampaignInputData = z.object({
  name: z.string().min(1, 'Required'),
  description: string().min(1, 'Required'),
  startDate: z.string().min(1, 'Required'),
  endDate: z.string().min(1, 'Required'),
  targetAmount: z.number().min(1, 'Required'),
  currentAmount: z.number().min(0, 'Required'),
  categoryId: z.number().min(1, 'Required'),
  educationId: z.number().min(1, 'Required'),
  createdId: z.number().min(1, 'Required'),
  accountNumber: z.string().min(1, 'Required'),
  bankName: z.string().min(1, 'Required'),
  thumbnail: z.string().min(1, 'Required'),
})


export type CreateCampaignInput = z.infer<typeof createCampaignInputData>;

export const createCampaign = ({
  data,
}: {
  data: CreateCampaignInput;
}): Promise<Campaign> => { 
  return api.post(`/campaigns`, data);
};

type UseCreateCampaignOptions = {
  mutationConfig?: MutationConfig<typeof createCampaign>;
};

export const useCreateCampaign = ({
  mutationConfig,
}: UseCreateCampaignOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, onError, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getCampaignsQueryOptions().queryKey,
      });
      onSuccess?.(...args);
    },
    onError: (...args) => {
      onError?.(...args);
    },
    ...restConfig,
    mutationFn: createCampaign,
  });
};
