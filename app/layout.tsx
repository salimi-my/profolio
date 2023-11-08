import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { EdgeStoreProvider } from '@/lib/edgestore';
import ToastProvider from '@/providers/toast-provider';
import { ThemeProvider } from '@/providers/theme-provider';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

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
  return (
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
  );
}
