import { Spinner } from '@/components/ui/spinner';
import { FunctionComponent, useState } from 'react';
import { useCampaign } from '../api/get-campaign';
import { formatDate, formatPrice } from '@/helpers/utils';
import Button from '@/components/ui/button';
import { UserIcon } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { Modal } from '@/components/ui/modal';
import { Form, Input, Label } from '@/components/ui/form';

import {
  createDonationInputSchema,
  useCreateDonation,
} from '@/features/donation/api/create-donation';
import { cn } from '@/helpers/cn';
import { useUser } from '@/lib/auth';
import { ErrorBoundary } from 'react-error-boundary';
import { Donations } from '@/features/donation/components/get-donations';
import { MDPreview } from '@/components/ui/md-preview';
import { CAMPAIGNSTATUS } from '@/types/enum';

interface CampaignViewProps {
  code: string;
}

export const DonationFormModal: FunctionComponent<{ campaignId: number }> = ({
  campaignId,
}) => {
  const user = useUser();
  const [params, setParams] = useSearchParams();
  const [isChecked, setIsChecked] = useState(false);
  const handleSwitchChange = (checked: boolean) => {
    setIsChecked(checked);
  };
  const createDonationMutation = useCreateDonation({
    mutationConfig: {
      onSuccess: (data) => {
        params.delete('modal');
        setParams(params);
        window.location.href = data.payUrl;
      },
      onError: (error) => {
        console.error('Mutation failed:', error);
      },
    },
  });
  return (
    <Modal.Frame
      open={!!params.get('modal')}
      onClose={() => {
        params.delete('modal');
        setParams(params);
      }}
    >
      <Modal.Head
        onClose={() => {
          params.delete('modal');
          setParams(params);
        }}
      >
        Quyên góp
      </Modal.Head>
      <Modal.Body>
        <div className="flex flex-col space-y-2 text-gray-900">
          <Form
            id="create-donation"
            onSubmit={(values) => {
              values.amount = Number(values.amount);
              createDonationMutation.mutate({
                data: values,
                campaignId,
                userId: user.data?.id,
              });
            }}
            options={{
              defaultValues: {
                amount: Number(10000),
                name: user.data?.name ?? '',
                isAnonymous: false,
              },
            }}
            schema={createDonationInputSchema}
          >
            {({ register, formState }) => (
              <>
                <div className="flex flex-row justify-between align-center">
                  <Label htmlFor="isAnonymous" className="text-gray-900">
                    Quyên góp ẩn danh
                  </Label>

                  <Input
                    id="isAnonymous"
                    type="checkbox"
                    registration={register('isAnonymous')}
                    checked={isChecked}
                    className="border border-gray-400 rounded-full"
                    classNameParent="p-0"
                    onClick={() => handleSwitchChange(!isChecked)}
                  />
                </div>

                <Input
                  type="number"
                  label="Số tiền bạn muốn quyên góp"
                  error={formState.errors['amount']}
                  registration={register('amount')}
                />

                <Input
                  type="text"
                  disabled={isChecked}
                  className={cn('!bg-gray-200', { 'bg-gray-200': isChecked })}
                  label="Tên của người quyên góp"
                  error={formState.errors['name']}
                  registration={register('name')}
                />
                <Button
                  isLoading={createDonationMutation.isPending}
                  type="submit"
                  buttonStyled={{
                    behavior: 'block',
                    rounded: 'normal',
                    color: 'primary',
                    hPadding: 'md',
                    vPadding: 'sm',
                  }}
                  buttonVariant="filled"
                >
                  Quyên góp qua MOMO
                </Button>
              </>
            )}
          </Form>
        </div>
      </Modal.Body>
    </Modal.Frame>
  );
};

