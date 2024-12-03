import React, { useState } from 'react';
import { useDeleteEducations } from '../api/delete-educations';
import Button from '@/components/ui/button';
import { useNotifications } from '@/components/ui/notifications';
import { Trash2Icon } from 'lucide-react';
import { ConfirmationDialog } from '@/components/ui/dialog';

type DeleteEducationsProps = {
  educationIds: number[];
};

export const DeleteEducations: React.FC<DeleteEducationsProps> = ({
  educationIds,
}) => {
  const { addNotification } = useNotifications();
  const [isDialogClose, setIsDialogClose] = useState(false);

  const deleteEducationiesMutation = useDeleteEducations({
    mutationConfig: {
      onSuccess: () => {
        addNotification({
          type: 'success',
          title: 'Education Deleted',
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
    deleteEducationiesMutation.mutate(educationIds);
  };

  return (
    <ConfirmationDialog
      icon="danger"
      title="Delete User"
      body="Bạn có chắc muốn xóa các trường học này không?"
      triggerButton={
        <Button buttonVariant="outlined">
          <Trash2Icon className="text-danger h-5 w-5" />
        </Button>
      }
      isDone={isDialogClose}
      confirmButton={
        <Button
          isLoading={deleteEducationiesMutation.isPending}
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
