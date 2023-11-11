import type { Qualification } from '@prisma/client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import QualificationTimeline from '@/components/secured/qualification-timeline';

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
