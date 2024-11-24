import { Spinner } from '@/components/ui/spinner';
import { FunctionComponent } from 'react';
import { useCampaign } from '../api/get-campaign';

export interface CampaignDetailProps {
  campaignId: number;
}

export const CampaignView: FunctionComponent<CampaignDetailProps> = (props) => {
  const campaignQuery = useCampaign({
    campaignId: props.campaignId,
    queryConfig: {},
  });

  if (campaignQuery.isLoading) {
    return (
      <div className="flex h-48 w-full items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }
  const campaigns = campaignQuery.data;

  if (!campaigns) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        <div className="h-64 w-full">
          <img
            src="/path/to/illustration.png"
            alt="No campaigns available"
            className="h-full w-full object-contain"
          />
        </div>
      </div>
    );
  }

  return <div className="mt-8 min-h-screen flex flex-col gap-4"></div>;
};
