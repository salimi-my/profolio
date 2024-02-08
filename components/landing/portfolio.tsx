'use client';

import axios from 'axios';
import { useRef, useState } from 'react';
import { CopyPlus, Loader2 } from 'lucide-react';
import { LazyMotion, domAnimation, m, useInView } from 'framer-motion';

import type getInformation from '@/data/information';
import { slideInFromTop } from '@/lib/motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import PortfolioCard from '@/components/landing/portfolio-card';

type PortfolioProps = Pick<
  Awaited<ReturnType<typeof getInformation>>,
  'portfolioWithBlur'
>;

export default function Portfolio({ portfolioWithBlur }: PortfolioProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const { toast } = useToast();

  const [offset, setOffset] = useState(6);
  const [loading, setLoading] = useState(false);
  const [portfolios, setPortfolios] = useState(portfolioWithBlur);

  const onLoadMore = async () => {
    try {
      setLoading(true);

      const response = await axios.get('/api/portfolio', {
        params: {
          offset: offset
        }
      });

      if (response.status === 200) {
        setOffset((prev) => prev + response.data.length);
        setPortfolios([...portfolios!, ...response.data]);
      }
    } catch (error) {
      console.log(error);

      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with your request.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <LazyMotion features={domAnimation}>
      <m.section
        ref={ref}
        initial='hidden'
        animate={isInView ? 'visible' : 'hidden'}
        id='portfolio'
        className='mt-32'
      >
        <m.span
          variants={slideInFromTop(0.3)}
          className='block text-center text-sm text-muted-foreground font-medium'
        >
          My Recent Work
        </m.span>
        <m.h2
          variants={slideInFromTop(0.4)}
          className='text-center text-2xl font-semibold pt-1'
        >
          Portfolio
        </m.h2>
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8 pt-8'>
          {portfolios.map((portfolio, index) => (
            <PortfolioCard
              key={portfolio.id}
              portfolio={portfolio}
              index={index + 1}
            />
          ))}
        </div>
        {offset % 6 === 0 && (
          <div className='flex justify-center mt-8'>
            <Button onClick={onLoadMore} variant='default' disabled={loading}>
              {!loading && (
                <>
                  <CopyPlus className='w-4 h-4 mr-2' />
                  Show More
                </>
              )}
              {loading && (
                <>
                  <Loader2 className='animate-spin w-4 h-4 mr-2' size={18} />
                  Loading...
                </>
              )}
            </Button>
          </div>
        )}
      </m.section>
    </LazyMotion>
  );
}
