import { Pen } from 'lucide-react';

import Button from '@/components/ui/button';
import { Form, FormDrawer, Input } from '@/components/ui/form';
import { useNotifications } from '@/components/ui/notifications';
import { useUser } from '../api/get-user';

import { updateUserInputSchema, useUpdateUser } from '../api/update-user';

type UpdateUserProps = {
  userId: number;
};

export const UpdateUser = ({ userId }: UpdateUserProps) => {
  const user = useUser({ id: userId });
  const { addNotification } = useNotifications();
  const updateProfileMutation = useUpdateUser({
    mutationConfig: {
      onSuccess: () => {
        addNotification({
          type: 'success',
          title: 'Profile Updated',
        });
      },
    },
  });
  return (
    <FormDrawer
      isDone={updateProfileMutation.isSuccess}
      triggerButton={
        <Button buttonVariant="outlined">
          <Pen className="size-4 text-info-700" />
        </Button>
      }
      title="Cập nhập thông tin cá nhân"
      submitButton={
        <Button
          form="update-user"
          type="submit"
          buttonStyled={{ color: 'primary', size: 'md', rounded: 'normal' }}
          buttonVariant="filled"
          isLoading={updateProfileMutation.isPending}
        >
          Cập nhật
        </Button>
      }
    >
      <Form
        id="update-profile"
        onSubmit={(values) => {
          if (user.data?.id !== undefined) {
            updateProfileMutation.mutate({ id: user.data.id, data: values });
          }
        }}
        options={{
          defaultValues: {
            name: user.data?.name ?? '',
            email: user.data?.email ?? '',
            avatar: user.data?.avatar ?? '',
            status: user.data?.status ?? 0,
            role_name: user.data?.role_name ?? '',
            provider: user.data?.provider ?? '',
          },
        }}
        schema={updateUserInputSchema}
      >
        {({ register, formState }) => (
          <>
            <Input
              label="Họ và tên"
              error={formState.errors['name']}
              registration={register('name')}
            />
            <Input
              label="Email"
              error={formState.errors['email']}
              registration={register('email')}
            />
            <Input
              label="Ảnh đại diện"
              type="file"
              error={formState.errors['email']}
              registration={register('email')}
            />
            <Input
              label="Trạng thái"
              error={formState.errors['status']}
              registration={register('status')}
            />
          </>
        )}
      </Form>
    </FormDrawer>
  );
};
