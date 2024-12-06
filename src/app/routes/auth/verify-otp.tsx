// import { useState } from 'react';
import { AuthLayout } from '@/components/layouts/auth-layout';
import { VerifyOTPForm } from '@/features/auth/components/verify-otp-form';

export const VerifyOTPRoute = () => {
  return (
    <AuthLayout title="Verify OTP">
      <VerifyOTPForm />
    </AuthLayout>
  );
};
