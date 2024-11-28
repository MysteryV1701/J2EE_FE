import { Spinner } from '@/components/ui/spinner';
import { Table } from '@/components/ui/table';
import { formatDate } from '@/helpers/utils';

import { useUsers } from '../api/get-users';

import { DeleteUser } from './delete-user';
import { useState } from 'react';
import { UpdateUser } from './update-user';

export const UsersList = () => {
  const usersQuery = useUsers();
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  if (usersQuery.isLoading) {
    return (
      <div className="flex h-48 w-full items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }
  const handleCheckboxChange = (id: number) => {
    setSelectedRows((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };
  const users = usersQuery?.data;

  if (!users) return null;

  return (
    <Table
      data={users}
      columns={[
        {
          title: (
            <input
              type="checkbox"
              onChange={(e) => {
                if (e.target.checked) {
                  const allIds = users.map((user) => user.id);
                  setSelectedRows(new Set(allIds));
                } else {
                  setSelectedRows(new Set());
                }
              }}
            />
          ),
          field: 'checkbox',
          className: 'w-10 text-center',
          Cell({ entry: { id } }) {
            return (
              <input
                type="checkbox"
                checked={selectedRows.has(id)}
                onChange={() => handleCheckboxChange(id)}
              />
            );
          },
        },
        {
          title: 'Họ và tên',
          field: 'name',
        },

        {
          title: 'Email',
          field: 'email',
        },
        {
          title: 'Truy cập qua',
          field: 'provider',
        },
        {
          title: 'Vai trò',
          field: 'role_name',
        },
        {
          title: 'Tạo ngày',
          field: 'createdDate',
          Cell({ entry: { createdDate } }) {
            return <span>{formatDate(createdDate)}</span>;
          },
        },
        {
          title: '',
          field: 'id',
          Cell({ entry: { id } }) {
            return (
              <div className="flex gap-2">
                <UpdateUser userId={id} />
                <DeleteUser id={id} />
              </div>
            );
          },
        },
      ]}
    />
  );
};
