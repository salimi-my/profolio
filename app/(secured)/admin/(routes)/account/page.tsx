import { redirect } from 'next/navigation';

import prismadb from '@/lib/prismadb';
import { currentUser } from '@/lib/authentication';
import AccountForm from '@/components/secured/account-form';
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
      name: true,
      email: true
    }
  });

  return (
    <Card className='rounded-lg border-none'>
      <CardHeader className='mx-[1px] pb-9'>
        <CardTitle className='text-xl font-semibold'>Account</CardTitle>
        <CardDescription>
          Manage your account profile informations.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <AccountForm user={loggedInUser} />
      </CardContent>
    </Card>
  );
}
