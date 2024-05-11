import { redirect } from 'next/navigation';

import prismadb from '@/lib/prismadb';
import { currentUser } from '@/lib/authentication';
import { DataTable } from '@/components/data-table/data-table';
import { columns } from '@/components/admin/tool-table/columns';
import AddButton from '@/components/admin/tool-table/add-button';
import { ContentLayout } from '@/components/admin-panel/content-layout';
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription
} from '@/components/ui/card';

const filterOptions = [
  {
    label: 'Light',
    value: 'LIGHT'
  },
  {
    label: 'Dark',
    value: 'DARK'
  }
];

export default async function ToolPage() {
  const user = await currentUser();

  if (!user || !user.id) {
    redirect('/auth/sign-in');
  }

  const tools = await prismadb.tool.findMany({
    where: {
      userId: user.id
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  return (
    <ContentLayout title='Tool & Apps'>
      <Card className='rounded-lg border-none'>
        <CardHeader className='mx-[1px] pb-9'>
          <CardTitle className='text-xl font-semibold'>Tool & Apps</CardTitle>
          <CardDescription>
            Manage your tool and apps list section informations.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            data={tools}
            columns={columns}
            options={filterOptions}
            AddButton={<AddButton />}
            page='tool'
          />
        </CardContent>
      </Card>
    </ContentLayout>
  );
}
