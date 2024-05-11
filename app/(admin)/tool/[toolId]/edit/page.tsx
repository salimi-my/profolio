import { redirect } from 'next/navigation';

import prismadb from '@/lib/prismadb';
import BackButton from '@/components/back-button';
import { currentUser } from '@/lib/authentication';
import ToolForm from '@/components/admin/tool-form';
import { ContentLayout } from '@/components/admin-panel/content-layout';
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription
} from '@/components/ui/card';

export default async function EditToolPage({
  params
}: {
  params: { toolId: string };
}) {
  const user = await currentUser();

  if (!user || !user.id) {
    redirect('/auth/sign-in');
  }

  const tool = await prismadb.tool.findUnique({
    where: {
      id: params.toolId,
      userId: user.id
    }
  });

  return (
    <ContentLayout title='Edit Tool'>
      <BackButton slug='/tool' />
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
    </ContentLayout>
  );
}
