import { Campaign } from '@/types/api';
import { FunctionComponent } from 'react';
import CampaginCard from './campagin-card';

interface CampaignContainerProps {
  campaigns: Campaign[];
}

const CampignContainer: FunctionComponent<CampaignContainerProps> = (props) => {
  return (
    <div className="grid sm:grid-cols-2 xxl:grid-cols-6 lg:grid-cols-3 grid-cols-1 gap-8 mt-8">
      {props.campaigns.map((campagin) => {
        return <CampaginCard {...campagin} key={campagin.id}></CampaginCard>;
      })}
    </div>
  );
};

export default CampignContainer;
