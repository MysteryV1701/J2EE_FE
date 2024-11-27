import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { Recipient } from '@/types/api';
import { queryOptions, useQuery } from '@tanstack/react-query';

export const getRecipient = ({
  id,
}: {
  id: number;
}): Promise<{data: Recipient}> => {
  return api.get(`/recipients/${id}`);
};

export const getRecipientQueryOptions = (id: number) => {
  return queryOptions({
    queryKey: ['recipients', id],
    queryFn: () => getRecipient({ id }),
  });
};

type UseRecipientOptions = {
  id: number;
  queryConfig?: QueryConfig<typeof getRecipientQueryOptions>;
};

export const useRecipient = ({ id, queryConfig }: UseRecipientOptions) => {
  return useQuery({
    ...getRecipientQueryOptions(id),
    ...queryConfig,
  });
};
