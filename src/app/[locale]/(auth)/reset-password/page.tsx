import { Metadata } from 'next';
import AuthResetPassword from '@/components/auth/reset-password';

const pagedata = {
  title: 'Reset Password',
  description: 'Recover access to your account. Enter your email to receive a password reset link.',
  keywords: 'reset password, password recovery, forgot password',
};

export const metadata: Metadata = {
  title: pagedata.title,
  description: pagedata.description,
  keywords: pagedata.keywords,
  openGraph: {
    title: pagedata.title,
    description: pagedata.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: pagedata.title,
    description: pagedata.description,
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function ResetPassword() {
  return <AuthResetPassword />;
}
