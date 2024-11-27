import { FunctionComponent, useEffect, useState } from 'react';
import { useCategories } from '../api/get-categories';
import { Spinner } from '@/components/ui/spinner';
import { formatDate } from '@/helpers/utils';
import { Table } from '@/components/ui/table';


interface CategoriesListProps {
  size?: number;
  pagination?: boolean;
}

export const CategoriesListTable: FunctionComponent<CategoriesListProps> = (
  props,
) => {
  const [page, setPage] = useState(0);

  const categoriesQuery = useCategories({
    queryConfig: {},
    page,
    size: props.size,
  });
  
  if (categoriesQuery.isLoading) {
    return (
      <div className="flex h-48 w-full items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  const categories = categoriesQuery.data?.data;

  if (!categories) return null;

  return (
    <Table
      data={categories}
      columns={[
        {
          title: 'Category Name',
          field: 'name',
        },
        {
          title: 'Description',
          field: 'description',
        },
        {
          title: 'Status',
          field: 'status',
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
        },
      ]}
    />
  );
};
