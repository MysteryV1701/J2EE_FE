import { queryOptions, useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { Recipient } from '@/types/api';

export const getRecipient = (): Promise<{ data: Recipient[] }> => {
  return api.get(`/recipients`);
};

export const getRecipientQueryOptions = () => {
  return queryOptions({
    queryKey: ['recipients'],
    queryFn: getRecipient,
  });
};

type UseRecipientOptions  = {
    queryConfig?: QueryConfig<typeof getRecipientQueryOptions>;
}

export const useRecipient = ({ queryConfig }: UseRecipientOptions = {}) => {
    return useQuery({
        ...getRecipientQueryOptions(),
        ...queryConfig,
    });
}