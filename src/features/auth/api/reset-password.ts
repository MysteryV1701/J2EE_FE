/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';

import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';


export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, 'Mật khẩu phải có ít nhất 8 ký tự')
      .regex(/[a-z]/, 'Mật khẩu phải có ít nhất 1 ký tự thường')
      .regex(/[A-Z]/, 'Mật khẩu phải có ít nhất 1 ký tự hoa')
      .regex(/[\W_]/, 'Mật khẩu phải có ít nhất 1 ký tự đặc biệt'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Mật khẩu và xác nhận mật khẩu không khớp',
    path: ['confirmPassword'],
  });


export const resetPasswordData = z.object({
  email: z.string().min(1, 'Không được bỏ trống'),
  code: z.number().min(6, 'Không được bỏ trống').max(6, 'Không được bỏ trống'),
  password: z
      .string()
      .min(8, 'Mật khẩu phải có ít nhất 8 ký tự')
      .regex(/[a-z]/, 'Mật khẩu phải có ít nhất 1 ký tự thường')
      .regex(/[A-Z]/, 'Mật khẩu phải có ít nhất 1 ký tự hoa')
      .regex(/[\W_]/, 'Mật khẩu phải có ít nhất 1 ký tự đặc biệt'),
  })
type ResetPasswordInput = z.infer<typeof resetPasswordData>;

const resetPasswordWithOTP = (
  data: ResetPasswordInput,
): Promise<{ success: boolean }> => {
  return api.post('/auth/forgot-password', data);
};

type UseResetPasswordOptions = {
  mutationConfig?: MutationConfig<typeof resetPasswordWithOTP>;
};

export const useResetPassword = ({
  mutationConfig,
}: UseResetPasswordOptions = {}) => {
  const { onSuccess, onError, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      onSuccess?.(...args);
    },
    onError: (...args) => {
        onError?.(...args);
    },
    ...restConfig,
    mutationFn: resetPasswordWithOTP,
  });
};
