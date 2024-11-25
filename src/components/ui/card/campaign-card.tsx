import Button from '@/components/ui/button';
import { formatPrice } from '@/helpers/utils';
import { Campaign } from '@/types/api';
import { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

export const CampaignCard: FunctionComponent<Campaign> = (props) => {
  const progress = Math.floor((props.currentAmount / props.targetAmount) * 100);
  const date = Math.ceil(
    (new Date(props.endDate).getTime() - new Date().getTime()) /
      (1000 * 60 * 60 * 24),
  );
  return (
    <div
      key={props.id}
      className="rounded-lg shadow-lg overflow-hidden h-fit bg-secondary-100 h-100 self-stretch"
    >
      <div className="w-full h-52 border border-2 rounded-lg">
        <img
          className="w-full h-full object-contain"
          src={props.thumbnail}
          alt="Campaign Image of Dann Charity"
        />
      </div>
      <div className="p-4 flex flex-col h-auto">
        <span className="font-dancing text-primary-600">
          {props.categoryName}
        </span>
        <h3
          title={props.code}
          className="lg:text-md text-base font-semibold h-12 mb-4 max-md:pb-2 max-md:text-sm text-ellipsis line-clamp-2"
        >
          {props.name}
        </h3>
        <div className="flex flex-col justify-between content-center md:gap-4 gap-2 mt-2">
          <div className="flex flex-col gap-2">
            <div className="flex flex-row justify-between items-center">
              <p className="text-md font-medium max-md:text-sm text-primary-600">
                <span className="font-semibold text-primary-900">
                  {formatPrice(props.currentAmount)}
                </span>
                /{formatPrice(props.targetAmount)}
              </p>
              <p className="p-1 rounded-xl bg-primary-100">
                Còn lại {date} ngày{' '}
              </p>
            </div>

            <div className="block w-full rounded overflow-hidden h-2 bg-primary-200 transition-all duration-200 ease-in-out">
              <div
                className=" h-full bg-primary-600"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
          <div className="flex flex-row justify-between items-center">
            <p className="text-base text-gray-700">
              Lượt ủng hộ:{' '}
              <span className="text-gray-900 font-semibold">{12}</span>
            </p>
            <p className="text-base text-gray-700">
              Đạt được:{' '}
              <span className="text-gray-900 font-semibold">{progress}%</span>{' '}
            </p>
          </div>
          <Link
            to={'/campaigns/' + props.code}
            key={props.code}
            className="w-100"
          >
            <Button
              buttonVariant="filled"
              buttonStyled={{
                color: 'primary',
                hPadding: 'lg',
                size: 'md',
                rounded: 'sm',
                behavior: 'block',
              }}
            >
              Ủng hộ ngay
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
