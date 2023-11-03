'use client';

import {
  Book,
  ClipboardCheck,
  GraduationCap,
  Home,
  MessageCircle,
  User
} from 'lucide-react';

import NavButton from '@/components/landing/nav-button';

export default function Nav() {
  return (
    <nav className='bg-black bg-opacity-30 w-max py-3 px-7 fixed bottom-8 z-30 mx-auto inset-x-0 flex gap-3 rounded-full backdrop-blur-lg'>
      <NavButton name='Home' anchor='#home' icon={Home} />
      <NavButton name='About' anchor='#about' icon={User} />
      <NavButton name='Experience' anchor='#experience' icon={Book} />
      <NavButton
        name='Expertise'
        anchor='#expertise'
        icon={ClipboardCheck}
        hideMobile
      />
      <NavButton
        name='Qualification'
        anchor='#qualification'
        icon={GraduationCap}
      />
      <NavButton name='Contact' anchor='#contact' icon={MessageCircle} />
    </nav>
  );
}
