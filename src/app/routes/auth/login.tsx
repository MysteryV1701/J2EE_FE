import { useNavigate, useSearchParams } from 'react-router-dom';

import { AuthLayout } from '@/components/layouts/auth-layout';
import { LoginForm } from '@/features/auth/components/login-form';

export const LoginRoute = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirectTo');

  return (
    <AuthLayout title="Ương mầm tri thức">
      <LoginForm
        onSuccess={() =>
          navigate(redirectTo ? decodeURIComponent(redirectTo) : '/app')
        }
      />
    </AuthLayout>
  );
};
