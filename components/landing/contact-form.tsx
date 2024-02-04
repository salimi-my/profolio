'use client';

import * as z from 'zod';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import axios, { AxiosError } from 'axios';
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
  name: z.string().min(1, { message: 'Please enter your name.' }),
  email: z.string().email({ message: 'Please enter valid email address.' }),
  subject: z.string().min(1, { message: 'Please enter subject.' }),
  message: z.string().min(1, { message: 'Please enter your message.' })
});

export default function ContactForm() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: ''
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);

      const response = await axios.post('/api/send', values);

      if (response.data.success) {
        form.reset();

        toast({
          variant: 'default',
          title: 'Success!',
          description: 'Your message has been successfully sent.'
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
        className='flex flex-col gap-4 -mt-1'
      >
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-base'>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder='Enter your name'
                  {...field}
                  autoComplete='name'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-base'>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder='Enter your email'
                  {...field}
                  autoComplete='email'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='subject'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-base'>Subject</FormLabel>
              <FormControl>
                <Input placeholder='Enter subject' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='message'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-base'>Message</FormLabel>
              <FormControl>
                <Textarea
                  rows={5}
                  placeholder='Enter your message'
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
                Sending...
              </>
            )}
            {!loading && <>Send Message</>}
          </Button>
        </div>
      </form>
    </Form>
  );
}
