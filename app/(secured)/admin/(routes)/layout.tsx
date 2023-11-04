'use client';

import { cn } from '@/lib/utils';
import useStore from '@/hooks/use-store';
import Footer from '@/components/secured/footer';
import Navbar from '@/components/secured/navbar';
import Sidebar from '@/components/secured/sidebar';
import useSidebarToggle from '@/hooks/use-sidebar-toggle';

export default function AdminRouteLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const sidebar = useStore(useSidebarToggle, (state) => state);

  return (
    <>
      <Sidebar />
      <main
        className={cn(
          'min-h-[calc(100vh_-_56px)] bg-zinc-50 dark:bg-zinc-800 transition-[margin-left] ease-in-out duration-300',
          sidebar?.isOpen === false ? 'lg:ml-[90px]' : 'lg:ml-72'
        )}
      >
        <Navbar />
        <div className='container pt-8 pb-8'>{children}</div>
      </main>
      <footer
        className={cn(
          'transition-[margin-left] ease-in-out duration-300',
          sidebar?.isOpen === false ? 'lg:ml-[90px]' : 'lg:ml-72'
        )}
      >
        <Footer />
      </footer>
    </>
  );
}
