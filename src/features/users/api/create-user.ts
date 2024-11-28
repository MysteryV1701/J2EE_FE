import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';
import { User } from '@/types/api';

import { getUsersQueryOptions } from './get-users';

export const createUserInputSchema = z.object({
  email: z.string().min(1, 'Required').email('Invalid email'),
  name: z.string().min(1, 'Required'),
  avatar: z.string().min(1, 'Required'),
  status: z.number(),
  provider: z.string().min(1, 'Required'),
  role_name: z.string().min(1, 'Required'),})

export type CreateUserInput = z.infer<typeof createUserInputSchema>;

export const createUser = ({
  data,
}: {
  data: CreateUserInput;
}): Promise<User> => { 
  return api.post(`/users`, data);
};

type UseCreateCampaignOptions = {
  mutationConfig?: MutationConfig<typeof createUser>;
};

export const useCreateCampaign = ({
  mutationConfig,
}: UseCreateCampaignOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getUsersQueryOptions().queryKey,
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: createUser,
  });
};
