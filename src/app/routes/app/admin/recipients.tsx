import { QueryClient } from '@tanstack/react-query';

import { ContentLayout } from '@/components/layouts';
import { getRecipientQueryOptions } from '@/features/recipients/api/get-recipient';
import { RecipientList } from '@/features/recipients/components/recipient-list';
import { Authorization } from '@/lib/authorization';
import { ROLES } from '@/types/api';

export const recipientsLoader = (queryClient: QueryClient) => async () => {
  const query = getRecipientQueryOptions();

  return (
    queryClient.getQueryData(query.queryKey) ??
    (await queryClient.fetchQuery(query))
  );
};

export const RecipientsRoute = () => {
  return (
    <ContentLayout title="Recipients" description="">
      <Authorization
        forbiddenFallback={<div>Only admin can view this.</div>}
        allowedRoles={[ROLES.ADMIN]}
      >
        <RecipientList />
      </Authorization>
    </ContentLayout>
  );
};