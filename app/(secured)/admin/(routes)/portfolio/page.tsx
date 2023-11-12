import { redirect } from 'next/navigation';

import { auth } from '@/lib/auth';
import prismadb from '@/lib/prismadb';
import { DataTable } from '@/components/data-table/data-table';
import { columns } from '@/components/secured/portfolio-table/columns';
import AddButton from '@/components/secured/portfolio-table/add-button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

export const options = [];

export default async function PortfolioPage() {
  const session = await auth();

  if (!session || !session.user) {
    redirect('/api/auth/signin');
  }

  const portfolios = await prismadb.portfolio.findMany({
    where: {
      userId: session?.user?.id!
    },
    orderBy: {
      createdAt: 'desc'
    },
    include: {
      tags: true
    }
  });

  return (
    <Card className='rounded-lg border-none'>
      <CardHeader className='mx-[1px] pb-9'>
        <CardTitle className='text-xl font-semibold'>Portfolio</CardTitle>
        <CardDescription>
          Manage your portfolio list section informations.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <DataTable
          data={portfolios}
          columns={columns}
          options={options}
          AddButton={<AddButton />}
          page='portfolio'
        />
      </CardContent>
    </Card>
  );
}
