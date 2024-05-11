import { redirect } from 'next/navigation';

import prismadb from '@/lib/prismadb';
import { currentUser } from '@/lib/authentication';
import ExpertiseForm from '@/components/admin/expertise-form';
import { ContentLayout } from '@/components/admin-panel/content-layout';
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription
} from '@/components/ui/card';

export default async function ExpertisePage() {
  const user = await currentUser();

  if (!user || !user.id) {
    redirect('/auth/sign-in');
  }

  const seoOptimizationItems = await prismadb.expertise.findMany({
    where: {
      userId: user.id,
      type: 'SEOOPTIMIZATION'
    }
  });

  const webDevelopmentItems = await prismadb.expertise.findMany({
    where: {
      userId: user.id,
      type: 'WEBDEVELOPMENT'
    }
  });

  const contentCreationItems = await prismadb.expertise.findMany({
    where: {
      userId: user.id,
      type: 'CONTENTCREATION'
    }
  });

  return (
    <ContentLayout title='Expertise'>
      <div className='grid lg:grid-cols-2 gap-4'>
        <Card className='rounded-lg border-none'>
          <CardHeader className='mx-[1px] pb-9'>
            <CardTitle className='text-xl font-semibold'>
              SEO Optimization
            </CardTitle>
            <CardDescription>
              Manage your SEO optimization section informations.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ExpertiseForm
              expertiseType='SEOOPTIMIZATION'
              expertiseItems={seoOptimizationItems}
            />
          </CardContent>
        </Card>
        <Card className='rounded-lg border-none'>
          <CardHeader className='mx-[1px] pb-9'>
            <CardTitle className='text-xl font-semibold'>
              Web Development
            </CardTitle>
            <CardDescription>
              Manage your web development section informations.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ExpertiseForm
              expertiseType='WEBDEVELOPMENT'
              expertiseItems={webDevelopmentItems}
            />
          </CardContent>
        </Card>
        <Card className='lg:col-span-2 rounded-lg border-none'>
          <CardHeader className='mx-[1px] pb-9'>
            <CardTitle className='text-xl font-semibold'>
              Content Creation
            </CardTitle>
            <CardDescription>
              Manage your content creation section informations.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ExpertiseForm
              expertiseType='CONTENTCREATION'
              expertiseItems={contentCreationItems}
            />
          </CardContent>
        </Card>
      </div>
    </ContentLayout>
  );
}
