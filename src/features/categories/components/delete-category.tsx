import Button from '@/components/ui/button';
import { ConfirmationDialog } from '@/components/ui/dialog';
import { useNotifications } from '@/components/ui/notifications';
import { useCategory } from '../api/get-category';

import { useDeleteCategory } from '../api/delete-categories';

type DeleteCategoryProps = {
  id: number;
};

export const DeleteCategory = ({ id }: DeleteCategoryProps) => {
  const category = useCategory({ id });
  const { addNotification } = useNotifications();
  const deleteCategoryMutation = useDeleteCategory({
    mutationConfig: {
      onSuccess: () => {
        addNotification({
          type: 'success',
          title: 'Category Deleted',
        });
      },
    },
  });

  if (category.data?.data.id === id) return null;

  return (
    <ConfirmationDialog
      icon="danger"
      title="Delete Category"
      body="Are you sure you want to delete this Category?"
      triggerButton={<Button buttonVariant="outlined">Delete</Button>}
      confirmButton={
        <Button
          isLoading={deleteCategoryMutation.isPending}
          type="button"
          buttonVariant="outlined"
          onClick={() => deleteCategoryMutation.mutate({ categoryId: id })}
        >
          Delete Category
        </Button>
      }
    />
  );
};
