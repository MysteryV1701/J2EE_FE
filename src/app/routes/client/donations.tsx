import { ContentLayout } from '@/components/layouts';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { getCampaignsQueryOptions } from '@/features/campaign/api/get-campaigns';
import { CampaignListGird } from '@/features/campaign/components/campaigns-list-grid';
import { QueryClient } from '@tanstack/react-query';
import { LoaderFunctionArgs } from 'react-router-dom';

export const campaignsLoader =
  (queryClient: QueryClient) =>
  async ({ request }: LoaderFunctionArgs) => {
    const url = new URL(request.url);

    const page = Number(url.searchParams.get('page') || 1);

    const query = getCampaignsQueryOptions({ page });

    return (
      queryClient.getQueryData(query.queryKey) ??
      (await queryClient.fetchQuery(query))
    );
  };

export const CampaignsRoute = () => {
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
            Nơi chung tay góp sức thiện nguyện
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
      <CampaignListGird pagination={true} />
    </ContentLayout>
  );
};