export const CampaignView: FunctionComponent<CampaignViewProps> = ({
  code,
}) => {
  const campaignQuery = useCampaign({
    code,
  });
  const [params, setParams] = useSearchParams();
  if (campaignQuery.isLoading) {
    return (
      <div className="flex h-48 w-full items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }
  const campaign = campaignQuery?.data;
  if (!campaign) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        <div className="gird grid-cols-6 gap-4">
          <div className="h-64 w-full">
            <img
              src={'.path/to/illustration.png'}
              alt="No campaigns available"
              className="h-full w-full object-contain"
            />
          </div>
        </div>
      </div>
    );
  }
  const education = campaign?.education;
  const progress = Math.floor(
    (campaign.currentAmount / campaign.targetAmount) * 100,
  );
  const date = Math.ceil(
    (new Date(campaign.endDate).getTime() - new Date().getTime()) /
      (1000 * 60 * 60 * 24),
  );
  return (
    <>
      <div className="mt-8 min-h-screen flex flex-col gap-4">
        <h2 className="text-3xl font-semibold">{campaign?.name}</h2>
        <p className="text-gray-600">
          Nơi tiếp nhận: {education.name ?? ''} - {education.address ?? ''}
        </p>
        <p className="text-gray-600">
          Liên hệ: {education.phone ?? ''} - {education.email ?? ''}
        </p>
        <p className="text-gray-400">{formatDate(campaign.createdDate)}</p>

        <div className="lg:grid lg:grid-cols-8 flex flex-col gap-8   justify-center align-start">
          <div className="w-full max-h-[26rem] col-start-1 col-end-6">
            <img
              src={campaign.thumbnail}
              alt="No campaigns available"
              className="h-full w-full object-contain rounded-xl"
            />
          </div>
          <div className="flex flex-col gap-4 col-start-6 col-end-9 bg-secondary-200 rounded-xl px-4 py-2">
            <div className="uppercase text-xl font-semibold text-secondary-800">
              Thông tin quyên góp
            </div>
            <div className="flex-1 bg-secondary-300 rounded-xl p-4 flex flex-col gap-2">
              <div className="flex flex-row gap-2 items-center">
                {campaign.owner.avatar ? (
                  <img
                    src={campaign.owner.avatar}
                    className="h-12 w-12 rounded object-contain"
                  />
                ) : (
                  <UserIcon className="text-secondary-800 border-2 border-secondary-800 rounded-[50%]"></UserIcon>
                )}
                <div className="">
                  <p className="text-base font-semibold text-secondary-800">
                    {campaign.owner.name}
                  </p>
                  <p className="text-sm font-medium text-secondary-800">
                    {campaign.owner.email}
                  </p>
                </div>
              </div>
              <div className="flex flex-row gap-2 items-center">
                <UserIcon className="text-secondary-800 border-2 border-secondary-800 rounded-[50%]"></UserIcon>
                <div className="">
                  <p className="text-base font-semibold text-secondary-800">
                    {campaign.education.name}
                  </p>
                  <p className="text-sm font-medium text-secondary-800">
                    {campaign.education.email}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-row justify-between items-center">
                <p className="text-lg font-medium max-md:text-sm text-primary-600">
                  <span className="font-semibold text-primary-900">
                    {formatPrice(campaign.currentAmount)}
                  </span>
                  /{formatPrice(campaign.targetAmount)}
                </p>
              </div>
              <div className="block w-full rounded overflow-hidden h-2 bg-primary-200 transition-all duration-200 ease-in-out">
                <div
                  className=" h-full bg-primary-600"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <p className="text-base text-gray-700">Lượt quyên góp </p>
                <span className="text-gray-900 font-semibold text-end">
                  {12}
                </span>
                <p className="text-base text-gray-700">Đạt được </p>
                <span className="text-gray-900 font-semibold text-end">
                  {progress}%
                </span>
                <p className="text-base text-gray-700">Thời gian còn lại </p>
                <span className="text-gray-900 font-semibold text-end">
                  {date} ngày
                </span>
              </div>
            </div>
            {campaign.status === CAMPAIGNSTATUS.APPROVED && (
              <Button
                buttonStyled={{
                  color: 'primary',
                  rounded: 'lg',
                  size: 'md',
                  vPadding: 'md',
                  behavior: 'block',
                }}
                buttonVariant="filled"
                className="justify-self-end"
                onClick={() => setParams({ ...params, modal: 'true' })}
              >
                QUYÊN GÓP
              </Button>
            )}
            {campaign.status === CAMPAIGNSTATUS.COMPLETED && (
              <Button
                buttonStyled={{
                  color: 'primary',
                  rounded: 'lg',
                  size: 'md',
                  vPadding: 'md',
                  behavior: 'block',
                }}
                buttonVariant="filled"
                className="justify-self-end"
              >
                Chiến dịch đã kết thúc
              </Button>
            )}
          </div>
          <div className="col-start-1 col-end-6">
            <MDPreview value={campaign.description} />
          </div>
          <div className="col-start-6 col-end-9">
            <ErrorBoundary
              fallback={
                <div>Failed to load donations. Try to refresh the page.</div>
              }
            >
              <Donations campaignId={campaign.id} />
            </ErrorBoundary>
          </div>
        </div>
      </div>
      <DonationFormModal campaignId={campaign.id} />
    </>
  );
};
