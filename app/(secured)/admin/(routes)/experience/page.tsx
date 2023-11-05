import { redirect } from 'next/navigation';

import { auth } from '@/lib/auth';
import prismadb from '@/lib/prismadb';
import ExperienceForm from '@/components/secured/experience-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

export default async function ExperiencePage() {
  const session = await auth();

  if (!session || !session.user) {
    redirect('/api/auth/signin');
  }

  const frontendItems = await prismadb.experience.findMany({
    where: {
      userId: session?.user?.id!,
      type: 'frontend'
    }
  });

  const backendItems = await prismadb.experience.findMany({
    where: {
      userId: session?.user?.id!,
      type: 'backend'
    }
  });

  return (
    <div className='grid lg:grid-cols-2 gap-4'>
      <Card className='rounded-lg border-none'>
        <CardHeader className='mx-[1px] pb-9'>
          <CardTitle className='text-xl font-bold'>
            Frontend Development
          </CardTitle>
          <CardDescription>
            Manage your frontend development section informations.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ExperienceForm
            experienceType='frontend'
            experienceItems={frontendItems}
          />
        </CardContent>
      </Card>
      <Card className='rounded-lg border-none'>
        <CardHeader className='mx-[1px] pb-9'>
          <CardTitle className='text-xl font-bold'>
            Backend Development
          </CardTitle>
          <CardDescription>
            Manage your backend development section informations.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ExperienceForm
            experienceType='backend'
            experienceItems={backendItems}
          />
        </CardContent>
      </Card>
    </div>
  );
}
