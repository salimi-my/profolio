import { Calendar } from 'lucide-react';

import { cn } from '@/lib/utils';
import type { Qualification } from '@prisma/client';

interface QualificationTimelineProps {
  qualificationType: string;
  data: Qualification[] | undefined;
}

export default function QualificationTimeline({
  qualificationType,
  data
}: QualificationTimelineProps) {
  return (
    <div className='w-full py-6'>
      <div className='relative wrap overflow-hidden h-full'>
        <div className='absolute border border-opacity-20 border-primary/30 h-full right-[calc(50%_-_1px)]'></div>
        {data?.map((value, index) => (
          <div
            key={index}
            className={cn(
              'mb-8 flex justify-between items-center w-full',
              index % 2 === 0 && 'flex-row-reverse'
            )}
          >
            <div className='order-1 w-5/12'></div>
            <div className='z-20 flex items-center order-1 bg-zinc-400 w-6 h-6 rounded-full border-4 border-primary-foreground' />
            <div className='order-1 w-5/12 text-primary'>
              <div
                className={cn(
                  'flex items-center gap-3',
                  index % 2 === 0 && 'flex-row-reverse'
                )}
              >
                <div className='rounded-full bg-muted w-6 h-6 flex justify-center items-center p-1'>
                  <Calendar className='w-4 h-4' />
                </div>
                <div className='rounded-lg bg-muted px-2 py-1'>
                  <p className='text-xs font-medium'>
                    {value.startYear} - {value.endYear}
                  </p>
                </div>
              </div>
              <div className='rounded-lg bg-muted py-2 px-3 mt-3'>
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
    </div>
  );
}
