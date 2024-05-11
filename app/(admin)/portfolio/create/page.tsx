import BackButton from '@/components/back-button';
import PortfolioForm from '@/components/admin/portfolio-form';
import { ContentLayout } from '@/components/admin-panel/content-layout';
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription
} from '@/components/ui/card';

export default function CreatePortfolioPage() {
  return (
    <ContentLayout title='New Project'>
      <BackButton slug='/portfolio' />
      <Card className='rounded-lg border-none'>
        <CardHeader className='mx-[1px] pb-9'>
          <CardTitle className='text-xl font-semibold'>Add Project</CardTitle>
          <CardDescription>
            Add more project on your portfolio section.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PortfolioForm />
        </CardContent>
      </Card>
    </ContentLayout>
  );
}
