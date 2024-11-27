import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createFinancialReportInputSchema, useCreateFinancialReport } from '../api/create-financial-report';
import { CreateFinancialReportInput } from '../api/create-financial-report';
import Button from '@/components/ui/button';
import { Input } from '@/components/ui/form/input';
import { useNotifications } from '@/components/ui/notifications';
import { useNavigate } from 'react-router-dom';


export const CreateFinancialReportForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<CreateFinancialReportInput>({
    resolver: zodResolver(createFinancialReportInputSchema),
  });

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

  const onSubmit = (data: CreateFinancialReportInput) => {
    createFinancialReportMutation.mutate({ data });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Total Received
        </label>
        <Input
          id="totalReceived"
          type="number"
          registration={register('totalReceived', { valueAsNumber: true })}
          className="mt-1 block w-full"
        />
        {errors.totalReceived && <p className="mt-2 text-sm text-red-600">{errors.totalReceived.message}</p>}
      </div>

      <div>
        <label htmlFor="body" className="block text-sm font-medium text-gray-700">
          Total Remain
        </label>
        <Input
          id="totalRemain"
          type="number"
          registration={register('totalRemain', { valueAsNumber: true })}
          className="mt-1 block w-full"
        />
        {errors.totalRemain && <p className="mt-2 text-sm text-red-600">{errors.totalRemain.message}</p>}
      </div>

      <div>
        <label htmlFor="body" className="block text-sm font-medium text-gray-700">
          Campaign Id
        </label>
        <Input
          id="campaignId"
          type="number"
          registration={register('campaignId', { valueAsNumber: true })}
          className="mt-1 block w-full"
        />
        {errors.campaignId && <p className="mt-2 text-sm text-red-600">{errors.campaignId.message}</p>}
      </div>

      <div>
        <label htmlFor="body" className="block text-sm font-medium text-gray-700">
          Recipient Id
        </label>
        <Input
          id="recipientId"
          type="number"
          registration={register('recipientId', { valueAsNumber: true })}
          className="mt-1 block w-full"
        />
        {errors.recipientId && <p className="mt-2 text-sm text-red-600">{errors.recipientId.message}</p>}
      </div>

      <Button
        type="submit"
        buttonVariant="filled"
        buttonStyled={{ color: 'primary', rounded: 'lg', size: 'lg' }}
        className="mt-4"
        isLoading={createFinancialReportMutation.isPending}
      >
        Create Financial report
      </Button>
    </form>
  );
};