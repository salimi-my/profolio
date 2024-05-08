'use client';

import Link from 'next/link';
import { PlusCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';

export default function AddButton() {
  return (
    <Button size='sm' className='h-8' asChild>
      <Link href='/portfolio/create'>
        <PlusCircle size={16} className='mr-2' />
        Create
      </Link>
    </Button>
  );
}
