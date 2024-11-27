import Button from '@/components/ui/button';
import { ConfirmationDialog } from '@/components/ui/dialog';
import { useNotifications } from '@/components/ui/notifications';
import { useUser } from '@/lib/auth';
import { Trash2Icon } from 'lucide-react';

import { useDeleteCampaign } from '../api/delete-campaign';

type DeleteCampaignProps = {
  id: number;
};

export const DeleteCampaign = ({ id }: DeleteCampaignProps) => {
  const user = useUser();
  const { addNotification } = useNotifications();
  const deleteCampaignMutation = useDeleteCampaign({
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
      body="Are you sure you want to delete this campaign?"
      triggerButton={
        <Button buttonVariant="outlined">
          <Trash2Icon className="text-danger h-5 w-5" />
        </Button>
      }
      confirmButton={
        <Button
          isLoading={deleteCampaignMutation.isPending}
          type="button"
          buttonVariant="outlined"
          onClick={() => deleteCampaignMutation.mutate({ campaignId: id })}
        >
          Delete
        </Button>
      }
    />
  );
};
