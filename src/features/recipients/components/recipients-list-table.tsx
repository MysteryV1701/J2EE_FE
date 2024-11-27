import { FunctionComponent, useEffect, useState } from 'react';
import { useRecipients } from '../api/get-recipients';
import { Pagination } from '@/components/ui/pagination';
import Button from '@/components/ui/button';
import { cn } from '@/helpers/cn';
import { Spinner } from '@/components/ui/spinner';
import { useDeleteRecipients } from './delete-recipient';
import { CreateRecipientForm } from './create-recipient-form';
import { Modal } from '@/components/ui/modal';
import { useNotifications } from '@/components/ui/notifications';
import { useQueryClient } from '@tanstack/react-query'



interface RecipientListProps {
  size?: number;
  pagination?: boolean;
}

export const RecipientListTable: FunctionComponent<RecipientListProps> = (
  props,
) => {
  const [page, setPage] = useState(0);
  const [pageNumberLimit, setPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecipients, setSelectedRecipients] = useState<string[]>([]);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const queryClient = useQueryClient();
  const { addNotification } = useNotifications();

  const recipientQuery = useRecipients({
    queryConfig: {},
    page,
    size: props.size,
  });

  const deleteRecipientsMutation = useDeleteRecipients({
    mutationConfig: {
      onSuccess: () => {
        addNotification({
          type: 'success',
          title: 'Recipients Deleted',
        });
        queryClient.invalidateQueries({
          queryKey: ['recipients', { page, size: props.size }],
        });
        setSelectedRecipients([]);
      },
      onError: (error) => {
        console.error('Mutation failed:', error);
      },
    },
  });

  const handleDelete = () => {
    deleteRecipientsMutation.mutate(selectedRecipients);
    setIsConfirmModalOpen(false);
  };

  const handleSelectRecipient = (recipientId: string) => {
    setSelectedRecipients((prevSelected) =>
      prevSelected.includes(recipientId)
        ? prevSelected.filter((id) => id !== recipientId)
        : [...prevSelected, recipientId]
    );
  };
  
  useEffect(() => {
    setPageNumberLimit(recipientQuery.data?.totalPages || 5);
    setMaxPageNumberLimit(recipientQuery.data?.totalPages || 5);
  }, [recipientQuery.data]);
  

  if (recipientQuery.isLoading) {
    return (
      <div className="flex h-48 w-full items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  const changePage = (pageNumber: number) => {
    setPage(pageNumber);
  };

  
  const recipients = recipientQuery.data?.data;

  if (!recipients || recipients.length === 0) {
    return (
      <div
        className={cn(
          props.pagination
            ? 'flex min-h-screen w-full items-center justify-center'
            : 'py-12',
        )}
      >
        <div className="h-64 w-full">
          <p className="h-full w-full object-contain"> No recipients available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <Button
        buttonVariant="filled"
        buttonStyled={{ color: 'primary', rounded: 'lg', size: 'lg' }}
        className="width-fit-content"
        onClick={() => setIsModalOpen(true)}
      >
        Create Recipient
      </Button>
      <Button
        buttonVariant="outlined"
        buttonStyled={{ color: 'secondary', rounded: 'lg', size: 'lg' }}
        className="width-fit-content"
        onClick={() => setIsConfirmModalOpen(true)}
        disabled={selectedRecipients.length === 0}
      >
        Delete Selected
      </Button>
      <Modal.Frame open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Modal.Head onClose={() => setIsModalOpen(false)}>
          <h2>Create Recipient</h2>
        </Modal.Head>
        <Modal.Body>
          <CreateRecipientForm />
        </Modal.Body>
      </Modal.Frame>
      <Modal.Frame open={isConfirmModalOpen} onClose={() => setIsConfirmModalOpen(false)}>
        <Modal.Head onClose={() => setIsConfirmModalOpen(false)}>
          <h2>Confirm Delete</h2>
        </Modal.Head>
        <Modal.Body>
          <p className="text-red-600">Are you sure you want to delete the selected recipients?</p>
          <Button
            buttonVariant="outlined"
            buttonStyled={{ color: 'primary', rounded: 'lg', size: 'lg' }}
            className="width-fit-content"
            onClick={handleDelete}
            isLoading={deleteRecipientsMutation.isPending}
          >
            Confirm Delete
          </Button>
        </Modal.Body>
      </Modal.Frame>
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <input
                type="checkbox"
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedRecipients(recipients.map((r) => r.id));
                  } else {
                    setSelectedRecipients([]);
                  }
                }}
                checked={selectedRecipients.length === recipients.length}
              />
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Code
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Phone
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {recipients.map((recipient) => (
            <tr key={recipient.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <input
                  type="checkbox"
                  checked={selectedRecipients.includes(recipient.id)}
                  onChange={() => handleSelectRecipient(recipient.id)}
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{recipient.code}</td>
              <td className="px-6 py-4 whitespace-nowrap">{recipient.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{recipient.phone}</td>
              <td className="px-6 py-4 whitespace-nowrap">
              <Button
                  buttonVariant="outlined"
                  onClick={() => handleSelectRecipient(recipient.id)}
                  isLoading={deleteRecipientsMutation.isPending}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {props.pagination ? (
        <Pagination
          totalPages={recipientQuery.data?.totalPages || 5}
          pageSize={recipientQuery.data?.size || 10}
          page={page}
          changePage={changePage}
          incrementPage={() => setPage((prevPage) => prevPage + 1)}
          decrementPage={() => setPage((prevPage) => prevPage - 1)}
          minPageNumberLimit={minPageNumberLimit}
          maxPageNumberLimit={maxPageNumberLimit}
        />
      ) : (
        <div className="mx-auto">
          <Button
            buttonVariant="filled"
            buttonStyled={{ color: 'secondary', rounded: 'lg', size: 'lg' }}
            className="width-fit-content"
            onClick={() => setPage((prevPage) => prevPage + 1)}
          >
            Load More
          </Button>
        </div>
      )}
    </div>
  );
};

