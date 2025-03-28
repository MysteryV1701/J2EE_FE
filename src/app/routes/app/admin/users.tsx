import { QueryClient } from '@tanstack/react-query';

import { ContentLayout } from '@/components/layouts';
import { getUsersQueryOptions } from '@/features/users/api/get-users';
import { UsersList } from '@/features/users/components/users-list';
import { Authorization } from '@/lib/authorization';
import { ROLES } from '@/types/enum';

export const usersLoader = (queryClient: QueryClient) => async () => {
  const query = getUsersQueryOptions();

  return (
    queryClient.getQueryData(query.queryKey) ??
    (await queryClient.fetchQuery(query))
  );
};

export const UsersRoute = () => {
  return (
    <ContentLayout title="Danh sách người dùng" description="" isDashboard>
      <Authorization
        forbiddenFallback={<div>Only admin can view this.</div>}
        allowedRoles={[ROLES.ADMIN]}
      >
        <UsersList />
      </Authorization>
    </ContentLayout>
  );
};
