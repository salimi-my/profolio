import { redirect } from 'next/navigation';

import { auth } from '@/lib/auth';
import prismadb from '@/lib/prismadb';
import ExpertiseForm from '@/components/secured/expertise-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

export default async function ExpertisePage() {
  const session = await auth();

  if (!session || !session.user) {
    redirect('/api/auth/signin');
  }

  const seoOptimizationItems = await prismadb.expertise.findMany({
    where: {
      userId: session?.user?.id!,
      type: 'SEOOPTIMIZATION'
    }
  });

  const webDevelopmentItems = await prismadb.expertise.findMany({
    where: {
      userId: session?.user?.id!,
      type: 'WEBDEVELOPMENT'
    }
  });

  const contentCreationItems = await prismadb.expertise.findMany({
    where: {
      userId: session?.user?.id!,
      type: 'CONTENTCREATION'
    }
  });

  return (
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
  );
}
