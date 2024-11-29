import React from 'react';
import Button from '@/components/ui/button';
import { exportStatistic } from '../api/export-statistic';
import { StatisticRequest } from '@/types/api';
import { useNotifications } from '@/components/ui/notifications';

const ExportStatisticButton: React.FC<{ request: StatisticRequest }> = ({ request }) => {
  const { addNotification } = useNotifications();

  const handleExport = async () => {
    try {
      await exportStatistic(request);
      addNotification({
        type: 'success',
        title: 'Success',
        message: 'File exported successfully',
      });
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Error',
        message: 'Failed to export file',
      });
      console.log('Error:', error);
      
    }
  };

  return (
    <Button onClick={handleExport} className="mb-4" buttonStyled={{ color: 'primary', size: 'md', rounded: 'normal' }}>
      Xuất file Excel
    </Button>
  );
};

export default ExportStatisticButton;