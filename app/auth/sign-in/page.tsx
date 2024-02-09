import type { Metadata } from 'next';

import SignInForm from '@/components/auth/sign-in-form';

export const metadata: Metadata = {
  title: 'Sign In — Salimi',
  description:
    'Sign in to your account securely. Access personalized features, update your information, and explore a tailored digital experience. Your gateway to a seamless online presence.',
  alternates: {
    canonical: '/auth/sign-in'
  },
  openGraph: {
    url: '/auth/sign-in',
    title: 'Sign In — Salimi',
    description:
      'Sign in to your account securely. Access personalized features, update your information, and explore a tailored digital experience. Your gateway to a seamless online presence.'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sign In — Salimi',
    description:
      'Sign in to your account securely. Access personalized features, update your information, and explore a tailored digital experience. Your gateway to a seamless online presence.'
  }
};

export default function SignInPage() {
  return <SignInForm />;
}
