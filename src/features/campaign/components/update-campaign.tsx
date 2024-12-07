/* eslint-disable @typescript-eslint/no-explicit-any */
import { LucideFilePenLine } from 'lucide-react';

import Button from '@/components/ui/button';

import { Form, FormDrawer, Input, Label } from '@/components/ui/form';
import { useNotifications } from '@/components/ui/notifications';
import { Authorization } from '@/lib/authorization';
import { CAMPAIGNSTATUS, ROLES } from '@/types/enum';

import { useCampaign } from '../api/get-campaign';
import {
  updateCampaignInputSchema,
  useUpdateCampaign,
} from '../api/update-campaign';
import { MDPreview } from '@/components/ui/md-preview';

import { FunctionComponent } from 'react';
import { formatDate, formatToISO } from '@/helpers/utils';

type UpdateCampaignProps = {
  code: string;
};

export const UpdateCampaign: FunctionComponent<UpdateCampaignProps> = ({
  code,
}) => {
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
  const educaitonCurrent = campaign?.education;
  const owner = campaign?.owner;
  return (
    <Authorization allowedRoles={[ROLES.ADMIN]}>
      <FormDrawer
        isDone={updateCampaignMutation.isSuccess}
        triggerButton={
          <Button
            buttonVariant="outlined"
            buttonStyled={{ vPadding: 'sm', hPadding: 'sm' }}
          >
            <LucideFilePenLine className="size-5 text-info-700" />
          </Button>
        }
        title="Chiến dịch cần được xem xét"
        submitButton={
          <div className="p-0 m-0">
            {campaign?.status === CAMPAIGNSTATUS.PENDING && (
              <div className="flex flex-row gap-4">
                <Button
                  form="update-campaign"
                  type="submit"
                  buttonVariant="filled"
                  buttonStyled={{
                    color: 'secondary',
                    size: 'md',
                    rounded: 'normal',
                  }}
                  isLoading={updateCampaignMutation.isPending}
                  data-status={CAMPAIGNSTATUS.REJECTED}
                >
                  Hủy bỏ
                </Button>
                <Button
                  form="update-campaign"
                  type="submit"
                  buttonVariant="filled"
                  buttonStyled={{
                    color: 'primary',
                    size: 'md',
                    rounded: 'normal',
                  }}
                  isLoading={updateCampaignMutation.isPending}
                  data-status={CAMPAIGNSTATUS.APPROVED}
                >
                  Chấp nhận
                </Button>
              </div>
            )}
          </div>
        }
      >
        <Form
          id="update-campaign"
          onSubmit={(values, event) => {
            const status = (
              (event?.nativeEvent as SubmitEvent)
                ?.submitter as HTMLButtonElement
            )?.dataset.status;
            const dataUpdate = {
              name: values.name,
              description: values.description,
              targetAmount: values.targetAmount,
              currentAmount: values.currentAmount,
              startDate: formatToISO(campaign?.startDate) || '',
              endDate: formatToISO(values.endDate) || '',
              bankName: values.bankname,
              accountNumber: values.accountNumber,
              categoryId: campaign?.category.id,
              categoryName: campaign?.category.name,
              educationId: Number(educaitonCurrent?.id),
              thumbnail: values.thumbnail,
              createdId: owner?.id,
              status: status,
            };
            updateCampaignMutation.mutate({
              data: dataUpdate,
              id: Number(campaign?.id),
            });
          }}
          options={{
            defaultValues: {
              name: campaign?.name ?? '',
              description: campaign?.description ?? '',
              targetAmount: campaign?.targetAmount ?? 0,
              currentAmount: campaign?.currentAmount ?? 0,
              startDate: campaign?.startDate
                ? formatDate(campaign.startDate)
                : '',
              endDate: campaign?.endDate ? formatDate(campaign.endDate) : '',
              bankname: campaign?.bankName ?? '',
              accountNumber: campaign?.accountNumber ?? '',
              categoryName: campaign?.category.name ?? 0,
              educationId: educaitonCurrent?.id ?? 0,
              educationName: educaitonCurrent?.name ?? 0,
              educationEmail: educaitonCurrent?.email ?? 0,
              thumbnail: campaign?.thumbnail ?? '',
              ownerId: owner?.id ?? 0,
              ownerName: owner?.name ?? 0,
              ownerEmail: owner?.email ?? 0,
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
                  disabled
                  error={formState.errors['name']}
                  registration={register('name')}
                />
                <div className="flex md:flex-row flex-col gap-4">
                  <Input
                    label="Số tiền mục tiêu"
                    type="number"
                    disabled
                    className="bg-gray-50"
                    classNameParent="flex-1"
                    error={formState.errors['targetAmount']}
                    registration={register('targetAmount')}
                  />
                  <Input
                    label="Sô tiền hiện tại"
                    type="number"
                    disabled
                    classNameParent="flex-1"
                    error={formState.errors['currentAmount']}
                    registration={register('currentAmount')}
                  />
                </div>
                <div className="flex md:flex-row flex-col gap-4">
                  <Input
                    label="Ngày bắt đầu"
                    type="text"
                    disabled
                    classNameParent="flex-1"
                    error={formState.errors['startDate']}
                    registration={register('startDate')}
                  />
                  <Input
                    label="Ngày kết thúc"
                    type="text"
                    disabled
                    classNameParent="flex-1"
                    error={formState.errors['endDate']}
                    registration={register('endDate', {
                      setValueAs: (value) => formatDate(value), // Use the format function here
                    })}
                  />
                </div>
                <div className="flex md:flex-row flex-col gap-4">
                  <Input
                    label="Ngân hàng nhận tiền"
                    type="text"
                    disabled
                    classNameParent="flex-1"
                    error={formState.errors['bankname']}
                    registration={register('bankname')}
                  />
                  <Input
                    label="Tài khoản nhận tiền"
                    type="number"
                    disabled
                    classNameParent="flex-1"
                    error={formState.errors['accountNumber']}
                    registration={register('accountNumber')}
                  />
                </div>
                <Input
                  label="Thumbnail"
                  type="text"
                  disabled
                  error={formState.errors['thumbnail']}
                  registration={register('thumbnail')}
                />
                <Input
                  label="Thể loại chiến dịch"
                  type="text"
                  disabled
                  error={formState.errors['categoryName']}
                  registration={register('categoryName')}
                />
                <div className="flex flex-col gap-4 border border-gray-400 p-2">
                  <Label>Đại diện giáo dục</Label>
                  <div className="flex flex-col md:grid md:grid-cols-2 gap-4">
                    <Input
                      label="Id"
                      type="text"
                      disabled
                      classNameParent="flex-1"
                      error={formState.errors['educationId']}
                      registration={register('educationId')}
                    />
                    <Input
                      label="Tên trường"
                      type="text"
                      disabled
                      classNameParent="flex-1"
                      error={formState.errors['educationName']}
                      registration={register('educationName')}
                    />
                    <Input
                      label="Tên"
                      type="email"
                      disabled
                      classNameParent="flex-1"
                      error={formState.errors['educationEmail']}
                      registration={register('educationEmail')}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-4 border border-gray-400 p-2 rounded-md">
                  <Label>Người tạo chiến dịch</Label>
                  <div className="flex flex-col md:grid md:grid-cols-2 gap-4">
                    <Input
                      label="Id"
                      type="text"
                      disabled
                      error={formState.errors['ownerId']}
                      registration={register('ownerId')}
                    />
                    <Input
                      label="Họ và tên"
                      type="text"
                      disabled
                      error={formState.errors['ownerName']}
                      registration={register('ownerName')}
                    />
                    <Input
                      label="Email"
                      type="text"
                      disabled
                      error={formState.errors['ownerEmail']}
                      registration={register('ownerEmail')}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex flex-row justify-between items-center">
                    <Label>Mô tả xem trước</Label>
                  </div>
                  <div className="border border-gray-200 rounded-md mt-2">
                    <MDPreview value={descriptionValue} />
                  </div>
                </div>
              </div>
            );
          }}
        </Form>
      </FormDrawer>
    </Authorization>
  );
};
