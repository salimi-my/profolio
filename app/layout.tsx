import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';

import { ThemeProvider } from '@/providers/theme-provider';

import './globals.css';

const poppins = Poppins({
  style: ['normal'],
  weight: '500',
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: 'Salimi — My Personal Website',
  description:
    'Hi! I am Salimi and this is my personal website. Take a look at some of my projects at the portfolio section and do contact me.'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={poppins.className}>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
