import { LucideIcon } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface MiniCardProps {
  icon: LucideIcon;
  title: string;
  content: string | number;
  desc: string;
}

export default function MiniCard({
  icon: Icon,
  title,
  content,
  desc
}: MiniCardProps) {
  return (
    <Card className='rounded-lg border-none'>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle className='text-sm font-medium'>{title}</CardTitle>
        <Icon className='h-4 w-4 text-muted-foreground' />
      </CardHeader>
      <CardContent>
        <div className='text-2xl font-bold'>{content}</div>
        <p className='text-xs text-muted-foreground'>{desc}</p>
      </CardContent>
    </Card>
  );
}
