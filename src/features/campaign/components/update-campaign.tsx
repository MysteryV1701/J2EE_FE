/* eslint-disable @typescript-eslint/no-explicit-any */
import { LucideFilePenLine } from 'lucide-react';

import Button from '@/components/ui/button';
import {
  Form,
  FormDrawer,
  Input,
  Label,
  Select,
  Textarea,
} from '@/components/ui/form';
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
import { useCategories } from '@/features/category/api/get-categories';

type UpdateCampaignProps = {
  code: string;
};

export const UpdateCampaign: FunctionComponent<UpdateCampaignProps> = ({
  code,
}) => {
  const { addNotification } = useNotifications();
  const [isPreview, setIsPreview] = useState(false);
  const campaignQuery = useCampaign({ code });
  const category = useCategories({});
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
          <Button
            buttonVariant="outlined"
            buttonStyled={{ vPadding: 'lg', hPadding: 'lg' }}
          >
            <LucideFilePenLine className="size-5 text-info-700" />
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
              targetAmount: campaign?.targetAmount ?? 0,
              currentAmount: campaign?.currentAmount ?? 0,
              startDate: campaign?.startDate ?? '',
              endDate: campaign?.endDate ?? '',
              bankname: campaign?.bankname ?? '',
              accountNumber: campaign?.accountNumber ?? '',
              categoryId: campaign?.categoryId ?? 0,
              educationId: campaign?.education.id ?? 0,
              createdId: campaign?.createdId ?? 0,
              thumbnail: campaign?.thumbnail ?? '',
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
                <div className="flex md:flex-row flex-col gap-4">
                  <Input
                    label="Số tiền mục tiêu"
                    type="number"
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
                    type="date"
                    classNameParent="flex-1"
                    error={formState.errors['startDate']}
                    registration={register('startDate')}
                  />
                  <Input
                    label="Ngày kết thúc"
                    type="date"
                    classNameParent="flex-1"
                    error={formState.errors['endDate']}
                    registration={register('endDate')}
                  />
                </div>
                <div className="flex md:flex-row flex-col gap-4">
                  <Input
                    label="Ngân hàng nhận tiền"
                    type="text"
                    classNameParent="flex-1"
                    error={formState.errors['bankname']}
                    registration={register('bankname')}
                  />
                  <Input
                    label="Tài khoản nhận tiền"
                    type="number"
                    classNameParent="flex-1"
                    error={formState.errors['accountNumber']}
                    registration={register('accountNumber')}
                  />
                </div>
                <Input
                  label="Thumbnail"
                  type="file"
                  accept="image/*"
                  error={formState.errors['thumbnail']}
                  registration={register('thumbnail')}
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setValue('thumbnail', file);
                    }
                  }}
                />
                <Select
                  label="Thể loại chiến dịch"
                  options={
                    category.data?.map((item) => ({
                      label: item.name,
                      value: item.id,
                    })) || []
                  }
                  defaultValue={category.data?.[0]?.id}
                  registration={{
                    ...register('categoryId', {
                      setValueAs: (value: any) => Number(value),
                    }),
                  }}
                  error={formState.errors['categoryId']}
                />
                <div className="flex flex-col gap-4 border border-gray-400 p-2">
                  <Label>Đại diện giáo dục</Label>
                  <div className="flex md:flex-row flex-col gap-4">
                    <Input
                      label="Đại diện giáo dục"
                      type="number"
                      classNameParent="flex-1"
                      error={formState.errors['categoryId']}
                      registration={register('categoryId')}
                    />
                  </div>
                </div>

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
