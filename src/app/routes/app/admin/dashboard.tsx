import { ContentLayout } from '@/components/layouts';
import CampaignStatisticChart from '@/features/statistic/components/campaign-statistic-chart';

export const DashboardRoute = () => {
  return (
    <ContentLayout
      title="Thống kê"
      description="Admin of Happly Life Site"
      isDashboard
    >
      <CampaignStatisticChart />
    </ContentLayout>
  );
};
