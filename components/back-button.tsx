'use client';

import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';

interface BackButtonProps {
  slug?: string;
}

export default function BackButton({ slug }: BackButtonProps) {
  const router = useRouter();

  return (
    <Button
      onClick={() => {
        if (typeof slug === 'string') {
          router.push(slug);
        } else {
          router.back();
        }
      }}
      className='bg-white dark:text-primary-foreground dark:hover:text-primary dark:hover:border-slate-500 mb-4'
      variant='outline'
    >
      <ChevronLeft size={18} />
      Back
    </Button>
  );
}
