import { redirect } from 'next/navigation';

import { auth } from '@/lib/auth';
import prismadb from '@/lib/prismadb';
import MiscellaneousForm from '@/components/secured/miscellaneous-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

export default async function MiscellaneousPage() {
  const session = await auth();

  if (!session || !session.user) {
    redirect('/api/auth/signin');
  }

  const miscellaneous = await prismadb.miscellaneous.findFirst({
    where: {
      userId: session?.user?.id!
    },
    include: {
      titles: true
    }
  });

  return (
    <Card className='rounded-lg border-none'>
      <CardHeader className='mx-[1px] pb-9'>
        <CardTitle className='text-xl font-semibold'>Miscellaneous</CardTitle>
        <CardDescription>
          Manage your miscellaneous informations.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <MiscellaneousForm miscellaneous={miscellaneous} />
      </CardContent>
    </Card>
  );
}
