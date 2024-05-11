import BackButton from '@/components/back-button';
import ToolForm from '@/components/admin/tool-form';
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription
} from '@/components/ui/card';
import { ContentLayout } from '@/components/admin-panel/content-layout';

export default function CreateToolPage() {
  return (
    <ContentLayout title='New Tool'>
      <BackButton slug='/tool' />
      <Card className='rounded-lg border-none'>
        <CardHeader className='mx-[1px] pb-9'>
          <CardTitle className='text-xl font-semibold'>Add Tool</CardTitle>
          <CardDescription>
            Add more tool or app on your tool and apps section.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ToolForm />
        </CardContent>
      </Card>
    </ContentLayout>
  );
}
