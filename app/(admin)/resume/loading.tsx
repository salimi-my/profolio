import { Skeleton } from '@/components/ui/skeleton';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ResumeLoading() {
  return (
    <Card className='rounded-lg border-none'>
      <CardHeader className='mx-[1px] pb-9'>
        <CardTitle className='text-xl font-semibold items-center flex justify-between'>
          <Skeleton className='h-7 w-[100px]' />
          <Skeleton className='h-7 w-[80px]' />
        </CardTitle>
        <Skeleton className='h-5 w-[170px]' />
      </CardHeader>
      <CardContent>
        <AspectRatio ratio={210 / 297}>
          <Skeleton className='h-full w-full' />
        </AspectRatio>
      </CardContent>
    </Card>
  );
}
