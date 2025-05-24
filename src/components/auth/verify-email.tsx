'use client';

import Link from 'next/link';
import { Mail } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const AuthVerifyEmail = () => {
  const searchParams = useSearchParams();
  const [updatePassword, setUpdatePassword] = useState(false);

  useEffect(() => {
    const updatePassword = searchParams.get('updatePassword');

    if (updatePassword) {
      setUpdatePassword(true);
    }
  }, [searchParams]);

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="flex w-full max-w-xs flex-col items-center gap-4">
        <Mail />
        <p className="text-xl font-bold tracking-tight">Check your email</p>
        <div className="w-full space-y-4 rounded-xl border p-4">
          <p className="text-center text-base">
            {updatePassword
              ? "We've sent you a password reset link to your email address. Please check your inbox and click the link to update your password."
              : "We've sent you a confirmation link to your email address. Please check your inbox and click the link to verify your account."}
          </p>
        </div>
        <p className="text-center text-sm">
          Didn&apos;t receive the email?{' '}
          <Link href="#" className="text-muted-foreground underline">
            Contact Us
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthVerifyEmail;
