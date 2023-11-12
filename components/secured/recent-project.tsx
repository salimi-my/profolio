import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';

import { Button } from '@/components/ui/button';
import type { Portfolio } from '@prisma/client';

interface RecentProjectProps {
  projects: Portfolio[];
}

export default function RecentProject({ projects }: RecentProjectProps) {
  return (
    <div className='flex flex-col space-y-4'>
      {projects.map((project) => (
        <div key={project.id} className='flex justify-between items-center'>
          <div className='flex items-center'>
            <Link
              href={project.image!}
              target='_blank'
              rel='noopener noreferrer'
              className='relative group flex w-20 h-20 grow-0'
            >
              <Image
                src={project.thumbnail!}
                alt={project.title}
                fill
                className='border rounded-md group-hover:opacity-70 transition-opacity ease-in-out duration-300 object-cover object-top'
              />
            </Link>
            <div className='ml-4'>
              <Button variant='link' className='px-0 h-5'>
                <Link
                  href={project.demoUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-xs md:text-sm font-semibold max-w-[150px] md:max-w-[250px] truncate'
                >
                  {project.title}
                </Link>
              </Button>
              <p className='text-xs text-muted-foreground'>
                Created: {format(project.createdAt, 'dd MMM yyyy')}
              </p>
            </div>
          </div>
          <div>
            <Button size='sm' asChild>
              <Link href={`/admin/portfolio/${project.id}`}>View</Link>
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
