import { redirect } from 'next/navigation';

import { auth } from '@/lib/auth';
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

  return (
    <div className='grid lg:grid-cols-2 gap-4'>
      <Card className='rounded-lg border-none'>
        <CardHeader className='mx-[1px] pb-9'>
          <CardTitle className='text-xl font-bold'>SEO Optimization</CardTitle>
          <CardDescription>
            Manage your SEO optimization section informations.
          </CardDescription>
        </CardHeader>
        <CardContent>SeoOptimazationForm</CardContent>
      </Card>
      <Card className='rounded-lg border-none'>
        <CardHeader className='mx-[1px] pb-9'>
          <CardTitle className='text-xl font-bold'>Web Development</CardTitle>
          <CardDescription>
            Manage your web development section informations.
          </CardDescription>
        </CardHeader>
        <CardContent>WebDevelopmentForm</CardContent>
      </Card>
      <Card className='lg:col-span-2 rounded-lg border-none'>
        <CardHeader className='mx-[1px] pb-9'>
          <CardTitle className='text-xl font-bold'>Content Creation</CardTitle>
          <CardDescription>
            Manage your content creation section informations.
          </CardDescription>
        </CardHeader>
        <CardContent>ContentCreationForm</CardContent>
      </Card>
    </div>
  );
}
