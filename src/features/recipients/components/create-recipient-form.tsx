import {
  createRecipientInputSchema,
  useCreateRecipient,
} from '../api/create-recipients';
import Button from '@/components/ui/button';
import { useNotifications } from '@/components/ui/notifications';
import { Authorization } from '@/lib/authorization';
import { ROLES } from '@/types/enum';
import { Form, FormDrawer, Input } from '@/components/ui/form';
import { useNavigate } from 'react-router-dom';

export const CreateRecipientForm = () => {
  const navigate = useNavigate();
  const { addNotification } = useNotifications();

  const createRecipientMutation = useCreateRecipient({
    mutationConfig: {
      onSuccess: () => {
        addNotification({
          type: 'success',
          title: 'Recipient Created',
        });
        navigate('/app/recipients');
      },
      onError: (error) => {
        addNotification({
          type: 'danger',
          title: 'Error',
          message: error.message,
        });
      },
    },
  });

  return (
    <Authorization allowedRoles={[ROLES.ADMIN]}>
      <FormDrawer
        isDone={createRecipientMutation.isSuccess}
        triggerButton={
          <Button
            buttonVariant="filled"
            buttonStyled={{ color: 'primary', rounded: 'lg', size: 'lg' }}
            className="width-fit-content"
          >
            Tạo người nhận
          </Button>
        }
        title="Tạo người nhận"
        submitButton={
          <Button
            form="create-recipient"
            type="submit"
            buttonVariant="filled"
            buttonStyled={{ color: 'primary', size: 'md', rounded: 'normal' }}
            isLoading={createRecipientMutation.isPending}
          >
            Submit
          </Button>
        }
      >
        <Form
          id="create-recipient"
          onSubmit={(values) => {
            createRecipientMutation.mutate({
              data: values,
            });
          }}
          options={{
            defaultValues: {
              name: '',
              code: '',
              phone: '',
            },
          }}
          schema={createRecipientInputSchema}
        >
          {({ register, formState }) => (
            <div className="py-4 flex-1 flex flex-col gap-4">
              <Input
                label="Tên người nhận"
                error={formState.errors['name']}
                registration={register('name')}
              />
              <Input
                label="Code"
                error={formState.errors['code']}
                registration={register('code')}
              />
              <Input
                label="Số điện thoại"
                error={formState.errors['phone']}
                registration={register('phone')}
              />
            </div>
          )}
        </Form>
      </FormDrawer>
    </Authorization>
  );
};
