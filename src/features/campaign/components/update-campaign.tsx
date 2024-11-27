import { Pen } from 'lucide-react';

import Button from '@/components/ui/button';
import { Form, FormDrawer, Input, Textarea } from '@/components/ui/form';
import { useNotifications } from '@/components/ui/notifications';
import { Authorization } from '@/lib/authorization';
import { ROLES } from '@/types/enum';

import { useCampaign } from '../api/get-campaign';
import {
  updateCampaignInputSchema,
  useUpdateCampaign,
} from '../api/update-campaign';

type UpdateCampaignProps = {
  code: string;
};

export const UpdateCampaign = ({ code }: UpdateCampaignProps) => {
  const { addNotification } = useNotifications();
  const campaignQuery = useCampaign({ code });
  const updateCampaignMutation = useUpdateCampaign({
    mutationConfig: {
      onSuccess: () => {
        addNotification({
          type: 'success',
          title: 'Discussion Updated',
        });
      },
    },
  });

  const campaign = campaignQuery?.data;

  return (
    <Authorization allowedRoles={[ROLES.ADMIN]}>
      <FormDrawer
        isDone={updateCampaignMutation.isSuccess}
        triggerButton={
          <Button buttonVariant="outlined">
            <Pen className="size-4 text-info-700" />
          </Button>
        }
        title="Cập nhật chiến dịch"
        submitButton={
          <Button
            form="update-discussion"
            type="submit"
            buttonVariant="filled"
            buttonStyled={{ color: 'primary', size: 'md', rounded: 'normal' }}
            isLoading={updateCampaignMutation.isPending}
          >
            Submit
          </Button>
        }
      >
        <Form
          id="update-discussion"
          onSubmit={(values) => {
            updateCampaignMutation.mutate({
              data: values,
              code: campaign?.code ?? '',
            });
          }}
          options={{
            defaultValues: {
              name: campaign?.name ?? '',
              description: campaign?.description ?? '',
            },
          }}
          schema={updateCampaignInputSchema}
        >
          {({ register, formState }) => (
            <div className="py-4 flex-1">
              <Input
                label="Tên chiến dịch"
                error={formState.errors['name']}
                registration={register('name')}
              />
              <Textarea
                label="Mô tả"
                error={formState.errors['description']}
                registration={register('description')}
              />
            </div>
          )}
        </Form>
      </FormDrawer>
    </Authorization>
  );
};
