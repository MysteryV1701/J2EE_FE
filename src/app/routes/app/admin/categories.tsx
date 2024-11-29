import { QueryClient } from '@tanstack/react-query';

import { ContentLayout } from '@/components/layouts';
import { getCategoriesQueryOptions } from '@/features/categories/api/get-categories';
import { CategoriesListTable } from '@/features/categories/components/categories-list-table';
import { LoaderFunctionArgs } from 'react-router-dom';

export const CategoriesLoader =
  (queryClient: QueryClient) =>
  async ({ request }: LoaderFunctionArgs) => {
    const url = new URL(request.url);

    const page = Number(url.searchParams.get('page') || 1);

    const query = getCategoriesQueryOptions({ page });

    return (
      queryClient.getQueryData(query.queryKey) ??
      (await queryClient.fetchQuery(query))
    );
  };

export const CategoriesRoute = () => {
  return (
    <ContentLayout title="Danh sách các loại từ thiện" description="" isDashboard>
        <CategoriesListTable />
    </ContentLayout>
  );
};