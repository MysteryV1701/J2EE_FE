import { queryOptions, useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { User } from '@/types/api';
import { ROLES } from '@/types/enum';

export const getUsers = (): Promise<{ data: User[] }> => {
  return Promise.resolve({
    data: [
      {
        id: '1',
        name: 'John Doe',
        email: '',
        password: 'defaultPassword',
        roleName: ROLES.ADMIN,
        bio: '',
        status: 1,
        createdAt: '2023-09-25T10:00:00Z',
        updatedAt: '2023-09-25T12:00:00Z',
      },
    ],
  });
  return api.get(`/users`);
};

export const getUsersQueryOptions = () => {
  return queryOptions({
    queryKey: ['users'],
    queryFn: getUsers,
  });
};

type UseUsersOptions = {
  queryConfig?: QueryConfig<typeof getUsersQueryOptions>;
};

export const useUsers = ({ queryConfig }: UseUsersOptions = {}) => {
  return useQuery({
    ...getUsersQueryOptions(),
    ...queryConfig,
  });
};