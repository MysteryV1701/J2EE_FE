import { ContentLayout } from '@/components/layouts';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { paths } from '@/config/paths';
import { MyDonations } from '@/features/donation/components/my-donations';

export const DonationsRoute = () => {
  const breadcrumbs = [
    {
      to: paths.home.path,
      title: 'Trang chủ',
      name: 'Trang chủ',
      url: paths.home.path,
    },
    {
      to: paths.donations.path,
      title: 'Lịch sử quyên góp của tôi',
      name: 'Lịch sử quyên góp của tôi',
      url: paths.donations.path,
    },
  ];
  return (
    <ContentLayout title="Donation Page" description="Dann Charity">
      <Breadcrumb items={breadcrumbs} className="mt-8" />
      <div className="mt-8 flex flex-col gap-2 font-nunito">
        <div className="flex items-center gap-2">
          <span className="w-fit-content font-dancing text-primary font-semibold text-2xl relative ">
            Cảm ơn bạn đã tham gia quyên góp
          </span>
          <span className="w-32 h-[1px] bg-primary mt-3 md:block hidden"></span>
        </div>
        <h1
          title="Help many children need to help"
          className="text-gray-800 font-semibold text-3xl w-1/2"
        >
          Lịch sử quyên góp
        </h1>
      </div>
      <MyDonations />
    </ContentLayout>
  );
};
