import { Briefcase, GraduationCap } from 'lucide-react';

import type getData from '@/actions/get-data';
import QualificationCard from '@/components/landing/qualification-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Qualification({
  education,
  experience
}: Partial<Awaited<ReturnType<typeof getData>>>) {
  return (
    <section id='qualification' className='mt-32'>
      <h1 className='text-center text-sm text-muted-foreground font-medium'>
        My Personal Journey
      </h1>
      <h2 className='text-center text-2xl font-semibold pt-1'>Qualification</h2>
      <div className='w-full max-w-[810px] mx-auto pt-8'>
        <Tabs defaultValue='education' className='w-full'>
          <TabsList className='grid w-full grid-cols-2'>
            <TabsTrigger value='education'>Education</TabsTrigger>
            <TabsTrigger value='experience'>Experience</TabsTrigger>
          </TabsList>
          <TabsContent value='education'>
            <QualificationCard
              icon={GraduationCap}
              qualificationType='education'
              data={education}
            />
          </TabsContent>
          <TabsContent value='experience'>
            <QualificationCard
              icon={Briefcase}
              qualificationType='experience'
              data={experience}
            />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
