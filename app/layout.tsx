import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { SessionProvider } from 'next-auth/react';

import { auth } from '@/auth';
import { EdgeStoreProvider } from '@/lib/edgestore';
import ToastProvider from '@/providers/toast-provider';
import { ThemeProvider } from '@/providers/theme-provider';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.AUTH_URL
      ? `${process.env.AUTH_URL}`
      : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : `http://localhost:${process.env.PORT || 3000}`
  ),
  title: 'Salimi — My Digital Canvas',
  description:
    'Hi, I am Salimi. Unveil my skills, projects, and journey on my personal website. A digital portfolio reflecting my passion and expertise. Explore now and do contact me.',
  openGraph: {
    url: '/',
    title: 'Salimi — My Digital Canvas',
    description:
      'Hi, I am Salimi. Unveil my skills, projects, and journey on my personal website. A digital portfolio reflecting my passion and expertise. Explore now and do contact me.'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Salimi — My Digital Canvas',
    description:
      'Hi, I am Salimi. Unveil my skills, projects, and journey on my personal website. A digital portfolio reflecting my passion and expertise. Explore now and do contact me.'
  }
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang='en' suppressHydrationWarning>
        <body className={inter.className}>
          <EdgeStoreProvider>
            <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
              {children}
              <ToastProvider />
            </ThemeProvider>
          </EdgeStoreProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
