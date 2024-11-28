import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { User} from '@/types/api';
import { queryOptions, useQuery } from '@tanstack/react-query';

export const getUser = ({
  id,
}: {
  id: number;
}): Promise<User> => {
  return api.get(`/users/${id}`);
};

export const getUserQueryOptions = (id: number) => {
  return queryOptions({
    queryKey: ['users', id],
    queryFn: () => getUser({ id }),
  });
};

type UseUserOptions = {
  id: number;
  queryConfig?: QueryConfig<typeof getUserQueryOptions>;
};

export const useUser = ({ id, queryConfig }: UseUserOptions) => {
  return useQuery({
    ...getUserQueryOptions(id),
    ...queryConfig,
  });
};
