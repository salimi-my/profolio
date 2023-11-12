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

  if (!session || !session.user || !session.user.id) {
    redirect('/api/auth/signin');
  }

  const frontendItems = await prismadb.experience.findMany({
    where: {
      userId: session?.user?.id,
      type: 'FRONTEND'
    }
  });

  const backendItems = await prismadb.experience.findMany({
    where: {
      userId: session?.user?.id,
      type: 'BACKEND'
    }
  });

  return (
    <div className='grid lg:grid-cols-2 gap-4'>
      <Card className='rounded-lg border-none'>
        <CardHeader className='mx-[1px] pb-9'>
          <CardTitle className='text-xl font-semibold'>
            Frontend Development
          </CardTitle>
          <CardDescription>
            Manage your frontend development section informations.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ExperienceForm
            experienceType='FRONTEND'
            experienceItems={frontendItems}
          />
        </CardContent>
      </Card>
      <Card className='rounded-lg border-none'>
        <CardHeader className='mx-[1px] pb-9'>
          <CardTitle className='text-xl font-semibold'>
            Backend Development
          </CardTitle>
          <CardDescription>
            Manage your backend development section informations.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ExperienceForm
            experienceType='BACKEND'
            experienceItems={backendItems}
          />
        </CardContent>
      </Card>
    </div>
  );
}
