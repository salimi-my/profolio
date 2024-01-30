'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';

import { cn } from '@/lib/utils';
import type getInformation from '@/data/information';
import { slideInFromRight, slideInFromTop } from '@/lib/motion';

type ToolProps = Pick<Awaited<ReturnType<typeof getInformation>>, 'tool'>;

export default function Tool({ tool }: ToolProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.section
      ref={ref}
      initial='hidden'
      animate={isInView ? 'visible' : 'hidden'}
      id='tool'
      className='mt-32'
    >
      <motion.h1
        variants={slideInFromTop(0.3)}
        className='text-center text-sm text-muted-foreground font-medium'
      >
        What I Use
      </motion.h1>
      <motion.h2
        variants={slideInFromTop(0.4)}
        className='text-center text-2xl font-semibold pt-1'
      >
        Tools & Apps
      </motion.h2>
      <motion.div
        variants={slideInFromRight(0.5)}
        className='w-full max-w-4xl mx-auto pt-8'
      >
        <div className='w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-200px),transparent_100%)]'>
          <ul className='flex items-center justify-center md:justify-start [&_li]:mx-5 md:[&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll'>
            {tool.map((item) => (
              <li key={item.id}>
                {item.image && (
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={56}
                    height={56}
                    className={cn(
                      'w-12 h-12 md:w-14 md:h-14 grayscale-[20%]',
                      item.color === 'DARK' && 'dark:invert-[80%]'
                    )}
                  />
                )}
              </li>
            ))}
          </ul>
          <ul
            className='flex items-center justify-center md:justify-start [&_li]:mx-5 md:[&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll'
            aria-hidden='true'
          >
            {tool?.map((item) => (
              <li key={item.id}>
                {item.image && (
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={56}
                    height={56}
                    className={cn(
                      'w-12 h-12 md:w-14 md:h-14 grayscale-[20%]',
                      item.color === 'DARK' && 'dark:invert-[80%]'
                    )}
                  />
                )}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </motion.section>
  );
}
