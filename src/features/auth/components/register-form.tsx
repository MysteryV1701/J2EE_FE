/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

import Button from '@/components/ui/button';
import { Form, Input } from '@/components/ui/form';
import { useRegister, registerInputSchema } from '@/lib/auth';
import { paths } from '@/config/paths';
import { useNotifications } from '@/components/ui/notifications';

export const RegisterForm = () => {
  const navigate = useNavigate();
  const { addNotification } = useNotifications();
  const registering = useRegister({
    onSuccess: () => {
      navigate(redirectTo || paths.auth.login.getHref(), {
        replace: true,
      });
      addNotification({
        message: 'Bạn hãy đăng nhập để tiếp tục',
        type: 'success',
        title: 'Đăng ký thành công',
      });
    },
    onError: (error: any) => {
      addNotification({
        message: error.response.data.detail,
        type: 'danger',
        title: 'Đăng ký thất bại',
      });
    },
  });
  const [searchParams] = useSearchParams();

  const redirectTo = searchParams.get('redirectTo');
  return (
    <div className="flex flex-col gap-4">
      <Form
        onSubmit={(values) => {
          registering.mutate(values);
        }}
        schema={registerInputSchema}
        options={{
          shouldUnregister: true,
        }}
      >
        {({ register, formState }) => (
          <>
            <Input
              type="email"
              label="Email"
              error={formState.errors['email']}
              registration={register('email')}
            />
            <Input
              type="text"
              label="Họ và tên"
              error={formState.errors['name']}
              registration={register('name')}
            />
            <Input
              type="password"
              label="Mật khẩu"
              error={formState.errors['password']}
              registration={register('password')}
            />
            <Input
              type="password"
              label="Nhập lại mật khẩu"
              error={formState.errors['confirmPassword']}
              registration={register('confirmPassword')}
            />
            <div>
              <Button
                isLoading={registering.isPending}
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
                Đăng ký
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
            Đăng nhập
          </Link>
        </Button>
      </div>
    </div>
  );
};
