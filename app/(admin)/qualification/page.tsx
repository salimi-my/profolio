import { redirect } from 'next/navigation';

import prismadb from '@/lib/prismadb';
import { currentUser } from '@/lib/authentication';
import { DataTable } from '@/components/data-table/data-table';
import { ContentLayout } from '@/components/admin-panel/content-layout';
import { columns } from '@/components/admin/qualification-table/columns';
import AddButton from '@/components/admin/qualification-table/add-button';
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription
} from '@/components/ui/card';

const filterOptions = [
  {
    label: 'Education',
    value: 'EDUCATION'
  },
  {
    label: 'Experience',
    value: 'EXPERIENCE'
  }
];

export default async function QualificationPage() {
  const user = await currentUser();

  if (!user || !user.id) {
    redirect('/auth/sign-in');
  }

  const qualifications = await prismadb.qualification.findMany({
    where: {
      userId: user.id
    },
    orderBy: {
      createdAt: 'asc'
    }
  });

  return (
    <ContentLayout title='Qualification'>
      <Card className='rounded-lg border-none'>
        <CardHeader className='mx-[1px] pb-9'>
          <CardTitle className='text-xl font-semibold'>Qualification</CardTitle>
          <CardDescription>
            Manage your qualification section informations.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            data={qualifications}
            columns={columns}
            options={filterOptions}
            AddButton={<AddButton />}
            page='qualification'
          />
        </CardContent>
      </Card>
    </ContentLayout>
  );
}
