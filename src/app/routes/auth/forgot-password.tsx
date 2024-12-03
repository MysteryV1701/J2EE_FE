// import { useState } from 'react';
import { AuthLayout } from '@/components/layouts/auth-layout';
import { ForgotPasswordForm } from '@/features/auth/components/forgot-password-form';

export const ForgotPasswordRoute = () => {
  return (
    <AuthLayout title="Forgot your password">
      <ForgotPasswordForm />
    </AuthLayout>
  );
};
