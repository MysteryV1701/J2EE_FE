import { Spinner } from '@/components/ui/spinner';
import { useDonations } from '../api/get-donates';
import { FunctionComponent } from 'react';
import { formatPrice } from '@/helpers/utils';

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
      <div className="px-4 py-2 border border-secondary-600 rounded-xl text-secondary-800">
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

  return (
    <div className="px-4 py-2 border border-secondary-600 rounded-xl text-secondary-800">
      <h6 className="text-lg font-semibold mb-2">Danh sách người ủng hộ</h6>
      <div className="flex flex-col gap-2">
        {donations.map((donates) => {
          return (
            <div className="flex flex-row justify-between">
              <div className="text-base font-semibold">
                {donates.name ?? 'Ẩn danh'}
              </div>
              <div className="text-base ">{formatPrice(donates.amount)}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
