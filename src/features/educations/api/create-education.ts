import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';
import { Education } from '@/types/api';

import { getEducationsQueryOptions } from './get-educations';

export const createEducationInputSchema = z.object({
    name: z.string().min(1, 'Required'),
    email: z.string().min(1, 'Required').email(),
    phone: z.string().min(1, 'Required').regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number'),
    address: z.string().min(1, 'Required'), 
    status: z.number().min(0, 'Status must be a positive number'),
});

export type CreateEducationInput = z.infer<typeof createEducationInputSchema>;

export const createEducation = ({
    data,
}: {
    data: CreateEducationInput;
}): Promise<Education> => {
    const accessToken = sessionStorage.getItem('access_token');
    
    return api.post(`/educations`, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });
};

type UseCreateEducationOptions = {
    mutationConfig?: MutationConfig<typeof createEducation>;
};

export const useCreateEducation = ({
    mutationConfig,
}: UseCreateEducationOptions = {}) => {
    const queryClient = useQueryClient();

    const { onSuccess, ...restConfig } = mutationConfig || {};

    return useMutation({
        onSuccess: (...args) => {
            queryClient.invalidateQueries({
                queryKey: getEducationsQueryOptions().queryKey,
            });
            onSuccess?.(...args);
        },
        ...restConfig,
        mutationFn: createEducation,
    });
};
