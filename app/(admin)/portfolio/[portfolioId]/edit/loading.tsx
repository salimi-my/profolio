import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function EditPortfolioLoading() {
  return (
    <>
      <Skeleton className='h-9 w-[85px] mb-4' />
      <Card className='rounded-lg border-none'>
        <CardHeader className='mx-[1px] pb-9'>
          <CardTitle className='text-xl font-semibold'>
            <Skeleton className='h-7 w-[100px]' />
          </CardTitle>
          <Skeleton className='h-5 w-[300px]' />
        </CardHeader>
        <CardContent>
          <div className='grid lg:grid-cols-2 gap-8'>
            <div className='flex flex-col gap-4'>
              <div className='flex flex-col space-y-2 lg:col-span-2 h-full'>
                <Skeleton className='h-6 w-[150px] flex-none' />
                <Skeleton className='min-h-[150px] h-full w-full my-4' />
              </div>
            </div>
            <div className='flex flex-col gap-4'>
              <div className='space-y-2 lg:col-span-2'>
                <Skeleton className='h-6 w-[150px]' />
                <Skeleton className='h-9 w-full' />
              </div>
              <div className='space-y-2 lg:col-span-2'>
                <Skeleton className='h-6 w-[150px]' />
                <Skeleton className='h-[118px] w-full' />
              </div>
              <div className='space-y-2 lg:col-span-2'>
                <Skeleton className='h-6 w-[150px]' />
                <Skeleton className='h-9 w-full' />
              </div>
              <div className='space-y-2 lg:col-span-2'>
                <Skeleton className='h-6 w-[150px]' />
                <Skeleton className='h-9 w-full' />
              </div>
              <div>
                {[...Array(1)].map((_, i) => (
                  <div
                    key={i}
                    className='flex items-end gap-2 sm:gap-3 justify-between'
                  >
                    <div className='grow'>
                      <div className='space-y-2'>
                        <Skeleton
                          className={cn('h-6 w-12', i !== 0 && 'hidden')}
                        />
                        <Skeleton
                          className={cn(
                            'h-[19px] w-[200px]',
                            i !== 0 && 'hidden'
                          )}
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
              <div className='mt-4'>
                <Skeleton className='h-9 w-24' />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
