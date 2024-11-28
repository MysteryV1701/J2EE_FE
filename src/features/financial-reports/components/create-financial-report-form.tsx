import { createFinancialReportInputSchema, useCreateFinancialReport } from '../api/create-financial-report';
import Button from '@/components/ui/button';
import { useNotifications } from '@/components/ui/notifications';
import { useNavigate } from 'react-router-dom';
import { Authorization } from '@/lib/authorization';
import { ROLES } from '@/types/enum';
import { Form, FormDrawer, Input } from '@/components/ui/form';


export const CreateFinancialReportForm = () => {
  const navigate = useNavigate();
  const { addNotification } = useNotifications();

  const createFinancialReportMutation = useCreateFinancialReport({
    mutationConfig: {
      onSuccess: () => {
        addNotification({
          type: 'success',
          title: 'Financial report Created',
        });
        navigate('/app/financial-reports');
      },
      onError: (error) => {
        console.error('Mutation failed:', error);
      },
    },
  });


  return (
    <Authorization allowedRoles={[ROLES.ADMIN]}>
      <FormDrawer isDone={createFinancialReportMutation.isSuccess}
        triggerButton={
          <Button
            buttonVariant="filled"
            buttonStyled={{ color: 'primary', rounded: 'lg', size: 'lg' }}
            className="width-fit-content"
          >
            Create FinancialReport
          </Button>
        }
        title="Tạo người nhận"
        submitButton={
          <Button
            form="create-financial-report"
            type="submit"
            buttonVariant="filled"
            buttonStyled={{ color: 'primary', size: 'md', rounded: 'normal' }}
            isLoading={createFinancialReportMutation.isPending}
          >
            Submit
          </Button>
        }
      >
        <Form
          id="create-financial-report"
          onSubmit={(values) => {
            createFinancialReportMutation.mutate({
              data: values,
            });
          }}
          options={{
            defaultValues: {
              totalReceived: 0,
              totalRemain: 0,
              campaignId: 0,
              recipientId: 0
            }
          }}
          schema={ createFinancialReportInputSchema }
        >
          {({ register, formState }) => (
            <div className="py-4 flex-1">
              <Input
                type = "number"
                label="Tổng số tiền nhận được"
                error={formState.errors['totalReceived']}
                registration={register('totalReceived', { valueAsNumber: true })}
              />
              <Input
                type = "number"
                label="Tổng số tiền còn lại"
                error={formState.errors['totalRemain']}
                registration={register('totalRemain', { valueAsNumber: true })}
              />
              <Input
                type = "number"
                label="Mã chiến dịch"
                error={formState.errors['campaignId']}
                registration={register('campaignId', { valueAsNumber: true })}
              />
              <Input
                type = "number"
                label="Mã người nhận"
                error={formState.errors['recipientId']}
                registration={register('recipientId', { valueAsNumber: true })}
              />
              </div>
          )}
        </Form>
      </FormDrawer>
    </Authorization>
  );
};