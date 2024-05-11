import { redirect } from 'next/navigation';

import prismadb from '@/lib/prismadb';
import { currentUser } from '@/lib/authentication';
import AboutForm from '@/components/admin/about-form';
import { ContentLayout } from '@/components/admin-panel/content-layout';
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription
} from '@/components/ui/card';

export default async function AboutPage() {
  const user = await currentUser();

  if (!user || !user.id) {
    redirect('/auth/sign-in');
  }

  const about = await prismadb.about.findFirst({
    where: {
      userId: user.id
    }
  });

  return (
    <ContentLayout title='About'>
      <Card className='rounded-lg border-none'>
        <CardHeader className='mx-[1px] pb-9'>
          <CardTitle className='text-xl font-semibold'>About</CardTitle>
          <CardDescription>
            Manage your about section informations.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AboutForm about={about} />
        </CardContent>
      </Card>
    </ContentLayout>
  );
}
