// import { useState } from 'react';

import { AuthLayout } from '@/components/layouts/auth-layout';
import { RegisterForm } from '@/features/auth/components/register-form';

export const RegisterRoute = () => {
  return (
    <AuthLayout title="Register your account">
      <RegisterForm />
    </AuthLayout>
  );
};
