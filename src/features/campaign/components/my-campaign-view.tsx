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
  const [status, setStatus] = useState<CAMPAIGNSTATUS | null>(null);
  const [pageNumberLimit, setPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);

  const user = useUser();
  const campaignQuery = useCampaigns({
    userId: user.data?.id,
    page,
    status: status ?? undefined,
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
      <div className="flex flex-row gap-4 justify-end">
        <select
          name="status"
          id="status"
          value={status || 'all'}
          onChange={(e) =>
            setStatus(
              e.target.value === 'all'
                ? null
                : (e.target.value as CAMPAIGNSTATUS),
            )
          }
          className="p-1 rounded-lg border border-gray-400 shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-500 overflow-hidden"
        >
          <option value="all">Tất cả</option>
          <option value={CAMPAIGNSTATUS.APPROVED}>Đã duyệt</option>
          <option value={CAMPAIGNSTATUS.COMPLETED}>Hoàn thành</option>
          <option value={CAMPAIGNSTATUS.PENDING}>Đang chờ</option>
          <option value={CAMPAIGNSTATUS.REJECTED}>Từ chối</option>
        </select>
      </div>
      <div className="flex-1">
        <Table
          data={campaigns}
          columns={[
            {
              title: 'Tên chiến dịch',
              field: 'name',
            },
            {
              title: 'Mô tả',
              field: 'description',
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
              title: 'Thời gian tạo',
              field: 'createdDate',
              className: 'text-center',
              Cell({ entry: { createdDate } }) {
                return <span>{formatDate(createdDate)}</span>;
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
