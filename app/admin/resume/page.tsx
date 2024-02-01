import { redirect } from 'next/navigation';

import prismadb from '@/lib/prismadb';
import { currentUser } from '@/lib/authentication';
import ResumeIframe from '@/components/admin/resume-iframe';
import UploadPdfButton from '@/components/admin/upload-pdf-button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

export default async function AboutPage() {
  const user = await currentUser();

  if (!user || !user.id) {
    redirect('/auth/sign-in');
  }

  const resume = await prismadb.resume.findFirst({
    where: {
      userId: user.id
    }
  });

  return (
    <Card className='rounded-lg border-none'>
      <CardHeader className='mx-[1px] pb-9'>
        <CardTitle className='text-xl font-bold items-center flex justify-between'>
          Resume
          <UploadPdfButton resume={resume} />
        </CardTitle>
        <CardDescription>Manage your resume pdf file.</CardDescription>
      </CardHeader>
      <CardContent>
        <ResumeIframe url={resume?.pdf ?? null} />
      </CardContent>
    </Card>
  );
}
