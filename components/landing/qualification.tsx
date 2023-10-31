import { Briefcase, GraduationCap } from 'lucide-react';

import QualificationCard from '@/components/landing/qualification-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const data_education = [
  {
    start_year: '2012',
    end_year: '2013',
    school: 'Ungku Aziz Secondary School',
    degree: 'Malaysian Certificate of Education'
  },
  {
    start_year: '2008',
    end_year: '2012',
    school: 'Centre for Foundation Studies in Science (UM)',
    degree: 'Physical Sciences Foundation'
  },
  {
    start_year: '2014',
    end_year: '2016',
    school: 'MARA University of Technology',
    degree: 'Diploma in Computer Science'
  }
];

const data_experience = [
  {
    start_year: '2017',
    end_year: '2018',
    company: 'BolehVPN Sdn Bhd',
    position: 'Support Staff'
  },
  {
    start_year: '2017',
    end_year: '2019',
    company: 'MSD Digital Intelligence',
    position: 'Assistant Manager'
  },
  {
    start_year: '2019',
    end_year: '2021',
    company: 'Techouz Solutions',
    position: 'Web Developer'
  },
  {
    start_year: '2021',
    end_year: 'present',
    company: 'Logicwise Sdn Bhd',
    position: 'Web Developer'
  }
];

export default function Qualification() {
  return (
    <section id='qualification' className='mt-32'>
      <h1 className='text-center text-sm text-muted-foreground font-medium'>
        My Personal Journey
      </h1>
      <h2 className='text-center text-2xl font-medium pt-1'>Qualification</h2>
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
              data={data_education}
            />
          </TabsContent>
          <TabsContent value='experience'>
            <QualificationCard
              icon={Briefcase}
              qualificationType='experience'
              data={data_experience}
            />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
