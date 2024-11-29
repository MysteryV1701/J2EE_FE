import { FunctionComponent, useEffect, useState } from 'react';
import { useRecipients } from '../api/get-recipients';
import Button from '@/components/ui/button';
import { cn } from '@/helpers/cn';
import { Spinner } from '@/components/ui/spinner';
import { CreateRecipientForm } from './create-recipient-form';
import { Modal } from '@/components/ui/modal';
import { paths } from '@/config/paths';
import { formatDate } from '@/helpers/utils';
import { Table } from '@/components/ui/table';
import { DeleteRecipienties } from './delete-recipient';
import { Authorization } from '@/lib/authorization';
import { ROLES } from '@/types/enum';


interface RecipientListProps {
  size?: number;
  pagination?: boolean;
}

export const RecipientListTable: FunctionComponent<RecipientListProps> = (
  props,
) => {
  const [page, setPage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());

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

  const recipientQuery = useRecipients({
    queryConfig: {},
    page,
    size: props.size,
  });

  if (recipientQuery.isLoading) {
    return (
      <div className="flex h-48 w-full items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  const recipients = recipientQuery.data?.data;

  if (!recipients || recipients.length === 0) {
    return (
      <>
      
        <Button>
         <CreateRecipientForm />
        </Button>

        <div
          className={cn(
            props.pagination
              ? 'flex min-h-screen w-full items-center justify-center'
              : 'py-12',
          )}
        >
          <div className="h-64 w-full">
            <p className="h-full w-full object-contain">
              {' '}
              Không có người nhận nào tồn tại
            </p>
          </div>
        </div>
      </>

    );
  }

  return (
    <>
    <div className="flex justify-end space-x-4 mb-4">
      <CreateRecipientForm />
      <Authorization allowedRoles={[ROLES.ADMIN]}>
      <Button
      >
        <DeleteRecipienties recipientIds={Array.from(selectedRows)}/>
      </Button>
      </Authorization>
    </div>
      <Table
        data={recipients}
        pagination={{
          totalPages: recipientQuery.data?.totalPages ?? 1,
          currentPage: page,
          rootUrl: paths.app.recipient.getHref(),
        }}
        columns={[
          {
            title: (
              <input
                type="checkbox"
                onChange={(e) => {
                  if (e.target.checked) {
                    const allIds = recipients.map((recipient) => recipient.id);
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
            title: 'Tên người nhận',
            field: 'name',
          },
          {
            title: 'Code',
            field: 'code',
          },
          {
            title: 'Số điện thoại',
            field: 'phone',
          },
          {
            title: 'Thời gian tạo',
            field: 'createdDate',
            className: 'text-center',
            Cell({ entry: { createdDate } }) {
              return <span>{formatDate(createdDate)}</span>;
            },
          },
        ]}
      />
    </>
  );
};
