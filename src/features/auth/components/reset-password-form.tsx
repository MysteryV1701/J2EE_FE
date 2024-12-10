/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate, useSearchParams } from 'react-router-dom';

import Button from '@/components/ui/button';
import { Form, Input } from '@/components/ui/form';
import { useResetPassword, resetPasswordSchema } from '../api/reset-password';
import { paths } from '@/config/paths';
import { useNotifications } from '@/components/ui/notifications';

export const ResetPasswordForm = () => {
  const navigate = useNavigate();
  const { addNotification } = useNotifications();
  const resetPassword = useResetPassword({
    mutationConfig: {
      onSuccess: () => {
        sessionStorage.removeItem('OTPVerified');
        sessionStorage.removeItem('emailVerified');
        addNotification({
          message: 'Vui lòng đăng nhập với mật khẩu mới',
          type: 'success',
          title: 'Thay đổi mật khẩu thành công',
        });
        navigate(redirectTo || paths.auth.login.getHref(), {
          replace: true,
        });
        window.location.reload();
      },
      onError: (error: any) => {
        addNotification({
          message: error.response.data.detail,
          type: 'danger',
          title: 'Thay đổi mật khẩu thất bại',
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
          const verifyEmail = sessionStorage.getItem('emailVerify');
          const verifyOTP = sessionStorage.getItem('OTPVerified');
          const data = {
            email: verifyEmail || '',
            code: parseInt(verifyOTP || ''),
            password: values.password,
          };
          resetPassword.mutate(data);
        }}
        schema={resetPasswordSchema}
        options={{
          shouldUnregister: true,
        }}
      >
        {({ register, formState }) => (
          <>
            <Input
              type="password"
              label="Mật khẩu mới"
              error={formState.errors['password']}
              registration={register('password')}
            />
            <Input
              type="password"
              label="Nhập lại mật khẩu mới"
              error={formState.errors['confirmPassword']}
              registration={register('confirmPassword')}
            />
            <div>
              <Button
                isLoading={resetPassword.isPending}
                type="submit"
                className="w-full"
                buttonStyled={{
                  behavior: 'block',
                  rounded: 'normal',
                  color: 'primary',
                  hPadding: 'md',
                  vPadding: 'sm',
                }}
                buttonVariant="filled"
              >
                Xác nhận đổi mật khẩu
              </Button>
            </div>
          </>
        )}
      </Form>
    </div>
  );
};
