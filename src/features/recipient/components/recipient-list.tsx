import { Spinner } from "@/components/ui/spinner";
import { useRecipient } from "../api/get-recipient";
import { Table } from "@/components/ui/table";
import { formatDate } from "@/helpers/utils";
import { DeleteRecipient } from "./delete-recipient";

export const RecipientList = () => {
  const recipientsQuery = useRecipient();

  if (recipientsQuery.isLoading) {
    return (
      <div className="flex h-48 w-full items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  const recipients = recipientsQuery.data?.data;

  if (!recipients) return null;

  return (
    <Table
      data={recipients}
      columns={[
        {
          title: 'Full Name',
          field: 'name',
        },
        {
          title: 'Code',
          field: 'code',
        },
        {
          title: 'Phone Number',
          field: 'phone',
        },
        {
          title: 'Create at',
          field: 'createdAt',
          Cell({ entry: { createdAt } }) {
            return <span>{formatDate(createdAt)}</span>;
          },
        },
        {
          title: '',
          field: 'id',
          Cell({ entry: { id } }) {
            return <DeleteRecipient id={id} />;
          },
        },
      ]}
    />
  );
};