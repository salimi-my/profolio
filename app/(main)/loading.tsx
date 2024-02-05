import { Skeleton } from '@/components/ui/skeleton';

export default function MainLoading() {
  return (
    <main className='container max-w-6xl px-4 md:px-8 mx-auto mt-5 relative overflow-x-hidden'>
      <Skeleton className='w-[76px] h-8 mb-5' />
      <Skeleton className='w-[300px] h-12 mb-7' />

      {[...Array(50)].map((_, i) => (
        <Skeleton key={i} className='w-full h-5 mb-4' />
      ))}
    </main>
  );
}
