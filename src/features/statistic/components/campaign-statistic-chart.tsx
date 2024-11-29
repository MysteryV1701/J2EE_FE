import React, { useEffect, useState } from 'react';
import { useCampaignStatistic } from '../api/get-campaign-statistic';
import { StatisticBarChart } from './chart-bar';
import { Select } from '@/components/ui/form';
import Button from '@/components/ui/button';
import { useNotifications } from '@/components/ui/notifications';
import { CAMPAIGNSTATUS } from '@/types/enum';
import { useCategories } from '@/features/categories/api/get-categories';
import { Input } from '@/components/ui/form';
import { differenceInMonths, format, subMonths } from 'date-fns';
import ExportStatisticButton from './export-statistic';

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

  useEffect(() => {
    refetch();
  }, []);

  const handleSubmit = () => {

    const startDate = formValues.startDate
    const endDate = formValues.endDate;

    if (endDate < startDate) {
      addNotification({
        type: 'error',
        title: 'Error',
        message: 'Ngày kết thúc phải lớn hơn ngày bắt đầu',
      })
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
    console.log(formValues);
    refetch();
  };

  const statusOptions = [
    { label: 'COMPLETED', value: CAMPAIGNSTATUS.COMPLETED },
    { label: 'PENDING', value: CAMPAIGNSTATUS.PENDING },
    { label: 'APPROVED', value: CAMPAIGNSTATUS.APPROVED },
    { label: 'REJECTED', value: CAMPAIGNSTATUS.REJECTED },
  ];

  return (
    <div className="p-4">

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <Select
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
        <Input
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
      </div>
      <div className="flex justify-end space-x-4 mb-4">
        <Button onClick={handleSubmit} className="mb-4" buttonStyled={{ color: 'primary', size: 'md', rounded: 'normal' }}>Thống kê dữ liệu</Button>

        <ExportStatisticButton request={{
          categoryId: Number(formValues.categoryId),
          status: formValues.status,
          startDate: `${formValues.startDate} 00:00:00`,
          endDate: `${formValues.endDate} 00:00:00`,
        }} />
      </div>

      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && data.data.length > 0 ? <StatisticBarChart data={data.data} totalCampaigns={data.totalCampaigns} /> : <p>Không có dữ liệu phù hợp</p>}
    </div>
  );
};

export default CampaignStatisticChart;