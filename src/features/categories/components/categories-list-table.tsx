import { FunctionComponent, useState } from 'react';
import { useCategories } from '../api/get-categories';
import { Spinner } from '@/components/ui/spinner';
import { formatDate } from '@/helpers/utils';
import { Table } from '@/components/ui/table';
import { paths } from '@/config/paths';
import { CreateCategoryForm } from './create-category-form';
import Button from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { DeleteCategories } from './delete-categories';
import { UpdateCategory } from './update-category';
import { CATEGORIESSTATUS } from '@/types/enum';
import { cn } from '@/helpers/cn';


interface CategoriesListProps {
  size?: number;
  pagination?: boolean;
}

export const CategoriesListTable: FunctionComponent<CategoriesListProps> = (
  props,
) => {
  const [page, setPage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());


  const categoriesQuery = useCategories({
    queryConfig: {},
    page,
    size: props.size,
  });

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
  
  const getCategoryStatusText = (status: CATEGORIESSTATUS): string => {
    switch (status) {
      case CATEGORIESSTATUS.INACTIVE:
        return 'Dừng hoạt động';
      case CATEGORIESSTATUS.ACTIVE:
        return 'Đang hoạt động';
      default:
        return 'Unknown';
    }
  }

  if (categoriesQuery.isLoading) {
    return (
      <>
        <Button
          buttonVariant="filled"
          buttonStyled={{ color: 'primary', rounded: 'lg', size: 'lg' }}
          className="width-fit-content"
          onClick={() => setIsModalOpen(true)}
        >
          Tạo loại từ thiện
        </Button>
        <div className="flex h-48 w-full items-center justify-center">
          <Spinner size="lg" />
        </div>
      </>
    );
  }

  const categories = categoriesQuery.data?.data;

  if (!categories) return null;

  console.log(Array.from(selectedRows));
  

  return (
    <>
    <div className="flex justify-end space-x-4 mb-4">
      <CreateCategoryForm />
      <Button>
        <DeleteCategories categoryIds={Array.from(selectedRows)} />
      </Button>
      </div>
      <Table
        data={categories}
        pagination={{
          totalPages: categoriesQuery.data?.totalPages ?? 1,
          currentPage: page,
          rootUrl: paths.app.category.getHref(),
        }}
        columns={[
          {
            title: (
              <input
                type="checkbox"
                onChange={(e) => {
                  if (e.target.checked) {
                    const allIds = categories.map((category) => category.id);
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
            title: 'Tên loại',
            field: 'name',
          },
          {
            title: 'Mô tả',
            field: 'description',
          },
          {
            title: 'Trạng thái',
            field: 'status',
            Cell({ entry: { status } }) {
              const statusColor =
                status === CATEGORIESSTATUS.ACTIVE
                  ? 'text-success' 
                  : status === CATEGORIESSTATUS.INACTIVE
                    ? 'text-danger'
                    : '';

              
              return <span className={cn(statusColor)}>{getCategoryStatusText(status)}</span>;
            },
          },
          {
            title: 'Thời gian tạo',
            field: 'createdDate',
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
                  <UpdateCategory id={id} />
                </div>
              );
            },
          },
        ]}
      />
    </>
  );
};
