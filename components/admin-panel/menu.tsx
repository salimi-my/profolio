'use client';

import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import {
  Book,
  User,
  List,
  Text,
  LogOut,
  FileText,
  FolderGit2,
  LayoutGrid,
  GraduationCap,
  ClipboardCheck,
  TerminalSquare
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider
} from '@/components/ui/tooltip';

interface MenuProps {
  isOpen: boolean | undefined;
}

export default function Menu({ isOpen }: MenuProps) {
  const pathname = usePathname();

  const routes = [
    {
      href: '/dashboard',
      label: 'Dashboard',
      active: pathname.includes('/dashboard'),
      icon: <LayoutGrid size={18} />
    },
    {
      href: '/about',
      label: 'About',
      active: pathname.includes('/about'),
      icon: <Text size={18} />
    },
    {
      href: '/experience',
      label: 'Experience',
      active: pathname.includes('/experience'),
      icon: <Book size={18} />
    },
    {
      href: '/expertise',
      label: 'Expertise',
      active: pathname.includes('/expertise'),
      icon: <ClipboardCheck size={18} />
    },
    {
      href: '/qualification',
      label: 'Qualification',
      active: pathname.includes('/qualification'),
      icon: <GraduationCap size={20} />
    },
    {
      href: '/portfolio',
      label: 'Portfolio',
      active: pathname.includes('/portfolio'),
      icon: <FolderGit2 size={18} />
    },
    {
      href: '/miscellaneous',
      label: 'Miscellaneous',
      active: pathname.includes('/miscellaneous'),
      icon: <List size={18} />
    },
    {
      href: '/tool',
      label: 'Tool & Apps',
      active: pathname.includes('/tool'),
      icon: <TerminalSquare size={18} />
    },
    {
      href: '/resume',
      label: 'Resume',
      active: pathname.includes('/resume'),
      icon: <FileText size={18} />
    },
    {
      href: '/account',
      label: 'Account',
      active: pathname.includes('/account'),
      icon: <User size={18} />
    }
  ];

  return (
    <nav className='mt-8 h-full'>
      <ul className='flex flex-col h-full items-start space-y-1 px-2'>
        {routes.map((route) => (
          <li className='w-full' key={route.href}>
            <TooltipProvider disableHoverableContent>
              <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                  <Button
                    variant={route.active ? 'secondary' : 'ghost'}
                    className='w-full justify-start h-10'
                    asChild
                  >
                    <Link href={route.href}>
                      <span className={cn(isOpen === false ? '' : 'mr-4')}>
                        {route.icon}
                      </span>
                      <p
                        className={cn(
                          'whitespace-nowrap transition-[transform,opacity] ease-in-out duration-300',
                          isOpen === false
                            ? '-translate-x-96 opacity-0'
                            : 'translate-x-0 opacity-100'
                        )}
                      >
                        {route.label}
                      </p>
                    </Link>
                  </Button>
                </TooltipTrigger>
                {isOpen === false && (
                  <TooltipContent side='right'>{route.label}</TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          </li>
        ))}
        <li className='w-full grow flex items-end'>
          <TooltipProvider disableHoverableContent>
            <Tooltip delayDuration={100}>
              <TooltipTrigger asChild>
                <Button
                  onClick={() => signOut()}
                  variant='outline'
                  className='w-full justify-center h-10 mt-4'
                >
                  <span className={cn(isOpen === false ? '' : 'mr-4')}>
                    <LogOut size={18} />
                  </span>
                  <p
                    className={cn(
                      'whitespace-nowrap transition-[transform,opacity] ease-in-out duration-300',
                      isOpen === false
                        ? '-translate-x-96 opacity-0 hidden'
                        : 'translate-x-0 opacity-100'
                    )}
                  >
                    Sign out
                  </p>
                </Button>
              </TooltipTrigger>
              {isOpen === false && (
                <TooltipContent side='right'>Sign out</TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        </li>
      </ul>
    </nav>
  );
}
