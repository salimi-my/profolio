import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function MiscellaneousLoading() {
  return (
    <Card className='rounded-lg border-none'>
      <CardHeader className='mx-[1px] pb-9'>
        <CardTitle className='text-xl font-semibold'>
          <Skeleton className='h-7 w-[100px]' />
        </CardTitle>
        <Skeleton className='h-5 w-[300px]' />
      </CardHeader>
      <CardContent>
        <div className='grid lg:grid-cols-2 gap-4'>
          {[...Array(10)].map((_, i) => (
            <div key={i} className='space-y-2'>
              <Skeleton className='h-5 w-[150px]' />
              <Skeleton className='h-9 w-full' />
            </div>
          ))}
          <div className='lg:col-span-2 mt-7'>
            {[...Array(2)].map((_, i) => (
              <div
                key={i}
                className='flex items-end gap-2 sm:gap-3 justify-between'
              >
                <div className='grow'>
                  <div className='space-y-2'>
                    <Skeleton className={cn('h-6 w-12', i !== 0 && 'hidden')} />
                    <Skeleton
                      className={cn('h-[23px] w-[200px]', i !== 0 && 'hidden')}
                    />
                    <Skeleton className='h-9 w-full' />
                  </div>
                </div>
                <div className='grow-0'>
                  <Skeleton className='h-9 w-9' />
                </div>
              </div>
            ))}
            <Skeleton className='h-8 w-[75px] mt-2' />
          </div>
          <div>
            <Skeleton className='h-9 w-24 mt-2' />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
