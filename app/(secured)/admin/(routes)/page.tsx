import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Book, Briefcase, FolderGit2, Laptop } from 'lucide-react';

import { auth } from '@/lib/auth';
import prismadb from '@/lib/prismadb';
import { Button } from '@/components/ui/button';
import QualificationTab from '@/components/secured/qualification-tab';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

export default async function DashboardPage() {
  const session = await auth();

  if (!session || !session.user) {
    redirect('/api/auth/signin');
  }

  const [portfolioCount, workingStart, education, experience] =
    await prismadb.$transaction([
      prismadb.portfolio.count(),
      prismadb.qualification.findFirst({
        select: {
          startYear: true
        },
        where: {
          type: 'EXPERIENCE'
        },
        orderBy: {
          id: 'asc'
        }
      }),
      prismadb.qualification.findMany({
        where: {
          type: 'EDUCATION'
        },
        orderBy: {
          id: 'desc'
        }
      }),
      prismadb.qualification.findMany({
        where: {
          type: 'EXPERIENCE'
        },
        orderBy: {
          id: 'desc'
        }
      })
    ]);

  const workingYears =
    typeof workingStart?.startYear === 'string'
      ? new Date().getFullYear() - parseInt(workingStart?.startYear)
      : 0;

  return (
    <>
      <div className='flex items-center justify-between mb-4'>
        <h2 className='text-2xl md:text-3xl font-bold tracking-tight'>
          Welcome {session.user.name}
        </h2>
        <div className='flex items-center'>
          <Button size='sm' asChild>
            <Link href='/admin/portfolio/create'>Add project</Link>
          </Button>
        </div>
      </div>
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <Card className='rounded-lg border-none'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Portfolio</CardTitle>
            <FolderGit2 className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{portfolioCount}</div>
            <p className='text-xs text-muted-foreground'>completed projects</p>
          </CardContent>
        </Card>
        <Card className='rounded-lg border-none'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Experience</CardTitle>
            <Book className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{workingYears}</div>
            <p className='text-xs text-muted-foreground'>years of working</p>
          </CardContent>
        </Card>
        <Card className='rounded-lg border-none'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Current Job</CardTitle>
            <Briefcase className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold max-w-[206px] truncate'>
              Web Developer
            </div>
            <p className='text-xs text-muted-foreground'>Logicwise Sdn Bhd</p>
          </CardContent>
        </Card>
        <Card className='rounded-lg border-none'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Location</CardTitle>
            <Laptop className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold max-w-[206px] truncate'>
              Worldwide
            </div>
            <p className='text-xs text-muted-foreground'>remotely available</p>
          </CardContent>
        </Card>
      </div>
      <div className='grid xl:grid-cols-5 gap-4 mt-4'>
        <Card className='rounded-lg border-none col-span-3'>
          <CardHeader className='relative mx-[1px]'>
            <CardTitle className='text-xl font-bold'>Qualification</CardTitle>
            <CardDescription>
              My personal journey on education & working experience
            </CardDescription>
          </CardHeader>
          <CardContent className='pb-9'>
            <QualificationTab education={education} experience={experience} />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
