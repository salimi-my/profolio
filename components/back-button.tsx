'use client';

import { ArrowLeft } from 'lucide-react';
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
      className='bg-card mb-4'
      variant='outline'
    >
      <ArrowLeft className='size-4 mr-1' />
      Back
    </Button>
  );
}
