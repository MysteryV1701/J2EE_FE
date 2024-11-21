import { ContentLayout } from '@/components/layouts';
import { CampaignListGird } from '@/features/campaign/components/campaigns-list-grid';
import { Authorization } from '@/lib/authorization';
import { ROLES } from '@/types/enum';

export const CampaignRoute = () => {
  return (
    <ContentLayout title="Campaign Page" description="Dann Charity">
      <Authorization
        forbiddenFallback={<div>Only admin can view this.</div>}
        allowedRoles={[ROLES.USER]}
      >
        <CampaignListGird />
      </Authorization>
    </ContentLayout>
  );
};
