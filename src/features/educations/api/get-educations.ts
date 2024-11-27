import { useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { Education } from '@/types/api';

export const getEducations = (
  page = 1,
  size = 10,
): Promise<{
  data: Education[];
  total: number;
  size: number;
  totalPages: number;
}> => {
  return api.get(`/educations`, {
    params: {
      page,
      size,
    },
  });
};

export const getEducationsQueryOptions = ({
  page,
  size,
}: { page?: number; size?: number } = {}) => {
  return {
    queryKey: ['educations', { page, size }],
    queryFn: () => getEducations(page, size),
  };
};

type UseEducationsOptions = {
  page?: number;
  size?: number;
  queryConfig?: QueryConfig<typeof getEducationsQueryOptions>;
};

export const useEducations = ({
  queryConfig,
  page,
  size,
}: UseEducationsOptions) => {
  return useQuery({
    ...getEducationsQueryOptions({ page, size }),
    ...queryConfig,
  });
};
