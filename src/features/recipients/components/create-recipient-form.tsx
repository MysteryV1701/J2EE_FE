import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createRecipientInputSchema, useCreateRecipient } from '../api/create-recipients';
import { CreateRecipientInput } from '../api/create-recipients';
import Button from '@/components/ui/button';
import { Input } from '@/components/ui/form/input';
import { useNotifications } from '@/components/ui/notifications';
import { useNavigate } from 'react-router-dom';


export const CreateRecipientForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<CreateRecipientInput>({
    resolver: zodResolver(createRecipientInputSchema),
  });

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
        console.error('Mutation failed:', error);
      },
    },
  });

  const onSubmit = (data: CreateRecipientInput) => {
    createRecipientMutation.mutate({ data });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Code
        </label>
        <Input
          id="code"
          registration={register('code')}
          className="mt-1 block w-full"
        />
        {errors.code && <p className="mt-2 text-sm text-red-600">{errors.code.message}</p>}
      </div>

      <div>
        <label htmlFor="body" className="block text-sm font-medium text-gray-700">
          Name
        </label>
        <Input
          id="name"
          registration={register('name')}
          className="mt-1 block w-full"
        />
        {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="body" className="block text-sm font-medium text-gray-700">
          Phone
        </label>
        <Input
          id="phone"
          registration={register('phone')}
          className="mt-1 block w-full"
        />
        {errors.phone && <p className="mt-2 text-sm text-red-600">{errors.phone.message}</p>}
      </div>

      <Button
        type="submit"
        buttonVariant="filled"
        buttonStyled={{ color: 'primary', rounded: 'lg', size: 'lg' }}
        className="mt-4"
        isLoading={createRecipientMutation.isPending}
      >
        Create Recipient
      </Button>
    </form>
  );
};