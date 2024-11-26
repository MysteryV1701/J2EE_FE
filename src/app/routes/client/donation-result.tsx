import { ContentLayout } from '@/components/layouts';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { DonationResultView } from '@/features/donation/components/donation-result-view';
import { useSearchParams } from 'react-router-dom';

export const DonationResultRoute = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get('vnp_ResponseCode') as string;
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
    <ContentLayout title="DonationResult" description="Dann Charity">
      <Breadcrumb items={breadcrumbs} className="mt-8" />
      <DonationResultView code={code} />
    </ContentLayout>
  );
};
