import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function DashboardLoading() {
  return (
    <>
      <div className='flex items-center justify-between mb-4'>
        <Skeleton className='h-9 w-[222px]' />
        <div className='flex items-center'>
          <Skeleton className='h-8 w-[91px]' />
        </div>
      </div>
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        {[...Array(4)].map((_, i) => (
          <Card key={i} className='rounded-lg border-none'>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                <Skeleton className='h-5 w-[54px]' />
              </CardTitle>
              <Skeleton className='h-5 w-5' />
            </CardHeader>
            <CardContent>
              <Skeleton className='h-7 w-[100px]' />
              <Skeleton className='h-4 w-[100px] mt-1' />
            </CardContent>
          </Card>
        ))}
      </div>
      <div className='grid xl:grid-cols-5 gap-4 mt-4'>
        <Card className='rounded-lg border-none xl:col-span-3'>
          <CardHeader className='relative mx-[1px]'>
            <CardTitle className='text-xl font-bold items-center flex justify-between'>
              <Skeleton className='h-5 w-[119px]' />
              <Skeleton className='h-5 w-12' />
            </CardTitle>
            <Skeleton className='h-5 w-[200px]' />
          </CardHeader>
          <CardContent className='pb-9'>
            <Skeleton className='h-7 w-full' />
            <Skeleton className='min-h-[420px] h-full w-full mt-6' />
          </CardContent>
        </Card>
        <Card className='rounded-lg border-none xl:col-span-2'>
          <CardHeader className='relative mx-[1px]'>
            <CardTitle className='text-xl font-bold items-center flex justify-between'>
              <Skeleton className='h-5 w-[119px]' />
              <Skeleton className='h-5 w-12' />
            </CardTitle>
            <Skeleton className='h-5 w-[200px]' />
          </CardHeader>
          <CardContent className='pb-9'>
            <div className='flex flex-col space-y-4'>
              {[...Array(5)].map((_, i) => (
                <div key={i} className='flex justify-between items-center'>
                  <div className='flex items-center'>
                    <Skeleton className='w-20 h-20' />
                    <div className='ml-4'>
                      <Skeleton className='h-5 w-24' />
                      <Skeleton className='h-4 w-20 mt-1' />
                    </div>
                  </div>
                  <div>
                    <Skeleton className='h-8 w-[52px]' />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
