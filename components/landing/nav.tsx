'use client';

import Link from 'next/link';
import {
  Book,
  ClipboardCheck,
  GraduationCap,
  Home,
  MessageCircle,
  User
} from 'lucide-react';

import { Button } from '@/components/ui/button';

export default function Nav() {
  return (
    <nav className='bg-black bg-opacity-30 w-max py-3 px-7 fixed bottom-8 z-30 mx-auto inset-x-0 flex gap-3 rounded-full backdrop-blur-lg'>
      <Button
        variant='ghost'
        size='sm'
        className='rounded-full text-white px-0 w-8 h-8 xs:w-11 xs:h-11'
        asChild
      >
        <Link href='#home'>
          <Home className='w-5 h-5' />
        </Link>
      </Button>
      <Button
        variant='ghost'
        size='sm'
        className='rounded-full text-white px-0 w-8 h-8 xs:w-11 xs:h-11'
        asChild
      >
        <Link href='#about'>
          <User className='w-5 h-5' />
        </Link>
      </Button>
      <Button
        variant='ghost'
        size='sm'
        className='rounded-full text-white px-0 w-8 h-8 xs:w-11 xs:h-11'
        asChild
      >
        <Link href='#experience'>
          <Book className='w-5 h-5' />
        </Link>
      </Button>
      <Button
        variant='ghost'
        size='sm'
        className='rounded-full text-white px-0 w-8 h-8 xs:w-11 xs:h-11 hidden md:flex'
        asChild
      >
        <Link href='#expertise'>
          <ClipboardCheck className='w-5 h-5' />
        </Link>
      </Button>
      <Button
        variant='ghost'
        size='sm'
        className='rounded-full text-white px-0 w-8 h-8 xs:w-11 xs:h-11'
        asChild
      >
        <Link href='#qualification'>
          <GraduationCap className='w-6 h-6' />
        </Link>
      </Button>
      <Button
        variant='ghost'
        size='sm'
        className='rounded-full text-white px-0 w-8 h-8 xs:w-11 xs:h-11'
        asChild
      >
        <Link href='#contact'>
          <MessageCircle className='w-5 h-5' />
        </Link>
      </Button>
    </nav>
  );
}
