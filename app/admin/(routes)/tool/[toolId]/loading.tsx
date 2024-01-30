import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ToolIdLoading() {
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
          <div className='flex flex-col gap-4'>
            <div className='flex flex-col gap-4'>
              <div className='flex flex-col space-y-2 lg:col-span-2 h-full'>
                <Skeleton className='h-6 w-[150px] flex-none' />
                <Skeleton className='w-[200px] h-[200px] my-4' />
              </div>
            </div>
            <div className='flex flex-col gap-4'>
              <div className='space-y-2 lg:col-span-2'>
                <Skeleton className='h-6 w-[150px]' />
                <Skeleton className='h-9 w-full' />
              </div>
              <div className='space-y-2 lg:col-span-2'>
                <Skeleton className='h-6 w-[150px]' />
                <Skeleton className='h-9 w-full' />
              </div>
              <div className='mt-[14px]'>
                <Skeleton className='h-9 w-24' />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
