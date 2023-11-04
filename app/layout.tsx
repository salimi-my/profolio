import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { getServerSession } from 'next-auth';

import ToastProvider from '@/providers/toast-provider';
import { ThemeProvider } from '@/providers/theme-provider';
import SessionProvider from '@/providers/session-provider';

import './globals.css';

const poppins = Poppins({
  style: ['normal'],
  weight: ['400', '500', '600'],
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: 'Salimi — My Personal Website',
  description:
    'Hi! I am Salimi and this is my personal website. Take a look at some of my projects at the portfolio section and do contact me.'
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  return (
    <html lang='en' suppressHydrationWarning>
      <body className={poppins.className}>
        <SessionProvider session={session}>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <ToastProvider />
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
