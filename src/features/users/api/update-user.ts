import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';

import { api } from '@/lib/api-client';
import { useUser } from '@/lib/auth';
import { MutationConfig } from '@/lib/react-query';

export const updateUserInputSchema = z.object({
  email: z.string().min(1, 'Required').email('Invalid email'),
  name: z.string().min(1, 'Required'),
  avatar: z.string().min(1, 'Required'),
  status: z.number(),
  role_name: z.string().min(1, 'Required'),
  provider: z.string().min(1, 'Required'),
});

export type UpdateUserInput = z.infer<typeof updateUserInputSchema>;

export const updateUser = ({ id, data }: {id:number, data: UpdateUserInput }) => {
  return api.patch(`/users/${id}`, data);
};

type UseUpdateUserOptions = {
  mutationConfig?: MutationConfig<typeof updateUser>;
};

export const useUpdateUser = ({
  mutationConfig,
}: UseUpdateUserOptions = {}) => {
  const { refetch: refetchUser } = useUser();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      refetchUser();
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: updateUser,
  });
};