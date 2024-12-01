import { Spinner } from '@/components/ui/spinner';
import { Table } from '@/components/ui/table';
import { formatDate } from '@/helpers/utils';
import { useCampaigns } from '../api/get-campaigns';
import { useEffect, useState } from 'react';
import { cn } from '@/helpers/cn';
import { CAMPAIGNSTATUS } from '@/types/enum';
import { useUser } from '@/lib/auth';
import { Pagination } from '@/components/ui/pagination';
import { CampaignModalView } from './campaign-modal-view';
import NO_MY_CAMPAIGN from '@/assets/images/illustration/no_my_campaign.png';

export const MyCampaignListTable = () => {
  const [page, setPage] = useState(0);
  const [pageNumberLimit, setPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);

  const user = useUser();
  const campaignQuery = useCampaigns({
    userId: user.data?.id,
    page,
  });

  useEffect(() => {
    setPageNumberLimit(campaignQuery.data?.totalPages || 5);
    setMaxPageNumberLimit(campaignQuery.data?.totalPages || 5);
  }, [campaignQuery.data]);
  if (campaignQuery.isLoading) {
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
  const campaigns = campaignQuery.data?.data;

  if (!campaigns || campaigns.length === 0)
    return (
      <div className="flex flex-col gap-4 my-8 min-h-[20rem] text-center">
        <div className="w-full h-[24rem]">
          <img
            src={NO_MY_CAMPAIGN}
            alt=""
            className="w-full h-full object-contain"
          />
        </div>
        <p className="font-dancing font-semibold text-2xl text-secondary-700">
          Hãy kết nối chúng tôi với những sinh viên khó khăn có tinh thần vươn
          lên trong học tập
        </p>
      </div>
    );

  return (
    <div className="flex flex-col gap-4 my-8 min-h-[20rem]">
      <div className="flex-1">
        <Table
          data={campaigns}
          columns={[
            {
              title: 'Tên chiến dịch',
              field: 'name',
            },
            {
              title: 'Trạng thái',
              field: 'status',
              className: 'text-center font-semibold',
              Cell({ entry: { status } }) {
                const statusColor =
                  status === CAMPAIGNSTATUS.APPROVED
                    ? 'text-success'
                    : status === CAMPAIGNSTATUS.REJECTED
                      ? 'text-danger'
                      : status === CAMPAIGNSTATUS.PENDING
                        ? 'text-warning'
                        : 'text-gray-500';

                return <span className={cn(statusColor)}>{status}</span>;
              },
            },
            {
              title: 'Quá trình',
              field: 'Progess',
              className: 'text-center min-w-20',
              Cell({ entry: { currentAmount, targetAmount } }) {
                return (
                  <span>
                    {Math.floor((currentAmount / targetAmount) * 100)}%
                  </span>
                );
              },
            },
            {
              title: 'Thuộc nhóm',
              field: 'categoryName',
              className: 'text-center',
            },
            {
              title: 'Ngày bắt đầu',
              field: 'startDate',
              className: 'text-center',
              Cell({ entry: { startDate } }) {
                return <span>{formatDate(startDate)}</span>;
              },
            },
            {
              title: 'Ngày kết thúc',
              field: 'endDate',
              className: 'text-center',
              Cell({ entry: { endDate } }) {
                return <span>{formatDate(endDate)}</span>;
              },
            },
            {
              title: '',
              field: 'code',
              className: 'text-center',
              Cell({ entry: { code } }) {
                return <CampaignModalView code={code} />;
              },
            },
          ]}
        />
      </div>

      {(campaignQuery.data?.totalPages ?? 0) > 1 && (
        <Pagination
          totalPages={campaignQuery.data?.totalPages || 5}
          pageSize={campaignQuery.data?.size || 5}
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
