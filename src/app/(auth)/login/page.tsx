import { Metadata } from 'next';
import AuthLogin from '@/components/auth/login';

const pagedata = {
  title: 'Sign In',
  description:
    'Sign in to your account to access team management, analytics and data synchronization features.',
  keywords: 'sign in, login, authorization, authentication',
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
    follow: true,
  },
};

export default function Login() {
  return <AuthLogin />;
}
