import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Book, Briefcase, FolderGit2, Laptop } from 'lucide-react';

import { auth } from '@/lib/auth';
import prismadb from '@/lib/prismadb';
import { Button } from '@/components/ui/button';
import MiniCard from '@/components/secured/mini-card';
import RecentProject from '@/components/secured/recent-project';
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

  if (!session || !session.user || !session.user.id) {
    redirect('/api/auth/signin');
  }

  const [
    portfolioCount,
    workingStart,
    currentJob,
    education,
    experience,
    projects
  ] = await prismadb.$transaction([
    prismadb.portfolio.count({
      where: {
        userId: session.user.id
      }
    }),
    prismadb.qualification.findFirst({
      select: {
        startYear: true
      },
      where: {
        userId: session.user.id,
        type: 'EXPERIENCE'
      },
      orderBy: {
        id: 'asc'
      }
    }),
    prismadb.qualification.findFirst({
      where: {
        userId: session.user.id,
        type: 'EXPERIENCE',
        endYear: 'Present'
      }
    }),
    prismadb.qualification.findMany({
      where: {
        userId: session.user.id,
        type: 'EDUCATION'
      },
      orderBy: {
        id: 'desc'
      }
    }),
    prismadb.qualification.findMany({
      where: {
        userId: session.user.id,
        type: 'EXPERIENCE'
      },
      orderBy: {
        id: 'desc'
      }
    }),
    prismadb.portfolio.findMany({
      take: 5,
      where: {
        userId: session.user.id
      },
      orderBy: {
        createdAt: 'desc'
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
        <MiniCard
          icon={FolderGit2}
          title='Portfolio'
          content={portfolioCount}
          desc='completed projects'
        />
        <MiniCard
          icon={Book}
          title='Experience'
          content={workingYears}
          desc='years of working'
        />
        <MiniCard
          icon={Briefcase}
          title='Current Job'
          content={!!currentJob ? currentJob.position : ''}
          desc={!!currentJob ? currentJob.company : ''}
        />
        <MiniCard
          icon={Laptop}
          title='Location'
          content='Worldwide'
          desc='remotely available'
        />
      </div>
      <div className='grid xl:grid-cols-5 gap-4 mt-4'>
        <Card className='rounded-lg border-none xl:col-span-3'>
          <CardHeader className='relative mx-[1px]'>
            <CardTitle className='text-xl font-bold items-center flex justify-between'>
              Qualification
              <Button
                variant='link'
                size='default'
                className='h-5 px-0'
                asChild
              >
                <Link href='/admin/qualification'>View all</Link>
              </Button>
            </CardTitle>
            <CardDescription>
              My personal journey on education & working experience
            </CardDescription>
          </CardHeader>
          <CardContent className='pb-9'>
            <QualificationTab education={education} experience={experience} />
          </CardContent>
        </Card>
        <Card className='rounded-lg border-none xl:col-span-2'>
          <CardHeader className='relative mx-[1px]'>
            <CardTitle className='text-xl font-bold items-center flex justify-between'>
              Recent Projects
              <Button
                variant='link'
                size='default'
                className='h-5 px-0'
                asChild
              >
                <Link href='/admin/portfolio'>View all</Link>
              </Button>
            </CardTitle>
            <CardDescription>
              My latest 5 completed projects list
            </CardDescription>
          </CardHeader>
          <CardContent className='pb-9'>
            <RecentProject projects={projects} />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
