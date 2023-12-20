'use client';

import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { CopyPlus, Loader2 } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import type getData from '@/actions/get-data';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

export default function Portfolio({
  portfolioWithBlur,
  portfolioCount
}: Partial<Awaited<ReturnType<typeof getData>>>) {
  const { toast } = useToast();

  const [hide, setHide] = useState(false);
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
        if (response.data.length > 5) {
          setOffset((prev) => prev + 6);
        } else {
          setHide(true);
        }

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

  useEffect(() => {
    if (offset == portfolioCount!) {
      setHide(true);
    }
  }, [offset, portfolioCount]);

  return (
    <section id='portfolio' className='mt-32'>
      <h1 className='text-center text-sm text-muted-foreground font-medium'>
        My Recent Work
      </h1>
      <h2 className='text-center text-2xl font-semibold pt-1'>Portfolio</h2>
      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8 pt-8'>
        {portfolios?.map((portfolio) => (
          <article
            key={portfolio.id}
            className='relative w-full h-min rounded-2xl flex flex-col group'
          >
            <div className='relative w-full h-[250px] lg:h-[300px] overflow-hidden'>
              {portfolio.image && portfolio.blurredDataUrl ? (
                <Image
                  src={portfolio.image}
                  alt='portfolio'
                  fill
                  placeholder='blur'
                  blurDataURL={portfolio.blurredDataUrl}
                  sizes='(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'
                  className='object-cover object-top group-hover:object-bottom transition-all duration-6000 ease-in-out rounded-t-2xl border-t border-x'
                />
              ) : (
                portfolio.image && (
                  <Image
                    src={portfolio.image}
                    alt='portfolio'
                    fill
                    sizes='(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'
                    className='object-cover object-top group-hover:object-bottom transition-all duration-6000 ease-in-out rounded-t-2xl border-t border-x'
                  />
                )
              )}
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
                    rel='noopener noreferrer'
                  >
                    Live Demo
                  </Link>
                </Button>
              </div>
            </div>
          </article>
        ))}
      </div>
      {!hide && (
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
    </section>
  );
}
