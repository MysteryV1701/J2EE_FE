import { Spinner } from '@/components/ui/spinner';
import { useDonations } from '../api/get-donates';
import { FunctionComponent, useEffect, useState } from 'react';
import { formatPrice } from '@/helpers/utils';
import { useUser } from '@/lib/auth';
import { Pagination } from '@/components/ui/pagination';
import { Table } from '@/components/ui/table';
import { paths } from '@/config/paths';
import NO_MY_DONATION from '@/assets/images/illustration/no_my_donation.png';

export const MyDonations: FunctionComponent = () => {
  const [page, setPage] = useState(0);
  const [pageNumberLimit, setPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const user = useUser();
  const donationsQuery = useDonations({
    userId: user.data?.id,
  });

  useEffect(() => {
    setPageNumberLimit(donationsQuery.data?.totalPages || 5);
    setMaxPageNumberLimit(donationsQuery.data?.totalPages || 5);
  }, [donationsQuery.data]);
  if (donationsQuery.isLoading) {
    return (
      <div className="flex h-48 w-full items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }
  const changePage = (pageNumber: number) => {
    setPage(pageNumber);
  };

  const incrementPage = () => {
    setPage(page + 1);
    if (page + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };
  const decrementPage = () => {
    setPage(page - 1);
    if ((page - 1) % pageNumberLimit === 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
    if (page - 1 === 0) {
      return null;
    }
  };
  const donations = donationsQuery?.data?.data;

  if (!donations || donations.length === 0) {
    return (
      <div className="flex flex-col gap-4 my-8 min-h-[20rem] text-center">
        <div className="w-full h-[20rem]">
          <img
            src={NO_MY_DONATION}
            alt=""
            className="w-full h-full object-contain"
          />
        </div>
        <p className="font-dancing font-semibold text-2xl text-secondary-700">
          Hiện tại bạn chưa quyên góp cho chiến dịch nào của chúng tôi.{' '}
          <br></br> Hãy chung tay cùng chúng tôi
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 my-8">
      <Table
        data={donations}
        columns={[
          {
            title: 'Chiến dịch',
            field: 'campaignName',
          },
          {
            title: 'Trạng thái',
            field: 'isPaid',
            Cell({ entry: { isPaid } }) {
              return isPaid === true ? (
                <span className="font-semibold text-success">
                  Thanh toán thành công
                </span>
              ) : (
                <span className="font-semibold text-danger">
                  Thanh toán thất bại
                </span>
              );
            },
          },
          {
            title: 'Số tiền',
            field: 'amount',
            className: 'text-start',
            Cell({ entry: { amount } }) {
              return <span>{formatPrice(amount)}</span>;
            },
          },
          {
            title: 'Đường dẫn tới chiến dịch',
            field: 'campaignId',
            className: 'text-center',
            Cell({ entry: { campaignCode } }) {
              return (
                <a
                  href={paths.campaign.getHref(campaignCode)}
                  className="text-secondary-600 hover:underline font-semibold transition duration-500"
                >
                  Đường dẫn tới chiến dịch
                </a>
              );
            },
          },
        ]}
      />
      {(donationsQuery?.data?.totalPages ?? 0) > 1 && (
        <Pagination
          totalPages={donationsQuery.data?.totalPages || 5}
          pageSize={donationsQuery.data?.size || 5}
          page={page}
          changePage={changePage}
          incrementPage={incrementPage}
          decrementPage={decrementPage}
          minPageNumberLimit={minPageNumberLimit}
          maxPageNumberLimit={maxPageNumberLimit}
        />
      )}
    </div>
  );
};
