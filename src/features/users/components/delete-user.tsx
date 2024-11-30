import Button from '@/components/ui/button';
import { ConfirmationDialog } from '@/components/ui/dialog';
import { useNotifications } from '@/components/ui/notifications';
import { useUser } from '@/lib/auth';
import { TrashIcon } from 'lucide-react';

import { useDeleteUser } from '../api/delete-user';

type DeleteUserProps = {
  id: number;
};

export const DeleteUser = ({ id }: DeleteUserProps) => {
  const user = useUser();
  const { addNotification } = useNotifications();
  const deleteUserMutation = useDeleteUser({
    mutationConfig: {
      onSuccess: () => {
        addNotification({
          type: 'success',
          title: 'User Deleted',
        });
      },
    },
  });

  if (user.data?.id === id) return null;

  return (
    <ConfirmationDialog
      icon="danger"
      title="Delete User"
      body="Are you sure you want to delete this user?"
      triggerButton={
        <Button buttonVariant="outlined">
          <TrashIcon className="size-5 text-danger-700" />
        </Button>
      }
      confirmButton={
        <Button
          isLoading={deleteUserMutation.isPending}
          type="button"
          buttonVariant="outlined"
          onClick={() => deleteUserMutation.mutate({ userId: id })}
        >
          Delete User
        </Button>
      }
    />
  );
};
