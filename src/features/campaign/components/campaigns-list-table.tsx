/* eslint-disable @typescript-eslint/no-explicit-any */
import { Spinner } from '@/components/ui/spinner';
import { Table } from '@/components/ui/table';
import { formatDate } from '@/helpers/utils';
import { useCampaigns } from '../api/get-campaigns';

import { useEffect, useState } from 'react';
import { cn } from '@/helpers/cn';
import { CAMPAIGNSTATUS } from '@/types/enum';
import { UpdateCampaign } from './update-campaign';
import { Pagination } from '@/components/ui/pagination';
import {
  format,
  startOfWeek,
  subMonths,
  addMonths,
} from 'date-fns';
import { Input, Select } from '@/components/ui/form';
import { useCategories } from '@/features/categories/api/get-categories';
import { useNotifications } from '@/components/ui/notifications';

export const CampaignListTable = () => {
  const [page, setPage] = useState(0);
  const { addNotification } = useNotifications();
  const [formValues, setFormValues] = useState({
    categoryId: '',
    status: CAMPAIGNSTATUS.APPROVED,
    startDate: format(
      startOfWeek(subMonths(new Date(), 12), { weekStartsOn: 1 }),
      'yyyy-MM-dd',
    ),
    endDate: format(addMonths(new Date(), 2), 'yyyy-MM-dd'),
  });
  const [pageNumberLimit, setPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const campaignQuery = useCampaigns({
    page,
    status: formValues.status || undefined,
    categoryId: Number(formValues.categoryId) || undefined,
    startDate: `${formValues.startDate} 00:00:00`,
    endDate: `${formValues.endDate} 00:00:00`,
  });
  const categories = useCategories({ page: 0 });
  const handleChange = (field: string, value: any) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    setPageNumberLimit(campaignQuery.data?.totalPages || 5);
    setMaxPageNumberLimit(campaignQuery.data?.totalPages || 5);
  }, [campaignQuery.data]);

  useEffect(() => {
    const startDate = formValues.startDate;
    const endDate = formValues.endDate;
    if (endDate < startDate) {
      addNotification({
        type: 'danger',
        title: 'Error',
        message: 'Ngày kết thúc phải lớn hơn ngày bắt đầu',
      });
      return;
    }
  }, [formValues, addNotification]);

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
  if (!campaigns) return null;

  const statusOptions = [
    { label: 'Đã duyệt', value: CAMPAIGNSTATUS.APPROVED },
    { label: 'Đang chờ', value: CAMPAIGNSTATUS.PENDING },
    { label: 'Đã hoàn thành', value: CAMPAIGNSTATUS.COMPLETED },
    { label: 'Bị từ chối', value: CAMPAIGNSTATUS.REJECTED },
  ];
  const categoryOptions = [
    { label: 'Tất cả', value: 0 },
    ...(categories.data?.data.map((item) => ({
      label: item.name,
      value: item.id,
    })) || []),
  ];
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row gap-4 justify-end">
        <Input
          className="w-full"
          label="Ngày bắt đầu"
          type="date"
          value={formValues.startDate}
          registration={{
            onChange: async (e) => {
              handleChange('startDate', e.target.value);
              return true;
            },
          }}
        />
        <Input
          className="w-full"
          label="Ngày kết thúc"
          type="date"
          value={formValues.endDate}
          registration={{
            onChange: async (e) => {
              handleChange('endDate', e.target.value);
              return true;
            },
          }}
        />
        <Select
          className="w-full border border-gray-400 rounded-md"
          label="Thể loại chiến dịch"
          options={categoryOptions}
          defaultValue={Number(formValues.categoryId)}
          registration={{
            onChange: async (e) => {
              handleChange('categoryId', e.target.value);
              return true;
            },
          }}
        />
        <Select
          className="w-full border border-gray-400 rounded-md"
          label="Trạng thái"
          options={statusOptions}
          defaultValue={Number(formValues.status)}
          registration={{
            onChange: async (e) => {
              handleChange('status', e.target.value);
              return true;
            },
          }}
        />
      </div>
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
                <span>{Math.floor((currentAmount / targetAmount) * 100)}%</span>
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
            field: 'actions',
            Cell({ entry: { code } }) {
              return (
                <div className="flex gap-2">
                  <UpdateCampaign code={code} />
                </div>
              );
            },
          },
        ]}
      />
      {campaignQuery.isError && <div>Failed to load data</div>}
      {campaignQuery.data?.totalPages !== 0 && (
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
