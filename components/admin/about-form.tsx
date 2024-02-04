'use client';

import * as z from 'zod';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import axios, { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';

import type { About } from '@prisma/client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';

interface AboutFormProps {
  about: About | null;
}

const formSchema = z.object({
  experience: z.string().min(1, { message: 'Please enter experience.' }),
  project: z.string().min(1, { message: 'Please enter project.' }),
  worldwide: z.string().min(1, { message: 'Please enter worldwide.' }),
  summary: z.string().min(1, { message: 'Please enter summary.' })
});

export default function AboutForm({ about }: AboutFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      experience: about !== null ? about.experience : '',
      project: about !== null ? about.project : '',
      worldwide: about !== null ? about.worldwide : '',
      summary: about !== null ? about.summary : ''
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);

      const response = await axios.post('/api/about', values);

      if (response.data.success) {
        router.refresh();

        toast({
          variant: 'default',
          title: 'Success!',
          description: 'Data has been successfully saved.'
        });
      }
    } catch (error) {
      if (error instanceof AxiosError && error.response?.data.error) {
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: error.response.data.error
        });
      } else {
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: 'There was a problem with your request.'
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col gap-4'
      >
        <FormField
          control={form.control}
          name='experience'
          render={({ field }) => (
            <FormItem className='space-y-1'>
              <FormLabel>Experience</FormLabel>
              <FormControl>
                <Input placeholder='Enter experience' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='project'
          render={({ field }) => (
            <FormItem className='space-y-1'>
              <FormLabel>Project</FormLabel>
              <FormControl>
                <Input placeholder='Enter project' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='worldwide'
          render={({ field }) => (
            <FormItem className='space-y-1'>
              <FormLabel>Worldwide</FormLabel>
              <FormControl>
                <Input placeholder='Enter worldwide' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='summary'
          render={({ field }) => (
            <FormItem className='space-y-1'>
              <FormLabel>Summary</FormLabel>
              <FormControl>
                <Textarea
                  rows={5}
                  placeholder='Enter summary'
                  className='resize-none'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <Button
            disabled={loading}
            type='submit'
            variant='default'
            className='mt-2'
          >
            {loading && (
              <>
                <Loader2 className='animate-spin mr-2' size={18} />
                Saving...
              </>
            )}
            {!loading && <p className='px-4'>Save</p>}
          </Button>
        </div>
      </form>
    </Form>
  );
}
