import { useUser } from '@/lib/auth';
import Button from '@/components/ui/button';
import { ConfirmationDialog } from '@/components/ui/dialog';
import { useDeleteRecipient } from '../api/delete-recipient';
import { useNotifications } from '@/components/ui/notifications';

type DeleteRecipientProps = {
  id: string;
}

export const DeleteRecipient = ({ id }: DeleteRecipientProps) => {
  const user = useUser();
  const { addNotification } = useNotifications();
  const deleteRecipientMutation = useDeleteRecipient({
    mutationConfig: {
      onSuccess: () => {
        addNotification({
            type:'success',
            title: 'Recipient Deleted',
          });
      },
    },
  })

  if (user.data?.id === id) return null;

  return (
    <ConfirmationDialog
      icon="danger"
      title="Delete Recipient"
      body="Are you sure you want to delete this recipient?"
      triggerButton={<Button buttonVariant="outlined">Delete</Button>}
      confirmButton={
        <Button
          isLoading={deleteRecipientMutation.isPending}
          type="button"
          buttonVariant="outlined"
          onClick={() => deleteRecipientMutation.mutate({ recipientId: id })}
        >
          Delete Recipient
        </Button>
      }
    />
  );
};