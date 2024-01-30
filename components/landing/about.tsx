'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Briefcase, FolderGit2, Laptop } from 'lucide-react';

import type getInformation from '@/data/information';
import { Button } from '@/components/ui/button';
import tilted from '@/public/web-developer-tilted.webp';
import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop
} from '@/lib/motion';

type AboutProps = Pick<Awaited<ReturnType<typeof getInformation>>, 'about'>;

export default function About({ about }: AboutProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.section
      ref={ref}
      initial='hidden'
      animate={isInView ? 'visible' : 'hidden'}
      id='about'
      className='md:mt-32'
    >
      <motion.h1
        variants={slideInFromTop(0.3)}
        className='text-center text-sm text-muted-foreground font-medium'
      >
        Get To Know
      </motion.h1>
      <motion.h2
        variants={slideInFromTop(0.4)}
        className='text-center text-2xl font-semibold pt-1'
      >
        About Me
      </motion.h2>
      <div className='w-full grid lg:grid-cols-7 gap-12 md:gap-24 2xl:gap-48 pt-12'>
        <motion.div
          variants={slideInFromLeft(0.3)}
          className='lg:col-span-3 w-4/5 md:w-1/2 mx-auto lg:w-full aspect-square rounded-2xl bg-gradient-to-tr from-transparent via-primary to-transparent'
        >
          <div className='rounded-2xl overflow-hidden rotate-[10deg] transition duration-300 ease-in-out hover:rotate-0 relative'>
            <Image src={tilted} alt='about' priority />
          </div>
        </motion.div>
        <div className='lg:col-span-4 flex flex-col gap-8'>
          <div className='grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-7'>
            <motion.article
              variants={slideInFromRight(0.3)}
              className='w-full rounded-2xl flex flex-col items-center bg-primary group hover:bg-primary-foreground transition-colors duration-300 ease-in-out border border-primary py-6 px-0 md:p-8'
            >
              <Briefcase className='w-6 h-6 text-primary-foreground group-hover:text-primary mb-4' />
              <h3 className='text-base text-primary-foreground group-hover:text-primary pb-2'>
                Experience
              </h3>
              <small className='text-xs text-center font-normal text-muted/60 group-hover:text-primary/80'>
                {about?.experience}
              </small>
            </motion.article>
            <motion.article
              variants={slideInFromRight(0.4)}
              className='w-full rounded-2xl flex flex-col items-center bg-primary group hover:bg-primary-foreground transition-colors duration-300 ease-in-out border border-primary py-6 px-0 md:p-8'
            >
              <FolderGit2 className='w-6 h-6 text-primary-foreground group-hover:text-primary mb-4' />
              <h3 className='text-base text-primary-foreground group-hover:text-primary pb-2'>
                Projects
              </h3>
              <small className='text-xs text-center font-normal text-muted/60 group-hover:text-primary/80'>
                {about?.project}
              </small>
            </motion.article>
            <motion.article
              variants={slideInFromRight(0.5)}
              className='w-full rounded-2xl flex flex-col items-center bg-primary group hover:bg-primary-foreground transition-colors duration-300 ease-in-out border border-primary py-6 px-0 md:p-8'
            >
              <Laptop className='w-6 h-6 text-primary-foreground group-hover:text-primary mb-4' />
              <h3 className='text-base text-primary-foreground group-hover:text-primary pb-2'>
                Worlwide
              </h3>
              <small className='text-xs text-center font-normal text-muted/60 group-hover:text-primary/80'>
                {about?.worldwide}
              </small>
            </motion.article>
          </div>
          <motion.p
            variants={slideInFromRight(0.4)}
            className='text-muted-foreground font-normal text-justify'
          >
            {about?.summary}
          </motion.p>
          <motion.div variants={slideInFromRight(0.5)}>
            <Button variant='default' asChild>
              <Link href='#contact'>Let&apos;s Talk</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
