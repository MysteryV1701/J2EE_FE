import { Pen } from 'lucide-react';

import Button from '@/components/ui/button';
import { Form, FormDrawer, Input, Label, Textarea } from '@/components/ui/form';
import { useNotifications } from '@/components/ui/notifications';
import { Authorization } from '@/lib/authorization';
import { ROLES } from '@/types/enum';

import { useCampaign } from '../api/get-campaign';
import {
  updateCampaignInputSchema,
  useUpdateCampaign,
} from '../api/update-campaign';
import { MDPreview } from '@/components/ui/md-preview';
import { FunctionComponent, useState } from 'react';

type UpdateCampaignProps = {
  code: string;
};

export const UpdateCampaign: FunctionComponent<UpdateCampaignProps> = ({
  code,
}) => {
  const { addNotification } = useNotifications();
  const [isPreview, setIsPreview] = useState(false);
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
            form="update-campaign"
            type="submit"
            buttonVariant="filled"
            buttonStyled={{ color: 'primary', size: 'md', rounded: 'normal' }}
            isLoading={updateCampaignMutation.isPending}
          >
            Cập nhật
          </Button>
        }
      >
        <Form
          id="update-campaign"
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
          {({ register, formState, watch }) => {
            const descriptionValue = watch('description');
            return (
              <div className="py-4 flex-1 flex flex-col gap-4">
                <Input
                  label="Tên chiến dịch"
                  error={formState.errors['name']}
                  registration={register('name')}
                />
                {!isPreview && (
                  <Textarea
                    label="Mô tả"
                    button={
                      <Button
                        buttonVariant="text"
                        buttonStyled={{ color: 'secondary' }}
                        onClick={() => setIsPreview((prev) => !prev)}
                      >
                        Tham khảo
                      </Button>
                    }
                    error={formState.errors['description']}
                    registration={register('description')}
                  />
                )}

                {isPreview && (
                  <div>
                    <div className="flex flex-row justify-between items-center">
                      <Label>Mô tả xem trước</Label>
                      <Button
                        buttonVariant="text"
                        buttonStyled={{
                          color: 'secondary',
                        }}
                        onClick={() => setIsPreview(false)}
                      >
                        Sửa lại
                      </Button>
                    </div>
                    <div className="border border-gray-200 rounded-md mt-2">
                      <MDPreview value={descriptionValue} />
                    </div>
                  </div>
                )}
              </div>
            );
          }}
        </Form>
      </FormDrawer>
    </Authorization>
  );
};
