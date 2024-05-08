'use client';

import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { LayoutGrid, LogOut, User } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useCurrentUser } from '@/hooks/use-current-user';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

export default function UserNav() {
  const user = useCurrentUser();

  return (
    <DropdownMenu>
      <TooltipProvider disableHoverableContent>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button
                variant='outline'
                className='relative h-8 w-8 rounded-full'
              >
                <Avatar className='h-8 w-8'>
                  <AvatarImage src={user?.image || ''} alt={user?.name || ''} />
                  <AvatarFallback className='bg-transparent'>
                    <User className='w-5 h-5' />
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent side='bottom'>Profile</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DropdownMenuContent className='w-56' align='end' forceMount>
        <DropdownMenuLabel className='font-normal'>
          <div className='flex flex-col space-y-1'>
            <p className='text-sm font-medium leading-none'>{user?.name}</p>
            <p className='text-xs leading-none text-muted-foreground'>
              {user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className='hover:cursor-pointer' asChild>
            <Link href='/dashboard' className='flex items-center'>
              <LayoutGrid className='w-4 h-4 mr-3 text-muted-foreground' />
              Dashboard
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className='hover:cursor-pointer' asChild>
            <Link href='/account' className='flex items-center'>
              <User className='w-4 h-4 mr-3 text-muted-foreground' />
              Account
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className='hover:cursor-pointer'
          onClick={() => signOut()}
        >
          <LogOut className='w-4 h-4 mr-3 text-muted-foreground' />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
