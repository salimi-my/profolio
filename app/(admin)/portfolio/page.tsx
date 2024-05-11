import { ComponentType } from 'react';
import { redirect } from 'next/navigation';

import prismadb from '@/lib/prismadb';
import { currentUser } from '@/lib/authentication';
import { DataTable } from '@/components/data-table/data-table';
import { columns } from '@/components/admin/portfolio-table/columns';
import AddButton from '@/components/admin/portfolio-table/add-button';
import { ContentLayout } from '@/components/admin-panel/content-layout';
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription
} from '@/components/ui/card';

const filterOptions: {
  label: string;
  value: string;
  icon?: ComponentType<{ className?: string | undefined }> | undefined;
}[] = [];

export default async function PortfolioPage() {
  const user = await currentUser();

  if (!user || !user.id) {
    redirect('/auth/sign-in');
  }

  const portfolios = await prismadb.portfolio.findMany({
    where: {
      userId: user.id
    },
    orderBy: {
      createdAt: 'desc'
    },
    include: {
      tags: true
    }
  });

  return (
    <ContentLayout title='All Projects'>
      <Card className='rounded-lg border-none'>
        <CardHeader className='mx-[1px] pb-9'>
          <CardTitle className='text-xl font-semibold'>Portfolio</CardTitle>
          <CardDescription>
            Manage your projects list section informations.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            data={portfolios}
            columns={columns}
            options={filterOptions}
            AddButton={<AddButton />}
            page='portfolio'
          />
        </CardContent>
      </Card>
    </ContentLayout>
  );
}
