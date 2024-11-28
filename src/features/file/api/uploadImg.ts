import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';

export const createFileInputSchema = z.object({
  file: z.string().min(1, 'Required'),
});

export type CreateFileInput = z.infer<typeof createFileInputSchema>;

export const createFile = ({
  data,
}: {
  data: CreateFileInput;
}): Promise<URL> => {
  return api.post(`/file`, data);
};

type UseCreateFileOptions = {
  mutationConfig?: MutationConfig<typeof createFile>;
};

export const useCreateFile = ({
  mutationConfig,
}: UseCreateFileOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: ['file'],
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: createFile,
  });
};
