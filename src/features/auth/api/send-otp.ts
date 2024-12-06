/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';

import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';


export const sendOTPSchema = z.object({
  email: z.string().min(1, 'Yêu cầu cần có email').email('Email không hợp lệ'),
});

type SendOTPInput = z.infer<typeof sendOTPSchema>;

const sendOTPWithEmail = (
  data: SendOTPInput,
): Promise<{ success: boolean }> => {
  return api.post('/auth/send-otp', data);
};

type UseForgotPassworOptions = {
  mutationConfig?: MutationConfig<typeof sendOTPWithEmail>;
};

export const useSendOTP = ({
  mutationConfig,
}: UseForgotPassworOptions = {}) => {
  const { onSuccess, onError, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      onSuccess?.(...args);
    },
    onError: (...args) => {
        onError?.(...args);
    },
    ...restConfig,
    mutationFn: sendOTPWithEmail,
  });
};
