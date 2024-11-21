import { Spinner } from '@/components/ui/spinner';
import CampaginContainer from '@/components/ui/card/campaign-container';

import { useCampaigns } from '../api/get-campaigns';

export const CampaignListGird = () => {
  const campaignQuery = useCampaigns();

  if (campaignQuery.isLoading) {
    return (
      <div className="flex h-48 w-full items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  const campaigns = campaignQuery.data?.data;

  if (!campaigns) return null;

  return <CampaginContainer campaigns={campaigns}></CampaginContainer>;
};
