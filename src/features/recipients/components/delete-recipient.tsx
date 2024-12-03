import React, { useState } from 'react';
import { useDeleteRecipients } from '../api/delete-recipients';
import Button from '@/components/ui/button';
import { useNotifications } from '@/components/ui/notifications';
import { Trash2Icon } from 'lucide-react';
import { ConfirmationDialog } from '@/components/ui/dialog';

type DeleteRecipientsProps = {
  recipientIds: number[];
};

export const DeleteRecipienties: React.FC<DeleteRecipientsProps> = ({
  recipientIds,
}) => {
  const { addNotification } = useNotifications();
  const [isDialogClose, setIsDialogClose] = useState(false);
  const deleteRecipientiesMutation = useDeleteRecipients({
    mutationConfig: {
      onSuccess: () => {
        addNotification({
          type: 'success',
          title: 'Người nhận đã xóa thành công',
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
    deleteRecipientiesMutation.mutate(recipientIds);
  };

  return (
    <ConfirmationDialog
      icon="danger"
      title="Delete User"
      body="Bạn có chắc muốn xóa các người nhận này không?"
      triggerButton={
        <Button buttonVariant="outlined">
          <Trash2Icon className="text-danger h-5 w-5" />
        </Button>
      }
      isDone={isDialogClose}
      confirmButton={
        <Button
          isLoading={deleteRecipientiesMutation.isPending}
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
