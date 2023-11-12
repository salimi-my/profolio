import { redirect } from 'next/navigation';

import { auth } from '@/lib/auth';
import prismadb from '@/lib/prismadb';
import { DataTable } from '@/components/data-table/data-table';
import { columns } from '@/components/secured/qualification-table/columns';
import AddButton from '@/components/secured/qualification-table/add-button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

export const options = [
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
  const session = await auth();

  if (!session || !session.user) {
    redirect('/api/auth/signin');
  }

  const qualifications = await prismadb.qualification.findMany({
    where: {
      userId: session?.user?.id!
    },
    orderBy: {
      createdAt: 'asc'
    }
  });

  return (
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
          options={options}
          AddButton={<AddButton />}
          page='qualification'
        />
      </CardContent>
    </Card>
  );
}
