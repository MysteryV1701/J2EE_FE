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
    dataType: 'campaign',
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

  console.log(data?.data);


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

  const dataTypeOptions = [
    { label: 'Campaigns', value: 'campaign' },
    { label: 'Donations', value: 'donations' },
  ];

  return (
    <div className="p-4">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <Input
          className="w-full"
            label="Ngày bắt đầu"
            type='date'
            value={formValues.startDate}
            registration={{
              onChange: async (e) => {
                handleChange('startDate', e.target.value);
                return true;
              }
            }}
          />
          <Input
          className="w-full"
            label="Ngày kết thúc"
            type='date'
            value={formValues.endDate}
            registration={{
              onChange: async (e) => {
                handleChange('endDate', e.target.value);
                return true;
              }
            }}
          />
          <Select
            className="w-full"
            label="Thể loại chiến dịch"
            options={categories.data?.data.map((item) => ({
              label: item.name,
              value: item.id,
            })) || []}
            defaultValue={Number(formValues.categoryId)}
            registration={{
              onChange: async (e) => {
                handleChange('categoryId', e.target.value);
                return true;
              },
            }}
          />
          <Select
          className="w-full"
            label="Trạng thái"
            options={statusOptions}
            defaultValue={Number(formValues.status)}
            registration={{
              onChange: async (e) => {
                handleChange('status', e.target.value);
                return true;
              }
            }}
          />
          <Select
          label="Loại dữ liệu"
          options={dataTypeOptions}
          defaultValue={Number(formValues.dataType)}
          registration={{
            onChange: async (e) => {
              handleChange('dataType', e.target.value);
              return true;
            },
          }}
          className="w-full"
        />
      </div>
      <div className="flex justify-end space-x-4 mb-4">
        <ExportStatisticButton request={{
          categoryId: Number(formValues.categoryId),
          status: formValues.status,
          startDate: `${formValues.startDate} 00:00:00`,
          endDate: `${formValues.endDate} 00:00:00`,
        }} />
      </div>

      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && data.data.length > 0 ? <StatisticBarChart data={data.data} totalCampaigns={data.totalCampaigns} dataType={formValues.dataType}/> : <p>Không có dữ liệu phù hợp</p>}

      <Table
        data={data?.data || []}
        columns={[
          {
            title: 'Tên chiến dịch',
            field: 'campaigns.name',
          },
          {
            title: 'Người tạo',
            field: 'owner',
          },
          {
            title: 'Số tiền mục tiêu',
            field: 'campaigns.targetAmount',
          },
          {
            title: 'Số tiền hiện tại',
            field: 'currentAmount',
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
            title: 'Trạng thái',
            field: 'status',
            className: 'text-center font-semibold',
            Cell({ entry: { status } }) {
              const statusColor =
                status === CAMPAIGNSTATUS.APPROVED
                  ? 'text-success'
                  : status === CAMPAIGNSTATUS.REJECTED
                    ? 'text-danger'
                    : 'text-default';

              return <span className={cn(statusColor)}>{status}</span>;
            },
          },
          {
            title: 'Số lượt quyên góp',
            field: 'totalDonations',
          },
        ]}
      />
    </div>
  );
};

export default CampaignStatisticChart;