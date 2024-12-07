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
import { formatDate, formatPrice } from '@/helpers/utils';
import Button from '@/components/ui/button';

const CampaignStatisticChart = () => {
  const { addNotification } = useNotifications();
  const categories = useCategories({ page: 0 });

  const defaultEndDate = new Date();
  const defaultStartDate = subMonths(defaultEndDate, 12);

  const [formValues, setFormValues] = useState({
    categoryId: '',
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
  const tableData = data?.data;

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

    if (differenceInMonths(endDate, startDate) > 12) {
      addNotification({
        type: 'danger',
        title: 'Error',
        message: 'Khoảng thời gian không được quá 12 tháng',
      });
      return;
    }

    // if (!formValues.categoryId) {
    //   addNotification({
    //     type: 'error',
    //     title: 'Error',
    //     message: 'Category ID is required',
    //   });
    //   return;
    // }
    refetch();
  }, [formValues, refetch, addNotification]);

  const statusOptions = [
    { label: 'Đã hoàn thành', value: CAMPAIGNSTATUS.COMPLETED },
    { label: 'Bị từ chối', value: CAMPAIGNSTATUS.REJECTED },
  ];

  const handleDataTypeChange = (dataType: string) => {
    handleChange('dataType', dataType);
  };

  const categoryOptions = [
    { label: 'Tất cả', value: 0 },
    ...(categories.data?.data.map((item) => ({
      label: item.name,
      value: item.id,
    })) || []),
  ];

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 p-4 mb-4 border border-gray-300 rounded-md">
        <div className="flex space-x-4 justify-start">
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
        </div>
        <div className="flex space-x-4 justify-end">
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
      </div>
      <div className="flex justify-between space-x-4 mb-4 mt-12">
        <div className="flex space-x-4">
          <Button
            className={`mb-4  ${formValues.dataType === 'campaign' ? 'bg-primary hover:bg-primary-600 text-sm py-2 px-4' : 'bg-gray-200 text-black'}`}
            onClick={() => handleDataTypeChange('campaign')}
            buttonStyled={{ color: 'primary', size: 'md', rounded: 'normal' }}
          >
            Chiến dịch
          </Button>
          <Button
            className={`mb-4  ${formValues.dataType === 'donations' ? 'bg-primary hover:bg-primary-600 text-sm py-2 px-4' : 'bg-gray-200 text-black'}`}
            onClick={() => handleDataTypeChange('donations')}
            buttonStyled={{ color: 'primary', size: 'md', rounded: 'normal' }}
          >
            Quyên góp
          </Button>
        </div>
        <div className="flex space-x-4 justify-start">
          <ExportStatisticButton
            request={{
              categoryId: Number(formValues.categoryId),
              status: formValues.status,
              startDate: `${formValues.startDate} 00:00:00`,
              endDate: `${formValues.endDate} 00:00:00`,
            }}
          />
        </div>
      </div>

      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && data.data.length > 0 ? (
        <StatisticBarChart
          data={data.data}
          totalCampaigns={data.totalCampaigns}
          dataType={formValues.dataType}
          donations={data.totalDonations}
        />
      ) : (
        <p>Không có dữ liệu phù hợp</p>
      )}
      <div className="py-8"></div>
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
            className: 'text-right px-4',
            Cell({ entry: { campaigns } }) {
              return <span>{formatPrice(campaigns.targetAmount)}</span>;
            },
          },
          {
            title: 'Số tiền hiện tại',
            field: 'currentAmount',
            className: 'text-right px-4',
            Cell({ entry: { campaigns } }) {
              return <span>{formatPrice(campaigns.currentAmount)}</span>;
            },
          },
          {
            title: 'Số lượt quyên góp',
            field: 'totalDonations',
            className: 'text-center',
            Cell({ entry: { totalDonations } }) {
              return <span>{totalDonations}</span>;
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
        ]}
      />
    </div>
  );
};

export default CampaignStatisticChart;
