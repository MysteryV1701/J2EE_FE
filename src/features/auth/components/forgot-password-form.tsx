/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

import Button from '@/components/ui/button';
import { Form, Input } from '@/components/ui/form';
import { useNotifications } from '@/components/ui/notifications';
import { paths } from '@/config/paths';
import { useSendOTP, sendOTPSchema } from '@/features/auth/api/send-otp';

export const ForgotPasswordForm = () => {
  const navigate = useNavigate();
  const { addNotification } = useNotifications();
  const forgotPassword = useSendOTP({
    mutationConfig: {
      onSuccess: () => {
        addNotification({
          message: 'Vui lòng kiểm tra email của bạn để nhận được mã OTP',
          type: 'success',
          title: 'Xác nhận email thanh công',
        });
        navigate(redirectTo || paths.auth.verify_otp.getHref(), {
          replace: true,
        });
      },
      onError: (error: any) => {
        sessionStorage.removeItem('emailVerify');
        addNotification({
          message: error.response.data.detail,
          type: 'danger',
          title: 'Xác nhận email thất bại',
        });
      },
    },
  });
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirectTo');

  return (
    <div className="flex flex-col gap-4">
      <Form
        onSubmit={(values) => {
          sessionStorage.setItem('emailVerify', values.email);
          forgotPassword.mutate(values);
        }}
        schema={sendOTPSchema}
      >
        {({ register, formState }) => (
          <>
            <Input
              type="email"
              label="Email Address"
              error={formState.errors['email']}
              registration={register('email')}
            />
            <div>
              <Button
                isLoading={forgotPassword.isPending}
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
                Xác nhận email
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
