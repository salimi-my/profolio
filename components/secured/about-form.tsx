'use client';

import * as z from 'zod';
import axios from 'axios';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

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

const formSchema = z.object({
  experience: z.string().min(1, { message: 'Please enter experience.' }),
  project: z.string().min(1, { message: 'Please enter project.' }),
  worldwide: z.string().min(1, { message: 'Please enter worldwide.' }),
  summary: z.string().min(1, { message: 'Please enter summary.' })
});

export default function AboutForm() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      experience: '',
      project: '',
      worldwide: '',
      summary: ''
    }
  });

  const onSubmit = () => {};

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
                Savibg...
              </>
            )}
            {!loading && <p className='px-4'>Save</p>}
          </Button>
        </div>
      </form>
    </Form>
  );
}
