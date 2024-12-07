import { Spinner } from '@/components/ui/spinner';
import { useCampaignDonations } from '../api/get-campaign-donations';
import { FunctionComponent } from 'react';
import { formatPrice } from '@/helpers/utils';
import handHeartImage from '@/assets/images/hand_heart.png';

interface DonationsProps {
  title: string;
  campaignId: number;
}

export const CampaignDonations: FunctionComponent<DonationsProps> = (props) => {
  const donationsQuery = useCampaignDonations({
    campaignId: props.campaignId,
  });

  if (donationsQuery.isLoading) {
    return (
      <div className="flex h-48 w-full items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }
  const donations = donationsQuery?.data;

  if (!donations || donations.length === 0) {
    return (
      <div className="px-4 py-2 border border-secondary-600 rounded-xl text-secondary-800 text-center">
        <div className="h-64 w-full border border-primary-100 rounded-xl">
          <img
            src={handHeartImage}
            alt="No campaigns available"
            className="h-full w-full object-contain"
          />
        </div>
        <h6 className="text-lg font-semibold mt-4 font-dancing">
          Hãy là người đầu tiên ủng hộ chiến dịch này
        </h6>
      </div>
    );
  }

  return (
    <div className="px-4 py-2 border border-gray-200 rounded-xl text-black min-h-[20rem]">
      <h6 className="text-lg font-semibold mb-2 underline">
        {props.title}
        {/* Nhà ủng hộ mới nhất */}
      </h6>
      <div className="flex flex-col gap-2 text-black">
        {donations.map((donates) => {
          const initial = !donates.isAnonymous
            ? donates.name.charAt(0).toUpperCase()
            : 'A';
          return (
            <div className="flex flex-row justify-between" key={donates.id}>
              <div className=" flex justify-start">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-500 text-white font-bold">
                  {initial}
                </div>
                <div className="px-8 text-base leading-8">
                  {!donates.isAnonymous ? donates.name : 'Ẩn danh'}
                </div>
              </div>
              <div className="text-base ">{formatPrice(donates.amount)}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
