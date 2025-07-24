import { Metadata } from 'next';
import AuthVerifyEmail from '@/components/auth/verify-email-suspense';

const pagedata = {
  title: 'Verify Email',
  description:
    'Verify your email address to complete registration and get full access to all features.',
  keywords: 'email verification, verify email, account verification',
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

export default function VerifyEmail() {
  return <AuthVerifyEmail />;
}
