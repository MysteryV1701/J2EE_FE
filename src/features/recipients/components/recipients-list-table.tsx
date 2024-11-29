import { FunctionComponent, useEffect, useState } from 'react';
import { useRecipients } from '../api/get-recipients';
import Button from '@/components/ui/button';
import { cn } from '@/helpers/cn';
import { Spinner } from '@/components/ui/spinner';
import { CreateRecipientForm } from './create-recipient-form';
import { formatDate } from '@/helpers/utils';
import { Table } from '@/components/ui/table';
import { DeleteRecipienties } from './delete-recipient';
import { useSearchParams } from 'react-router-dom';
import { Pagination } from '@/components/ui/pagination';

interface RecipientListProps {
  size?: number;
  pagination?: boolean;
}

export const RecipientListTable: FunctionComponent<RecipientListProps> = (
  props,
) => {
  const [searchParams] = useSearchParams();
  const [page, setPage] = useState(+(searchParams.get('page') || 0));
  const [pageNumberLimit, setPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
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
    size: 10,
  });

  useEffect(() => {
    setPageNumberLimit(recipientQuery.data?.totalPages || 5);
    setMaxPageNumberLimit(recipientQuery.data?.totalPages || 5);
  }, [recipientQuery.data]);

  if (recipientQuery.isLoading) {
    return (
      <div className="flex h-48 w-full items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }
  const changePage = (pageNumber: number) => {
    setPage(pageNumber);
  };

  const incrementPage = () => {
    setPage(page + 1);
    if (page + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };
  const decrementPage = () => {
    setPage(page - 1);
    if ((page - 1) % pageNumberLimit === 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
    if (page - 1 === 0) {
      return null;
    }
  };
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
        <Button>
          <DeleteRecipienties recipientIds={Array.from(selectedRows)} />
        </Button>
      </div>
      <Table
        data={recipients}
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
      <Pagination
        totalPages={recipientQuery.data?.totalPages || 5}
        pageSize={recipientQuery.data?.size || 5}
        page={page}
        changePage={changePage}
        incrementPage={incrementPage}
        decrementPage={decrementPage}
        minPageNumberLimit={minPageNumberLimit}
        maxPageNumberLimit={maxPageNumberLimit}
      />
    </>
  );
};
