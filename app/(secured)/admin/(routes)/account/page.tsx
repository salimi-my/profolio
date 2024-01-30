import { redirect } from 'next/navigation';

import prismadb from '@/lib/prismadb';
import { currentUser } from '@/lib/authentication';
import ProfileForm from '@/components/secured/profile-form';
import PasswordForm from '@/components/secured/password-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

export default async function AccountPage() {
  const user = await currentUser();

  if (!user || !user.id) {
    redirect('/auth/sign-in');
  }

  const loggedInUser = await prismadb.user.findUnique({
    where: {
      id: user.id
    },
    select: {
      id: true,
      name: true,
      email: true
    }
  });

  return (
    <div className='grid lg:grid-cols-2 gap-4'>
      <Card className='rounded-lg border-none'>
        <CardHeader className='mx-[1px] pb-9'>
          <CardTitle className='text-xl font-semibold'>Profile</CardTitle>
          <CardDescription>
            Manage your account profile informations.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProfileForm user={loggedInUser} />
        </CardContent>
      </Card>
      <Card className='rounded-lg border-none'>
        <CardHeader className='mx-[1px] pb-9'>
          <CardTitle className='text-xl font-semibold'>Password</CardTitle>
          <CardDescription>Manage your account password.</CardDescription>
        </CardHeader>
        <CardContent>
          <PasswordForm />
        </CardContent>
      </Card>
    </div>
  );
}
