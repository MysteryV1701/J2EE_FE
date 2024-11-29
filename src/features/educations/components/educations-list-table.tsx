import { FunctionComponent, useEffect, useState } from 'react';
import { useEducations } from '../api/get-educations';
import Button from '@/components/ui/button';
import { cn } from '@/helpers/cn';
import { Spinner } from '@/components/ui/spinner';
import { Modal } from '@/components/ui/modal';
import { paths } from '@/config/paths';
import { formatDate } from '@/helpers/utils';
import { Table } from '@/components/ui/table';
import { CreateEducationForm } from './create-education-form';
import { DeleteEducations } from './delete-education';
import { UpdateEducation } from './update-education';
import { EDUCATIONSTATUS } from '@/types/enum';


interface EducationListProps {
  size?: number;
  pagination?: boolean;
}

export const EducationListTable: FunctionComponent<EducationListProps> = (
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

  const educationQuery = useEducations({
    queryConfig: {},
    page,
    size: props.size,
  });

  const getEducationStatusText = (status: EDUCATIONSTATUS): string => {
    switch (status) {
      case EDUCATIONSTATUS.INACTIVE:
        return 'Dừng hoạt động';
      case EDUCATIONSTATUS.ACTIVE:
        return 'Đang hoạt động';
      default:
        return 'Unknown';
    }
  }

  if (educationQuery.isLoading) {
    return (
      <div className="flex h-48 w-full items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  const educations = educationQuery.data?.data;

  if (!educations || educations.length === 0) {
    return (
      <>
        <Button>
          <CreateEducationForm />
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
              Không có trường học nào tồn tại
            </p>
          </div>
        </div>
      </>

    );
  }

  return (
    <>
      <div className="flex justify-end space-x-4 mb-4">
        <Button>
          <CreateEducationForm />
        </Button>
        <Button
        > <DeleteEducations educationIds={Array.from(selectedRows)} />
        </Button>
      </div>
      <Table
        data={educations}
        pagination={{
          totalPages: educationQuery.data?.totalPages ?? 1,
          currentPage: page,
          rootUrl: paths.app.education.getHref(),
        }}
        columns={[
          {
            title: (
              <input
                type="checkbox"
                onChange={(e) => {
                  if (e.target.checked) {
                    const allIds = educations.map((education) => education.id);
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
            title: 'Tên trường',
            field: 'name',
          },
          {
            title: 'Email',
            field: 'email',
          },
          {
            title: 'Số điện thoại',
            field: 'phone',
          },
          {
            title: 'Địa chỉ',
            field: 'address',
          },
          {
            title: 'Trạng thái',
            field: 'status',
            Cell({ entry: { status } }) {
              const statusColor =
                status === EDUCATIONSTATUS.ACTIVE
                  ? 'text-success'
                  : status === EDUCATIONSTATUS.INACTIVE
                    ? 'text-danger'
                    : '';


              return <span className={cn(statusColor)}>{getEducationStatusText(status)}</span>;
            },
          },
          {
            title: 'Thời gian tạo',
            field: 'createdDate',
            className: 'text-center',
            Cell({ entry: { createdDate } }) {
              return <span>{formatDate(createdDate)}</span>;
            },
          },
          {
            title: '',
            field: 'actions',
            Cell({ entry: { id } }) {
              return (
                <div className="flex gap-2">
                  <UpdateEducation id={id} />
                </div>
              );
            },
          },
        ]}
      />
    </>
  );
};
