import { ContentLayout } from '@/components/layouts';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { paths } from '@/config/paths';
import { CreateCampaign } from '@/features/campaign/components/create-campaign';
import { MyCampaignListTable } from '@/features/campaign/components/my-campaign-view';

export const MyCampaignsRoute = () => {
  const breadcrumbs = [
    {
      to: paths.home.path,
      title: 'Trang chủ',
      name: 'Trang chủ',
      url: paths.home.path,
    },
    {
      to: paths.my_campaign.path,
      title: 'Chiến Dịch Của Tôi',
      name: 'Chiến Dịch Của Tôi',
      url: paths.my_campaign.path,
    },
  ];
  return (
    <ContentLayout title="My Campaign Page" description="Dann Charity">
      <Breadcrumb items={breadcrumbs} className="mt-8" />
      <div className="mt-8 flex flex-col gap-2 font-nunito">
        <div className="flex items-center gap-2">
          <span className="w-fit-content font-dancing text-primary font-semibold text-2xl relative ">
            Nơi chung tay kết nối hoàn cảnh khó khăn của sinh viên Đại Học với
            các nhà hảo tâm
          </span>
          <span className="w-32 h-[1px] bg-primary mt-3 md:block hidden"></span>
        </div>
        <h1
          title="Help many children need to help"
          className="text-gray-800 font-semibold text-3xl w-1/2"
        >
          Các chiến dịch gây quỹ của tôi
        </h1>
        <div className="flex md:flex-row flex-col justify-center items-end">
          <span className="text-gray-600 text-base w-1/2 flex-1">
            Nếu bạn là một sinh viên Đại Học và đang gặp khó khăn về tài chính
            hoặc bạn là một nhà hảo tâm muốn giúp đỡ các sinh viên Đại Học có
            hoàn cảnh khó khăn, hãy kết nối với chúng tôi để chúng tôi giúp bạn.
            (Các thông tin cần phải được xác thực trước khi được đưa vào quyên
            góp nên sẽ mất một thời gian để xác thực thông tin)
          </span>
          <div className="flex-1 flex gap-2 justify-end">
            <CreateCampaign />
          </div>
        </div>
      </div>
      <MyCampaignListTable />
    </ContentLayout>
  );
};
