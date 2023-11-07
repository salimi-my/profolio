import { Calendar, LucideIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import type { Qualification } from '@prisma/client';

interface QualificationCardProps {
  icon: LucideIcon;
  qualificationType: string;
  data: Qualification[] | undefined;
}

export default function QualificationCard({
  icon: Icon,
  qualificationType,
  data
}: QualificationCardProps) {
  return (
    <article className='w-full rounded-2xl bg-primary group hover:bg-primary-foreground transition-colors duration-300 ease-in-out border border-primary py-9 px-6 md:px-10'>
      <div className='flex justify-center items-center space-x-3 pb-6'>
        <Icon className='text-primary-foreground group-hover:text-primary w-7 h-7' />
        <h3 className='text-center text-lg font-medium text-primary-foreground group-hover:text-primary'>
          {qualificationType === 'education' ? 'Education' : 'Experience'}
        </h3>
      </div>
      <div className='relative wrap overflow-hidden h-full'>
        <div className='absolute border border-opacity-20 border-primary-foreground/80 group-hover:border-primary h-full left-[50%]'></div>
        {data?.map((value, index) => (
          <div
            key={index}
            className={cn(
              'mb-8 flex justify-between items-center w-full',
              index % 2 === 0 && 'flex-row-reverse'
            )}
          >
            <div className='order-1 w-5/12'></div>
            <div className='z-20 flex items-center order-1 bg-primary-foreground group-hover:bg-primary shadow-xl w-6 h-6 rounded-full border-4 border-primary group-hover:border-primary-foreground' />
            <div className='order-1 w-5/12 text-primary group-hover:text-primary-foreground'>
              <div
                className={cn(
                  'flex items-center gap-3',
                  index % 2 === 0 && 'flex-row-reverse'
                )}
              >
                <div className='rounded-full bg-primary-foreground group-hover:bg-primary w-6 h-6 flex justify-center items-center p-1'>
                  <Calendar className='w-4 h-4' />
                </div>
                <div className='rounded-lg bg-primary-foreground group-hover:bg-primary px-2 py-1'>
                  <p className='text-xs font-medium'>
                    {value.startYear} - {value.endYear}
                  </p>
                </div>
              </div>
              <div className='rounded-lg bg-primary-foreground group-hover:bg-primary py-2 px-3 mt-3'>
                <h4 className='font-medium leading-5'>
                  {qualificationType === 'education'
                    ? value.degree
                    : value.position}
                </h4>
                <p className='font-medium text-xs text-muted-foreground pt-1'>
                  {qualificationType === 'education'
                    ? value.school
                    : value.company}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}
