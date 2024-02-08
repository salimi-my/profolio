'use client';

import Link from 'next/link';
import { useRef } from 'react';
import type { Miscellaneous } from '@prisma/client';
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import { LazyMotion, domAnimation, m, useInView } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { slideInFromLeft, slideInFromRight } from '@/lib/motion';

interface FooterProps {
  miscellaneous: Miscellaneous | null;
}

export default function Footer({ miscellaneous }: FooterProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <LazyMotion features={domAnimation}>
      <m.footer
        ref={ref}
        initial='hidden'
        animate={isInView ? 'visible' : 'hidden'}
        id='footer'
        className='mt-32 bg-primary overflow-x-hidden'
      >
        <div className='container px-4 md:px-8 mx-auto w-full flex flex-col py-12'>
          <m.div
            variants={slideInFromLeft(0.2)}
            className='flex justify-center'
          >
            <Button
              variant='link'
              className='text-primary-foreground text-4xl font-medium uppercase'
              asChild
            >
              <Link href='/#home' title='Salimi'>
                Salimi
              </Link>
            </Button>
          </m.div>
          <m.ul
            variants={slideInFromRight(0.3)}
            className='w-full max-w-3xl mx-auto flex flex-col items-center md:flex-row justify-between mt-8'
          >
            <li>
              <Button
                variant='ghost'
                className='text-primary-foreground'
                asChild
              >
                <Link href='/#home' title='Home'>
                  Home
                </Link>
              </Button>
            </li>
            <li>
              <Button
                variant='ghost'
                className='text-primary-foreground'
                asChild
              >
                <Link href='/#about' title='About'>
                  About
                </Link>
              </Button>
            </li>
            <li>
              <Button
                variant='ghost'
                className='text-primary-foreground'
                asChild
              >
                <Link href='/#experience' title='Experience'>
                  Experience
                </Link>
              </Button>
            </li>
            <li>
              <Button
                variant='ghost'
                className='text-primary-foreground'
                asChild
              >
                <Link href='/#expertise' title='Expertise'>
                  Expertise
                </Link>
              </Button>
            </li>
            <li>
              <Button
                variant='ghost'
                className='text-primary-foreground'
                asChild
              >
                <Link href='/#qualification' title='Qualification'>
                  Qualification
                </Link>
              </Button>
            </li>
            <li>
              <Button
                variant='ghost'
                className='text-primary-foreground'
                asChild
              >
                <Link href='/#portfolio' title='Portfolio'>
                  Portfolio
                </Link>
              </Button>
            </li>
            <li>
              <Button
                variant='ghost'
                className='text-primary-foreground'
                asChild
              >
                <Link href='/#tool' title='Tool'>
                  Tool
                </Link>
              </Button>
            </li>
            <li>
              <Button
                variant='ghost'
                className='text-primary-foreground'
                asChild
              >
                <Link href='/#contact' title='Contact'>
                  Contact
                </Link>
              </Button>
            </li>
          </m.ul>
          <m.div
            variants={slideInFromLeft(0.4)}
            className='flex justify-center gap-4 mt-8'
          >
            <Button variant='secondary' size='icon' asChild>
              <Link
                href={`${miscellaneous ? miscellaneous.facebookUrl : '#'}`}
                aria-label='Facebook'
                target='_blank'
                title='Facebook'
                rel='noopener noreferrer'
              >
                <Facebook className='w-5 h-5' />
              </Link>
            </Button>
            <Button variant='secondary' size='icon' asChild>
              <Link
                href={`${miscellaneous ? miscellaneous.instagramUrl : '#'}`}
                aria-label='Instagram'
                target='_blank'
                title='Instagram'
                rel='noopener noreferrer'
              >
                <Instagram className='w-5 h-5' />
              </Link>
            </Button>
            <Button variant='secondary' size='icon' asChild>
              <Link
                href={`${miscellaneous ? miscellaneous.twitterUrl : '#'}`}
                aria-label='Twitter'
                target='_blank'
                title='Twitter'
                rel='noopener noreferrer'
              >
                <Twitter className='w-5 h-5' />
              </Link>
            </Button>
            <Button variant='secondary' size='icon' asChild>
              <Link
                href={`${miscellaneous ? miscellaneous.linkedinUrl : '#'}`}
                aria-label='LinkedIn'
                target='_blank'
                title='LinkedIn'
                rel='noopener noreferrer'
              >
                <Linkedin className='w-5 h-5' />
              </Link>
            </Button>
          </m.div>
          <m.div
            variants={slideInFromRight(0.5)}
            className='flex flex-col md:flex-row justify-center items-center mt-9 gap-4'
          >
            <Button variant='outline' className='h-6 w-[146px]' asChild>
              <Link
                href='/privacy-policy'
                className='text-primary-foreground text-xs'
                title='Privacy Policy'
              >
                Privacy Policy
              </Link>
            </Button>
            <Button variant='outline' className='h-6 w-[146px]' asChild>
              <Link
                href='/terms-and-conditions'
                className='text-primary-foreground text-xs'
                title='Terms & Conditions'
              >
                Terms & Conditions
              </Link>
            </Button>
          </m.div>
          <m.div
            variants={slideInFromLeft(0.6)}
            className='flex justify-center mt-8 mb-16'
          >
            <small className='text-muted'>
              Created by
              <Button
                variant='link'
                className='text-muted text-xs px-1'
                asChild
              >
                <Link
                  href='https://www.linkedin.com/in/mohamad-salimi'
                  target='_blank'
                  rel='noopener noreferrer'
                  title='LinkedIn'
                >
                  Salimi
                </Link>
              </Button>
              &copy; {new Date().getFullYear()}.
            </small>
          </m.div>
        </div>
      </m.footer>
    </LazyMotion>
  );
}
