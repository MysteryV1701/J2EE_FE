import { FunctionComponent, useEffect, useState } from 'react';
import { useFinancialReports } from '../api/get-financial-reports';
import { Pagination } from '@/components/ui/pagination';
import Button from '@/components/ui/button';
import { cn } from '@/helpers/cn';
import { Spinner } from '@/components/ui/spinner';
import { useDeleteFinancialReports } from './delete-financial-report';
import { CreateFinancialReportForm } from './create-financial-report-form';
import { Modal } from '@/components/ui/modal';
import { useNotifications } from '@/components/ui/notifications';
import { useQueryClient } from '@tanstack/react-query'


interface FinancialReportListProps {
  size?: number;
  pagination?: boolean;
}

export const FinancialReportListTable: FunctionComponent<FinancialReportListProps> = (
  props,
) => {
  const [page, setPage] = useState(0);
  const [pageNumberLimit, setPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFinancialReports, setSelectedFinancialReports] = useState<string[]>([]);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const queryClient = useQueryClient();
  const { addNotification } = useNotifications();

  const financialReportQuery = useFinancialReports({
    queryConfig: {},
    page,
    size: props.size,
  });

  const deleteFinancialReportsMutation = useDeleteFinancialReports({
    mutationConfig: {
      onSuccess: () => {
        addNotification({
          type: 'success',
          title: 'Financial Report Deleted',
        });
        queryClient.invalidateQueries({
          queryKey: ['financial-reports', { page, size: props.size }],
        });
        setSelectedFinancialReports([]);
      },
      onError: (error) => {
        console.error('Mutation failed:', error);
      },
    },
  });

  const handleDelete = () => {
    deleteFinancialReportsMutation.mutate(selectedFinancialReports);
    setIsConfirmModalOpen(false);
  };

  const handleSelectFinancialReport = (FinancialReportId: string) => {
    setSelectedFinancialReports((prevSelected) =>
      prevSelected.includes(FinancialReportId)
        ? prevSelected.filter((id) => id !== FinancialReportId)
        : [...prevSelected, FinancialReportId]
    );
  };
  
  useEffect(() => {
    setPageNumberLimit(financialReportQuery.data?.totalPages || 5);
    setMaxPageNumberLimit(financialReportQuery.data?.totalPages || 5);
  }, [financialReportQuery.data]);
  

  if (financialReportQuery.isLoading) {
    return (
      <div className="flex h-48 w-full items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  const changePage = (pageNumber: number) => {
    setPage(pageNumber);
  };

  
  const financialReports = financialReportQuery.data?.data;

  if (!financialReports || financialReports.length === 0) {
    return (
      <div
        className={cn(
          props.pagination
            ? 'flex min-h-screen w-full items-center justify-center'
            : 'py-12',
        )}
      >
        <Button
        buttonVariant="filled"
        buttonStyled={{ color: 'primary', rounded: 'lg', size: 'lg' }}
        className="width-fit-content"
        onClick={() => setIsModalOpen(true)}
      >
        Create Financial report
      </Button>
      <Modal.Frame open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Modal.Head onClose={() => setIsModalOpen(false)}>
          <h2>Create Financial report</h2>
        </Modal.Head>
        <Modal.Body>
          <CreateFinancialReportForm />
        </Modal.Body>
      </Modal.Frame>
        <div className="h-64 w-full">
          <p className="h-full w-full object-contain"> No Financial reports available</p>
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
        Create Financial report
      </Button>
      <Button
        buttonVariant="outlined"
        buttonStyled={{ color: 'secondary', rounded: 'lg', size: 'lg' }}
        className="width-fit-content"
        onClick={() => setIsConfirmModalOpen(true)}
        disabled={selectedFinancialReports.length === 0}
      >
        Delete Selected
      </Button>
      <Modal.Frame open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Modal.Head onClose={() => setIsModalOpen(false)}>
          <h2>Create Financial report</h2>
        </Modal.Head>
        <Modal.Body>
          <CreateFinancialReportForm />
        </Modal.Body>
      </Modal.Frame>
      <Modal.Frame open={isConfirmModalOpen} onClose={() => setIsConfirmModalOpen(false)}>
        <Modal.Head onClose={() => setIsConfirmModalOpen(false)}>
          <h2>Confirm Delete</h2>
        </Modal.Head>
        <Modal.Body>
          <p className="text-red-600">Are you sure you want to delete the selected Financial reports?</p>
          <Button
            buttonVariant="outlined"
            buttonStyled={{ color: 'primary', rounded: 'lg', size: 'lg' }}
            className="width-fit-content"
            onClick={handleDelete}
            isLoading={deleteFinancialReportsMutation.isPending}
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
                    setSelectedFinancialReports(financialReports.map((r) => r.id));
                  } else {
                    setSelectedFinancialReports([]);
                  }
                }}
                checked={selectedFinancialReports.length === financialReports.length}
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
          {financialReports.map((financialReport) => (
            <tr key={financialReport.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <input
                  type="checkbox"
                  checked={selectedFinancialReports.includes(financialReport.id)}
                  onChange={() => handleSelectFinancialReport(financialReport.id)}
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{financialReport.totalReceived}</td>
              <td className="px-6 py-4 whitespace-nowrap">{financialReport.totalRemain}</td>
              <td className="px-6 py-4 whitespace-nowrap">{financialReport.campaignId}</td>
              <td className="px-6 py-4 whitespace-nowrap">{financialReport.recipientId}</td>
              <td className="px-6 py-4 whitespace-nowrap">
              <Button
                  buttonVariant="outlined"
                  onClick={() => handleSelectFinancialReport(financialReport.id)}
                  isLoading={deleteFinancialReportsMutation.isPending}
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
          totalPages={financialReportQuery.data?.totalPages || 5}
          pageSize={financialReportQuery.data?.size || 10}
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

