import { ContentLayout } from '@/components/layouts';
import { getCampaignsQueryOptions } from '@/features/campaign/api/get-campaigns';
import { CampaignListTable } from '@/features/campaign/components/campaigns-list-table';
import { QueryClient } from '@tanstack/react-query';
import { LoaderFunctionArgs } from 'react-router-dom';

export const campaignsLoader =
  (queryClient: QueryClient) =>
  async ({ request }: LoaderFunctionArgs) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page') || 0);
    const query = getCampaignsQueryOptions({ page });

    return (
      queryClient.getQueryData(query.queryKey) ??
      (await queryClient.fetchQuery(query))
    );
  };

export const CampaignsRoute = () => {
  return (
    <ContentLayout
      title="Chiến dịch quyên góp"
      description="Dann Charity"
      isDashboard
    >
      <CampaignListTable />
    </ContentLayout>
  );
};
