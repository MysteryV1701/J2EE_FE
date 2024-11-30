import Button from '@/components/ui/button';
import { paths } from '@/config/paths';
import { Link } from 'react-router-dom';

export const DonationResultView = ({ code }: { code: string }) => {
  if (code === '00')
    return (
      <div className="mt-8 flex flex-col items-center gap-4">
        <div className="w-[28rem] rounded-xl overflow-hidden border">
          <img
            src="./src/assets/images/hand_heart.png"
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
        <h2 className="font-dancing text-5xl font-semibold text-secondary-700">
          Cảm ơn nhà hảo tâm
        </h2>
        <q className="italic font-dancing text-2xl text-primary-600">
          Sự chung tay góp sức của bạn là sức mạnh của chúng tôi
        </q>
        <div className="flex sm:flex-row flex-col gap-4">
          <Button
            buttonVariant="filled"
            buttonStyled={{
              color: 'primary',
              rounded: 'lg',
              size: 'lg',
              vPadding: 'md',
              hPadding: 'md',
              responsiveVariants: 'md' as keyof string[],
            }}
            style={{ width: 'fit-content' }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <Link
              to={
                paths.campaigns.path.startsWith('/')
                  ? paths.campaigns.path
                  : `/${paths.campaigns.path}`
              }
            >
              Quay về trang chiến dịch
            </Link>
          </Button>
          <Button
            buttonVariant="outlined"
            buttonStyled={{
              color: 'primary',
              rounded: 'lg',
              size: 'lg',
              vPadding: 'md',
              hPadding: 'md',
              ringWidth: 1,
              responsiveVariants: 'md' as keyof string[],
            }}
            style={{ width: 'fit-content' }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <Link
              to={
                paths.donations.path.startsWith('/')
                  ? paths.donations.path
                  : `/${paths.donations.path}`
              }
            >
              Xem lịch sử quyên góp
            </Link>
          </Button>
        </div>
      </div>
    );
  else if (code === '24')
    return (
      <div className="mt-8 flex flex-col items-center gap-4">
        <div className="w-[28rem] rounded-xl overflow-hidden border">
          <img
            src="./src/assets/images/hand_heart_empty.png"
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
        <h2 className="font-dancing text-5xl font-semibold text-secondary-700">
          Cảm ơn bạn đã quan tâm đến chiến dịch
        </h2>
        <q className="italic font-dancing text-2xl text-primary-600">
          Hãy quay lại và chung tay góp sức cùng chúng tôi.
        </q>
        <div className="flex sm:flex-row flex-col gap-4">
          <Button
            buttonVariant="filled"
            buttonStyled={{
              color: 'primary',
              rounded: 'lg',
              size: 'lg',
              vPadding: 'md',
              hPadding: 'md',
              responsiveVariants: 'md' as keyof string[],
            }}
            style={{ width: 'fit-content' }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <Link
              to={
                paths.campaigns.path.startsWith('/')
                  ? paths.campaigns.path
                  : `/${paths.campaigns.path}`
              }
            >
              Quay về trang chiến dịch
            </Link>
          </Button>
          <Button
            buttonVariant="outlined"
            buttonStyled={{
              color: 'primary',
              rounded: 'lg',
              size: 'lg',
              vPadding: 'md',
              hPadding: 'md',
              ringWidth: 1,
              responsiveVariants: 'md' as keyof string[],
            }}
            style={{ width: 'fit-content' }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <Link
              to={
                paths.home.path.startsWith('/')
                  ? paths.home.path
                  : `/${paths.home.path}`
              }
            >
              Quay về trang chủ
            </Link>
          </Button>
        </div>
      </div>
    );
};
