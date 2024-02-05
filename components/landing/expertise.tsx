'use client';

import { useRef } from 'react';
import { Check } from 'lucide-react';
import { motion, useInView } from 'framer-motion';

import type getInformation from '@/data/information';
import { slideInFromLeft, slideInFromTop } from '@/lib/motion';

type ExpertiseProps = Pick<
  Awaited<ReturnType<typeof getInformation>>,
  'seooptimization' | 'webdevelopment' | 'contentcreation'
>;

export default function Expertise({
  seooptimization,
  webdevelopment,
  contentcreation
}: ExpertiseProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.section
      ref={ref}
      initial='hidden'
      animate={isInView ? 'visible' : 'hidden'}
      id='expertise'
      className='mt-32'
    >
      <motion.span
        variants={slideInFromTop(0.3)}
        className='block text-center text-sm text-muted-foreground font-medium'
      >
        What I Offer
      </motion.span>
      <motion.h2
        variants={slideInFromTop(0.4)}
        className='text-center text-2xl pt-1 font-semibold'
      >
        Expertise
      </motion.h2>
      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-x-8 lg:gap-8 pt-12'>
        <motion.article
          variants={slideInFromLeft(0.3)}
          className='relative w-full rounded-2xl flex flex-col bg-primary group hover:bg-primary-foreground transition-colors duration-300 ease-in-out border border-primary py-9 px-6 md:px-10'
        >
          <div className='absolute -top-6 left-0 right-0 mx-auto w-fit rounded-full bg-primary-foreground px-4 py-2 border-2 border-primary shadow-md'>
            <h3 className='text-base font-medium text-primary'>
              SEO Optimization
            </h3>
          </div>
          <ul className='pt-6 flex flex-col gap-5 text-sm font-normal text-primary-foreground group-hover:text-primary'>
            {seooptimization.map((item, index) => (
              <li key={index} className='flex items-start space-x-4'>
                <div>
                  <Check className='w-4 h-4 mt-[2px]' />
                </div>
                <p>{item.service}</p>
              </li>
            ))}
          </ul>
        </motion.article>

        <motion.article
          variants={slideInFromLeft(0.4)}
          className='relative w-full rounded-2xl flex flex-col bg-primary group hover:bg-primary-foreground transition-colors duration-300 ease-in-out border border-primary py-9 px-6 lg:px-10'
        >
          <div className='absolute -top-6 left-0 right-0 mx-auto w-fit rounded-full bg-primary-foreground px-4 py-2 border-2 border-primary shadow-md'>
            <h3 className='text-base font-medium text-primary'>
              Web Development
            </h3>
          </div>
          <ul className='pt-6 flex flex-col gap-5 text-sm font-normal text-primary-foreground group-hover:text-primary'>
            {webdevelopment.map((item, index) => (
              <li key={index} className='flex items-start space-x-4'>
                <div>
                  <Check className='w-4 h-4 mt-[2px]' />
                </div>
                <p>{item.service}</p>
              </li>
            ))}
          </ul>
        </motion.article>

        <motion.article
          variants={slideInFromLeft(0.5)}
          className='relative w-full rounded-2xl flex flex-col bg-primary group hover:bg-primary-foreground transition-colors duration-300 ease-in-out border border-primary py-9 px-6 md:lg-10'
        >
          <div className='absolute -top-6 left-0 right-0 mx-auto w-fit rounded-full bg-primary-foreground px-4 py-2 border-2 border-primary shadow-md'>
            <h3 className='text-base font-medium text-primary'>
              Content Creation
            </h3>
          </div>
          <ul className='pt-6 flex flex-col gap-5 text-sm font-normal text-primary-foreground group-hover:text-primary'>
            {contentcreation.map((item, index) => (
              <li key={index} className='flex items-start space-x-4'>
                <div>
                  <Check className='w-4 h-4 mt-[2px]' />
                </div>
                <p>{item.service}</p>
              </li>
            ))}
          </ul>
        </motion.article>
      </div>
    </motion.section>
  );
}
