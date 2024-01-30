import { redirect } from 'next/navigation';

import prismadb from '@/lib/prismadb';
import { currentUser } from '@/lib/authentication';
import AboutForm from '@/components/secured/about-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
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
  );
}
