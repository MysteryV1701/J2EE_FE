/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pen } from 'lucide-react';
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
import {
  useCreateCampaign,
  createCampaignInputSchema,
} from '../api/create-campaign';
import { MDPreview } from '@/components/ui/md-preview';
import { FunctionComponent, useState } from 'react';
import { useUser } from '@/lib/auth';
import { useCategories } from '@/features/category/api/get-categories';
import { useEducations } from '@/features/educations/api/get-educations';
import { api } from '@/lib/api-client';

export const CreateCampaign: FunctionComponent = () => {
  const { addNotification } = useNotifications();
  const [isPreview, setIsPreview] = useState(false);
  const user = useUser();
  const category = useCategories({});
  const educations = useEducations({ page: 0 });
  const createCampaignMutation = useCreateCampaign({
    mutationConfig: {
      onSuccess: () => {
        addNotification({
          type: 'success',
          title: 'Create Campaign Success',
        });
      },
    },
  });

  return (
    <Authorization allowedRoles={[ROLES.USER, ROLES.ADMIN]}>
      <FormDrawer
        isDone={createCampaignMutation.isSuccess}
        triggerButton={
          <Button
            buttonVariant="filled"
            buttonStyled={{ color: 'primary', size: 'md', rounded: 'normal' }}
            className="self-end gap-2"
          >
            <Pen className="size-4 text-gray-100 " />
            <span>Tạo mới chiến dịch</span>
          </Button>
        }
        title="Tạo mới chiến dịch"
        submitButton={
          <Button
            form="create-campaign"
            type="submit"
            buttonVariant="filled"
            buttonStyled={{ color: 'primary', size: 'md', rounded: 'normal' }}
            isLoading={createCampaignMutation.isPending}
          >
            Tạo mới
          </Button>
        }
      >
        <Form
          id="create-campaign"
          onSubmit={async (values) => {
            const createData = {
              name: values.name,
              description: values.description,
              targetAmount: Number(values.targetAmount),
              currentAmount: 0,
              bankName: values.bankName,
              accountNumber: values.accountNumber,
              startDate: values.startDate,
              endDate: values.endDate,
              categoryId: values.categoryId,
              educationId: values.educationId,
              createdId: user.data?.id,
              thumbnail: '',
            };
            const formData = new FormData();
            for (const key in values) {
              if (key === 'thumbnail') {
                formData.append(
                  'file',
                  (values[key] as unknown as FileList)[0],
                );
                break;
              }
            }
            try {
              const response = await api.post('/upload', formData, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              });
              createData.thumbnail = response.url;
            } catch (error) {
              console.error(error);
            }
            createCampaignMutation.mutate({ data: createData });
          }}
          options={{
            defaultValues: {
              name: '',
              description: '',
              targetAmount: Number(100000),
              currentAmount: 0,
              bankName: '',
              accountNumber: '0',
              startDate: Date.now().toString(),
              endDate: Date.now().toString(),
              categoryId: 0,
              educationId: 0,
              createdId: user.data?.id,
              thumbnail: null as unknown as File,
            },
          }}
          schema={createCampaignInputSchema}
        >
          {({ register, formState, watch, setValue }) => {
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
                    error={formState.errors['bankName']}
                    registration={register('bankName')}
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
                <Select
                  label="Đại diện giáo dục"
                  options={
                    educations.data?.data?.map((item) => ({
                      label: item.name,
                      value: item.id,
                    })) || []
                  }
                  defaultValue={educations.data?.data?.[0]?.id}
                  registration={{
                    ...register('educationId', {
                      setValueAs: (value: any) => Number(value),
                    }),
                  }}
                  error={formState.errors['educationId']}
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
