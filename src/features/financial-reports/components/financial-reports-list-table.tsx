import { FunctionComponent, useEffect, useState } from 'react';
import { useFinancialReports } from '../api/get-financial-reports';
import Button from '@/components/ui/button';
import { cn } from '@/helpers/cn';
import { Spinner } from '@/components/ui/spinner';
import { CreateFinancialReportForm } from './create-financial-report-form';
import { Modal } from '@/components/ui/modal';
import { Table } from '@/components/ui/table';
import { paths } from '@/config/paths';
import { DeleteFinancialReports } from './delete-financial-report';
import { Authorization } from '@/lib/authorization';
import { ROLES } from '@/types/enum';

interface FinancialReportListProps {
  size?: number;
  pagination?: boolean;
}

export const FinancialReportListTable: FunctionComponent<FinancialReportListProps> = (
  props,
) => {
  const [page, setPage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());

  const handleCheckboxChange = (id: number) => {
    setSelectedRows((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const financialReportQuery = useFinancialReports({
    queryConfig: {},
    page,
    size: props.size,
  });


  if (financialReportQuery.isLoading) {
    return (
      <div className="flex h-48 w-full items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  const financialReports = financialReportQuery.data?.data;

  if (!financialReports || financialReports.length === 0) {
    return (
      <>
        <Button>
          <CreateFinancialReportForm />
        </Button>
        <div
          className={cn(
            props.pagination
              ? 'flex min-h-screen w-full items-center justify-center'
              : 'py-12',
          )}
        >

          <div className="h-64 w-full">
            <p className="h-full w-full object-contain"> Không có báo cáo tài chính nào tồn tại</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="flex justify-end space-x-4 mb-4">
        <Button>
          <CreateFinancialReportForm />
        </Button>
        <Authorization allowedRoles={[ROLES.ADMIN]}>
        <Button>
          <DeleteFinancialReports financialReportIds={Array.from(selectedRows)} />
        </Button>
        </Authorization>
      </div>
      <Table
        data={financialReports}
        pagination={{
          totalPages: financialReportQuery.data?.totalPages ?? 1,
          currentPage: page,
          rootUrl: paths.app.financialReport.getHref(),
        }}
        columns={[
          {
            title: (
              <input
                type="checkbox"
                onChange={(e) => {
                  if (e.target.checked) {
                    const allIds = financialReports.map((financialReport) => financialReport.id);
                    setSelectedRows(new Set(allIds));
                  } else {
                    setSelectedRows(new Set());
                  }
                }}
              />
            ),
            field: 'checkbox',
            className: 'w-10 text-center',
            Cell({ entry: { id } }) {
              return (
                <input
                  type="checkbox"
                  checked={selectedRows.has(id)}
                  onChange={() => handleCheckboxChange(id)}
                />
              );
            },
          },
          {
            title: 'Tổng tiền nhận',
            field: 'totalReceived',
          },
          {
            title: 'Tổng tiền còn lại',
            field: 'totalRemain',
          },
          {
            title: 'Tên chiến dịch',
            field: 'campaignName',
          },
          {
            title: 'Tên người nhận',
            field: 'recipientName',
          },
        ]}
      />
    </>
  );
};

