'use client';

import {
  Book,
  ClipboardCheck,
  GraduationCap,
  Home,
  MessageCircle,
  User
} from 'lucide-react';

import { useAnchor } from '@/hooks/use-anchor';
import NavButton from '@/components/landing/nav-button';

export default function Nav() {
  const currentAnchor = useAnchor();

  return (
    <nav className='w-screen flex justify-center fixed bottom-8 z-30'>
      <div className='bg-black bg-opacity-30 py-3 px-7 flex gap-3 rounded-full backdrop-blur-lg'>
        <NavButton
          name='Home'
          anchor='#home'
          icon={Home}
          active={
            currentAnchor === '#home' || currentAnchor === '' ? true : false
          }
        />
        <NavButton
          name='About'
          anchor='#about'
          icon={User}
          active={currentAnchor === '#about' ? true : false}
        />
        <NavButton
          name='Experience'
          anchor='#experience'
          icon={Book}
          active={currentAnchor === '#experience' ? true : false}
        />
        <NavButton
          name='Expertise'
          anchor='#expertise'
          icon={ClipboardCheck}
          active={currentAnchor === '#expertise' ? true : false}
          hideMobile
        />
        <NavButton
          name='Qualification'
          anchor='#qualification'
          icon={GraduationCap}
          active={currentAnchor === '#qualification' ? true : false}
        />
        <NavButton
          name='Contact'
          anchor='#contact'
          icon={MessageCircle}
          active={currentAnchor === '#contact' ? true : false}
        />
      </div>
    </nav>
  );
}
