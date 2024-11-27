import { AuthLayout } from '@/components/layouts/auth-layout';
import { LoginForm } from '@/features/auth/components/login-form';

export const LoginRoute = () => {
  return (
    <AuthLayout title="Ương mầm tri thức">
      <LoginForm />
    </AuthLayout>
  );
};
