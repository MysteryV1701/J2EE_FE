import { createCategoryInputSchema, useCreateCategory } from '../api/create-category';
import Button from '@/components/ui/button';
import { useNotifications } from '@/components/ui/notifications';
import { Authorization } from '@/lib/authorization';
import { CATEGORIESSTATUS, ROLES } from '@/types/enum';
import { Form, FormDrawer, Input, Select, Textarea} from '@/components/ui/form';
import { useNavigate } from 'react-router-dom';
import { useCategories } from '../api/get-categories';


export const CreateCategoryForm = () => {
  const navigate = useNavigate();
  const { addNotification } = useNotifications();

  const createCategoryMutation = useCreateCategory({
    mutationConfig: {
      onSuccess: () => {
        addNotification({
          type: 'success',
          title: 'Loại từ thiện được tạo thành công',
        });
        window.location.reload();
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
    { label: 'Đang hoạt động', value: CATEGORIESSTATUS.ACTIVE },
    { label: 'Dừng hoạt động', value: CATEGORIESSTATUS.INACTIVE },
  ];


  return (
    <Authorization allowedRoles={[ROLES.ADMIN]}>
      <FormDrawer isDone={createCategoryMutation.isSuccess}
        triggerButton={
          <Button
            buttonVariant="filled"
            buttonStyled={{ color: 'primary', rounded: 'lg', size: 'lg' }}
            className="width-fit-content"
          >
            Tạo loại từ thiện
          </Button>
        }
        title="Tạo loại từ thiện"
        submitButton={
          <Button
            form="create-category"
            type="submit"
            buttonVariant="filled"
            buttonStyled={{ color: 'primary', size: 'md', rounded: 'normal' }}
            isLoading={createCategoryMutation.isPending}
          >
            Submit
          </Button>
        }
      >
        <Form
          id="create-category"
          onSubmit={(values) => {
            createCategoryMutation.mutate({
              data: values,
            });
          }}
          options={{
            defaultValues: {
              name: "",
              description: "",
              status: 1,
            }
          }}
          schema={createCategoryInputSchema}
        >
          {({ register, formState }) => (
            <div className="py-4 flex-1 flex flex-col gap-4">
              <Input
                label="Tên loại"
                error={formState.errors['name']}
                registration={register('name')}
              />
              <Textarea
                label="Mô tả"
                error={formState.errors['description']}
                registration={register('description')}
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