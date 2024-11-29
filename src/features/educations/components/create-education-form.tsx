import { createEducationInputSchema, useCreateEducation } from '../api/create-education';
import Button from '@/components/ui/button';
import { useNotifications } from '@/components/ui/notifications';
import { Authorization } from '@/lib/authorization';
import { EDUCATIONSTATUS, ROLES } from '@/types/enum';
import { Form, FormDrawer, Input, Select } from '@/components/ui/form';
import { useNavigate } from 'react-router-dom';


export const CreateEducationForm = () => {
  const navigate = useNavigate();
  const { addNotification } = useNotifications();

  const createEducationMutation = useCreateEducation({
    mutationConfig: {
      onSuccess: () => {
        addNotification({
          type: 'success',
          title: 'Education Created',
        });
        navigate('/app/educations');
      },
      onError: (error) => {
        addNotification({
          type: 'error',
          title: 'Error',
          message: error.message,
        });
      },
    },
  });

  const statusOptions = [
    { label: 'Đang hoạt động', value: EDUCATIONSTATUS.ACTIVE },
    { label: 'Dừng hoạt động', value: EDUCATIONSTATUS.INACTIVE },
  ];


  return (
    <Authorization allowedRoles={[ROLES.ADMIN]}>
      <FormDrawer isDone={createEducationMutation.isSuccess}
        triggerButton={
          <Button
            buttonVariant="filled"
            buttonStyled={{ color: 'primary', rounded: 'lg', size: 'lg' }}
            className="width-fit-content"
          >
            Tạo trường học
          </Button>
        }
        title="Tạo trường học"
        submitButton={
          <Button
            form="create-education"
            type="submit"
            buttonVariant="filled"
            buttonStyled={{ color: 'primary', size: 'md', rounded: 'normal' }}
            isLoading={createEducationMutation.isPending}
          >
            Submit
          </Button>
        }
      >
        <Form
          id="create-education"
          onSubmit={(values) => {
            createEducationMutation.mutate({
              data: values,
            });
          }}
          options={{
            defaultValues: {
              name: "",
              phone: "",
              email: "",
              address: "",
              status: 1,
            }
          }}
          schema={createEducationInputSchema}
        >
          {({ register, formState }) => (
            <div className="py-4 flex-1 flex flex-col gap-4">
              <Input
                label="Tên trường"
                error={formState.errors['name']}
                registration={register('name')}
              />
              <Input
                label="Số điện thoại"
                error={formState.errors['phone']}
                registration={register('phone')}
              />
              <Input
                label="Email"
                error={formState.errors['email']}
                registration={register('email')}
              />

              <Input
                label="Địa chỉ"
                error={formState.errors['address']}
                registration={register('address')}
              />
              <Select
                options={statusOptions}
                label="Trạng thái"
                error={formState.errors['status']}
                registration={register('status')}
              />
            </div>
          )}
        </Form>
      </FormDrawer>
    </Authorization>
  );
};