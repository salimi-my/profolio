import FrontendForm from '@/components/secured/frontend-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

export default async function ExperiencePage() {
  return (
    <div className='grid lg:grid-cols-2 gap-4'>
      <Card className='rounded-lg border-none'>
        <CardHeader className='mx-[1px] pb-9'>
          <CardTitle className='text-xl font-bold'>
            Frontend Development
          </CardTitle>
          <CardDescription>
            Manage your frontend development section informations.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FrontendForm />
        </CardContent>
      </Card>
      <Card className='rounded-lg border-none'>
        <CardHeader className='mx-[1px] pb-9'>
          <CardTitle className='text-xl font-bold'>
            Backend Development
          </CardTitle>
          <CardDescription>
            Manage your backend development section informations.
          </CardDescription>
        </CardHeader>
        <CardContent>BackendDevelopment</CardContent>
      </Card>
    </div>
  );
}
