'use client';

import Link from 'next/link';
import { LucideIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';

interface NavButtonProps {
  name: string;
  anchor: string;
  icon: LucideIcon;
  active: boolean;
  hideMobile?: boolean;
}

export default function NavButton({
  name,
  anchor,
  icon: Icon,
  active,
  hideMobile
}: NavButtonProps) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <Button
            variant='ghost'
            size='sm'
            className={cn(
              'rounded-full text-white px-0 w-8 h-8 xs:w-11 xs:h-11',
              hideMobile && 'hidden md:flex',
              active && 'bg-primary-foreground text-primary'
            )}
            asChild
          >
            <Link href={anchor}>
              <Icon
                className={cn(name === 'Qualification' ? 'w-6 h-6' : 'w-5 h-5')}
              />
            </Link>
          </Button>
        </TooltipTrigger>
        <TooltipContent
          sideOffset={16}
          className='rounded-full bg-black bg-opacity-70 backdrop-blur-lg text-white'
        >
          <p className='font-medium'>{name}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
