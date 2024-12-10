import React from 'react';
import Button from '@/components/ui/button';
import { exportStatistic } from '../api/export-campaign-donation';
import { useNotifications } from '@/components/ui/notifications';

const ExportDonationsButton: React.FC<{ request: {campaignId:number} }> = ({
  request,
}) => {
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
        type: 'danger',
        title: 'Error',
        message: 'Failed to export file',
      });
      console.log('Error:', error);
    }
  };

  return (
    <Button
      onClick={handleExport}
      className="mb-4 w-fit"
      buttonStyled={{ color: 'primary', size: 'md', rounded: 'normal' }}
    >
      Xuất file Excel
    </Button>
  );
};

export default ExportDonationsButton;
