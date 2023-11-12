import Image from 'next/image';

import { cn } from '@/lib/utils';
import type getData from '@/actions/get-data';

export default function Tool({
  tool
}: Partial<Awaited<ReturnType<typeof getData>>>) {
  return (
    <section id='tool' className='mt-32'>
      <h1 className='text-center text-sm text-muted-foreground font-medium'>
        What I Use
      </h1>
      <h2 className='text-center text-2xl font-semibold pt-1'>Tools & Apps</h2>
      <div className='w-full max-w-4xl mx-auto pt-8'>
        <div className='w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-200px),transparent_100%)]'>
          <ul className='flex items-center justify-center md:justify-start [&_li]:mx-5 md:[&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll'>
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
      </div>
    </section>
  );
}
