'use client';

import Link from 'next/link';
import { Mail } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { CardContent } from '../ui/card';
import { Card } from '../ui/card';
import { MagicCard } from '../magicui/magic-card';

const AuthVerifyEmail = () => {
  const searchParams = useSearchParams();
  const updatePassword = searchParams.get('updatePassword');

  return (
    <div className="flex min-h-lvh flex-col items-center justify-center gap-4 px-4">
      <Mail />
      <p className="text-xl font-bold tracking-tight">Check your email</p>
      <Card className="w-full max-w-xs border-none p-0 shadow-none">
        <MagicCard className="p-4">
          <CardContent className="w-full p-0">
            <p className="text-center text-base">
              {updatePassword
                ? "We've sent you a password reset link to your email address. Please check your inbox and click the link to update your password."
                : "We've sent you a confirmation link to your email address. Please check your inbox and click the link to verify your account."}
            </p>
          </CardContent>
        </MagicCard>
      </Card>
      <p className="text-center text-sm">
        Didn&apos;t receive the email?{' '}
        <Link href="#" className="text-muted-foreground underline">
          Contact Us
        </Link>
      </p>
    </div>
  );
};

export default AuthVerifyEmail;
