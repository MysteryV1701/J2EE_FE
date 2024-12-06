import { Spinner } from '@/components/ui/spinner';
import { useDonations } from '../api/get-donates';
import { FunctionComponent } from 'react';
import { formatPrice } from '@/helpers/utils';
import handHeartImage from '@/assets/images/hand_heart.png';

interface DonationsProps {
  campaignId: number;
}

export const Donations: FunctionComponent<DonationsProps> = (props) => {
  const donationsQuery = useDonations({
    campaignId: props.campaignId,
  });

  if (donationsQuery.isLoading) {
    return (
      <div className="flex h-48 w-full items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }
  const donations = donationsQuery?.data?.data;

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
    <div className="px-4 py-2 border border-secondary-600 rounded-xl text-secondary-800 min-h-[20rem]">
      <h6 className="text-lg font-semibold mb-2 underline">
        Danh sách người ủng hộ
      </h6>
      <div className="flex flex-col gap-2 text-secondary-900">
        {donations.map((donates) => {
          return (
            <div className="flex flex-row justify-between" key={donates.id}>
              <div className="text-base font-semibold">
                {donates.isAnonymous ? donates.name : 'Ẩn danh'}
              </div>
              <div className="text-base ">{formatPrice(donates.amount)}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
