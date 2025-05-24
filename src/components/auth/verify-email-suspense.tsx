'use client';

import { Suspense } from 'react';
import AuthVerifyEmail from './verify-email';

const AuthVerifyEmailSuspense = () => {
  return (
    <Suspense>
      <AuthVerifyEmail />
    </Suspense>
  );
};

export default AuthVerifyEmailSuspense;
