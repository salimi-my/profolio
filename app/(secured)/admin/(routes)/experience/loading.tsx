import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

export default function ExperienceLoading() {
  return (
    <div className='grid lg:grid-cols-2 gap-4'>
      <Card className='rounded-lg border-none'>
        <CardHeader className='mx-[1px] pb-9'>
          <CardTitle className='text-xl font-semibold'>
            <Skeleton className='h-7 w-[150px]' />
          </CardTitle>
          <CardDescription>
            <Skeleton className='h-5 w-[300px]' />
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='flex flex-col'>
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className='flex items-end gap-2 sm:gap-3 justify-between'
              >
                <div className='grow grid grid-cols-2 gap-2 sm:gap-3'>
                  <div className='space-y-2'>
                    <Skeleton className={cn('h-6 w-7', i !== 0 && 'hidden')} />
                    <Skeleton className='h-9 w-full' />
                  </div>
                  <div className='space-y-2'>
                    <Skeleton className={cn('h-5 w-9', i !== 0 && 'hidden')} />
                    <Skeleton className='h-9 w-full' />
                  </div>
                </div>
                <div className='grow-0'>
                  <Skeleton className='h-9 w-9' />
                </div>
              </div>
            ))}
            <Skeleton className='h-8 w-[75px] mt-2' />
            <Skeleton className='h-9 w-24 mt-5' />
          </div>
        </CardContent>
      </Card>
      <Card className='rounded-lg border-none'>
        <CardHeader className='mx-[1px] pb-9'>
          <CardTitle className='text-xl font-semibold'>
            <Skeleton className='h-7 w-[150px]' />
          </CardTitle>
          <CardDescription>
            <Skeleton className='h-5 w-[300px]' />
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='flex flex-col'>
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className='flex items-end gap-2 sm:gap-3 justify-between'
              >
                <div className='grow grid grid-cols-2 gap-2 sm:gap-3'>
                  <div className='space-y-2'>
                    <Skeleton className={cn('h-5 w-7', i !== 0 && 'hidden')} />
                    <Skeleton className='h-9 w-full' />
                  </div>
                  <div className='space-y-2'>
                    <Skeleton className={cn('h-5 w-9', i !== 0 && 'hidden')} />
                    <Skeleton className='h-9 w-full' />
                  </div>
                </div>
                <div className='grow-0'>
                  <Skeleton className='h-9 w-9' />
                </div>
              </div>
            ))}
            <Skeleton className='h-8 w-[75px] mt-2' />
            <Skeleton className='h-9 w-24 mt-5' />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
