import { BadgeCheck } from 'lucide-react';

import type getData from '@/actions/get-data';

export default function Experience({
  frontend,
  backend
}: Partial<Awaited<ReturnType<typeof getData>>>) {
  return (
    <section id='experience' className='mt-32'>
      <h1 className='text-center text-sm text-muted-foreground font-medium'>
        What Skills I have
      </h1>
      <h2 className='text-center text-2xl pt-1 font-semibold'>
        Technical Level
      </h2>
      <div className='grid lg:grid-cols-2 gap-8 pt-8'>
        <div className='w-full rounded-2xl flex flex-col items-center bg-primary group hover:bg-primary-foreground transition-colors duration-300 ease-in-out border border-primary py-9 px-6 md:py-9 md:px-20'>
          <h3 className='text-lg md:text-xl text-primary-foreground group-hover:text-primary pb-8'>
            Frontend Development
          </h3>
          <div className='w-full grid grid-cols-2 gap-y-4'>
            {frontend?.map(({ skill, level }, index) => (
              <article
                key={index}
                className='flex gap-4 text-primary-foreground group-hover:text-primary'
              >
                <BadgeCheck className='w-5 h-5 mt-[2px]' />
                <div className='flex flex-col'>
                  <h4 className='text-sm md:text-base'>{skill}</h4>
                  <small className='text-xs md:text-sm text-muted/70 group-hover:text-primary/70 capitalize'>
                    {level}
                  </small>
                </div>
              </article>
            ))}
          </div>
        </div>
        <div className='w-full rounded-2xl flex flex-col items-center bg-primary group hover:bg-primary-foreground transition-colors duration-300 ease-in-out border border-primary py-9 px-6 md:py-9 md:px-20'>
          <h3 className='text-lg md:text-xl text-primary-foreground group-hover:text-primary pb-8'>
            Backend Development
          </h3>
          <div className='w-full grid grid-cols-2 gap-y-4'>
            {backend?.map(({ skill, level }, index) => (
              <article
                key={index}
                className='flex gap-4 text-primary-foreground group-hover:text-primary'
              >
                <BadgeCheck className='w-5 h-5 mt-[2px]' />
                <div className='flex flex-col'>
                  <h4 className='text-sm md:text-base'>{skill}</h4>
                  <small className='text-xs md:text-sm text-muted/70 group-hover:text-primary/70 capitalize'>
                    {level}
                  </small>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
