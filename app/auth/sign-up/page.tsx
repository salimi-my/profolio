import type { Metadata } from 'next';

import SignUpForm from '@/components/auth/sign-up-form';

export const metadata: Metadata = {
  title: 'Sign Up — Start Your Digital Journey Today',
  description:
    'Create your account and embark on a personalized digital experience. Sign up now to unlock exclusive features, share your story, and connect with a world of opportunities.',
  alternates: {
    canonical: '/auth/sign-up'
  },
  openGraph: {
    url: '/auth/sign-up',
    title: 'Sign Up — Start Your Digital Journey Today',
    description:
      'Create your account and embark on a personalized digital experience. Sign up now to unlock exclusive features, share your story, and connect with a world of opportunities.'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sign Up — Start Your Digital Journey Today',
    description:
      'Create your account and embark on a personalized digital experience. Sign up now to unlock exclusive features, share your story, and connect with a world of opportunities.'
  }
};

export default function SignUpPage() {
  return <SignUpForm />;
}
