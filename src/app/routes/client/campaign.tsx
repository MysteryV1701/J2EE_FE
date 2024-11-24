import { ContentLayout } from '@/components/layouts';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Spinner } from '@/components/ui/spinner';
import {
  getCampaignQueryOptions,
  useCampaign,
} from '@/features/campaign/api/get-campaign';
import { CampaignView } from '@/features/campaign/components/campaign-view';
// import { getListDonationOfCampaignQueryOptions } from '@/features/donate/api/get-donates';
import { QueryClient } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import { LoaderFunctionArgs, useParams } from 'react-router-dom';

export const campaignLoader =
  (queryClient: QueryClient) =>
  async ({ params }: LoaderFunctionArgs) => {
    const campaignId = Number(params.campaignId);

    const discussionQuery = getCampaignQueryOptions(campaignId);
    // const donatesQuery = getListDonationOfCampaignQueryOptions(campaignId);

    const promises = [
      queryClient.getQueryData(discussionQuery.queryKey) ??
        (await queryClient.fetchQuery(discussionQuery)),
      // queryClient.getQueryData(donatesQuery.queryKey) ??
      //   (await queryClient.fetchInfiniteQuery(donatesQuery)),
    ] as const;

    const [campaign] = await Promise.all(promises);

    return {
      campaign,
    };
  };

export const CampaignRoute = () => {
  const params = useParams();
  const campaignId = Number(params.discussionId);
  const discussionQuery = useCampaign({
    campaignId,
  });

  if (discussionQuery.isLoading) {
    return (
      <div className="flex h-48 w-full items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  const discussion = discussionQuery.data?.data;

  if (!discussion) return null;

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
  ];
  return (
    <ContentLayout title="Campaign Page" description="Dann Charity">
      <Breadcrumb items={breadcrumbs} className="mt-8" />
      <div className="mt-8 flex flex-col gap-2 font-nunito">
        <div className="flex items-center gap-2">
          <span className="w-fit-content font-dancing text-primary font-semibold text-2xl relative ">
            Nơi chung tay góp sức thiện nghiện
          </span>
          <span className="w-32 h-[1px] bg-primary mt-3 md:block hidden"></span>
        </div>
        <h1
          title="Help many children need to help"
          className="text-gray-800 font-semibold text-3xl w-1/2"
        >
          Các chiến dịch gây quỹ
        </h1>
        <span className="text-gray-600 text-base w-1/2">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam totam
          laborum ipsum, possimus earum consequuntur delectus exercitationem
          cumque! Veritatis ea ab, repellendus dicta quisquam obcaecati ratione
          optio perspiciatis quod nihil.
        </span>
      </div>
      <CampaignView campaignId={campaignId} />
      <div className="mt-8">
        <ErrorBoundary
          fallback={
            <div>Failed to load comments. Try to refresh the page.</div>
          }
        >
          <div className=""></div>
          {/* <Donations campaignId={campaignId} /> */}
        </ErrorBoundary>
      </div>
    </ContentLayout>
  );
};
