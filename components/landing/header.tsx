'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTypewriter, Cursor } from 'react-simple-typewriter';
import { MessageCircle, Facebook, Linkedin, Github } from 'lucide-react';

import type getData from '@/actions/get-data';
import { Button } from '@/components/ui/button';
import profile from '@/public/web-developer.webp';
import {
  fadeIn,
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop
} from '@/lib/motion';

export default function Header({
  miscellaneous
}: Partial<Awaited<ReturnType<typeof getData>>>) {
  const [text] = useTypewriter({
    words: miscellaneous
      ? miscellaneous?.titles.map((title) => title.name)
      : [],
    loop: true
  });

  return (
    <motion.header
      initial='hidden'
      animate='visible'
      id='home'
      className='h-screen pt-28 min-h-[900px] max-h-[900px]'
    >
      <div className='text-center h-full relative'>
        <motion.h1
          variants={slideInFromTop(0.3)}
          className='text-sm text-muted-foreground font-medium'
        >
          Hello, I am
        </motion.h1>
        <motion.div
          variants={slideInFromTop(0.4)}
          className='flex flex-col justify-start items-center'
        >
          <Link href='/'>
            <h2 className='text-3xl xs:text-4xl sm:text-[2.5rem] font-medium leading-7 py-4'>
              Mohamad Salimi
            </h2>
          </Link>
        </motion.div>
        <motion.div
          variants={fadeIn(0.5)}
          className='pl-[0.1rem] tracking-[0.4rem]'
        >
          <span className='text-gradient xs:text-base sm:text-lg font-medium'>
            {text}
          </span>
          <Cursor cursorColor='#444444' cursorStyle='|' />
        </motion.div>
        <div className='inline-flex space-x-3 pt-9'>
          <motion.div variants={slideInFromLeft(0.5)}>
            <Button variant='outline' asChild>
              <Link
                href={miscellaneous ? miscellaneous.cvUrl : '#'}
                target='_blank'
                rel='noopener noreferrer'
              >
                Download CV
              </Link>
            </Button>
          </motion.div>
          <motion.div variants={slideInFromRight(0.5)}>
            <Button variant='default' asChild>
              <Link href='#contact'>
                <MessageCircle className='mr-2 w-5 h-5' /> Let&apos;s Talk
              </Link>
            </Button>
          </motion.div>
        </div>
        <div className='flex justify-between items-end'>
          <div className='flex flex-col items-center gap-4'>
            <motion.div variants={slideInFromLeft(0.2)} className='flex'>
              <Link
                href={miscellaneous ? miscellaneous.facebookUrl : '#'}
                aria-label='Facebook'
                target='_blank'
                rel='noopener noreferrer'
                className='bg-primary p-1 rounded-md hover:bg-zinc-600 dark:hover:bg-zinc-400 transition-colors duration-300 ease-in-out'
              >
                <Facebook className='text-white dark:text-zinc-950 w-4 h-4' />
              </Link>
            </motion.div>
            <motion.div variants={slideInFromLeft(0.3)} className='flex'>
              <Link
                href={miscellaneous ? miscellaneous.linkedinUrl : '#'}
                aria-label='LinkedIn'
                target='_blank'
                rel='noopener noreferrer'
                className='bg-primary p-1 rounded-md hover:bg-zinc-600 dark:hover:bg-zinc-400 transition-colors duration-300 ease-in-out'
              >
                <Linkedin className='text-white dark:text-zinc-950 w-4 h-4' />
              </Link>
            </motion.div>
            <motion.div variants={slideInFromLeft(0.4)} className='flex'>
              <Link
                href={miscellaneous ? miscellaneous.githubUrl : '#'}
                aria-label='GitHub'
                target='_blank'
                rel='noopener noreferrer'
                className='bg-primary p-1 rounded-md hover:bg-zinc-600 dark:hover:bg-zinc-400 transition-colors duration-300 ease-in-out'
              >
                <Github className='text-white dark:text-zinc-950 w-4 h-4' />
              </Link>
            </motion.div>
            <motion.div
              variants={slideInFromLeft(0.5)}
              className='flex after:content-[""] after:w-[1px] after:h-[2rem] after:bg-primary'
            />
          </div>
          <motion.div
            variants={slideInFromTop(0.5)}
            className='grow flex justify-center'
          >
            <div className='me w-60 h-96 xs:w-72 xs:h-96 md:w-[22rem] md:h-[30rem]'>
              <Image src={profile} alt='me' priority />
            </div>
          </motion.div>
          <div className='flex flex-col items-center justify-end gap-4 transform'>
            <motion.div variants={slideInFromRight(0.4)} className='relative'>
              <div className='mouse' />
            </motion.div>
            <motion.div variants={slideInFromRight(0.5)}>
              <Link
                href='#contact'
                className='text-primary hover:opacity-60 transition-opacity duration-300 ease-in-out'
              >
                <p className='text-sm [writing-mode:vertical-lr]'>
                  Scroll Down
                </p>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
