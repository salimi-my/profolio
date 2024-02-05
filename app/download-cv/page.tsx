import type { Metadata } from 'next';

import DownloadCv from '@/components/download-cv/download-cv';

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.AUTH_URL
      ? `${process.env.AUTH_URL}`
      : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : `http://localhost:${process.env.PORT || 3000}`
  ),
  title: 'Download CV — Salimi',
  description:
    'Thank you for being interested in my profile. The download of my CV will start shortly.',
  alternates: {
    canonical: '/download-cv'
  },
  openGraph: {
    url: '/download-cv',
    title: 'Download CV — Salimi',
    description:
      'Thank you for being interested in my profile. The download of my CV will start shortly.'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Download CV — Salimi',
    description:
      'Thank you for being interested in my profile. The download of my CV will start shortly.'
  }
};

export default function DownloadCvPage() {
  return <DownloadCv />;
}
