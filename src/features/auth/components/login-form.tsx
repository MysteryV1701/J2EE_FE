import { Link, useSearchParams } from 'react-router-dom';

import Button from '@/components/ui/button';
import { Form, Input } from '@/components/ui/form';
import { useLogin, loginInputSchema } from '@/lib/auth';
import { useGoogleLogin } from '@react-oauth/google';

type LoginFormProps = {
  onSuccess: () => void;
};

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const login = useLogin({
    onSuccess,
  });
  const loginWtihGoogle = useGoogleLogin({
    onSuccess: (codeResponse) => console.log(codeResponse),
    onError: (error) => console.log('Login Failed:', error),
  });
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirectTo');

  return (
    <div className="flex flex-col gap-4">
      <Button
        buttonVariant="outlined"
        buttonStyled={{
          behavior: 'block',
          rounded: 'normal',
          color: 'primary',
          size: 'lg',
          hPadding: 'sm',
          vPadding: 'xs',
          ringWidth: 1,
        }}
        className="bg-white"
        onClick={() => {
          loginWtihGoogle();
        }}
      >
        <div className="bg-white p-2 rounded-full">
          <svg className="w-4" viewBox="0 0 533.5 544.3">
            <path
              d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
              fill="#4285f4"
            />
            <path
              d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
              fill="#34a853"
            />
            <path
              d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
              fill="#fbbc04"
            />
            <path
              d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
              fill="#ea4335"
            />
          </svg>
        </div>
        <span className="ml-4 ">Đăng nhập bằng Google</span>
      </Button>
      <div className="relative text-center">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-400"></div>
        </div>
        <span className="relative bg-white px-2 text-gray-500">
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
