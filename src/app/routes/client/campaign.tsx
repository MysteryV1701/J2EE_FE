import { ContentLayout } from '@/components/layouts';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Spinner } from '@/components/ui/spinner';
import {
  getCampaignQueryOptions,
  useCampaign,
} from '@/features/campaign/api/get-campaign';
import { CampaignView } from '@/features/campaign/components/campaign-view';
import { CampaignListGird } from '@/features/campaign/components/campaigns-list-grid';
import { QueryClient } from '@tanstack/react-query';
import { LoaderFunctionArgs, useParams } from 'react-router-dom';

export const campaignLoader =
  (queryClient: QueryClient) =>
  async ({ params }: LoaderFunctionArgs) => {
    const code = params.code as string;

    const campaignQuery = getCampaignQueryOptions(code);
    const promises = [
      queryClient.getQueryData(campaignQuery.queryKey) ??
        (await queryClient.fetchQuery(campaignQuery)),
    ] as const;
    const [campaign] = await Promise.all(promises);

    return {
      campaign,
    };
  };

export const CampaignRoute = () => {
  const params = useParams();
  const code = params.code as string;
  const campaignQuery = useCampaign({
    code,
  });

  if (campaignQuery.isLoading) {
    return (
      <div className="flex h-48 w-full items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }
  const campaign = campaignQuery?.data;

  if (!campaign) return null;

  const breadcrumbs = [
    {
      to: '/',
      title: 'Trang chủ',
      name: 'Trang chủ',
      url: '/',
    },
    {
      to: '/campaign',
      title: 'Chiến Dịch Gây Quỹ',
      name: 'Chiến Dịch Gây Quỹ',
      url: '/campaign',
    },
    {
      to: '/campaign',
      title: campaign?.category.name,
      name: campaign?.category.name,
      url: '/campaign',
    },
  ];
  return (
    <ContentLayout title="Campaign Page" description="Dann Charity">
      <Breadcrumb items={breadcrumbs} className="mt-8" />
      <CampaignView code={code} />
      <CampaignListGird size={3} pagination={false} />
    </ContentLayout>
  );
};
