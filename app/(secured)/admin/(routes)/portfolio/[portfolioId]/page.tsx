import { redirect } from 'next/navigation';

import { auth } from '@/lib/auth';
import prismadb from '@/lib/prismadb';
import BackButton from '@/components/back-button';
import PortfolioForm from '@/components/secured/portfolio-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

export default async function PortfolioIdPage({
  params
}: {
  params: { portfolioId: string };
}) {
  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    redirect('/api/auth/signin');
  }

  const portfolio = await prismadb.portfolio.findUnique({
    where: {
      id: params.portfolioId,
      userId: session.user.id
    },
    include: {
      tags: true
    }
  });

  return (
    <>
      <BackButton slug='/admin/portfolio' />
      <Card className='rounded-lg border-none'>
        <CardHeader className='mx-[1px] pb-9'>
          <CardTitle className='text-xl font-semibold'>
            Edit Portfolio
          </CardTitle>
          <CardDescription>
            Edit project information on your portfolio section.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PortfolioForm portfolio={portfolio} />
        </CardContent>
      </Card>
    </>
  );
}
