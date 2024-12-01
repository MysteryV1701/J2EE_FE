/* eslint-disable @typescript-eslint/no-explicit-any */
import { ViewIcon } from 'lucide-react';

import Button from '@/components/ui/button';
import { Form, FormDrawer, Input, Label } from '@/components/ui/form';
import { Authorization } from '@/lib/authorization';
import { ROLES } from '@/types/enum';

import { useCampaign } from '../api/get-campaign';
import { FunctionComponent } from 'react';
import { updateCampaignInputSchema } from '../api/update-campaign';
import { Donations } from '@/features/donation/components/get-donations';

type UpdateCampaignProps = {
  code: string;
};

export const CampaignModalView: FunctionComponent<UpdateCampaignProps> = ({
  code,
}) => {
  const campaignQuery = useCampaign({ code });
  const campaign = campaignQuery?.data;
  const education = campaign?.education;
  return (
    <Authorization allowedRoles={[ROLES.USER, ROLES.ADMIN]}>
      <FormDrawer
        isDone={false}
        triggerButton={
          <Button
            buttonVariant="outlined"
            buttonStyled={{ vPadding: 'lg', hPadding: 'lg' }}
          >
            <ViewIcon className="size-5 text-info-700" />
          </Button>
        }
        title="Xem chi tiết chiến dịch"
        submitButton={<div></div>}
      >
        <Form
          id="campaign-update-form"
          onSubmit={() => {}}
          options={{
            defaultValues: {
              name: campaign?.name ?? '',
              description: campaign?.description ?? '',
              targetAmount: campaign?.targetAmount ?? 0,
              currentAmount: campaign?.currentAmount ?? 0,
              startDate: campaign?.startDate ?? '',
              endDate: campaign?.endDate ?? '',
              bankname: campaign?.bankName ?? '',
              accountNumber: campaign?.accountNumber ?? '',
              categoryName: campaign?.category.name ?? 0,
              educationEmail: education?.email ?? 0,
              educationName: education?.name ?? 0,
              thumbnail: campaign?.thumbnail ?? '',
            },
          }}
          schema={updateCampaignInputSchema}
        >
          {({ register, formState }) => {
            return (
              <div className="py-4 flex-1 flex flex-col gap-4 px-1">
                <div className="flex md:flex-row flex-col gap-4">
                  <Input
                    label="Số tiền mục tiêu"
                    type="number"
                    disabled
                    className="bg-gray-50"
                    classNameParent="flex-1"
                    error={formState.errors['targetAmount']}
                    registration={register('targetAmount')}
                  />
                  <Input
                    label="Sô tiền hiện tại"
                    type="number"
                    disabled
                    classNameParent="flex-1"
                    error={formState.errors['currentAmount']}
                    registration={register('currentAmount')}
                  />
                </div>
                <div className="flex md:flex-row flex-col gap-4">
                  <Input
                    label="Ngân hàng nhận tiền"
                    type="text"
                    disabled
                    classNameParent="flex-1"
                    error={formState.errors['bankname']}
                    registration={register('bankname')}
                  />
                  <Input
                    label="Tài khoản nhận tiền"
                    type="number"
                    disabled
                    classNameParent="flex-1"
                    error={formState.errors['accountNumber']}
                    registration={register('accountNumber')}
                  />
                </div>
                <div className="flex flex-col gap-4 border border-gray-400 p-2 rounded-md">
                  <Label>Đại diện giáo dục</Label>
                  <div className="flex md:flex-row flex-col gap-4">
                    <Input
                      label="Tên trường"
                      type="text"
                      disabled
                      classNameParent="flex-1"
                      error={formState.errors['educationName']}
                      registration={register('educationName')}
                    />
                    <Input
                      label="Email của trường"
                      type="text"
                      disabled
                      classNameParent="flex-1"
                      error={formState.errors['educationEmail']}
                      registration={register('educationEmail')}
                    />
                  </div>
                </div>
                <Donations campaignId={campaign?.id ?? 0} />
              </div>
            );
          }}
        </Form>
      </FormDrawer>
    </Authorization>
  );
};
