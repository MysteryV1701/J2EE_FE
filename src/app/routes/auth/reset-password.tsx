import { AuthLayout } from '@/components/layouts/auth-layout';
import { ResetPasswordForm } from '@/features/auth/components/reset-password-form';

export const ResetPasswordRoute = () => {
  return (
    <AuthLayout title="Reset your password with email">
      <ResetPasswordForm />
    </AuthLayout>
  );
};
