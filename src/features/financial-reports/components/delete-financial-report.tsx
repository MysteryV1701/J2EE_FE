import React, { useState } from 'react';
import { useDeleteFinancialReports } from '../api/delete-financial-reports';
import Button from '@/components/ui/button';
import { useNotifications } from '@/components/ui/notifications';
import { Trash2Icon } from 'lucide-react';
import { ConfirmationDialog } from '@/components/ui/dialog';

type DeleteFinancialReportsProps = {
  financialReportIds: number[];
};

export const DeleteFinancialReports: React.FC<DeleteFinancialReportsProps> = ({
  financialReportIds,
}) => {
  const { addNotification } = useNotifications();
  const [isDialogClose, setIsDialogClose] = useState(false);
  const deleteFinancialReportiesMutation = useDeleteFinancialReports({
    mutationConfig: {
      onSuccess: () => {
        addNotification({
          type: 'success',
          title: 'Báo cáo tài chính đã xóa',
        });
        setIsDialogClose(true);
      },
      onError: (error) => {
        addNotification({
          type: 'danger',
          title: 'Error',
          message: error.message,
        });
      },
    },
  });

  const handleDelete = () => {
    deleteFinancialReportiesMutation.mutate(financialReportIds);
  };

  return (
    <ConfirmationDialog
      icon="danger"
      title="Delete User"
      body="Bạn có chắc muốn xóa các báo cáo tài chính này không?"
      triggerButton={
        <Button buttonVariant="outlined">
          <Trash2Icon className="text-danger h-5 w-5" />
        </Button>
      }
      isDone={isDialogClose}
      confirmButton={
        <Button
          isLoading={deleteFinancialReportiesMutation.isPending}
          type="button"
          buttonVariant="outlined"
          onClick={handleDelete}
        >
          Delete
        </Button>
      }
    />
  );
};
