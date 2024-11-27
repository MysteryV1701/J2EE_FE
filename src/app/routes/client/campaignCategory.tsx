import { ContentLayout } from '@/components/layouts';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { paths } from '@/config/paths';
import { getCampaignsQueryOptions } from '@/features/campaign/api/get-campaigns';
import { CampaignListGird } from '@/features/campaign/components/campaigns-list-grid';
import { useCategory } from '@/features/category/api/get-category';
import { QueryClient } from '@tanstack/react-query';
import { LoaderFunctionArgs, useParams } from 'react-router-dom';

export const campaignCategoryLoader =
  (queryClient: QueryClient) =>
  async ({ params, request }: LoaderFunctionArgs) => {
    const categoryId = Number(params.id);
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page') || 0);
    const query = getCampaignsQueryOptions({ categoryId, page });
    return (
      queryClient.getQueryData(query.queryKey) ??
      (await queryClient.fetchQuery(query))
    );
  };

export const CampaignCategoryRoute = () => {
  const params = useParams();
  const categoryId = Number(params.id);
  const category = useCategory({
    id: categoryId,
  });
  console.log(category);
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
      to: paths.campaignCategories.getHref(categoryId),
      title: category.data?.name || '',
      name: category.data?.name || '',
      url: paths.campaignCategories.getHref(categoryId),
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
          Các chiến dịch có{' '}
          <q className="text-4xl font-semibold text-secondary-800 font-dancing">
            {category.data?.name}
          </q>
        </h1>
        <span className="text-gray-600 text-base w-1/2">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam totam
          laborum ipsum, possimus earum consequuntur delectus exercitationem
          cumque! Veritatis ea ab, repellendus dicta quisquam obcaecati ratione
          optio perspiciatis quod nihil.
        </span>
      </div>
      <CampaignListGird pagination={true} categoryId={category.data?.id} />
    </ContentLayout>
  );
};
