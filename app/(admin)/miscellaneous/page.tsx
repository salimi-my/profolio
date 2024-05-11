import { redirect } from 'next/navigation';

import prismadb from '@/lib/prismadb';
import { currentUser } from '@/lib/authentication';
import MiscellaneousForm from '@/components/admin/miscellaneous-form';
import { ContentLayout } from '@/components/admin-panel/content-layout';
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription
} from '@/components/ui/card';

export default async function MiscellaneousPage() {
  const user = await currentUser();

  if (!user || !user.id) {
    redirect('/auth/sign-in');
  }

  const miscellaneous = await prismadb.miscellaneous.findFirst({
    where: {
      userId: user.id
    },
    include: {
      titles: true
    }
  });

  return (
    <ContentLayout title='Miscellaneous'>
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
    </ContentLayout>
  );
}
