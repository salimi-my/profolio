import AboutForm from '@/components/secured/about-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

export default function AboutPage() {
  return (
    <Card className='rounded-lg border-none'>
      <CardHeader className='mx-[1px] pb-9'>
        <CardTitle className='text-xl font-bold'>About</CardTitle>
        <CardDescription>
          Manage your about section informations.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <AboutForm />
      </CardContent>
    </Card>
  );
}
