/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

import Button from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useNotifications } from '@/components/ui/notifications';
import { paths } from '@/config/paths';
import { useVerifyOTP, verifyOTPSchema } from '@/features/auth/api/verify-otp';
import { useState } from 'react';
import OtpInput from '@/components/ui/form/otp';

export const VerifyOTPForm = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<{
    email: string;
    code: number;
    isUser: boolean;
  }>({
    email: '',
    code: 0,
    isUser: false,
  });
  const { addNotification } = useNotifications();
  const verifyOTP = useVerifyOTP({
    mutationConfig: {
      onSuccess: () => {
        sessionStorage.setItem('OTPVerified', data.code.toString());
        sessionStorage.setItem('emailVerified', data.email);
        addNotification({
          message: 'Vui lòng thay đổi mật khật mới',
          type: 'success',
          title: 'Xác thực mã OTP thành công',
        });
        navigate(redirectTo || paths.auth.reset_password.getHref(), {
          replace: true,
        });
      },
      onError: (error: any) => {
        addNotification({
          message: error.response.data.detail,
          type: 'danger',
          title: 'Xác thực mã OTP thất bại',
        });
      },
    },
  });
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirectTo');
  const [otp, setOtp] = useState('');
  const handleChange = (value: string) => {
    setOtp(value);
  };
  return (
    <div className="flex flex-col gap-4">
      <Form
        onSubmit={() => {
          const emailVerify = sessionStorage.getItem('emailVerify');
          if (emailVerify) {
            const dataVerifyOTP = {
              email: emailVerify,
              code: parseInt(otp),
              isUser: true,
            };
            console.log(dataVerifyOTP);
            setData(dataVerifyOTP);
            verifyOTP.mutate(dataVerifyOTP);
          } else {
            addNotification({
              message: 'Email verification is missing.',
              type: 'danger',
              title: 'Error',
            });
          }
        }}
        schema={verifyOTPSchema}
      >
        {() => (
          <>
            <OtpInput value={otp} valueLength={6} onChange={handleChange} />
            <div>
              <Button
                isLoading={verifyOTP.isPending}
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
                Xác thực OTP
              </Button>
            </div>
          </>
        )}
      </Form>
      <div className="w-100 border-t border-gray-400"></div>
      <div className="mt-2 flex items-center justify-end">
        <Button
          buttonVariant="outlined"
          buttonStyled={{
            behavior: 'block',
            rounded: 'normal',
            color: 'primary',
            size: 'lg',
            vPadding: 'sm',
            ringWidth: 1,
          }}
          className="text-primary"
        >
          <Link
            to={`/auth/login${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ''}`}
            className="font-medium"
          >
            Quay lại đăng nhập
          </Link>
        </Button>
      </div>
    </div>
  );
};
