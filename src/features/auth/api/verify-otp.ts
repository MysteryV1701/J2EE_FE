/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';

import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';


export const verifyOTPSchema = z.object({});
export const verifyOTPData = z.object({
  email: z.string().min(1, 'Không được bỏ trống'),
  code: z.number().min(6, 'Không được bỏ trống').max(6, 'Không được bỏ trống'),
  isUser: z.boolean().optional().default(true),
});


type verifyOTPInput = z.infer<typeof verifyOTPData>;

const verifyOTPWithEmail = (
  data: verifyOTPInput,
): Promise<{ success: boolean }> => {
  return api.post('/auth/verify-otp', data);
};

type UseVerifyOTPOptions = {
  mutationConfig?: MutationConfig<typeof verifyOTPWithEmail>;
};

export const useVerifyOTP = ({
  mutationConfig,
}: UseVerifyOTPOptions = {}) => {
  const { onSuccess, onError, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      onSuccess?.(...args);
    },
    onError: (...args) => {
        onError?.(...args);
    },
    ...restConfig,
    mutationFn: verifyOTPWithEmail,
  });
};
