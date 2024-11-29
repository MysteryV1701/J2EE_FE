/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { useCampaignStatistic } from '../api/get-campaign-statistic';
import { StatisticBarChart } from './chart-bar';
import { Select } from '@/components/ui/form';
import { useNotifications } from '@/components/ui/notifications';
import { CAMPAIGNSTATUS } from '@/types/enum';
import { useCategories } from '@/features/categories/api/get-categories';
import { Input } from '@/components/ui/form';
import { differenceInMonths, format, subMonths } from 'date-fns';
import ExportStatisticButton from './export-statistic';
import { Table } from '@/components/ui/table';
import { formatDate } from '@/helpers/utils';
import { cn } from '@/helpers/cn';

const CampaignStatisticChart = () => {
  const { addNotification } = useNotifications();
  const categories = useCategories({ page: 0 });

  const defaultEndDate = new Date();
  const defaultStartDate = subMonths(defaultEndDate, 12);

  const [formValues, setFormValues] = useState({
    categoryId: 1,
    status: CAMPAIGNSTATUS.COMPLETED,
    startDate: format(defaultStartDate, 'yyyy-MM-dd'),
    endDate: format(defaultEndDate, 'yyyy-MM-dd'),
  });

  const handleChange = (field: string, value: any) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  const { data, isLoading, error, refetch } = useCampaignStatistic({
    request: {
      categoryId: Number(formValues.categoryId),
      status: formValues.status,
      startDate: `${formValues.startDate} 00:00:00`,
      endDate: `${formValues.endDate} 00:00:00`,
    },
    queryConfig: {
      enabled: false,
    },
  });
  const tableData = data?.data;

  useEffect(() => {
    const startDate = formValues.startDate;
    const endDate = formValues.endDate;

    if (endDate < startDate) {
      addNotification({
        type: 'error',
        title: 'Error',
        message: 'Ngày kết thúc phải lớn hơn ngày bắt đầu',
      });
      return;
    }

    if (differenceInMonths(endDate, startDate) > 12) {
      addNotification({
        type: 'error',
        title: 'Error',
        message: 'Khoảng thời gian không được quá 12 tháng',
      });
      return;
    }

    if (!formValues.categoryId) {
      addNotification({
        type: 'error',
        title: 'Error',
        message: 'Category ID is required',
      });
      return;
    }
    refetch();
  }, [formValues, refetch, addNotification]);

  const statusOptions = [
    { label: 'Đã hoàn thành', value: CAMPAIGNSTATUS.COMPLETED },
    { label: 'Bị từ chối', value: CAMPAIGNSTATUS.REJECTED },
  ];

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <Input
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
          label="Thể loại chiến dịch"
          options={
            categories.data?.data.map((item) => ({
              label: item.name,
              value: item.id,
            })) || []
          }
          defaultValue={Number(formValues.categoryId)}
          registration={{
            onChange: async (e) => {
              handleChange('categoryId', e.target.value);
              return true;
            },
          }}
        />
        <Select
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
      <div className="flex justify-end space-x-4 mb-4">
        <ExportStatisticButton
          request={{
            categoryId: Number(formValues.categoryId),
            status: formValues.status,
            startDate: `${formValues.startDate} 00:00:00`,
            endDate: `${formValues.endDate} 00:00:00`,
          }}
        />
      </div>

      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && data.data.length > 0 ? (
        <StatisticBarChart
          data={tableData || undefined}
          totalCampaigns={data.totalCampaigns}
        />
      ) : (
        <p>Không có dữ liệu phù hợp</p>
      )}

      <Table
        data={tableData || []}
        columns={[
          {
            title: 'Tên chiến dịch',
            field: 'name',
            Cell({ entry: { campaigns } }) {
              return <span>{campaigns.name}</span>;
            },
          },
          {
            title: 'Người tạo',
            field: 'owner',
          },
          {
            title: 'Số tiền mục tiêu',
            field: 'targetAmount',
            Cell({ entry: { campaigns } }) {
              return <span>{campaigns.targetAmount}</span>;
            },
          },
          {
            title: 'Số tiền hiện tại',
            field: 'currentAmount',
            Cell({ entry: { campaigns } }) {
              return <span>{campaigns.currentAmount}</span>;
            },
          },
          {
            title: 'Ngày bắt đầu',
            field: 'startDate',
            className: 'text-center',
            Cell({ entry: { campaigns } }) {
              return <span>{formatDate(campaigns.startDate)}</span>;
            },
          },
          {
            title: 'Ngày kết thúc',
            field: 'endDate',
            className: 'text-center',
            Cell({ entry: { campaigns } }) {
              return <span>{formatDate(campaigns.endDate)}</span>;
            },
          },
          {
            title: 'Trạng thái',
            field: 'status',
            className: 'text-center font-semibold',
            Cell({ entry: { campaigns } }) {
              const statusColor =
                campaigns.status === CAMPAIGNSTATUS.APPROVED
                  ? 'text-success'
                  : campaigns.status === CAMPAIGNSTATUS.REJECTED
                    ? 'text-danger'
                    : 'text-default';

              return (
                <span className={cn(statusColor)}>{campaigns.status}</span>
              );
            },
          },
          {
            title: 'Số lượt quyên góp',
            field: 'totalDonations',
            Cell({ entry: { totalDonations } }) {
              return <span>{totalDonations}</span>;
            },
          },
        ]}
      />
    </div>
  );
};

export default CampaignStatisticChart;
