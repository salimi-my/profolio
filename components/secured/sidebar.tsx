import Link from 'next/link';
import { LayoutTemplate } from 'lucide-react';

import { cn } from '@/lib/utils';
import useStore from '@/hooks/use-store';
import Menu from '@/components/secured/menu';
import { Button } from '@/components/ui/button';
import useSidebarToggle from '@/hooks/use-sidebar-toggle';
import SidebarToggle from '@/components/secured/sidebar-toggle';

export default function Sidebar() {
  const sidebar = useStore(useSidebarToggle, (state) => state);

  return (
    <aside
      className={cn(
        'fixed top-0 left-0 z-20 h-screen transition-all ease-in-out duration-300',
        sidebar?.isOpen === false
          ? '-translate-x-full lg:translate-x-0 w-[90px]'
          : '-translate-x-full lg:translate-x-0 w-72'
      )}
    >
      <SidebarToggle isOpen={sidebar?.isOpen} setIsOpen={sidebar?.setIsOpen} />
      <div className='relative h-full flex flex-col px-3 py-4 overflow-y-auto shadow-md dark:shadow-gray-800'>
        <Button
          className={cn(
            'transition-all ease-in-out duration-300 mb-1',
            sidebar?.isOpen === false ? 'translate-x-1' : 'translate-x-0'
          )}
          variant='link'
          asChild
        >
          <Link href='/admin' className='flex items-center gap-2'>
            <LayoutTemplate />
            <h1
              className={cn(
                'font-bold text-xl whitespace-nowrap transition-all ease-in-out duration-300',
                sidebar?.isOpen === false
                  ? '-translate-x-96 opacity-0 hidden'
                  : 'translate-x-0 opacity-100'
              )}
            >
              Profolio
            </h1>
          </Link>
        </Button>
        <Menu isOpen={sidebar?.isOpen} />
      </div>
    </aside>
  );
}
