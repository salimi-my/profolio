import { Skeleton } from '@/components/ui/skeleton';
import { ContentLayout } from '@/components/admin-panel/content-layout';
import { DataTableLoading } from '@/components/data-table/data-table-loading';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function PortfolioLoading() {
  return (
    <ContentLayout title='All Projects'>
      <Card className='rounded-lg border-none'>
        <CardHeader className='mx-[1px] pb-9'>
          <CardTitle className='text-xl font-semibold'>
            <Skeleton className='h-7 w-[100px]' />
          </CardTitle>
          <Skeleton className='h-5 w-[300px]' />
        </CardHeader>
        <CardContent>
          <DataTableLoading
            tableType='portfolio'
            columnCount={8}
            rowCount={10}
          />
        </CardContent>
      </Card>
    </ContentLayout>
  );
}
