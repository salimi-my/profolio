import type { Qualification } from '@prisma/client';

import QualificationTimeline from '@/components/admin/qualification-timeline';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface QualificationTabProps {
  education: Qualification[];
  experience: Qualification[];
}

export default function QualificationTab({
  education,
  experience
}: QualificationTabProps) {
  return (
    <Tabs defaultValue='education' className='w-full'>
      <TabsList className='grid w-full grid-cols-2'>
        <TabsTrigger value='education'>Education</TabsTrigger>
        <TabsTrigger value='experience'>Experience</TabsTrigger>
      </TabsList>
      <TabsContent value='education'>
        <QualificationTimeline qualificationType='education' data={education} />
      </TabsContent>
      <TabsContent value='experience'>
        <QualificationTimeline
          qualificationType='experience'
          data={experience}
        />
      </TabsContent>
    </Tabs>
  );
}
