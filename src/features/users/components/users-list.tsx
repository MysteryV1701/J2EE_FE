import { Spinner } from '@/components/ui/spinner';
import { Table } from '@/components/ui/table';
import { formatDate } from '@/helpers/utils';

import { useUsers } from '../api/get-users';

import { DeleteUser } from './delete-user';

export const UsersList = () => {
  const usersQuery = useUsers();

  if (usersQuery.isLoading) {
    return (
      <div className="flex h-48 w-full items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  const users = usersQuery.data?.data;

  if (!users) return null;

  return (
    <Table
      data={users}
      columns={[
        {
          title: 'Full Name',
          field: 'name',
        },
        {
          title: 'Email',
          field: 'email',
        },
        {
          title: 'Role',
          field: 'role_name',
        },
        {
          title: 'Created At',
          field: 'createdDate',
          Cell({ entry: { createdDate } }) {
            return <span>{formatDate(createdDate)}</span>;
          },
        },
        {
          title: '',
          field: 'id',
          Cell({ entry: { id } }) {
            return <DeleteUser id={id} />;
          },
        },
      ]}
    />
  );
};
