import { Campaign } from '@/types/api';
import { FunctionComponent } from 'react';
import { CampaignCard } from './campaign-card';

interface CampaignContainerProps {
  campaigns: Campaign[];
}

export const CampaignContainer: FunctionComponent<CampaignContainerProps> = (
  props,
) => {
  return (
    <div className="grid sm:grid-cols-2 xxl:grid-cols-6 lg:grid-cols-3 grid-cols-1 gap-8 mt-8 min-h-screen">
      {props.campaigns.map((campaign) => {
        return <CampaignCard {...campaign} key={campaign.id}></CampaignCard>;
      })}
    </div>
  );
};
