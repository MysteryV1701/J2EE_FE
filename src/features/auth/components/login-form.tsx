/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

import Button from '@/components/ui/button';
import { Form, Input } from '@/components/ui/form';
import { useLogin, loginInputSchema } from '@/lib/auth';
import { paths } from '@/config/paths';
import { ROLES } from '@/types/enum';
import { GoogleLogin } from '@react-oauth/google';
import { api } from '@/lib/api-client';
import { useNotifications } from '@/components/ui/notifications';

export const LoginForm = () => {
  const navigate = useNavigate();
  const { addNotification } = useNotifications();
  const login = useLogin({
    onSuccess: (data) => {
      if (data?.role_name === ROLES.ADMIN || data?.role_name === ROLES.OR) {
        navigate(redirectTo || paths.app.dashboard.getHref(), {
          replace: true,
        });
      }
      if (data?.role_name === ROLES.USER) {
        navigate(redirectTo || paths.home.getHref(), {
          replace: true,
        });
      }
    },
    onError: (error: any) => {
      addNotification({
        message: error.response.data.detail,
        type: 'danger',
        title: 'Đăng ký thất bại',
      });
    },
  });
  const handleSuccess = async (response: any) => {
    const responseAccessToken = await api.post(
      '/auth/login/oauth2/google',
      {},
      {
        headers: {
          Authorization: `Bearer ${response.credential}`,
        },
      },
    );
    if (responseAccessToken.access_token) {
      sessionStorage.setItem('access_token', responseAccessToken.access_token);
    }
    navigate(redirectTo || paths.home.getHref(), {
      replace: true,
    });
    if (redirectTo === paths.home.getHref() || !redirectTo) {
      window.location.reload();
    }
  };

  const handleError = () => {
    console.error('Login Failed');
  };
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirectTo');

  return (
    <div className="flex flex-col gap-4">
      <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
      <div className="relative text-center">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-400 bg-danger"></div>
        </div>
        <span className="relative bg-white  px-2 text-gray-500">
          Hoặc đăng nhập với tài khoản
        </span>
      </div>

      <Form
        onSubmit={(values) => {
          login.mutate(values);
        }}
        schema={loginInputSchema}
      >
        {({ register, formState }) => (
          <>
            <Input
              type="email"
              label="Email Address"
              error={formState.errors['email']}
              registration={register('email')}
            />
            <Input
              type="password"
              label="Password"
              error={formState.errors['password']}
              registration={register('password')}
            />
            <div>
              <Button
                isLoading={login.isPending}
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
                Đăng nhập
              </Button>
            </div>
          </>
        )}
      </Form>
      <Link
        to={`/auth/forgot-password${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ''}`}
        className="font-medium text-end italic text-primary underline"
      >
        Quên mật khẩu?
      </Link>
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
            to={`/auth/register${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ''}`}
            className="font-medium"
          >
            Đăng ký tài khoản mới
          </Link>
        </Button>
      </div>
    </div>
  );
};
