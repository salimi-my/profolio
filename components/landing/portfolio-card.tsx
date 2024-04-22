'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRef } from 'react';
import type { Prisma } from '@prisma/client';
import { m, useInView } from 'framer-motion';

import { fadeIn } from '@/lib/motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

type PortfolioWithTags = Prisma.PortfolioGetPayload<{
  include: { tags: true };
}>;

interface PortfolioCardProps {
  portfolio: PortfolioWithTags;
  index: number;
}

export default function PortfolioCard({
  portfolio,
  index
}: PortfolioCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <m.article
      ref={ref}
      initial='hidden'
      animate={isInView ? 'visible' : 'hidden'}
      custom={index}
      variants={fadeIn((((index - 1) % 3) + 3) / 10)}
      className='relative w-full h-min rounded-2xl flex flex-col group'
    >
      <div className='relative w-full h-[250px] lg:h-[300px] overflow-hidden'>
        {portfolio.image && portfolio.blurDataUrl ? (
          <Image
            src={portfolio.image}
            alt='portfolio'
            fill
            placeholder='blur'
            blurDataURL={portfolio.blurDataUrl}
            sizes='(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'
            className='object-cover object-top group-hover:object-bottom transition-all duration-6000 ease-in-out rounded-t-2xl border-t border-x'
          />
        ) : portfolio.image ? (
          <Image
            src={portfolio.image}
            alt='portfolio'
            fill
            sizes='(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'
            className='object-cover object-top group-hover:object-bottom transition-all duration-6000 ease-in-out rounded-t-2xl border-t border-x'
          />
        ) : null}
      </div>
      <div className='flex flex-col gap-4 rounded-b-2xl py-9 px-6 md:px-6 border border-t-primary dark:border-t-zinc-100 group-hover:border-t-zinc-200 dark:group-hover:border-t-zinc-800 bg-primary group-hover:bg-primary-foreground transition-colors duration-300 ease-in-out'>
        <h3 className='text-base lg:text-[1.2rem] font-medium text-primary-foreground group-hover:text-primary'>
          {portfolio.title}
        </h3>
        <div className='flex gap-3'>
          {portfolio.tags.map((tag, index) => (
            <Badge
              key={index}
              variant='outline'
              className='rounded-full border-primary-foreground group-hover:border-primary text-primary-foreground group-hover:text-primary font-medium'
            >
              {tag.name}
            </Badge>
          ))}
        </div>
        <p className='text-xs lg:text-sm text-primary-foreground group-hover:text-primary'>
          {portfolio.description}
        </p>
        <div className='pt-2 flex gap-4 items-center'>
          <Button
            variant='outline'
            className='text-primary-foreground group-hover:text-primary group-hover:border-primary'
            asChild
          >
            <Link
              href={portfolio.githubUrl}
              target='_blank'
              title='Github'
              rel='noopener noreferrer'
            >
              GitHub
            </Link>
          </Button>
          <Button
            variant='secondary'
            className='group-hover:bg-primary hover:opacity-90 transition-opacity duration-100 ease-in-out group-hover:text-primary-foreground'
            asChild
          >
            <Link
              href={portfolio.demoUrl}
              target='_blank'
              title='Live Demo'
              rel='noopener noreferrer'
            >
              Live Demo
            </Link>
          </Button>
        </div>
      </div>
    </m.article>
  );
}
