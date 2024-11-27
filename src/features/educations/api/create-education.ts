import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';
import { Education } from '@/types/api';

import { getEducationsQueryOptions } from './get-educations';

export const createEducationInputSchema = z.object({
    name: z.string().min(1, 'Required'),
    email: z.string().min(1, 'Required'),
    phone: z.string().min(1, 'Required'),
    address: z.string().min(1, 'Required'),
    status: z.number().min(0, 'Status must be a positive number'),
});

export type CreateEducationInput = z.infer<typeof createEducationInputSchema>;

export const createEducation = ({
    data,
}: {
    data: CreateEducationInput;
}): Promise<Education> => {
    return api.post(`/educations`, data);
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
