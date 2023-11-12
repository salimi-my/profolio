import { redirect } from 'next/navigation';

import { auth } from '@/lib/auth';
import prismadb from '@/lib/prismadb';
import BackButton from '@/components/back-button';
import ToolForm from '@/components/secured/tool-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

export default async function ToolId({
  params
}: {
  params: { toolId: string };
}) {
  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    redirect('/api/auth/signin');
  }

  const tool = await prismadb.tool.findUnique({
    where: {
      id: params.toolId,
      userId: session.user.id
    }
  });

  return (
    <>
      <BackButton slug='/admin/tool' />
      <Card className='rounded-lg border-none'>
        <CardHeader className='mx-[1px] pb-9'>
          <CardTitle className='text-xl font-semibold'>Edit Tool</CardTitle>
          <CardDescription>
            Edit tool or app information on your tool and apps section.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ToolForm tool={tool} />
        </CardContent>
      </Card>
    </>
  );
}
