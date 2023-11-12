import BackButton from '@/components/back-button';
import PortfolioForm from '@/components/secured/portfolio-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

export default function CreatePage() {
  return (
    <>
      <BackButton slug='/admin/portfolio' />
      <Card className='rounded-lg border-none'>
        <CardHeader className='mx-[1px] pb-9'>
          <CardTitle className='text-xl font-semibold'>
            Create Portfolio
          </CardTitle>
          <CardDescription>
            Add more project on your portfolio section.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PortfolioForm />
        </CardContent>
      </Card>
    </>
  );
}
