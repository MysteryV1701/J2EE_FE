/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';

import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';


export const forgotPasswordSchema = z.object({
  email: z.string().min(1, 'Không được bỏ trống'),
  code: z.number().min(6, 'Không được bỏ trống').max(6, 'Không được bỏ trống'),
  isUser: z.boolean().optional().default(true),
});

type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;

const forgotPasswordWithEmail = (
  data: ForgotPasswordInput,
): Promise<{ success: boolean }> => {
  return api.post('/auth/forgot-password', data);
};

type UseForgotPassworOptions = {
  mutationConfig?: MutationConfig<typeof forgotPasswordWithEmail>;
};

export const useForgotPassword = ({
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
    mutationFn: forgotPasswordWithEmail,
  });
};
