import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';

import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';

export const createDonationInputSchema = (isAnonymous : boolean) => z.object({
  amount: z
    .string()
    .refine(
      (value) => !isNaN(Number(value)) && Number(value) >= 10000,
      {
        message: 'Tối thiểu 10,000 VND',
      }
    ),
  name: z.string().refine(
      (value) => {
        // Kiểm tra giá trị isAnonymous và tính hợp lệ của name
        if (!isAnonymous && (!value || value.trim() === '')) {
          return false;
        }
        return true;
      },
      { message: 'Tên không được để trống khi không ẩn danh' }
    ),
})

export const createDonationDataSchema = z.object({
  amount: z.number().min(10000, 'Tối thiểu 10,000 VND'),
  name: z.string(),
  isAnonymous: z.boolean(),
});
export type CreateDonationInput = z.infer<typeof createDonationDataSchema>;

export const createDonation = async ({
  data,
  campaignId,
  userId,
}: {
  data: CreateDonationInput;
  campaignId: number;
  userId?:number;
}): Promise<{code: string, payUrl: string}> => {
  const response = await api
    .post(`/donations`, { ...data, campaignId, userId })
    .catch((error) => {
      return error;
    });
  return api.get(
    `/payment/momo?amount=${response.amount}&donationId=${response.id}`,
  );
};

type UseCreateDonationOptions = {
  mutationConfig?: MutationConfig<typeof createDonation>;
};

export const useCreateDonation = ({
  mutationConfig,
}: UseCreateDonationOptions = {}) => {
  const { onSuccess, ...restConfig } = mutationConfig || {};
  return useMutation({
    onSuccess: (...args) => {
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: createDonation,
  });
};
