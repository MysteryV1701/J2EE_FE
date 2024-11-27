import { Spinner } from '@/components/ui/spinner';
import { Table } from '@/components/ui/table';
import { formatDate } from '@/helpers/utils';
import { useCampaigns } from '../api/get-campaigns';
import { DeleteCampaign } from './delete-campaigns';
import { useState } from 'react';
import { paths } from '@/config/paths';
import { cn } from '@/helpers/cn';
import { CAMPAIGNSTATUS } from '@/types/enum';

export const CampaignListTable = () => {
  const campaignQuery = useCampaigns({ page: 0 });
  const [page, setPage] = useState(0);
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());

  if (campaignQuery.isLoading) {
    return (
      <div className="flex h-48 w-full items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }
  const handleCheckboxChange = (id: number) => {
    setSelectedRows((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };
  const campaigns = campaignQuery.data?.data;

  if (!campaigns) return null;

  return (
    <Table
      data={campaigns}
      pagination={{
        totalPages: campaignQuery.data?.totalPages ?? 1,
        currentPage: page,
        rootUrl: paths.app.campaigns.getHref(),
      }}
      columns={[
        {
          title: (
            <input
              type="checkbox"
              onChange={(e) => {
                if (e.target.checked) {
                  const allIds = campaigns.map((campaign) => campaign.id);
                  setSelectedRows(new Set(allIds));
                } else {
                  setSelectedRows(new Set());
                }
              }}
            />
          ),
          field: 'checkbox',
          className: 'w-10 text-center',
          Cell({ entry: { id } }) {
            return (
              <input
                type="checkbox"
                checked={selectedRows.has(id)}
                onChange={() => handleCheckboxChange(id)}
              />
            );
          },
        },
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
          title: 'Sô tiền hiện tại',
          field: 'currentAmount',
          className: 'text-center',
        },
        {
          title: 'Số tiền mục tiêu',
          field: 'targetAmount',
          className: 'text-center',
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
          field: 'id',
          Cell({ entry: { id } }) {
            return <DeleteCampaign id={id} />;
          },
        },
      ]}
    />
  );
};
