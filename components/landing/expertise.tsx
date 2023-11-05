import { Check } from 'lucide-react';

import type getData from '@/actions/get-data';

export default function Expertise({
  seooptimization,
  webdevelopment,
  contentcreation
}: Partial<Awaited<ReturnType<typeof getData>>>) {
  return (
    <section id='expertise' className='mt-32'>
      <h1 className='text-center text-sm text-muted-foreground font-medium'>
        What I Offer
      </h1>
      <h2 className='text-center text-2xl pt-1 font-medium'>Expertise</h2>
      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-x-8 lg:gap-8 pt-12'>
        <article className='relative w-full rounded-2xl flex flex-col bg-primary group hover:bg-primary-foreground transition-colors duration-300 ease-in-out border border-primary py-9 px-6 md:px-10'>
          <div className='absolute -top-6 left-0 right-0 mx-auto w-fit rounded-full bg-primary-foreground px-4 py-2 border-2 border-primary shadow-md'>
            <h3 className='text-base font-medium text-primary'>
              SEO Optimization
            </h3>
          </div>
          <ul className='pt-6 flex flex-col gap-5 text-sm font-normal text-primary-foreground group-hover:text-primary'>
            {seooptimization?.map((item, index) => (
              <li key={index} className='flex items-start space-x-4'>
                <div>
                  <Check className='w-4 h-4 mt-[2px]' />
                </div>
                <p>{item.service}</p>
              </li>
            ))}
          </ul>
        </article>

        <article className='relative w-full rounded-2xl flex flex-col bg-primary group hover:bg-primary-foreground transition-colors duration-300 ease-in-out border border-primary py-9 px-6 lg:px-10'>
          <div className='absolute -top-6 left-0 right-0 mx-auto w-fit rounded-full bg-primary-foreground px-4 py-2 border-2 border-primary shadow-md'>
            <h3 className='text-base font-medium text-primary'>
              Web Development
            </h3>
          </div>
          <ul className='pt-6 flex flex-col gap-5 text-sm font-normal text-primary-foreground group-hover:text-primary'>
            {webdevelopment?.map((item, index) => (
              <li key={index} className='flex items-start space-x-4'>
                <div>
                  <Check className='w-4 h-4 mt-[2px]' />
                </div>
                <p>{item.service}</p>
              </li>
            ))}
          </ul>
        </article>

        <article className='relative w-full rounded-2xl flex flex-col bg-primary group hover:bg-primary-foreground transition-colors duration-300 ease-in-out border border-primary py-9 px-6 md:lg-10'>
          <div className='absolute -top-6 left-0 right-0 mx-auto w-fit rounded-full bg-primary-foreground px-4 py-2 border-2 border-primary shadow-md'>
            <h3 className='text-base font-medium text-primary'>
              Content Creation
            </h3>
          </div>
          <ul className='pt-6 flex flex-col gap-5 text-sm font-normal text-primary-foreground group-hover:text-primary'>
            {contentcreation?.map((item, index) => (
              <li key={index} className='flex items-start space-x-4'>
                <div>
                  <Check className='w-4 h-4 mt-[2px]' />
                </div>
                <p>{item.service}</p>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}
