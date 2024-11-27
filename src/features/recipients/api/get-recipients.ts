import { useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { Recipient } from '@/types/api';

export const getRecipients = (
  page = 0,
  size = 10,
): Promise<{
  data: Recipient[];
  total: number;
  size: number;
  totalPages: number;
}> => {
  const accessToken = localStorage.getItem('accessToken');
  console.log('accessToken', accessToken);
  return api.get(`/recipients`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    params: {
      page,
      size,
    },
  });
};

export const getRecipientsQueryOptions = ({
  page,
  size,
}: { page?: number; size?: number } = {}) => {
  return {
    queryKey: ['recipients', { page, size }],
    queryFn: () => getRecipients(page, size),
  };
};

type UseRecipientsOptions = {
  page?: number;
  size?: number;
  queryConfig?: QueryConfig<typeof getRecipientsQueryOptions>;
};

export const useRecipients = ({
  queryConfig,
  page,
  size,
}: UseRecipientsOptions) => {
  return useQuery({
    ...getRecipientsQueryOptions({ page, size }),
    ...queryConfig,
  });
};
