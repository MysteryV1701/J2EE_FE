import { Pen } from 'lucide-react';

import Button from '@/components/ui/button';
import { Form, FormDrawer, Input, Textarea } from '@/components/ui/form';
import { useNotifications } from '@/components/ui/notifications';
import { Authorization } from '@/lib/authorization';
import { ROLES } from '@/types/enum';

import { useCategory } from '../api/get-category';
import {
  updateCategoryInputSchema,
  useUpdateCategory,
} from '../api/update-category';

type UpdateCategoryProps = {
  id: number;
};

export const UpdateCategory = ({ id }: UpdateCategoryProps) => {
  const { addNotification } = useNotifications();
  const categoryQuery = useCategory({ id });
  const updateCategoryMutation = useUpdateCategory({
    mutationConfig: {
      onSuccess: () => {
        addNotification({
          type: 'success',
          title: 'Loại từ thiện đã được cập nhật',
        });
      },
    },
  });

  const category = categoryQuery?.data;

  return (
    <Authorization allowedRoles={[ROLES.ADMIN]}>
      <FormDrawer
        isDone={updateCategoryMutation.isSuccess}
        triggerButton={
          <Button buttonVariant="outlined">
            <Pen className="size-4 text-info-700" />
          </Button>
        }
        title="Cập nhật loại từ thiện"
        submitButton={
          <Button
            form="update-category"
            type="submit"
            buttonVariant="filled"
            buttonStyled={{ color: 'primary', size: 'md', rounded: 'normal' }}
            isLoading={updateCategoryMutation.isPending}
          >
            Submit
          </Button>
        }
      >
        <Form
          id="update-category"
          onSubmit={(values) => {
            updateCategoryMutation.mutate({
              data: values,
              id: category?.id ?? 0,
            });
          }}
          options={{
            defaultValues: {
              name: category?.name ?? "",
              description: category?.description ?? "",
              status: category?.status ?? 1,
            },
          }}
          schema={updateCategoryInputSchema}
        >
          {({ register, formState }) => (
            <div className="py-4 flex-1 flex flex-col gap-4">
              <Input
                label="Tên loại từ thiện"
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
