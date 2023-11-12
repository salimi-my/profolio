import { redirect } from 'next/navigation';

import { auth } from '@/lib/auth';
import prismadb from '@/lib/prismadb';
import { DataTable } from '@/components/data-table/data-table';
import { columns } from '@/components/secured/tool-table/columns';
import AddButton from '@/components/secured/tool-table/add-button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

export const options = [
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
  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    redirect('/api/auth/signin');
  }

  const tools = await prismadb.tool.findMany({
    where: {
      userId: session?.user?.id
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  return (
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
          options={options}
          AddButton={<AddButton />}
          page='tool'
        />
      </CardContent>
    </Card>
  );
}
