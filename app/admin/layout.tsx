'use client';

import { cn } from '@/lib/utils';
import useStore from '@/hooks/use-store';
import Footer from '@/components/admin/footer';
import Navbar from '@/components/admin/navbar';
import Sidebar from '@/components/admin/sidebar';
import ModalProvider from '@/providers/modal-provider';
import useSidebarToggle from '@/hooks/use-sidebar-toggle';

export default function AdminLayout({
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
          'min-h-[calc(100vh_-_56px)] bg-zinc-50 dark:bg-zinc-900 transition-[margin-left] ease-in-out duration-300',
          sidebar?.isOpen === false ? 'lg:ml-[90px]' : 'lg:ml-72'
        )}
      >
        <Navbar />
        <div className='container pt-8 pb-8 px-4 sm:px-8'>{children}</div>
      </main>
      <footer
        className={cn(
          'transition-[margin-left] ease-in-out duration-300',
          sidebar?.isOpen === false ? 'lg:ml-[90px]' : 'lg:ml-72'
        )}
      >
        <Footer />
      </footer>
      <ModalProvider />
    </>
  );
}
