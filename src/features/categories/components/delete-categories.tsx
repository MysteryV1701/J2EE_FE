import React, { useState } from 'react';
import { useDeleteCategories } from '../api/delete-categories';
import Button from '@/components/ui/button';
import { useNotifications } from '@/components/ui/notifications';
import { Trash2Icon } from 'lucide-react';
import { ConfirmationDialog } from '@/components/ui/dialog';

type DeleteCategoryProps = {
  categoryIds: number[];
};

export const DeleteCategories: React.FC<DeleteCategoryProps> = ({ categoryIds }) => {
  const { addNotification } = useNotifications();
  const [isDialogClose, setIsDialogClose] = useState(false);
  
  const deleteCategoriesMutation = useDeleteCategories({
    mutationConfig: {
      onSuccess: () => {
        addNotification({
          type: 'success',
          title: 'Category Deleted',
        });
        setIsDialogClose(true);
      },
      onError: (error) => {
        addNotification({
          type: 'error',
          title: 'Error',
          message: error.message,
        });
      },
    },
  });

  const handleDelete = () => {
    deleteCategoriesMutation.mutate(categoryIds);
  };

  return (
    <ConfirmationDialog
      icon="danger"
      title="Delete Categories"
      body="Bạn có chắc muốn xóa các loại từ thiện đã chọn không?"
      triggerButton={
        <Button buttonVariant="outlined">
          <Trash2Icon className="text-danger h-5 w-5" />
        </Button>
      }
      isDone={isDialogClose}
      confirmButton={
        <Button
          isLoading={deleteCategoriesMutation.isPending}
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