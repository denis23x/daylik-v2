import { Metadata } from 'next';
import AuthSignUp from '@/components/auth/signup';

const pagedata = {
  title: 'Sign Up',
  description:
    'Create your account and start efficiently managing teams, tracking analytics and synchronizing data.',
  keywords: 'sign up, registration, create account, teams',
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

export default function Signup() {
  return <AuthSignUp />;
}
