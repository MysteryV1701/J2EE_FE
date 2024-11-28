import { QueryClient } from '@tanstack/react-query';

import { ContentLayout } from '@/components/layouts';
import { getFinancialReportsQueryOptions } from '@/features/financial-reports/api/get-financial-reports'
import { FinancialReportListTable } from '@/features/financial-reports/components/financial-reports-list-table';
import { LoaderFunctionArgs } from 'react-router-dom';

export const FinancialReportsLoader =
  (queryClient: QueryClient) =>
  async ({ request }: LoaderFunctionArgs) => {
    const url = new URL(request.url);

    const page = Number(url.searchParams.get('page') || 1);

    const query = getFinancialReportsQueryOptions({ page });

    return (
      queryClient.getQueryData(query.queryKey) ??
      (await queryClient.fetchQuery(query))
    );
  };

export const FinancialReportsRoute = () => {
  return (
    <ContentLayout title="Báo cáo tài chính" description="" isDashboard>
        <FinancialReportListTable />
    </ContentLayout>
  );
};