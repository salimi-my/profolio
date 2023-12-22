'use client';

import { motion } from 'framer-motion';
import {
  Book,
  ClipboardCheck,
  FolderGit2,
  GraduationCap,
  Home,
  MessageCircle,
  User
} from 'lucide-react';

import { useAnchor } from '@/hooks/use-anchor';
import { slideInFromBottom } from '@/lib/motion';
import NavButton from '@/components/landing/nav-button';

export default function Nav() {
  const currentAnchor = useAnchor();

  return (
    <nav className='w-screen flex justify-center fixed bottom-8 z-30'>
      <motion.div
        initial='hidden'
        animate='visible'
        variants={slideInFromBottom(0.5)}
        className='bg-black bg-opacity-30 py-3 px-7 flex gap-3 rounded-full backdrop-blur-lg'
      >
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
          name='Portfolio'
          anchor='#portfolio'
          icon={FolderGit2}
          active={currentAnchor === '#portfolio' ? true : false}
        />
        <NavButton
          name='Contact'
          anchor='#contact'
          icon={MessageCircle}
          active={currentAnchor === '#contact' ? true : false}
        />
      </motion.div>
    </nav>
  );
}
