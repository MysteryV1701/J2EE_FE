import { QueryClient } from '@tanstack/react-query';

import { ContentLayout } from '@/components/layouts';
import { getRecipientsQueryOptions } from '@/features/recipients/api/get-recipients';
import { RecipientListTable } from '@/features/recipients/components/recipients-list-table';
import { LoaderFunctionArgs } from 'react-router-dom';

export const RecipientsLoader =
  (queryClient: QueryClient) =>
  async ({ request }: LoaderFunctionArgs) => {
    const url = new URL(request.url);

    const page = Number(url.searchParams.get('page') || 1);

    const query = getRecipientsQueryOptions({ page });

    return (
      queryClient.getQueryData(query.queryKey) ??
      (await queryClient.fetchQuery(query))
    );
  };

export const RecipientsRoute = () => {
  return (
    <ContentLayout title="Danh sách người nhận" description="" isDashboard>
        <RecipientListTable />
    </ContentLayout>
  );
};