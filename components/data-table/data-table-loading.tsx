import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';

interface DataTableLoadingProps {
  tableType?: string;
  columnCount?: number;
  rowCount?: number;
}

export function DataTableLoading({
  tableType = 'qualification',
  columnCount = 10,
  rowCount = 10
}: DataTableLoadingProps) {
  return (
    <div className='w-full space-y-3 overflow-auto'>
      <div className='flex w-full items-start justify-between space-x-2 overflow-auto p-1'>
        <div className='flex flex-col md:flex-row items-start md:flex-1 md:items-center gap-2 md:gap-0 md:space-x-2'>
          <Skeleton className='h-8 w-[120px] lg:w-[250px]' />
          <Skeleton
            className={cn(
              'h-8 w-[70px] border-dashed',
              tableType === 'portfolio' && 'hidden'
            )}
          />
        </div>
        <div className='flex flex-col-reverse md:flex-row items-center gap-2 md:gap-0 md:space-x-2'>
          <Skeleton className='ml-auto h-8 w-[70px] flex' />
          <Skeleton className='ml-auto h-8 w-[70px] flex' />
        </div>
      </div>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {Array.from({ length: 1 }).map((_, i) => (
              <TableRow key={i} className='hover:bg-transparent'>
                {Array.from({ length: columnCount }).map((_, i) => (
                  <TableHead
                    key={i}
                    className={cn(
                      i === 0 && 'w-6',
                      i === 1 && tableType === 'portfolio' && 'w-20'
                    )}
                  >
                    <Skeleton
                      className={cn(
                        'h-6',
                        i === 0
                          ? 'w-6'
                          : i === 1 && tableType === 'portfolio'
                          ? 'w-20'
                          : 'w-full max-lg:min-w-[100px]'
                      )}
                    />
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {Array.from({ length: rowCount }).map((_, i) => (
              <TableRow key={i} className='hover:bg-transparent'>
                {Array.from({ length: columnCount }).map((_, i) => (
                  <TableCell key={i}>
                    <Skeleton
                      className={cn(
                        'h-6 w-full',
                        i === 1 && tableType === 'portfolio' && 'h-20 w-20'
                      )}
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className='flex w-full flex-col items-center justify-between gap-4 overflow-auto py-1 sm:flex-row sm:gap-8'>
        <div className='flex-1'>
          <Skeleton className='h-8 w-40' />
        </div>
        <div className='flex flex-col items-center gap-4 sm:flex-row sm:gap-6 lg:gap-8'>
          <div className='flex items-center space-x-2'>
            <Skeleton className='h-8 w-24' />
            <Skeleton className='h-8 w-[70px]' />
          </div>
          <div className='flex w-[100px] items-center justify-center text-sm font-medium'>
            <Skeleton className='h-8 w-20' />
          </div>
          <div className='flex items-center space-x-2'>
            <Skeleton className='h-8 w-8' />
            <Skeleton className='h-8 w-8' />
            <Skeleton className='h-8 w-8' />
            <Skeleton className='h-8 w-8' />
          </div>
        </div>
      </div>
    </div>
  );
}
