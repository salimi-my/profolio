import { redirect } from 'next/navigation';

import prismadb from '@/lib/prismadb';
import BackButton from '@/components/back-button';
import { currentUser } from '@/lib/authentication';
import PortfolioForm from '@/components/admin/portfolio-form';
import { ContentLayout } from '@/components/admin-panel/content-layout';
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription
} from '@/components/ui/card';

export default async function EditPortfolioPage({
  params
}: {
  params: { portfolioId: string };
}) {
  const user = await currentUser();

  if (!user || !user.id) {
    redirect('/auth/sign-in');
  }

  const portfolio = await prismadb.portfolio.findUnique({
    where: {
      id: params.portfolioId,
      userId: user.id
    },
    include: {
      tags: true
    }
  });

  return (
    <ContentLayout title='Edit Project'>
      <BackButton slug='/portfolio' />
      <Card className='rounded-lg border-none'>
        <CardHeader className='mx-[1px] pb-9'>
          <CardTitle className='text-xl font-semibold'>Edit Project</CardTitle>
          <CardDescription>
            Edit project information on your portfolio section.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PortfolioForm portfolio={portfolio} />
        </CardContent>
      </Card>
    </ContentLayout>
  );
}
