import { redirect } from 'next/navigation';

import prismadb from '@/lib/prismadb';
import { currentUser } from '@/lib/authentication';
import ExperienceForm from '@/components/admin/experience-form';
import { ContentLayout } from '@/components/admin-panel/content-layout';
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription
} from '@/components/ui/card';

export default async function ExperiencePage() {
  const user = await currentUser();

  if (!user || !user.id) {
    redirect('/auth/sign-in');
  }

  const frontendItems = await prismadb.experience.findMany({
    where: {
      userId: user.id,
      type: 'FRONTEND'
    }
  });

  const backendItems = await prismadb.experience.findMany({
    where: {
      userId: user.id,
      type: 'BACKEND'
    }
  });

  return (
    <ContentLayout title='Experience'>
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
    </ContentLayout>
  );
}
