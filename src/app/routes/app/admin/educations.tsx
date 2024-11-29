import { QueryClient } from '@tanstack/react-query';

import { ContentLayout } from '@/components/layouts';
import { getEducationsQueryOptions } from '@/features/educations/api/get-educations';
import { EducationListTable } from '@/features/educations/components/educations-list-table';
import { LoaderFunctionArgs } from 'react-router-dom';

export const EducationsLoader =
  (queryClient: QueryClient) =>
  async ({ request }: LoaderFunctionArgs) => {
    const url = new URL(request.url);

    const page = Number(url.searchParams.get('page') || 1);

    const query = getEducationsQueryOptions({ page });

    return (
      queryClient.getQueryData(query.queryKey) ??
      (await queryClient.fetchQuery(query))
    );
  };

export const EducationsRoute = () => {
  return (
    <ContentLayout title="Danh sách trường học" description="" isDashboard>
        <EducationListTable />
    </ContentLayout>
  );
};